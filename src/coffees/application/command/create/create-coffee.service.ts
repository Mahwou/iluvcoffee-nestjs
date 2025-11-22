import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Coffee } from "src/coffees/infrastructure/models/coffee.entity";
import { Flavor } from "src/coffees/infrastructure/models/flavor.entity";
import { Repository } from "typeorm";
import { CreateCoffeeCommand } from "./create-coffee.command";
import { CreateCoffeeResponse } from "./create-coffee.response";
import { CoffeeMessagesEnum } from "src/coffees/domain/enums/coffee-messages.enum";

@Injectable()
export class CreateCoffeeService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
    ) {}

    public async handle(command: CreateCoffeeCommand): Promise<CreateCoffeeResponse> 
    {
        let res = new CreateCoffeeResponse();
        const flavors = await Promise.all(
            command.flavors.map(name => this.preloadFlavorsByName(name)),
        );

        this.coffeeRepository.save({
            ...command,
            flavors,
        });

        res.message = CoffeeMessagesEnum.CoffeeCreatedSuccessfully;
        res.isCreated = true;

        return res;
    }

    private async preloadFlavorsByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ where: { name } });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }
}
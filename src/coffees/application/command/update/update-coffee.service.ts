import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundCoffeeException } from "src/coffees/domain/exceptions/not-found-coffee.exception";
import { Coffee } from "src/coffees/infrastructure/models/coffee.entity";
import { Flavor } from "src/coffees/infrastructure/models/flavor.entity";
import { Repository } from "typeorm";
import { UpdateCoffeeCommand } from "./update-coffee.command";
import { UpdateCoffeeResponse } from "./update-coffee.response";
import { CoffeeMessagesEnum } from "src/coffees/domain/enums/coffee-messages.enum";

@Injectable()
export class UpdateCoffeeService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
    ) {}

    /**
     * 
     * @param command UpdateCoffeeCommand 
     * @returns Promise<UpdateCoffeeResponse>
     */
    public async handle(command: UpdateCoffeeCommand): Promise<UpdateCoffeeResponse> 
    {
        let res = new UpdateCoffeeResponse();

        let flavors: Flavor[] = [];
        
        await this.getCoffeeOrThrowNotFoundException(+command.id);

        if (command.flavors) {
            flavors = await Promise.all(
                command.flavors.map(name => this.preloadFlavorsByName(name)),
            );
        }

        await this.coffeeRepository.save({...command, flavors });

        res.isUpdated = true;
        res.message = CoffeeMessagesEnum.COFFEE_UPDATED;

        return res;
    }

    /**
     * @param id 
     * @param coffee 
     * @throws NotFoundCoffeeException
     */
    private async getCoffeeOrThrowNotFoundException(id: number) {
        const existingCoffee = await this.coffeeRepository.findOne({
            where: { id: +id },
            relations: { flavors: true },
        });
        if (!existingCoffee) {
            throw new NotFoundCoffeeException();
        }
    }

    /**
     * @param name 
     * @returns Promise<Flavor>
     */
    private async preloadFlavorsByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ where: { name } });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
        
    }
}
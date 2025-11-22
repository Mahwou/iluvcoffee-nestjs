import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCoffeeDto } from "src/coffees/infrastructure/http/Dto/create-coffee.dto";
import { Coffee } from "src/coffees/infrastructure/models/coffee.entity";
import { Flavor } from "src/coffees/infrastructure/models/flavor.entity";
import { Repository } from "typeorm";

@Injectable()
export class CreateCoffeeService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
    ) {}

    async create(coffee: CreateCoffeeDto): Promise<void> 
    {
        const flavors = await Promise.all(
            coffee.flavors.map(name => this.preloadFlavorsByName(name)),
        );

        this.coffeeRepository.save({
            ...coffee,
            flavors,
        });
    }

    private async preloadFlavorsByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ where: { name } });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }
}
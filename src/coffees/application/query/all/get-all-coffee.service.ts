import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Coffee } from "src/coffees/infrastructure/models/coffee.entity";
import { Repository } from "typeorm";
import { GetAllCoffeesCommand } from "./get-all-coffees.command";

@Injectable()
export class GetAllCoffeeService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
    ) {}

    /**
     * 
     * @returns Promise<Coffee[]>
     */
    public findAll(command: GetAllCoffeesCommand): Promise<Coffee[]> {

        const offset = (command.page - 1) * command.limit;

        return this.coffeeRepository.find(
            {
                relations: {flavors: true},
                skip: offset,
                take: command.limit,
            }
        );
    }
}
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Coffee } from "src/coffees/infrastructure/models/coffee.entity";
import { Repository } from "typeorm";

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
    public findAll(): Promise<Coffee[]> {
        return this.coffeeRepository.find(
            {
                relations: {flavors: true},
            }
        );
    }
}
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundCoffeeException } from "src/coffees/domain/exceptions/not-found-coffee.exception";
import { Coffee } from "src/coffees/infrastructure/models/coffee.entity";
import { Repository } from "typeorm";

@Injectable()
export class GetCoffeeService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
    ){}

    async findOne(id: number): Promise<Coffee> {

        const coffee = await this.coffeeRepository.findOne({
            where: { id },
            relations: { flavors: true },
        });

        if (!coffee) {
            throw new NotFoundCoffeeException(`Coffee with ID ${id} not found`);
        }
        return coffee;
    }
}
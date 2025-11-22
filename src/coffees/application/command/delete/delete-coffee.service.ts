import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Coffee } from "src/coffees/infrastructure/models/coffee.entity";
import { Repository } from "typeorm";

@Injectable()
export class DeleteCoffeeService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
    ) {}

    remove(id: string): void 
    {
        this.coffeeRepository.remove({ id: +id } as Coffee);
    }
}
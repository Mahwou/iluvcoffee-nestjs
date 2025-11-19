import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundCoffeeException } from "src/coffees/domain/exceptions/not-found-coffee.exception";
import { CreateCoffeeDto } from "src/coffees/infrastructure/http/Dto/create-coffee.dto";
import { UpdateCoffeeDto } from "src/coffees/infrastructure/http/Dto/update-coffee.dto";
import { Coffee } from "src/coffees/infrastructure/models/coffee.entity";
import { Repository } from "typeorm";

@Injectable()
export class CoffeeService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
    ) {}

    findAll(): Promise<Coffee[]> {
        return this.coffeeRepository.find();
    }

    async findOne(id: number): Promise<Coffee> {

        const coffee = await this.coffeeRepository.findOne({
            where: { id },
        });

        if (!coffee) {
            throw new NotFoundCoffeeException(`Coffee with ID ${id} not found`);
        }
        return coffee;
    }

    create(coffee: CreateCoffeeDto): void 
    {
        this.coffeeRepository.save(coffee);
    }

    async update(id: string, coffee: UpdateCoffeeDto): Promise<void> 
    {
        this.getCoffeeOrThrowNotFoundException(id, coffee);
        this.coffeeRepository.update({ id: +id }, coffee);
    }

    remove(id: string): void 
    {
        this.coffeeRepository.remove({ id: +id } as Coffee);
    }

    /**
     * @param id 
     * @param coffee 
     * @throws NotFoundCoffeeException
     */
    private getCoffeeOrThrowNotFoundException(id: string, coffee: UpdateCoffeeDto) {
        const existingCoffee = this.coffeeRepository.preload({
            id: +id,
            ...coffee,
        });
        if (!existingCoffee) {
            throw new NotFoundCoffeeException(`Coffee with ID ${id} not found`);
        }
    }
}
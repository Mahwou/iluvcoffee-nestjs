import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Coffee } from "src/coffees/infrastructure/models/coffee.entity";
import { Repository } from "typeorm";
import { DeleteCoffeeResponse } from "./delete-coffee.response";
import { CoffeeMessagesEnum } from "src/coffees/domain/enums/coffee-messages.enum";
import { NotFoundCoffeeException } from "src/coffees/domain/exceptions/not-found-coffee.exception";

@Injectable()
export class DeleteCoffeeService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
    ) {}

    async handle(id: string): Promise<DeleteCoffeeResponse> 
    {
        let res = new DeleteCoffeeResponse();

        await this.checkCoffeeExistsOrThrowNotFoundException(+id);

        await this.coffeeRepository.remove({ id: +id } as Coffee);

        res.message = CoffeeMessagesEnum.COFFEE_DELETED;
        res.isDeleted = true;
        return res;
    }

    /**
     * @param id 
     * @param coffee 
     * @throws NotFoundCoffeeException
     */
    private async checkCoffeeExistsOrThrowNotFoundException(id: number) {
        const existingCoffee = await this.coffeeRepository.findOne({
            where: { id: +id },
        });
        if (!existingCoffee) {
            throw new NotFoundCoffeeException();
        }
    }
}
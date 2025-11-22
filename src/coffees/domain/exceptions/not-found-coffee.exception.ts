import { Coffee } from "src/coffees/infrastructure/models/coffee.entity";
import { CoffeeMessagesEnum } from "../enums/coffee-messages.enum";

export class NotFoundCoffeeException extends Error {
    message: string = CoffeeMessagesEnum.CoffeeNotFound;
}   
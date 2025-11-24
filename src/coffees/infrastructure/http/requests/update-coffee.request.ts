import { PartialType } from "@nestjs/mapped-types";
import { CreateCoffeeRequest } from "./create-coffee.request";

export class UpdateCoffeeRequest extends PartialType(CreateCoffeeRequest) {
}
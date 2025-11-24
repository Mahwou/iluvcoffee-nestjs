import { Controller, Get, Query } from "@nestjs/common";
import { GetAllCoffeeService } from "src/coffees/application/query/all/get-all-coffee.service";
import { GetAllCoffeeRequest } from "../requests/get-all-coffees.request";

@Controller('coffees')
export class GetAllCoffeesController {
    constructor(
        private readonly getAllCoffeeService: GetAllCoffeeService,
    ) {}
    
    @Get('')
    findAll(@Query() request: GetAllCoffeeRequest) {

        return this.getAllCoffeeService.findAll({
            limit: request.limit ?? 2,
            page: request.page ?? 1,
        });
    }
}
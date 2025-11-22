import { Controller, Get, Query } from "@nestjs/common";
import { GetAllCoffeeService } from "src/coffees/application/query/all/get-all-coffee.service";
import { GetAllCoffeeDto } from "../Dto/get-all-coffees.dto";

@Controller('coffees')
export class GetAllCoffeesController {
    constructor(
        private readonly getAllCoffeeService: GetAllCoffeeService,
    ) {}
    
    @Get('')
    findAll(@Query() query: GetAllCoffeeDto) {

        return this.getAllCoffeeService.findAll({
            limit: query.limit ?? 2,
            page: query.page ?? 1,
        });
    }
}
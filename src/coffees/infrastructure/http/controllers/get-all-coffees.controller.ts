import { Controller, Get } from "@nestjs/common";
import { GetAllCoffeeService } from "src/coffees/application/query/all/get-all-coffee.service";

@Controller('coffees')
export class GetAllCoffeesController {
    constructor(
        private readonly getAllCoffeeService: GetAllCoffeeService,
    ) {}
    
    @Get('')
    findAll() {
        return this.getAllCoffeeService.findAll();
    }
}
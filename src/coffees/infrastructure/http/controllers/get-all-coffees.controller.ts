import { Controller, Get } from "@nestjs/common";
import { CoffeeService } from "src/coffees/application/command/coffee.service";

@Controller('coffees')
export class GetAllCoffeesController {
    constructor(
        private readonly coffeeService: CoffeeService,
    ) {}
    
    @Get('')
    findAll() {
        return this.coffeeService.findAll();
    }
}
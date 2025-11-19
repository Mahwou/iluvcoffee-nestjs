import { Controller} from '@nestjs/common';
import { CoffeeService } from 'src/coffees/application/command/coffee.service';

@Controller('coffees')
export class CoffeesController {

    constructor(
        private readonly coffeeService: CoffeeService,
    ) {}    
}

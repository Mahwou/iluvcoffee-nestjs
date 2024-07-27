import { Controller, Get } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {

    @Get('')
    findAll(): string {
        return "Here are the coffess";
    }
}

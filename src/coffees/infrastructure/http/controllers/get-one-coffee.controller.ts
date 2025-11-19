import { Controller, Get, Param, Response } from "@nestjs/common";
import { CoffeeService } from "src/coffees/application/command/coffee.service";

@Controller('coffees')
export class GetOneCoffeeController {
    constructor(
        private readonly coffeeService: CoffeeService,
    ) {}    
    
    @Get('/:id')
    async findOne(@Param('id') id: number, @Response() res): Promise<any> {
        try {
            const coffee = await this.coffeeService.findOne(id);
            
            return res.status(200).send({
                coffee: coffee,
            });
        } catch (error: any) {
            return res.status(200).send({
                message: error.message,
                errorClass: error.constructor.name,
            });
        }
    }
}
import { Controller, Get, Param, Response } from "@nestjs/common";
import { GetCoffeeService } from "src/coffees/application/query/get/get-one-coffee.service";

@Controller('coffees')
export class GetOneCoffeeController {
    constructor(
        private readonly getCoffeeService: GetCoffeeService,
    ) {}    
    
    @Get('/:id')
    async findOne(@Param('id') id: number, @Response() res): Promise<any> {
        try {
            const coffee = await this.getCoffeeService.findOne(id);
            
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
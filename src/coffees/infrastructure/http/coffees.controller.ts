import { Body, Controller, Delete, Get, Param, Patch, Post, Response } from '@nestjs/common';
import { CoffeeService } from 'src/coffees/application/command/coffee.service';
import { CreateCoffeeDto } from './Dto/create-coffee.dto';
import { UpdateCoffeeDto } from './Dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {

    constructor(
        private readonly coffeeService: CoffeeService,
    ) {}

    @Get('')
    findAll() {
        return this.coffeeService.findAll();
    }

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

    @Post()
    create(@Body() body: CreateCoffeeDto, @Response() res): any {

        let httpJson = {
            isSaved: false,
            message: "",
        };

        try {
            this.coffeeService.create(body);
            httpJson.isSaved = true;
            httpJson.message = "Coffee created successfully.";
        } catch (error) {
            httpJson.message = error.message;
        }

        return res.status(200).send(httpJson);
    }

    @Patch("/:id")
    update(@Param("id") id: string, @Body() body: UpdateCoffeeDto, @Response() res): any {

        let httpJson = {
            isUpdated: false,
            message: "",
        };

        try {
            this.coffeeService.update(id, body);
            httpJson.isUpdated = true;
            httpJson.message = "Coffee updated successfully.";
        } catch (error) {
            httpJson.message = error.message;
        }

        return res.status(200).send(httpJson);
    }

    @Delete("/:id")
    remove(@Param("id") id: string, @Response() res): any {

        let httpJson = {
            isDeleted: false,
            message: "",
        };

        try {
            this.coffeeService.remove(id);
            httpJson.isDeleted = true;
            httpJson.message = "Coffee deleted successfully.";
        } catch (error) {
            httpJson.message = error.message;
        }

        return res.status(200).send(httpJson);
    }

    
}

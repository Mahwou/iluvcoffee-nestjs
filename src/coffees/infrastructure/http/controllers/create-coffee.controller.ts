import { Body, Controller, Post, Response } from "@nestjs/common";
import { CreateCoffeeDto } from "../Dto/create-coffee.dto";
import { CoffeeService } from "src/coffees/application/command/coffee.service";

@Controller('coffees')
export class CreateCoffeeCOntroller {
    constructor(
        private readonly coffeeService: CoffeeService,
    ) {}    

    
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
}
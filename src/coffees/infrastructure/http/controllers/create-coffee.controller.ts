import { Body, Controller, Post, Response } from "@nestjs/common";
import { CreateCoffeeDto } from "../Dto/create-coffee.dto";
import { CreateCoffeeService } from "src/coffees/application/command/create/create-coffee.service";
import { CreateCoffeeCommand } from "src/coffees/application/command/create/create-coffee.command";

@Controller('coffees')
export class CreateCoffeeCOntroller {
    constructor(
        private readonly createCoffeeService: CreateCoffeeService,
    ) {}    

    
    @Post()
    async create(@Body() body: CreateCoffeeDto, @Response() res): Promise<any> {

        let httpJson = {
            isSaved: false,
            message: "",
        };

        try {
            let command = new CreateCoffeeCommand(
                body.name,
                body.brand,
                body.flavors,
            );
            const response = await this.createCoffeeService.handle(command);
            httpJson.isSaved = response.isCreated;
            httpJson.message = response.message;
        } catch (error) {
            httpJson.message = error.message;
        }

        return res.status(200).send(httpJson);
    }
}
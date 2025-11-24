import { Body, Controller, Post, Response } from "@nestjs/common";
import { CreateCoffeeRequest } from "../requests/create-coffee.request";
import { CreateCoffeeService } from "src/coffees/application/command/create/create-coffee.service";
import { CreateCoffeeCommand } from "src/coffees/application/command/create/create-coffee.command";

@Controller('coffees')
export class CreateCoffeeCOntroller {
    constructor(
        private readonly createCoffeeService: CreateCoffeeService,
    ) {}    

    
    @Post()
    async create(@Body() request: CreateCoffeeRequest, @Response() res): Promise<any> {

        let httpJson = {
            isSaved: false,
            message: "",
        };

        try {
            let command = new CreateCoffeeCommand(
                request.name,
                request.brand,
                request.flavors,
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
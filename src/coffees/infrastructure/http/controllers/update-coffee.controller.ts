import { Body, Controller, Param, Patch, Response } from "@nestjs/common";
import { CoffeeService } from "src/coffees/application/command/coffee.service";
import { UpdateCoffeeDto } from "../Dto/update-coffee.dto";

@Controller('coffees')
export class UpdateCoffeeCOntroller {
    constructor(
        private readonly coffeeService: CoffeeService,
    ) {}    

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
}
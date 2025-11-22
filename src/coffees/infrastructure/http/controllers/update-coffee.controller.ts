import { Body, Controller, Param, Patch, Response } from "@nestjs/common";
import { UpdateCoffeeDto } from "../Dto/update-coffee.dto";
import { UpdateCoffeeService } from "src/coffees/application/command/update/update-coffee.service";
import { UpdateCoffeeCommand } from "src/coffees/application/command/update/update-coffee.command";

@Controller('coffees')
export class UpdateCoffeeCOntroller {
    constructor(
        private readonly updateCoffeeService: UpdateCoffeeService,
    ) {}    

    @Patch("/:id")
    async update(@Param("id") id: string, @Body() body: UpdateCoffeeDto, @Response() res): Promise<any> {

        let httpJson = {
            isUpdated: false,
            message: "",
        };

        try {
            const command = new UpdateCoffeeCommand(
                +id,
                body.name,
                body.brand,
                body.flavors,
            );

            const res = await this.updateCoffeeService.handle(command);

            httpJson.isUpdated = res.isUpdated;
            httpJson.message = res.message;
            
        } catch (error) {
            httpJson.message = error.message;
        }

        return res.status(200).send(httpJson);
    }
}
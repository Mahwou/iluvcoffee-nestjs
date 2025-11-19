import { Controller, Delete, Param, Response } from "@nestjs/common";
import { CoffeeService } from "src/coffees/application/command/coffee.service";

@Controller('coffees')
export class DeleteCoffeeCOntroller {
    constructor(
        private readonly coffeeService: CoffeeService,
    ) {}    

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
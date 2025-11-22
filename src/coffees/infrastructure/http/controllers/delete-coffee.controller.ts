import { Controller, Delete, Param, Response } from "@nestjs/common";
import { DeleteCoffeeService } from "src/coffees/application/command/delete/delete-coffee.service";

@Controller('coffees')
export class DeleteCoffeeCOntroller {
    constructor(
        private readonly deleteCoffeeService: DeleteCoffeeService,
    ) {}    

    @Delete("/:id")
    remove(@Param("id") id: string, @Response() res): any {

        let httpJson = {
            isDeleted: false,
            message: "",
        };

        try {
            this.deleteCoffeeService.remove(id);
            httpJson.isDeleted = true;
            httpJson.message = "Coffee deleted successfully.";
        } catch (error) {
            httpJson.message = error.message;
        }

        return res.status(200).send(httpJson);
    }
}
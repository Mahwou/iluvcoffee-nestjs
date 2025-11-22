import { Controller, Delete, Param, Response } from "@nestjs/common";
import { DeleteCoffeeService } from "src/coffees/application/command/delete/delete-coffee.service";

@Controller('coffees')
export class DeleteCoffeeCOntroller {
    constructor(
        private readonly deleteCoffeeService: DeleteCoffeeService,
    ) {}    

    @Delete("/:id")
    async remove(@Param("id") id: string, @Response() res): Promise<any> {

        let httpJson = {
            isDeleted: false,
            message: "",
        };

        try {
            const response = await this.deleteCoffeeService.remove(id);
            httpJson.isDeleted = response.isDeleted;
            httpJson.message = response.message;
        } catch (error) {
            httpJson.message = error.message;
        }

        return res.status(200).send(httpJson);
    }
}
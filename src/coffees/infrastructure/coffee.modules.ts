import { Module } from "@nestjs/common";
import { CoffeeService } from "../application/command/coffee.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coffee } from "./models/coffee.entity";
import { CreateCoffeeCOntroller } from "./http/controllers/create-coffee.controller";
import { UpdateCoffeeCOntroller } from "./http/controllers/update-coffee.controller";
import { DeleteCoffeeCOntroller } from "./http/controllers/delete-coffee.controller";
import { GetAllCoffeesController } from "./http/controllers/get-all-coffees.controller";
import { GetOneCoffeeController } from "./http/controllers/get-one-coffee.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Coffee]),
    ],
    controllers: [
        CreateCoffeeCOntroller,
        UpdateCoffeeCOntroller,
        DeleteCoffeeCOntroller,
        GetAllCoffeesController,
        GetOneCoffeeController,
    ],
    providers: [CoffeeService],
})
export class CoffeeModule {}
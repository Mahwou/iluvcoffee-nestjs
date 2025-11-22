import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coffee } from "./models/coffee.entity";
import { CreateCoffeeCOntroller } from "./http/controllers/create-coffee.controller";
import { UpdateCoffeeCOntroller } from "./http/controllers/update-coffee.controller";
import { DeleteCoffeeCOntroller } from "./http/controllers/delete-coffee.controller";
import { GetAllCoffeesController } from "./http/controllers/get-all-coffees.controller";
import { GetOneCoffeeController } from "./http/controllers/get-one-coffee.controller";
import { Flavor } from "./models/flavor.entity";
import { CreateCoffeeService } from "../application/command/create/create-coffee.service";
import { UpdateCoffeeService } from "../application/command/update/update-coffee.service";
import { DeleteCoffeeService } from "../application/command/delete/delete-coffee.service";
import { GetAllCoffeeService } from "../application/query/all/get-all-coffee.service";
import { GetCoffeeService } from "../application/query/get/get-one-coffee.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Coffee, Flavor]),
    ],
    controllers: [
        CreateCoffeeCOntroller,
        UpdateCoffeeCOntroller,
        DeleteCoffeeCOntroller,
        GetAllCoffeesController,
        GetOneCoffeeController,
    ],
    providers: [
        CreateCoffeeService,
        UpdateCoffeeService,
        DeleteCoffeeService,
        GetAllCoffeeService,
        GetCoffeeService,
    ],
})
export class CoffeeModule {}
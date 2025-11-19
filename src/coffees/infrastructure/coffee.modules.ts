import { Module } from "@nestjs/common";
import { CoffeesController } from "./http/coffees.controller";
import { CoffeeService } from "../application/command/coffee.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coffee } from "./models/coffee.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Coffee]),
    ],
    controllers: [CoffeesController],
    providers: [CoffeeService],
})
export class CoffeeModule {}
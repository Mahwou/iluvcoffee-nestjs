import { IsOptional, IsPositive } from "class-validator";

export class GetAllCoffeeDto {

    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @IsPositive()
    page: number;
}
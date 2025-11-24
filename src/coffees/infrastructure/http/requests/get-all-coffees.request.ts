import { IsOptional, IsPositive } from "class-validator";

export class GetAllCoffeeRequest {

    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @IsPositive()
    page: number;
}
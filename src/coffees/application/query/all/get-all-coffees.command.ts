
export class GetAllCoffeesCommand {
    constructor(
        public readonly limit: number,
        public readonly page: number,
    ) {}
}
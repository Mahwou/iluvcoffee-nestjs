
export class CreateCoffeeCommand {
    constructor(
        public name: string,
        public brand: string,
        public flavors: string[],
    ) {}
}
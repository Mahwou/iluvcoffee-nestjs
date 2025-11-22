
export class UpdateCoffeeCommand {
    constructor(
        public readonly id: number,
        public name?: string,
        public brand?: string,
        public flavors?: string[],
    ) {}
}
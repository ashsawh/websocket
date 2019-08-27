import {Size} from "./spot";

/**
 * Vehicle contract containing size
 */
export interface IVehicle {
    getSize(): Size;
}

/**
 * Abstract shared code vehicle class
 */
export abstract class AVehicle {
    protected size: Size;

    /**
     * Get vehicle size
     */
    getSize(): Size {
        return this.size;
    }
}

/**
 * Motorcycle implements IVehicle with small size
 */
export class Motorcycle extends AVehicle implements IVehicle {
    constructor() {
        super();
        this.size = Size.Small
    }
}

/**
 * Car implements IVehicle with medium size
 */
export class Car extends AVehicle implements IVehicle {
    constructor() {
        super();
        this.size = Size.Medium
    }
}

/**
 * Truck implements IVehicle with large size
 */
export class Truck extends AVehicle  implements IVehicle {
    constructor() {
        super();
        this.size = Size.Large
    }
}
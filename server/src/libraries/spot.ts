import {IVehicle} from "./vehicle";
import {Level} from "./garage";

/**
 * Size enum
 */
export enum Size {
    Small,
    Medium,
    Large
}

/**
 * Contains logic pertaining to individual parking spots
 */
export class Spot {
    protected designation: number;
    protected size: Size;
    protected vehicle: IVehicle | null = null;
    protected filled: boolean = false;
    protected level: Level;

    /**
     * Constructor
     *
     * @param size
     * @param level
     * @param designation
     */
    constructor(size: Size, level: Level, designation: number) {
        this.designation = designation;
        this.level = level;
        this.size = size;
    }

    /**
     * Park a vehicle
     *
     * @param vehicle
     */
    park(vehicle: IVehicle): Spot {
        this.vehicle = vehicle;
        this.filled = true;
        return this;
    }

    /**
     * Get the vehicle parked in spot and vacate spot
     */
    retrieve(): IVehicle {
        const vehicle: IVehicle = this.vehicle;
        this.vehicle = null;
        this.filled = false;
        return vehicle;
    }

    /**
     * Get spot designation
     */
    getDesignation(): number {
        return this.designation;
    }

    /**
     * Get the level and spot designation
     */
    getFullDesignation(): string {
        return String(this.designation) + this.level.getDesignation();
    }

    /**
     * Get size of spot
     */
    getSize(): Size {
        return this.size;
    }

    /**
     * Get the vehicle parked or false if empty
     */
    getVehicle(): IVehicle | false {
        return this.vehicle;
    }

    /**
     * Get the level number
     */
    getLevelNumber(): string {
        return this.level.getDesignation();
    }
}
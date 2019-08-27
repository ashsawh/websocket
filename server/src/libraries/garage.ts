import {Spot} from "./spot";
import {IVehicle} from "./vehicle";

/**
 * A lane in a level
 */
export class Lane {
    protected designation: string = 'Left';
    protected spots: Array<Spot> = [];

    /**
     * Construcctor
     * @param designation
     */
    constructor(designation: string) {
        this.designation = designation;
    }

    /**
     * Insert a spot into the lane
     *
     * @param spot
     */
    insert(spot: Spot): Lane {
        this.spots.push(spot);
        return this;
    }

    /**
     * Get lane designation
     */
    getDesignation(): string {
        return this.designation;
    }

    /**
     * Get all spots in lane
     */
    getSpots(): Array<Spot> {
        return this.spots;
    }
}

/**
 * A level in the garage
 */
export class Level {
    protected designation: string = 'A';
    protected spots: Array<Spot> = [];
    protected map: Object = {};

    /**
     * Constructor
     * @param designation
     */
    constructor(designation: string) {
        this.designation = designation;
    }

    /**
     * Insert a spot into the level
     * @param spot
     */
    insert(spot: Spot): Level {
        this.spots.push(spot);
        this.map[spot.getDesignation() + this.designation] = spot;
        return this;
    }

    /**
     * Get all spots
     */
    getSpots(): Array<Spot> {
        return this.spots;
    }

    /**
     * Get level map
     */
    getMap(): Object {
        return this.map;
    }

    /**
     * Get level designation
     */
    getDesignation(): string {
        return this.designation;
    }
}

/**
 * Entrance for garage
 */
export class Entrance {
    protected parking: boolean = false;
    protected interval: number = 3;

    /**
     * Is entrance parking
     */
    isParking(): boolean {
        return this.parking;
    }

    /**
     * Set that entrance is parking
     */
    setParking(): Entrance {
        this.parking = true;
        setTimeout(() => this.parking = false, this.interval);
        return this;
    }
}

/**
 * Garage contains state object
 */
export class Garage {
    protected availableSpots: Array<Spot> = [];
    protected occupied: Array<Spot> = [];
    protected static entrances: Array<Entrance> = [];
    protected levels: Array<Level> = [];
    protected map: Object = {};

    /**
     * Add an entrance
     *
     * @param entrance
     */
    public addEntrance(entrance: Entrance): Garage {
        Garage.entrances.push(entrance);
        return this;
    }

    /**
     * Insert a level into the garage
     *
     * @param level
     */
    insert(level: Level): Garage {
        this.levels.push(level);
        this.availableSpots = level.getSpots();
        this.map = {...this.map, ...level.getMap()};
        return this;
    }

    /**
     * Park a car in the garage
     *
     * @param vehicle
     */
    park(vehicle: IVehicle): string {
        const result: Array<Entrance> = Garage.entrances.filter((entrance) => entrance.isParking() === false);

        if (result.length === 0) {
            throw new RangeError('No available entrance');
        }

        result[0].setParking();
        const spot: Spot | false = this.getAppropriateSpot(vehicle);

        if (spot) {
            if (spot.getVehicle() !== null) {
                throw RangeError('Unexpected error. Car in spot.');
            }

            spot.park(vehicle);
            this.occupied.push(spot);

            if (spot.getVehicle() === false) {
                throw RangeError('Unexpected error. Unable to park.');
            }

            return spot.getFullDesignation();

        } else {
            throw new TypeError('No spots available');
        }
    }

    /**
     * Get an appropriate spot in the garage
     *
     * @param vehicle
     */
    getAppropriateSpot(vehicle: IVehicle): Spot | false {

        let available: Spot | false = false;

        let i: number = 0;
        for (let spot of this.availableSpots) {
            if (spot.getSize() === vehicle.getSize()) {
                available = spot;
                this.availableSpots.splice(i, 1);
                break;
            }
            i++;
        }

        return available;
    }

    /**
     * Retrieve a vehicle from the garage
     *
     * @param designation
     */
    retrieve(designation: string): IVehicle | false {
        if (!(designation in this.map)) {
            throw new ReferenceError('Invalid spot selected')
        }

        const spot: Spot = this.map[designation];
        let vehicle: IVehicle | false = false;

        if (spot) {
            this.availableSpots.push(spot);
            vehicle = spot.retrieve();
        }

        return vehicle;
    }

    /**
     * Get all occupied spots
     */
    getOccupied(): Array<Object> {
        return this.occupied.map((occupied: Spot) => {
            return {
                "level": occupied.getLevelNumber(),
                "designation": occupied.getFullDesignation(),
                "size": occupied.getSize()
            };
        });
    }
}
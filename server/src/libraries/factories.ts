import {Size, Spot} from "./spot";
import {Entrance, Garage, Lane, Level} from "./garage";

/**
 * Creates spots
 */
export class SpotFactory {
    /**
     * Create a Spot
     *
     * @param size
     * @param level
     * @param designation
     */
    static make(size: Size, level: Level, designation: number): Spot {
        return new Spot(size, level, designation)
    }
}

/**
 * Create lanes
 */
export class LaneFactory {
    /**
     * Create a lane
     *
     * @param designation
     */
    static make(designation: string): Lane {
        return new Lane(designation);
    }
}

/**
 * Create levels
 */
export class LevelFactory {
    /**
     * Create a level
     *
     * @param designation
     */
    static make(designation: string): Level {
        return new Level(designation);
    }
}

/**
 * Create a garage with levels
 */
export class GarageFactory {
    /**
     * Create a garage structure with 3 levels
     */
    static make(): Garage {
        const levels: Array<Level> = [];
        const spots: Array<Spot> = [];
        const letters: Array<string> = ['A', 'B', 'C'];
        const garage: Garage = new Garage();

        for (let k = 0; k < 3; k++) {
            garage.addEntrance(new Entrance());
        }

        for (let i = 0; i < 3; i++) {
            const level: Level = LevelFactory.make(letters[i]);
            levels.push(level);

            for (let j = 0; j < 50; j++) {
                const size: Size = j % 10 === 0 ? Size.Large : (j % 5 === 0 ? Size.Small : Size.Medium);
                const spot: Spot = SpotFactory.make(size, level, j);
                level.insert(spot);
                spots.push(spot);
            }

            garage.insert(level);
        }

        return garage;
    }
}
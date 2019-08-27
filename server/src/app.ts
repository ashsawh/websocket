import {Garage} from "./libraries/garage";
import {GarageFactory} from "./libraries/factories";
import {Car, IVehicle, Motorcycle, Truck} from "./libraries/vehicle";

const garage: Garage = GarageFactory.make();
const car: Car = new Car();
const bike: Motorcycle = new Motorcycle();
const toyota: Car = new Car();
const truck: Truck = new Truck();


try {
    const ticket1: string = garage.park(car);
    const ticket2: string = garage.park(bike);
    const ticket3: string = garage.park(truck);

    const retrieved: IVehicle | false = garage.retrieve(ticket1);

    console.log(ticket1);

} catch (e) {
    console.log(e);
}

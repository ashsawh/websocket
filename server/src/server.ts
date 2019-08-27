import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as cors from 'cors';
import {Garage} from "./libraries/garage";
import {GarageFactory} from "./libraries/factories";
import {AVehicle, Car, IVehicle, Motorcycle, Truck} from "./libraries/vehicle";

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

    const app: any = express();
    app.use(cors());

    //initialize a simple http server
    const server: http.Server = http.createServer(app);

    //initialize the WebSocket server instance
    const wss: WebSocket.Server = new WebSocket.Server({ server });

    wss.on('connection', (ws: WebSocket) => {

        //connection is up, let's add a simple simple event
        ws.on('message', (message: string) => {

            //log the received message and send it back to the client
            console.log('received: %s', message);
            //ws.send(`Hello, you sent -> ${message}`);

            const decoded: any = JSON.parse(message);

            if (decoded) {
                switch (decoded.type) {
                    case 'add-vehicle':
                        if (decoded.payload.type === 'car') {
                            const vehicle: AVehicle = new Car();
                            garage.park(vehicle);
                        } else if (decoded.payload.type === 'truck') {
                            const vehicle: AVehicle = new Truck();
                            garage.park(vehicle);
                        } else  {
                            const vehicle: AVehicle = new Motorcycle();
                            garage.park(vehicle);
                        }
                        break;
                }
            }
        });

        //send immediatly a feedback to the incoming connection
        //ws.send('Hi there, I am a WebSocket server');
        ws.send(JSON.stringify({
            "payload": garage.getOccupied(),
            "type": "ticker",
            "action": "STATUS"
        }));
    });

    //start our server
    server.listen(process.env.PORT || 5000, () => {
        console.log(`Server started on port 8999 :)`);
    });

} catch (e) {
    console.log(e);
}

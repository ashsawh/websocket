import React from 'react';
import './App.css';
import Spot from "./parking";
import {ISpot} from "./Spot";

interface IState {
    spots: Array<ISpot>
}

interface IEmptyObject {

}

export default class App extends React.Component<IEmptyObject, IState> {
    state: IState;
    ws: WebSocket;

    constructor(props: IEmptyObject) {
        super(props);
        this.ws =  new WebSocket("ws://localhost:4000/");

        this.state = {
            spots: []
        }
    }



    componentDidMount() {
        this.ws.onopen = (data) => {
            // on connecting, do nothing but log it to the console
            console.log(data, 'connected')
        };

        this.ws.onmessage = (evt) => {
            if (JSON.parse(evt.data)) {
                const data: any = JSON.parse(evt.data);

                if (data.type === 'ticker') {
                    this.setState({
                        spots: data.payload
                    })
                }
            }


            // on receiving a message, add it to the list of messages
            // const message = JSON.parse(evt.data);
            // console.log(message);
            //this.addMessage(message)
        };

        //
        // this.ws.onclose = () => {
        //     console.log('disconnected')
        //     // automatically try to reconnect on connection loss
        //     this.setState({
        //         ws: new WebSocket(URL),
        //     })
        // }
    }

    // addMessage = message =>
    //     this.setState(state => ({ messages: [message, ...state.messages] }))
    //
    // submitMessage = messageString => {
    //     // on submitting the ChatInput form, send the message, add it to the list and reset the input
    //     const message = { name: this.state.name, message: messageString }
    //     this.ws.send(JSON.stringify(message))
    //     this.addMessage(message)
    // }

    handleDoubleClick (id: string) {
        // let remaining: any = this.state.sections.map((section: ISection) => {
        //     section.todos = section.todos.filter((todo: IToDo) => {
        //         return todo.id !== id;
        //     });
        //     return section;
        // });
        //
        // this.setState({ sections: remaining });
    }

    handleClick(type: string): void {
        const packet: Object = {
            "payload": {"type": type},
            "type": "add-vehicle",
            "action": "POST"
        };

        this.ws.send(JSON.stringify(packet));



        //this.setState({...this.state.spots})
    }

    render () {
        let spots = this.state.spots.map((spot: ISpot) => {
            return (
                <Spot
                    key={spot.designation}
                    onDoubleClick={(i: string) => this.handleDoubleClick(i)}
                    spot={spot}
                />
            );
        });

        return (
            <div className="App">
                <header className="App-header">
                    <button className="add-car" onClick={() =>this.handleClick("car")}>Add Car</button>
                    <button className="add-truck" onClick={() =>this.handleClick("truck")}>Add Truck</button>
                    <button className="add-bike" onClick={() =>this.handleClick("bike")}>Add Bike</button>
                </header>

                <div className="table-top">
                    <span id="designation" className="cell">Spot ID</span>
                    <span id="level" className="cell">Level</span>
                    <span id="car-type" className="cell">Type</span>
                </div>

                <div className="table-content">
                    {spots}
                </div>
            </div>
        );
    }
}

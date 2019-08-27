import React from 'react';
import {ISpot} from "./Spot";

interface IProps {
    spot: ISpot,
    onDoubleClick: any
}

const Spot: React.FC<IProps> = (prop) => {
    return (
        <div className="parking-spot">
            <span id="designation" className="cell" onDoubleClick={prop.onDoubleClick}>{prop.spot.designation}</span>
            <span id="level" className="cell">{prop.spot.level}</span>
            <span id="car-type" className="cell">{prop.spot.size}</span>
        </div>
    );
};

export default Spot;

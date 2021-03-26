import { FC } from "react";
import { HandState } from "../client";

export const CardDisplay: FC<{hand: HandState}> = ({hand}) => (
    <> 
        <div>{hand.hand.reverse().map(([value, suit]) => (
          <img className="card" src={`${process.env.PUBLIC_URL}/cards/${typeof(value) === "number" ? value : value[0]}${suit[0]}.png`} alt={`${value} of ${suit}`} />
        ))}
        </div>

        <div>Current score: {hand.value}</div>
        
        {hand.value > 21 && "You are bust, unlucky."}
    </> 
)
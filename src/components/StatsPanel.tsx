import { FC } from "react";
import { Stats } from "../client";

export const StatsPanel: FC<{stats?: Stats}> = ({ stats}) => { 
    if(!stats) { 
        return null; 
    }

    const { games, busts, average } = stats; 
    return (<div>
        <div>
            Games: {games} 
        </div>
        <div>
            Busts: {busts} 
        </div>
        <div>
            Average: {average.toFixed(2)} 
        </div>
    </div>)
}
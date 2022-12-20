import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import md from "./MatchDetails.module.css"
import mps from "./MainPage.module.css"
import axios from "axios";

const PurpleCap = (props) => {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
                const {data} = await axios.get(`/purpleCap`);
                console.log("dataa",data);
                setData(data.data);
                setLoading(false);
            }
            getData();
        
    },[])
    console.log(data);
    return(
        <div>
            {!loading ?
            <div>
              <div className={md.mainContentOrangeCap}>
             <div className={md.parentMiddle}>
               <p className={mps.parentMiddleTop}>Bowler</p>
               <p className={mps.parentMiddleTop}>O</p>
               <p className={mps.parentMiddleTop}>R</p>
               <p className={mps.parentMiddleTop}>W</p>
               <p className={mps.parentMiddleTop}>ER</p>
               </div>
               {data.map((person,i) => {
                 return (
                   <div className={md.parentMiddle2}>
                       <div className={md.batsman}>
                       <p className={md.parentMiddleBottom}>{i+1}.  { person.name }</p>
                       </div> 
                       <p className={md.parentMiddleBottom}>{ person.overs}</p>
                       <p className={md.parentMiddleBottom}>{ person.runsGiven}</p>
                       <p className={md.parentMiddleBottom}>{ person.wickets}</p>
                       <p className={md.parentMiddleBottom}>{ person.economy}</p>
                    </div>
                 )
               })};
                </div>
           </div>
            :<div>Loading...</div>}
        </div>
    )
}

export default PurpleCap;
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import md from "./MatchDetails.module.css"
import mps from "./MainPage.module.css"
import axios from "axios";

const OrangeCap = (props) => {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
                const {data} = await axios.get(`/orangeCap`);
                console.log("dataa",data);
                setData(data.data);
                setLoading(false);
            }
            getData();
        
    },[])
    console.log(data);
    return(
        <div className={md.background}>
            {!loading ?
            <div>
              <div className={md.mainContentOrangeCap}>
             <div className={md.parentMiddle}>
               <p className={md.parentMiddleTop}>Batter</p>
               <p className={md.parentMiddleTop}>R</p>
               <p className={md.parentMiddleTop}>B</p>
               <p className={md.parentMiddleTop}>4s</p>
               <p className={md.parentMiddleTop}>6s</p>
               <p className={md.parentMiddleTop}>SR</p>
               </div>
               {data.map((person,i) => {
                 return (
                    <div className={md.parentMiddle2}>
                       <div className={md.batsman}>
                       <p className={md.parentMiddleBottom}>{i+1}.  { person.name }</p>
                       </div> 
                       <p className={md.parentMiddleBottom}>{ person.runs}</p>
                       <p className={md.parentMiddleBottom}>{ person.ballsPlayed}</p>
                       <p className={md.parentMiddleBottom}>{ person.fours}</p>
                       <p className={md.parentMiddleBottom}>{ person.sixes}</p>
                       <p className={md.parentMiddleBottom}>{person.runs==0 ? 0 : ((person.runs/person.ballsPlayed)*100).toFixed(2)}</p>
                    </div>
                 )
               })};
                </div>
           </div>
            :<div>Loading...</div>}
        </div>
    )
}

export default OrangeCap;
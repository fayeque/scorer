import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {Link} from 'react-router-dom';
import handleEvent from "../utils/handleEvent";
import swapStrikers from "../utils/swapStrikers";
import fuzzySearch from "../utils/regEx";
import axios from 'axios';
import mps from "./MainPage.module.css";
import s from "./Navbar.module.css";

const PublicMainPage = ({data,setData,history,handleBowler,his,match}) => {

      const [loading,setLoading] = useState(true);

      useEffect(() => {
        const getData = async () => {
                const {data} = await axios.get(`/match/${match.params.matchId}`);
                console.log("dataa",data);
                setData(data.d.details);
                setLoading(false);
            }
            getData();
        
    },[]);

    const calculateRRR = (data) => {
        var overRemaining = data.overs - data[data.batting].overs - 1;
        if(data[data.batting].balls == 0){
            overRemaining += 1;
        }else{
            overRemaining = overRemaining + ((6-data[data.batting].balls)/10);
        }
        var MoreToWin = data.toWin + 1 - data[data.batting].runs;
        console.log(MoreToWin);
        console.log(overRemaining);
        return <h5>{(MoreToWin/overRemaining).toFixed(2)}</h5>
    }
      
    return (
        <div>
            {!loading ?
                <div className={mps.parent}>
    <section className={s.navbarSection}>
        <div className={s.parent}>
            <div className={s.left}>
            <h2><Link to="/public">{data.batting}</Link></h2>
            </div>
            <div className={s.right}>
            <h3 className={s.startMatch}>{data.bowling}</h3>
            </div>
        </div>
    </section> 

    <section className={mps.mainSection}>
       <div className="container">
           <div className={mps.parentSection}>
               <div className={mps.parentTop}>
                    <p id={mps.battingText}>{data.batting}</p>
                    <p>CRR</p>
                    <p>Target</p>
                    <p>RR</p>
                    <p id={mps.score}>{ data[data.batting].runs } - { data[data.batting].wickets } <span>({ data[data.batting].overs }.{ data[data.batting].balls })</span></p>
                    <p>{ (data[data.batting].runs / parseFloat(data[data.batting].overs + data[data.batting].balls/6)).toFixed(2) }</p>
                    <p>{!data.battingFirst ? <h5>{ data.toWin + 1 }</h5> : <h5>-</h5> }</p>
                    <p>{!data.battingFirst ? calculateRRR(data) : <h5>-</h5> }</p>
               </div>
               <p className={mps.toWin}> {!data.battingFirst ? <h5>{ data.batting } needs { data.toWin - data[data.batting].runs +1 } runs in { data.overs*6 -  data[data.batting].overs*6 - data.bowler.ballsDelivered } balls </h5> : "First Inning" }</p>
           </div>
           <div className={mps.parentMiddle}>
               <p className={mps.parentMiddleTop}>Batter</p>
               <p className={mps.parentMiddleTop}>R</p>
               <p className={mps.parentMiddleTop}>B</p>
               <p className={mps.parentMiddleTop}>4s</p>
               <p className={mps.parentMiddleTop}>6s</p>
               <p className={mps.parentMiddleTop}>SR</p>
               <p className={mps.parentMiddleBottom}>{ data.striker.name } *</p>
                <p className={mps.parentMiddleBottom}>{ data.striker.runs }</p>
                <p className={mps.parentMiddleBottom}>{ data.striker.balls }</p>
                <p className={mps.parentMiddleBottom}>{ data.striker.fours }</p>
                <p className={mps.parentMiddleBottom}>{ data.striker.sixes }</p>
                <p className={mps.parentMiddleBottom}>{data.striker.runs == 0 ? <p>0</p> :<p>{ ((data.striker.runs/data.striker.balls)*100).toFixed(2) }</p> }</p>
                <p className={mps.parentMiddleBottom}>{ data.nonStriker.name }</p>
                <p className={mps.parentMiddleBottom}>{ data.nonStriker.runs }</p>
                <p className={mps.parentMiddleBottom}>{ data.nonStriker.balls }</p>
                <p className={mps.parentMiddleBottom}>{ data.nonStriker.fours }</p>
                <p className={mps.parentMiddleBottom}>{ data.nonStriker.sixes }</p>
                <p className={mps.parentMiddleBottom}>{data.nonStriker.runs == 0 ? <p>0</p> :<p>{ ((data.nonStriker.runs/data.nonStriker.balls)*100).toFixed(2) }</p> }</p>
                <p className={mps.parentMiddleTop}>Bowler</p>
               <p className={mps.parentMiddleTop}>O</p>
               <p className={mps.parentMiddleTop}>R</p>
               <p className={mps.parentMiddleTop}>W</p>
               <p className={mps.parentMiddleTop}>ER</p>
               <p></p>
               <p className={mps.parentMiddleBottom}>{ data.bowler.name }</p>
                <p className={mps.parentMiddleBottom}>{ data.bowler.overs + data.bowler.ballsDelivered/10 }</p>
                <p className={mps.parentMiddleBottom}>{ data.bowler.runsGiven }</p>
                <p className={mps.parentMiddleBottom}>{ data.bowler.wicket }</p>
                <p className={mps.parentMiddleBottom}>{data.bowler.runsGiven == 0 ? <p>0</p> :  <p>{ ((data.bowler.runsGiven)/(data.bowler.overs + data.bowler.ballsDelivered/6)).toFixed(1) }</p> }</p>
           </div>
           <div className={mps.section3}>
                          <p>This over:</p>
                            <div className={mps.timeline}>
                                {data.bowler.timeline.map((t) => {
                              return (<div className={mps.timelineBowl}>
                                  <p>{ t.runs }{ t.extra }</p>
                              </div>
                              )
                                }) }
                            </div>
            </div>
       </div>
    </section>
                </div>
            :<div>Loading...</div>
        }
       </div>
    )
}

export default PublicMainPage;
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import am from "./Allmatches.module.css";

const Allmatches = (props) => {
    const [matches,setMatches] = useState([]);
    useEffect(() => {
        if(localStorage.getItem('data')){
        var d=JSON.parse(localStorage.getItem('matchId'));
        var mtch = JSON.parse(localStorage.getItem('data'));
        var m=d.map((dt) => {
            console.log(mtch[dt]);
            if(mtch[dt]){
            return {match:mtch[dt],id:dt};
            }
        })
        console.log(m);
        setMatches([...m]);
    }
    },[]);
    const onCLick = (e,id) => {
        props.history.push(`/matchDetails/${id}`);
    }
    const resumeGame = (e,id) => {
        props.history.push(`/mainPage/${id}`);
    }
    return(
        <div className={am.bottom}>
            {matches.length > 0 && matches.map((mId,i) => {
                return (<div key={Math.floor(Math.random()*1000)} className={am.section1}>
                    {/* {console.log(mId.match[mId.match.bowling])} */}
                    {/* {console.log(mId.match[mId.match.bowling].batsmans.length)} */}
                    <h6>{mId.match.date.split('T')[0]}</h6>
                    <div style={{display:'flex',justifyContent:'space-between'}}><div>{mId.match.batting}</div> <div style={{display:'flex'}}> <h4>{mId.match[mId.match.batting].runs}/{mId.match[mId.match.batting].wickets}</h4> <h5>({mId.match[mId.match.batting].overs}.{mId.match[mId.match.batting].balls})</h5></div></div>
                    <div style={{display:'flex',justifyContent:'space-between',marginTop:'10px'}}><div>{mId.match.bowling}</div> <div style={{display:'flex'}}> <h4>{mId.match[mId.match.bowling].runs}/{mId.match[mId.match.bowling].wickets}</h4> <h5>({mId.match[mId.match.bowling].overs}.{mId.match[mId.match.bowling].balls})</h5></div></div>
                    {!mId.match.gameOver && !mId.match.battingFirst ? <h6 style={{marginTop:'10px'}}>
                        {mId.match.batting} needs {mId.match.toWin - mId.match[mId.match.batting].runs +1} runs in {mId.match.overs*6 -  mId.match[mId.match.batting].overs*6 - mId.match.bowler.ballsDelivered} balls
                    </h6> : ""}
                    <div style={{display:'flex',marginTop:'15px',justifyContent:'space-around'}}>
                    <h6 style={{cursor:'pointer'}} onClick={(e) => onCLick(e,mId.id)} key={i}>
                        View Scorecard
                    </h6>
                    {!mId.match.gameOver ? <h6 style={{cursor:'pointer'}} onClick={(e) => resumeGame(e,mId.id)} key={i}>
                        Resume
                    </h6> : "" }
                    </div>
                </div>
                )
            })
        }
        </div>
    )
}

export default Allmatches;
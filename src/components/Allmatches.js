import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Route, Redirect } from 'react-router';
// import s from "./Navbar.module.css";
import am from "./Allmatches.module.css";

const Allmatches = (props) => {
    const [matches,setMatches] = useState([]);
    useEffect(() => {
        if(localStorage.getItem('privelage') == null || localStorage.getItem('privelage') != 'tarbangla'){
            console.log('redirect to public');
            props.history.push("/public");
        }
        else{
        if(localStorage.getItem('data') != null){
        var d=JSON.parse(localStorage.getItem('matchId'));
        var mtch = JSON.parse(localStorage.getItem('data'));
        d.reverse();
        var m=d.map((dt) => {
            console.log(mtch[dt]);
            if(mtch[dt]){
            return {match:mtch[dt],id:dt};
            }
        })
        console.log(m);
        setMatches([...m]);
    }
}
    },[]);
    const onCLick = (e,id) => {
        props.history.push(`/matchDetails/${id}`);
    }
    const resumeGame = (e,id) => {
        props.history.push(`/mainPage/${id}`);
    }
    return(
        <div>
        <section className={am.allMatchSection}>
            {matches.length > 0  && matches.map((mId,i) => {
                return (
                    <div className={i%2==0 ? am.superParentBlack : am.superParentMaroon}>
                    <p className={am.date}>{mId.match.date.split("T")[0]}</p>
                    <div key={Math.floor(Math.random()*100000)} className={am.parent}>
                    <div className={am.left}>
                        <p>{mId.match.batting}</p>
                        <p>{mId.match[mId.match.batting].runs}/{mId.match[mId.match.batting].wickets} ({mId.match[mId.match.batting].overs}.{mId.match[mId.match.batting].balls})</p>
                    </div>
                    <div className={am.right}>
                        <p>{mId.match.bowling}</p>
                        <p>{mId.match[mId.match.bowling].runs}/{mId.match[mId.match.bowling].wickets} ({mId.match[mId.match.bowling].overs}.{mId.match[mId.match.bowling].balls})</p>
                    </div>
                    </div>
                    {!mId.match.gameOver && !mId.match.battingFirst ? <p className={am.toWin}>
                     {mId.match.batting} needs {mId.match.toWin - mId.match[mId.match.batting].runs +1} runs in {mId.match.overs*6 -  mId.match[mId.match.batting].overs*6 - mId.match.bowler.ballsDelivered} balls
                     </p> : ( mId.match.gameOver ? <p className={am.toWin}>{mId.match.winner}  wins</p>:<p className={am.toWin}>First inning is in progress</p>)}
                     <div className={am.bottom}>
                     <p onClick={(e) => onCLick(e,mId.id)} key={i}>
                        View Scorecard
                    </p>
                    {!mId.match.gameOver ? <p  onClick={(e) => resumeGame(e,mId.id)} key={i}>
                        Resume
                    </p> : "" }
                    </div>
                     </div>
                )
            })}
        
    </section>  
        </div>
    )
}

export default Allmatches;
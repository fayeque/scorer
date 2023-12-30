import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import s from "./Navbar.module.css";
import am from "./Allmatches.module.css";
import axios from "axios";

const PublicAllMatches = (props) => {
    const [matches,setMatches] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const getData = async () => {
    //     if(localStorage.getItem('data')){
    //     var d=JSON.parse(localStorage.getItem('matchId'));
    //     var mtch = JSON.parse(localStorage.getItem('data'));
    //     var m=d.map((dt) => {
    //         // console.log(mtch[dt]);
    //         if(mtch[dt]){
    //         return {match:mtch[dt],id:dt};
    //         }
    //     })
    //     console.log(m);
    //     setMatches([...m]);
    // }
        const {data} = await axios.get("/m");
        console.log("dataa",data);
        setMatches(data.matches);
    }

    getData();
        
    },[]);
    const onCLick = (e,id) => {
        navigate(`/public/matchDetails/${id}`);
    }
    const resumeGame = (e,id) => {
        navigate(`/public/mainPage/${id}`);
    }
    return(
        <div>
        <section className={am.allMatchSection}>
            {matches.length > 0  && matches.map((mId,i) => {
                {console.log(mId)}
                return (
                    <div className={i%2==0 ? am.superParentBlack : am.superParentMaroon}>
                    <p className={am.date}>{mId.details.date.split("T")[0]}</p>
                    <div key={Math.floor(Math.random()*1000)} className={am.parent}>
                    <div className={am.left}>
                        <p>{mId.details.bowling}</p>
                        <p>{mId.details[mId.details.bowling].runs}/{mId.details[mId.details.bowling].wickets} ({mId.details[mId.details.bowling].overs}.{mId.details[mId.details.bowling].balls})</p>
                    </div>
                    <div className={am.right}>
                        <p>{mId.details.batting}</p>
                        <p>{mId.details[mId.details.batting].runs}/{mId.details[mId.details.batting].wickets} ({mId.details[mId.details.batting].overs}.{mId.details[mId.details.batting].balls})</p>
                    </div>
                    </div>
                     {!mId.details.gameOver && !mId.details.battingFirst ? <p className={am.toWin}>
                     {mId.details.batting} needs {mId.details.toWin - mId.details[mId.details.batting].runs +1} runs in {mId.details.overs*6 -  mId.details[mId.details.batting].overs*6 - mId.details.bowler.ballsDelivered} balls
                     </p> : ( mId.details.gameOver ? <p className={am.toWin}>{mId.details.winner}  wins</p>:<p className={am.toWin}>First inning is in progress</p>)}
                     <div className={am.bottom}>
                     <p onClick={(e) => onCLick(e,mId.matchId)} key={i}>
                        View Scorecard
                    </p>
                    {!mId.details.gameOver ? <p  onClick={(e) => resumeGame(e,mId.matchId)} key={i}>
                        Live score
                    </p> : "" }
                    </div>
                     </div>
                )
            })}
            <div className={am.bottom} >
                    <button className={am.privelage} onClick={(e) => navigate(`/adminSignin`)}>
                        Sign in as Admin
                    </button>
                   
            </div>
    </section>  
        </div>
    )
}

export default PublicAllMatches;
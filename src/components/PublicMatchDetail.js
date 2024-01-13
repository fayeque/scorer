import React from "react";
import { useState } from "react";
import { useEffect,useRef } from "react";
import md from "./MatchDetails.module.css"
import mps from "./MainPage.module.css"
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

const PublicMatchDetails = (props) => {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [show1,setShow1]= useState(false);
    const [show2,setShow2] = useState(true);
    const {matchId} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
          try{
                const {data} = await axios.get(`/match/scorecard/${matchId}`);
                console.log("dataa",data);
                setData(data.data);
                setLoading(false);
          }catch(error){
            navigate("/");
          }
            }
            
            getData();
        
    },[]);



    const showSlide = () => {
      setShow1(!show1);
      // setShow2(!show2);
    }

    const showSlide2 = () => {
      // setShow1(!show1);
      setShow2(!show2);
    }

    return(
        <div>
            {!loading ?
            <div>
              <div onClick={() => {showSlide()}} className={md.top}>
                    <p>{data.bowling}</p>
                    <p>{data[data.bowling].runs}/{data[data.bowling].wickets} ({data[data.bowling].overs + "." + data[data.bowling].balls})</p>
              </div>
              {show1 ?
            <div className={md.mainContent} >
               <div className={md.parentMiddle}>
               <p className={md.parentMiddleTop}>Batter</p>
               <p className={md.parentMiddleTop}>R</p>
               <p className={md.parentMiddleTop}>B</p>
               <p className={md.parentMiddleTop}>4s</p>
               <p className={md.parentMiddleTop}>6s</p>
               <p className={md.parentMiddleTop}>SR</p>
               </div>
               {data[data.bowling].batsmans.map((person,i) => {
                if(person.name==""){
                      return "";
                }
                 return (
                   <div className={md.parentMiddle}>
                       <div className={md.batsman}>
                       <p className={md.parentMiddleBottom}>{ person.name }</p>
                       {person.notout ? <p className={md.parentMiddleBottomOutBy}>Not out</p> : <div>{person.runOut ? <p className={md.parentMiddleBottomOutBy}>Runout</p> : <p className={md.parentMiddleBottomOutBy}>b {person.outBy}</p>}</div>}
                       </div>
                       
                       <p className={md.parentMiddleBottom}>{ person.runs}</p>
                       <p className={md.parentMiddleBottom}>{ person.balls}</p>
                       <p className={md.parentMiddleBottom}>{ person.fours}</p>
                       <p className={md.parentMiddleBottom}>{ person.sixes}</p>
                       <p className={md.parentMiddleBottom}>{person.runs==0 ? 0 : ((person.runs/person.balls)*100).toFixed(2)}</p>
                    </div>
                 )
               })};
               <div className={md.parentMiddle}>
               <p className={mps.parentMiddleTop}>Bowler</p>
               <p className={mps.parentMiddleTop}>O</p>
               <p className={mps.parentMiddleTop}>R</p>
               <p className={mps.parentMiddleTop}>W</p>
               <p className={mps.parentMiddleTop}>ER</p>
               </div>
              
               {data[data.batting].bowlers.map((person,i) => {
                 if(person.name==""){
                   return "";
                 }
                   return (
                   <div className={md.parentMiddle}>
                      <p className={md.parentMiddleBottom}>{ person.name }</p>
                      <p className={md.parentMiddleBottom}>{person.overs}.{person.ballsDelivered}</p>
                      <p className={md.parentMiddleBottom}>{person.runsGiven}</p>
                      <p className={md.parentMiddleBottom}>{person.wicket}</p>
                      <p className={md.parentMiddleBottom}>{person.runsGiven == 0 ? 0 : (parseInt(person.runsGiven)/(parseInt(person.overs) + parseInt(person.ballsDelivered)/6)).toFixed(1)}</p>
                    </div>
                   )
               })};
              </div>
         : '' }
               <div onClick={() => {showSlide2()}} className={md.top}>
                    <p>{data.batting}</p>
                    <p>{data[data.batting].runs}/{data[data.batting].wickets} ({data[data.batting].overs + "." + data[data.batting].balls})</p>
                    {/* <p >Show</p> */}
              </div>
              {show2 ?
              <div className={md.mainContent2}>
             <div className={md.parentMiddle}>
               <p className={md.parentMiddleTop}>Batter</p>
               <p className={md.parentMiddleTop}>R</p>
               <p className={md.parentMiddleTop}>B</p>
               <p className={md.parentMiddleTop}>4s</p>
               <p className={md.parentMiddleTop}>6s</p>
               <p className={md.parentMiddleTop}>SR</p>
               </div>
               {data[data.batting].batsmans.map((person,i) => {
                if(person.name==""){
                      return "";
                 }
                 return (
                   <div className={md.parentMiddle}>
                       <div className={md.batsman}>
                       <p className={md.parentMiddleBottom}>{ person.name }</p>
                       {person.notout ? <p className={md.parentMiddleBottomOutBy}>Not out</p> : <div>{person.runOut ? <p className={md.parentMiddleBottomOutBy}>Runout</p> : <p className={md.parentMiddleBottomOutBy}>b {person.outBy}</p>}</div>}
                       </div>
                       <p className={md.parentMiddleBottom}>{ person.runs}</p>
                       <p className={md.parentMiddleBottom}>{ person.balls}</p>
                       <p className={md.parentMiddleBottom}>{ person.fours}</p>
                       <p className={md.parentMiddleBottom}>{ person.sixes}</p>
                       <p className={md.parentMiddleBottom}>{person.runs==0 ? 0 : ((person.runs/person.balls)*100).toFixed(2)}</p>
                    </div>
                 )
               })};
               <div className={md.parentMiddle}>
               <p className={mps.parentMiddleTop}>Bowler</p>
               <p className={mps.parentMiddleTop}>O</p>
               <p className={mps.parentMiddleTop}>R</p>
               <p className={mps.parentMiddleTop}>W</p>
               <p className={mps.parentMiddleTop}>ER</p>
               </div>
               {data[data.bowling].bowlers.map((person,i) => {
                 if(person.name==""){
                   return "";
                 }
                   return (
                   <div className={md.parentMiddle}>
                      <p className={md.parentMiddleBottom}>{ person.name }</p>
                      <p className={md.parentMiddleBottom}>{person.overs}.{person.ballsDelivered}</p>
                      <p className={md.parentMiddleBottom}>{person.runsGiven}</p>
                      <p className={md.parentMiddleBottom}>{person.wicket}</p>
                      <p className={md.parentMiddleBottom}>{person.runsGiven == 0 ? 0 : (parseInt(person.runsGiven)/(parseInt(person.overs) + parseInt(person.ballsDelivered)/6)).toFixed(1)}</p>
                    </div>
                   )
               })};
                </div>
                : ''}
           </div>
            :<div>Loading...</div>}
        </div>
    )
}

export default PublicMatchDetails;
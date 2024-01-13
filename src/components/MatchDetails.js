import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import md from "./MatchDetails.module.css"
import mps from "./MainPage.module.css";
import axios from "axios";

const MatchDetails = (props) => {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [tname,setTName] = useState('');
    const { matchId } = useParams();
    const navigate = useNavigate();
    // useEffect(() => {
    //     var d=JSON.parse(localStorage.getItem('data'));
    //     var currentMatch = d[matchId];
    //     setData(currentMatch);
    //     setLoading(false)
    // },[])
    useEffect(() => {
        const getData = async () => {
          try{
                const {data} = await axios.get(`/match/scorecard/${matchId}`);
                console.log("dataa",data);
                setData(data.data);
                setLoading(false);
          }
          catch(error){
            navigate("/");
          }
            }
            getData();
        
    },[])

    const onChange= (person,e) => {
      console.log(e.target.name.split("-"));
      var tarr= e.target.name.split("-");
      tarr.forEach((tar,i) => {
        person[tar]=e.target.value.split(".")[i];
      })
      setData({...data});
      var d=JSON.parse(localStorage.getItem('data'));
      d[matchId] = data;
      localStorage.setItem('data',JSON.stringify(d));
    }

    const onChangeTName = (e) => {
      setTName(e.target.value);
    }

    const updateData = async (e) => {
      const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify(data);
    console.log(`/match/${matchId}`);
    await axios.post(`/match/${matchId}`,body,config);
    navigate("/");
    }

    const handleClick = async (e) => {
      const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    data['tournament']= tname;
    console.log('tname here is ' , tname);
    console.log(data);
    const body = JSON.stringify(data);
    await axios.post("/generateReport",body,config);
    navigate("/");
    }

    const handleReverse = async (e) => {
      const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    data['tournament']= tname;
    const body = JSON.stringify(data);
    await axios.post("/reverseGeneratedReport",body,config);
    navigate("/");
    }
    console.log(data);
    return(
        <div>
            {!loading ?
            <div>
              <div className={md.top}>
                    <p>{data.batting}</p>
                    <p>{data[data.batting].runs}/{data[data.batting].wickets} ({data[data.batting].overs + "." + data[data.batting].balls})</p>
                    <p>Show</p>
              </div>
              <div className={md.mainContent}>
             <div className={md.parentMiddle}>
               <p className={md.parentMiddleTop}>Batter</p>
               <p className={md.parentMiddleTop}>R</p>
               <p className={md.parentMiddleTop}>B</p>
               <p className={md.parentMiddleTop}>4s</p>
               <p className={md.parentMiddleTop}>6s</p>
               <p className={md.parentMiddleTop}>SR</p>
               </div>
               {data[data.batting].batsmans.map((person,i) => {
                  // if(person.name==""){
                  //     return "";
                  // }
                 return (
                   <div className={md.parentMiddle}>
                       <div className={md.batsman}>
                       <input
                       className={md.ctaForm}
                        value={person.name} 
                        onChange={(e) => onChange(person,e)}
                        id="email-address"
                        name="name"
                        type="String"
                />
                    {/* <input className={md.parentMiddleBottom}>{ person.name }></input> */}
                       {person.notout ? <p className={md.parentMiddleBottomOutBy}>Not out</p> : <div>{person.runOut ? <p className={md.parentMiddleBottomOutBy}>Runout</p> : <p className={md.parentMiddleBottomOutBy}>b {person.outBy}</p>}</div>}
                       </div>
                       <input
                       className={md.ctaForm}
                        value={person.runs} 
                        onChange={(e) => onChange(person,e)}
                        id="email-address"
                        name="runs"
                        type="String"
                />
                       {/* <p className={md.parentMiddleBottom}>{ person.runs}</p> */}

                       {/* <p className={md.parentMiddleBottom}>{ person.balls}</p> */}
                       <input
                       className={md.ctaForm}
                        value={person.balls} 
                        onChange={(e) => onChange(person,e)}
                        id="email-address"
                        name="balls"
                        type="String"
                />
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
                //  if(person.name==""){
                //    return "";
                //  }
                   return (
                   <div className={md.parentMiddle}>
                  <input
                       className={md.ctaForm}
                        value={person.name} 
                        onChange={(e) => onChange(person,e)}
                        id="email-address"
                        name="name"
                        type="String"
                />
                      {/* <p className={md.parentMiddleBottom}>{ person.name }</p> */}
                      <input
                       className={md.ctaForm}
                        value={`${person.overs}.${person.ballsDelivered}`} 
                        onChange={(e) => onChange(person,e)}
                        id="email-address"
                        name="overs-ballsDelivered"
                        type="String"
                />
                      {/* <p className={md.parentMiddleBottom}>{person.overs}.{person.ballsDelivered}</p> */}
                      <input
                       className={md.ctaForm}
                        value={person.runsGiven} 
                        onChange={(e) => onChange(person,e)}
                        id="email-address"
                        name="runsGiven"
                        type="String"
                />
                      {/* <p className={md.parentMiddleBottom}>{person.runsGiven}</p> */}
                      <input
                       className={md.ctaForm}
                        value={person.wicket} 
                        onChange={(e) => onChange(person,e)}
                        id="email-address"
                        name="wicket"
                        type="String"
                />
                      {/* <p className={md.parentMiddleBottom}>{person.wicket}</p> */}
                      <p className={md.parentMiddleBottom}>{person.runsGiven == 0 ? 0 : (parseInt(person.runsGiven)/(parseInt(person.overs) + parseInt(person.ballsDelivered)/6)).toFixed(1)}</p>
                    </div>
                   )
               })};
               </div>
               <div className={md.top}>
                    <p>{data.bowling}</p>
                    <p>{data[data.bowling].runs}/{data[data.bowling].wickets} ({data[data.bowling].overs + "." + data[data.bowling].balls})</p>
        
              </div>
              <div className={md.mainContent}>
             <div className={md.parentMiddle}>
               <p className={md.parentMiddleTop}>Batter</p>
               <p className={md.parentMiddleTop}>R</p>
               <p className={md.parentMiddleTop}>B</p>
               <p className={md.parentMiddleTop}>4s</p>
               <p className={md.parentMiddleTop}>6s</p>
               <p className={md.parentMiddleTop}>SR</p>
               </div>
               {data[data.bowling].batsmans.map((person,i) => {
                // if(person.name==""){
                //     return "";
                // }
                 return (
                   <div className={md.parentMiddle}>
                       <div className={md.batsman}>
                       <input
                       className={md.ctaForm}
                        value={person.name} 
                        onChange={(e) => onChange(person,e)}
                        id="email-address"
                        name="name"
                        type="String"
                />
                       {/* <p className={md.parentMiddleBottom}>{ person.name }</p> */}
                       {person.notout ? <p className={md.parentMiddleBottomOutBy}>Not out</p> : <div>{person.runOut ? <p className={md.parentMiddleBottomOutBy}>Runout</p> : <p className={md.parentMiddleBottomOutBy}>b {person.outBy}</p>}</div>}
                       </div>
                       <input
                       className={md.ctaForm}
                        value={person.runs} 
                        onChange={(e) => onChange(person,e)}
                        id="email-address"
                        name="runs"
                        type="String"
                />
                       {/* <p className={md.parentMiddleBottom}>{ person.runs}</p> */}
                  
                       {/* <p className={md.parentMiddleBottom}>{ person.balls}</p> */}
                       <input
                       className={md.ctaForm}
                        value={person.balls} 
                        onChange={(e) => onChange(person,e)}
                        id="email-address"
                        name="balls"
                        type="String"
                />
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
                //  if(person.name==""){
                //    return "";
                //  }
                   return (
                   <div className={md.parentMiddle}>
                  <input
                       className={md.ctaForm}
                        value={person.name} 
                        onChange={(e) => onChange(person,e)}
                        id="email-address"
                        name="name"
                        type="String"
                />
                      {/* <p className={md.parentMiddleBottom}>{ person.name }</p> */}
                      <input
                       className={md.ctaForm}
                        value={`${person.overs}.${person.ballsDelivered}`} 
                        onChange={(e) => onChange(person,e)}
                        id="email-address"
                        name="overs-ballsDelivered"
                        type="String"
                />
                      {/* <p className={md.parentMiddleBottom}>{person.overs}.{person.ballsDelivered}</p> */}
                      <input
                       className={md.ctaForm}
                        value={person.runsGiven} 
                        onChange={(e) => onChange(person,e)}
                        id="email-address"
                        name="runsGiven"
                        type="String"
                />
                      {/* <p className={md.parentMiddleBottom}>{person.runsGiven}</p> */}
                      <input
                       className={md.ctaForm}
                        value={person.wicket} 
                        onChange={(e) => onChange(person,e)}
                        id="email-address"
                        name="wicket"
                        type="String"
                />



                      {/* <p className={md.parentMiddleBottom}>{person.overs}.{person.ballsDelivered}</p>
                      <p className={md.parentMiddleBottom}>{person.runsGiven}</p>
                      <p className={md.parentMiddleBottom}>{person.wicket}</p> */}
                      <p className={md.parentMiddleBottom}>{person.runsGiven == 0 ? 0 : (parseInt(person.runsGiven)/(parseInt(person.overs) + parseInt(person.ballsDelivered)/6)).toFixed(1)}</p>
                    </div>
                   )
               })};
              <div className={md.parentMiddle}>
              {/* <p className={md.parentMiddleBottom}> Tournament name </p> */}
                  <input
                       className={md.ctaForm}
                        value={tname} 
                        onChange={(e) => onChangeTName(e)}
                        id="tournament"
                        name="tournament"
                        type="String"
                />
                </div>

              <div className={md.updation}>

                <button className={md.updationButton} onClick={(e) => handleClick(e) }>Generate Report</button>
                <button className={md.updationButton}  onClick={(e) => updateData(e) }>Update</button>
                <button className={md.updationButton} onClick={(e) => handleReverse(e) }>Reverse</button>
                </div>
                </div>

           </div>
            :<div>Loading...</div>}
        </div>
    )
}

export default MatchDetails;
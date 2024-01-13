import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import md from "./MatchDetails.module.css"
import mps from "./MainPage.module.css"
import axios from "axios";

const PurpleCap = (props) => {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [tournamentsData,setTournamentsData]=useState(null);
    const [getTournamentData,setgetTournamentData] = useState(null);

    useEffect(() => {
        const getData = async () => {
                const {data} = await axios.get("/bowlingTournaments");
                console.log("dataa",data);
                var obj={};
                data.data.forEach(element => {
                  obj[element.tournament] = [];
                });
                console.log('obj here is ',obj);
                const trnm=data.data[0].tournament;
                console.log('trnm here is ', trnm);
                const output = await axios.get(`/purpleCap/${trnm}`);
                console.log('output.data.dats here is ',output.data.data);
                obj[trnm] = output.data.data;
                setTournamentsData(obj);
                setgetTournamentData(trnm);
                setLoading(false);
            }
            getData();
        
    },[]);

    useEffect(() => {
      const getTrmntData = async () => {
        if(tournamentsData && tournamentsData[getTournamentData] && tournamentsData[getTournamentData].length == 0){
          const output = await axios.get(`/purpleCap/${getTournamentData}`);
          console.log('output.data.data here in getTrmntData is ',output.data.data);
          tournamentsData[getTournamentData]= output.data.data;
          console.log('tournamentsData[getTournamentData] here in getTrmntData is ',tournamentsData[getTournamentData]);
          setTournamentsData({...tournamentsData});
        }
      }
      getTrmntData();
    },[getTournamentData]);

    const showSlide = (trm) => {
      setgetTournamentData(trm);
      // setShow2(!show2);
    }


    // console.log(data);

    console.log('tournamensDtaa here is ' , tournamentsData);
    console.log('getTournament here is ' , getTournamentData);

    const getOrangeCapList = (k) => {
      console.log('key here is ',k);
     if(k==getTournamentData)  return (
        <div>
              <div className={md.mainContentOrangeCap}>
             <div className={md.parentMiddle}>
               <p className={mps.parentMiddleTop2}>Bowler</p>
               <p className={mps.parentMiddleTop2}>O</p>
               <p className={mps.parentMiddleTop2}>R</p>
               <p className={mps.parentMiddleTop2}>W</p>
               <p className={mps.parentMiddleTop2}>ER</p>
               </div>
               {tournamentsData[getTournamentData].map((person,i) => {
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
      )
    }

    const getTournaments = () => {
      return Object.keys(tournamentsData).map((key) => {
        console.log(key);
         return (
          <div>
          <div onClick={() => {showSlide(key)}} className={md.top2}>
                    <p>{key}</p>
                    {/* <div><FontAwesomeIcon icon="fa-solid fa-angle-down" /></div> */}
          </div>
                    <div>
                    {getOrangeCapList(key)}
                    </div>
          </div>
         )
      });
    }
    
    return(
        <div className={md.background}>
            {!loading ?
              getTournaments()
            :<div>Loading...</div>}
        </div>
    )
}

export default PurpleCap;
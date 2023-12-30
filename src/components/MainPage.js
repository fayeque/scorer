import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {Link,useNavigate,useParams} from 'react-router-dom';
import handleEvent from "../utils/handleEvent";
import swapStrikers from "../utils/swapStrikers";
import fuzzySearch from "../utils/regEx";
import axios from 'axios';
import mps from "./MainPage.module.css";
import s from "./Navbar.module.css";
import fd from "./FirstDetail.module.css";

const MainPage = ({data,setData,history,handleBowler,his,match}) => {

    const [extra,setExtra] = useState({
        wide:false,
        noBall:false,
        legBye:false,
        wicket:false,
        declared:false,
        declareBowler:false
    });

    const  [formData,setformData] = useState({
        striker:'',
        nonStriker:'',
        bowler:''
      });
      const {bowler} = formData;

      const [loading,setLoading] = useState(true);

      const { matchId } = useParams();
      const navigate = useNavigate();
      
    useEffect(() => {
    if(localStorage.getItem('data')){
    var d=JSON.parse(localStorage.getItem('data'));
    var currentData = d[matchId];
    if(currentData){
    console.log("currentData",currentData);
    data={...currentData};
    if(currentData.bowler.name==''){
        console.log("No bowler found");
        navigate(`/newBowler/${matchId}`);
    }
    setData(data);
    }
}
    setLoading(false);
    },[])

    const handleDeclaredBowler = () => {
        setExtra({...extra,declareBowler:true});
        data[data.bowling].bowlers.push(data.bowler);
        his.push(JSON.parse(JSON.stringify(data)));
        data.bowler={name:"",runsGiven:0,ballsDelivered:0,overs:0,economy:0,wicket:0,timeline:[]};
        console.log(his);
        navigate(`/newBowler/${matchId}`);
    }

    const handleOut = (e) => {
        if(e.target.value == "Yes"){
            handleOver();
            navigate(`/firstDetail/${matchId}`);
        }
    }

    const handleGameOver = (e) => {
        if(e.target.value == "Yes"){
            gameOver();
            navigate(`/matchSummary/${matchId}`);
        }
    }
    const handleEven = (val) => {
        handleEvent(extra,data,val,navigate,his,handleBowler,matchId);
    // bug fix 11_nov_22
        if(data[data.batting].balls == 0 && (!extra.wide && !extra.noBall && !extra.legBye)){
            swapStrikers(data);
        }
        var d=JSON.parse(localStorage.getItem('data'));
        d[matchId]=data;
        console.log(d);
        localStorage.setItem('data',JSON.stringify(d));
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify(data);
        axios.post(`/match/${matchId}`,body,config);
        //  axios.post("http://localhost:5000/generateReport",body,config);
        setData({...data});
        setExtra({...extra,wide:false,noBall:false,legBye:false,wicket:false});
        console.log(his);
        }

    const handleOdd = (val) => {
        handleEvent(extra,data,val,navigate,his,handleBowler,matchId);
        if(!extra.wicket && !data[data.batting].balls == 0){
            swapStrikers(data)
        }
        if(data[data.batting].balls == 0  && (extra.wide || extra.noBall || extra.legBye)){
            swapStrikers(data);
        }
        var d=JSON.parse(localStorage.getItem('data'));
        d[matchId]=data;
        console.log(d);
        localStorage.setItem('data',JSON.stringify(d));
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify(data);
        axios.post(`/match/${matchId}`,body,config);
        setData({...data});
        setExtra({...extra,wide:false,noBall:false,legBye:false,wicket:false});
        console.log(his);
    }

    const handleClick = (e) => {
        console.log(e.target.innerText);
        switch(e.target.innerText){
            case '0':
                handleEven(parseInt(e.target.innerText));
                break;
            case '1':
                handleOdd(parseInt(e.target.innerText));
                break;
            case '2':
                handleEven(parseInt(e.target.innerText));
                break;
            case '3':
                handleOdd(parseInt(e.target.innerText));
                break;
            case '4':
                handleEven(parseInt(e.target.innerText));
                break;
            case '5':
                handleOdd(parseInt(e.target.innerText));
                break;
            case '6':
                handleEven(parseInt(e.target.innerText));
                break;
        }
    }

    const swapBatsman = () => {
        var temp = data.striker;
        data.striker=data.nonStriker;
        data.nonStriker=temp;
        his.pop();
        his.push(JSON.parse(JSON.stringify(data)));
        var d=JSON.parse(localStorage.getItem('data'));
        d[matchId]=data;
        console.log(d);
        localStorage.setItem('data',JSON.stringify(d));
        setData({...data});
    }

    const handleWide = () => {
        setExtra({...extra,wide:!extra.wide});
    }

    const handleNoBall =() => {
        setExtra({...extra,noBall:!extra.noBall});
    }
    const handleLegBye = () => {
        setExtra({...extra,legBye:!extra.legBye});
    }
    const handleWicket = () => {
        setExtra({...extra,wicket:!extra.wicket});
    }

    const handleDeclared = () => {
        navigate(`/declaredPage/${matchId}`);
    }
    const undo = () => {
        his.pop();
        console.log(his);
        if(his.length == 0){
            return 0;
        }else{
        var obj=his[his.length - 1];
        setData(obj);
        }
        // setData(his[his.length - 1]);
    }
    const onChange = (e) => {
        setformData({...formData,[e.target.name]:e.target.value});
        data.striker.name = e.target.value;
    }

    const onChange2 = (e) => {
        setformData({...formData,[e.target.name]:e.target.value});
        data.nonStriker.name = e.target.value;
    }

    const handleOver = (e) => {
        data[data.batting].batsmans.push(data.striker);
        data[data.batting].batsmans.push(data.nonStriker);
        if(data.bowler.name != " "){
            data[data.bowling].bowlers.push(data.bowler);
          }
        data[data.batting].balls = data.bowler.ballsDelivered;
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify(data);
        axios.post(`/match/${matchId}`,body,config);
        // data.striker={name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false};
        // data.nonStriker={name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false};
        setData({...data,battingFirst:false,toWin:data[data.batting].runs,overs:data.bowler.ballsDelivered > 0 ? (data[data.batting].overs+1):(data[data.batting].overs),batting:data.bowling,bowling:data.batting,bowler:{name:"",runsGiven:0,ballsDelivered:0,overs:0,economy:0,wicket:0,timeline:[]},striker:{name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false},
        nonStriker:{name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}});
        navigate(`/firstDetail/${matchId}`);
    }
    const gameOver = async (e) => {
        data[data.batting].batsmans.push(data.striker);
        data[data.batting].batsmans.push(data.nonStriker);
        if(data.bowler.name != " "){
            data[data.bowling].bowlers.push(data.bowler);
          }
        data[data.batting].balls = data.bowler.ballsDelivered;
        data.gameOver=true;
        data.striker={name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0};
        data.nonStriker={name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0};
        data.bowler={name:"",runsGiven:0,ballsDelivered:0,overs:0,economy:0,wicket:0,timeline:[]};
        if(data[data.batting].runs > data[data.bowling].runs){
            data.winner=data.batting;
        }
        else if(data[data.batting].runs == data[data.bowling].runs){
            data.winner='Draw';
        }else{
            data.winner=data.bowling;
        }
        var d=JSON.parse(localStorage.getItem('data'));
        d[matchId]=data;
        console.log(d);
        localStorage.setItem('data',JSON.stringify(d));
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify(data);
        await axios.post(`/match/${matchId}`,body,config);
        // await axios.post("http://localhost:5000/generateReport",body,config);

        setData({...data,battingFirst:false,toWin:data[data.batting].runs,overs:data.bowler.ballsDelivered >= 0 ? (data[data.batting].overs+1):(data[data.batting].overs),batting:data.bowling,bowling:data.batting,bowler:{name:"",runsGiven:0,ballsDelivered:0,overs:0,economy:0,wicket:0,timeline:[]},striker:{name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
        ,nonStriker:{name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}});
        navigate(`/matchSummary/${matchId}`);
        // console.log(data);
    }
    const checkValid = () => {
        if(data.striker.name == ''){
            navigate(`/secondInningsFirstDetails/${matchId}`)
        }
    }
    console.log(data);

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
                    {checkValid()}
    <section className={s.navbarSection}>
        <div className={s.parent}>
            <div className={s.left}>
            <h2><Link to="/">{data.batting}</Link></h2>
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
            <div className={mps.bottom}>
                 <div className={mps.bottomLeft}>
                    <button onClick = {(e) => swapBatsman()} id={mps.btnBottom} className="btn">Swap</button>
                    <button onClick = {(e) => undo()} id={mps.btnBottom} className="btn">Undo</button>
                 </div>
                 <div className={mps.bottomRight}>
                                <div className={mps.bottomRightTop}>
                                <button className="btn" id={mps.btnRightBottom} onClick={(e) => handleClick(e) }><p>0</p></button>
                                <button className="btn" id={mps.btnRightBottom}  onClick={(e) => handleClick(e) }><p>1</p></button>
                                <button className="btn" id={mps.btnRightBottom}  onClick={(e) => handleClick(e) }><p>2</p></button>
                                <button className="btn" id={mps.btnRightBottom}  onClick={(e) => handleClick(e) }><p>3</p></button>
                                <button className="btn" id={mps.btnRightBottom}  onClick={(e) => handleClick(e) }><p>4</p></button>
                                <button className="btn" id={mps.btnRightBottom}  onClick={(e) => handleClick(e) }><p>5</p></button>
                                <button className="btn" id={mps.btnRightBottom}  onClick={(e) => handleClick(e) }><p>6</p></button>
                                </div>
                                <div className={mps.bottomRightBottom}>
                                    <label>
                                    <input
                                     type="checkbox"
                                     id={mps.extraDimension}
                                    checked={extra.wide}
                                    onChange={handleWide}
                                    />
                                    <p>Wide</p>
                                    </label >
                                    <label>
                                    <input
                                    type="checkbox"
                                    checked={extra.noBall}
                                    onChange={handleNoBall}
                                    />
                                    <p>No ball</p>
                                    </label>
                                    <label>
                                    <input
                                        type="checkbox"
                                        checked={extra.legBye}
                                        onChange={handleLegBye}
                                    />
                                    <p>Leg byes</p>
                                    </label>
                                    <label>
                                    <input
                                         type="checkbox"
                                        checked={extra.wicket}
                                        onChange={handleWicket}
                                    />
                                    <p>Wicket</p>
                                    </label>

                                    <label>
                                    <input
                                         type="checkbox"
                                        checked={extra.declared}
                                        onChange={handleDeclared}
                                    />
                                    <p>Declare</p>
                                    </label>

                                    <label>
                                    <input
                                         type="checkbox"
                                        checked={extra.declareBowler}
                                        onChange={handleDeclaredBowler}
                                    />
                                    <p>Declare Bowler</p>
                                    </label>

                                </div>

                 </div>
            </div>

            <div className={fd.ctaForm}>
            {data.battingFirst ?
            <div>
                <label for="batting team">Inning over?</label>
                <select
                onChange={(e) => {handleOut(e)}} >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
                
                </select>
            </div>
            :
            <div>
            <label for="batting team">Game Over?</label>
            <select
            onChange={(e) => {handleGameOver(e)}} >
            <option value="">Please Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            </select>
            </div>
            }
            {/* {data.battingFirst ? <button className="btn" onClick={handleOver}>Innings over</button>:<button className="btn" onClick={gameOver}>Game over</button>} */}
            </div>

       </div>
    </section>
                </div>
            :<div>Loading...</div>
        }
       </div>
    )
}

export default MainPage;
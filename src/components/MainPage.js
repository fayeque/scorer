import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import handleEvent from "../utils/handleEvent";
import swapStrikers from "../utils/swapStrikers";
import fuzzySearch from "../utils/regEx";
import axios from 'axios';
import mps from "./MainPage.module.css";

const MainPage = ({data,setData,history,handleBowler,his,match}) => {

    const [extra,setExtra] = useState({
        wide:false,
        noBall:false,
        legBye:false,
        wicket:false
    });

    const  [formData,setformData] = useState({
        striker:'',
        nonStriker:'',
        bowler:''
      });
      const {bowler} = formData;

      const [loading,setLoading] = useState(true);
      
    useEffect(() => {
    if(localStorage.getItem('data')){
    var d=JSON.parse(localStorage.getItem('data'));
    var currentData = d[match.params.matchId];
    if(currentData){
    console.log("currentData",currentData);
    data={...currentData};
    setData(data);
    }
}
    setLoading(false);
    },[])

    const handleEven = (val) => {
        handleEvent(extra,data,val,history,his,handleBowler,match.params.matchId);
        if(data.bowler.ballsDelivered == 0){
            swapStrikers(data);
        }
        var d=JSON.parse(localStorage.getItem('data'));
        d[match.params.matchId]=data;
        console.log(d);
        localStorage.setItem('data',JSON.stringify(d));
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify(data);
        axios.post(`/match/${match.params.matchId}`,body,config);
        setData({...data});
        setExtra({...extra,wide:false,noBall:false,legBye:false,wicket:false});
        console.log(his);
        }

    const handleOdd = (val) => {
        handleEvent(extra,data,val,history,his,handleBowler,match.params.matchId);
        if(!extra.wicket && !data.bowler.ballsDelivered == 0){
            swapStrikers(data)
        }
        var d=JSON.parse(localStorage.getItem('data'));
        d[match.params.matchId]=data;
        console.log(d);
        localStorage.setItem('data',JSON.stringify(d));
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify(data);
        axios.post(`/match/${match.params.matchId}`,body,config);
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
        d[match.params.matchId]=data;
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
        axios.post(`http://localhost:5000/match/${match.params.matchId}`,body,config);
        // data.striker={name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false};
        // data.nonStriker={name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false};
        setData({...data,battingFirst:false,toWin:data[data.batting].runs,overs:data.bowler.ballsDelivered > 0 ? (data[data.batting].overs+1):(data[data.batting].overs),batting:data.bowling,bowling:data.batting,bowler:{name:"",runsGiven:0,ballsDelivered:0,overs:0,economy:0,wicket:0,timeline:[]},striker:{name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false},
        nonStriker:{name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}});
        history.push(`/firstDetail/${match.params.matchId}`);
    }
    const gameOver = (e) => {
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
        d[match.params.matchId]=data;
        console.log(d);
        localStorage.setItem('data',JSON.stringify(d));
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify(data);
        axios.post(`http://localhost:5000/match/${match.params.matchId}`,body,config);
        setData({...data,battingFirst:false,toWin:data[data.batting].runs,overs:data.bowler.ballsDelivered >= 0 ? (data[data.batting].overs+1):(data[data.batting].overs),batting:data.bowling,bowling:data.batting,bowler:{name:"",runsGiven:0,ballsDelivered:0,overs:0,economy:0,wicket:0,timeline:[]},striker:{name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
        ,nonStriker:{name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}});
        history.push(`/matchSummary/${match.params.matchId}`);
        // console.log(data);
    }
    const checkValid = () => {
        if(data.striker.name == ''){
            history.push(`/secondInningsFirstDetails/${match.params.matchId}`)
        }
    }
    console.log(data);
    return (
        <div>
            {!loading ?
                <div className={mps.parent}>
                    {checkValid()}
                  <div className={mps.top}>
                      <div>
                      <p style={{marginLeft:'5px'}}>{ data.batting } vs { data.bowling }</p>
                      </div>
                  </div>
                  <div className={mps.bottom}>
                      <div className={mps.section1}>
                          <div className="tableSection1">
                              <table className="table1">
                                  <thead>
                                  <tr>
                                      <th>
                                          <h5>{ data.batting }</h5>
                                      </th>
                                      <th>
                                          <h5>CRR</h5>
                                      </th>
                                      <th>
                                          <h5>Target</h5>
                                      </th>
                                      <th>
                                          <h5>RR</h5>
                                      </th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr>
                                      <td style={{display:"flex"}}><h2>{ data[data.batting].runs } - { data[data.batting].wickets }</h2> <h6 style={{padding:'3px'}}>({ data[data.batting].overs }.{ data[data.batting].balls })</h6></td>
                                      <td><h5>{ (data[data.batting].runs / parseFloat(data[data.batting].overs + data[data.batting].balls/6)).toFixed(2) }</h5></td>
                                      <td>{!data.battingFirst ? <h5>{ data.toWin }</h5> : <h5>-</h5> } </td>       
                                      <td>{!data.battingFirst ? <h5>{ data.toWin }</h5> : <h5>-</h5> }</td>
                                  </tr>
                                  </tbody>
                              </table>
                              <div>
                                  {!data.battingFirst ? <h5>{ data.batting } needs { data.toWin - data[data.batting].runs +1 } runs in { data.overs*6 -  data[data.batting].overs*6 - data.bowler.ballsDelivered } balls </h5> : "" }
                              </div>
                          </div>
                      </div>
                      <div className={mps.section2}>
                          <table style={{height:'150px'}} className="table2">
                              <thead>
                              <tr>
                                  <th>
                                      <h5>Batsman</h5>
                                  </th>
                                  <th>
                                      <h5>R</h5>
                                  </th>
                                  <th>
                                      <h5>B</h5>
                                  </th>
                                  <th>
                                      <h5>4s</h5>
                                  </th>
                                  <th>
                                      <h5>6s</h5>
                                  </th>
                                  <th>
                                      <h5>SR</h5>
                                  </th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td><h4>{ data.striker.name } *</h4></td>
                                  <td><h4>{ data.striker.runs }</h4></td>
                                  <td><h4>{ data.striker.balls }</h4></td>
                                  <td><h4>{ data.striker.fours }</h4></td>
                                  <td><h4>{ data.striker.sixes }</h4></td>
                                  <td>{data.striker.runs == 0 ? <h4>0</h4> :<h4>{ ((data.striker.runs/data.striker.balls)*100).toFixed(2) }</h4> }</td>
                              </tr>
                              <tr>
                                  <td><h4>{ data.nonStriker.name }</h4></td>
                                  <td><h4>{ data.nonStriker.runs }</h4></td>
                                  <td><h4>{ data.nonStriker.balls }</h4></td>
                                  <td><h4>{ data.nonStriker.fours }</h4></td>
                                  <td><h4>{ data.nonStriker.sixes }</h4></td>
                                  <td>{data.nonStriker.runs == 0 ? <h4>0</h4> :  <h4>{ ((data.nonStriker.runs/data.nonStriker.balls)*100).toFixed(2) }</h4>}</td>
                              </tr>
                              <tr>
                                  <th>
                                      <h5>Bowler</h5>
                                  </th>
                                  <th>
                                      <h5>O</h5>
                                  </th>
                                  <th>
                                      <h5>R</h5>
                                  </th>
                                  <th>
                                      <h5>W</h5>
                                  </th>
                                  <th>
                                      <h5>ER</h5>
                                  </th>
                              </tr>
                              <tr>
                                  <td><h3>{ data.bowler.name }</h3></td>
                                  <td><h3>{ data.bowler.overs + data.bowler.ballsDelivered/10 }</h3></td>
                                  <td><h3>{ data.bowler.runsGiven }</h3></td>
                                  <td><h3>{ data.bowler.wicket }</h3></td>
                                  <td>{data.bowler.runsGiven == 0 ? <h3>0</h3> :  <h3>{ ((data.bowler.runsGiven)/(data.bowler.overs + data.bowler.ballsDelivered/6)).toFixed(1) }</h3> }</td>
                              </tr>
                              </tbody>
                          </table>
                      </div>
                      <div className={mps.section3}>
                          <h6>This over:</h6>
                            <div className={mps.timeline}>
                                {data.bowler.timeline.map((t) => {
                              return (<div className={mps.timeline_bowl}>
                                  <h6>{ t.runs }{ t.extra }</h6>
                              </div>
                              )
                                }) }
                            </div>
                        </div>
                        <div className={mps.section4}>
                            <div className={mps.left_div}>
                                <div className={mps.swapDiv} onClick = {(e) => swapBatsman()}><p>Swap</p></div>
                                <div className={mps.swapDiv} onClick = {(e) => undo()}><p>Undo</p></div>
                            </div>
                            <div className={mps.right_div}>
                                <div style={{display:'flex',flexWrap: 'wrap',height:'60%'}}>
                                <div className={mps.runsDiv} onClick={(e) => handleClick(e) }><p style={{paddingTop:'8px',paddingLeft:'19px'}}>0</p></div>
                                <div className={mps.runsDiv} onClick={(e) => handleClick(e) }><p style={{paddingTop:'8px',paddingLeft:'19px'}}>1</p></div>
                                <div className={mps.runsDiv} onClick={(e) => handleClick(e) }><p style={{paddingTop:'8px',paddingLeft:'19px'}}>2</p></div>
                                <div className={mps.runsDiv} onClick={(e) => handleClick(e) }><p style={{paddingTop:'8px',paddingLeft:'19px'}}>3</p></div>
                                <div className={mps.runsDiv} onClick={(e) => handleClick(e) }><p style={{paddingTop:'8px',paddingLeft:'19px'}}>4</p></div>
                                <div className={mps.runsDiv} onClick={(e) => handleClick(e) }><p style={{paddingTop:'8px',paddingLeft:'19px'}}>5</p></div>
                                <div className={mps.runsDiv} onClick={(e) => handleClick(e) }><p style={{paddingTop:'8px',paddingLeft:'19px'}}>6</p></div>
                                </div>
                                <div>
                                <label>
                                <input
                                     type="checkbox"
                                    checked={extra.wide}
                                    onChange={handleWide}
                                />
                                Wide
                                </label >
                <label style={{marginLeft:'10px'}}>
                <input
                            type="checkbox"
                            checked={extra.noBall}
                            onChange={handleNoBall}
                />
                No ball
                </label>
                <label style={{marginLeft:'10px'}}>
                <input
                            type="checkbox"
                            checked={extra.legBye}
                            onChange={handleLegBye}
                />
                Leg byes
                </label>
                <label style={{marginLeft:'10px'}}>
                <input
                            type="checkbox"
                            checked={extra.wicket}
                            onChange={handleWicket}
                />
                Wicket
                </label>
                                </div>
                               
                            </div>
                        </div>

                    </div>
                    <div className={mps.section5}>
                            {data.battingFirst ? <div className={mps.overDiv} onClick={handleOver}>Innings over</div>:<div className={mps.overDiv} onClick={gameOver}>Game over</div>}
                                </div>
                </div>
            :<div>Loading...</div>
        }
       </div>
    )
}

export default MainPage;
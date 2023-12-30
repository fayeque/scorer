import React from "react";
import { useState } from "react";
import fuzzySearch from "../utils/regEx";
import { useParams,useNavigate } from "react-router-dom";
import s from "./FirstDetail.module.css";
import mps from "./MainPage.module.css";

const WicketPage = ({data,setData,handleBowler,history,his,match}) => {
    const [selected,setSelected] = useState(null);
    const [btsmn,setBatsman] = useState({
        newBatsman:""
    });
    var [fdata,setfData] = useState([]);
    const [left,setLeft] = useState([]);
    const [out,setOut] = useState("");
    const [strike,setStrike] = useState("");

    const { matchId } = useParams();
    const navigate = useNavigate();

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

    const handleChange = (e) =>{
        setSelected(e.target.value);
    }
    const handleOut = (e) => {
        var l=[];
        setOut(e.target.value);
        console.log(btsmn);
        l.push(btsmn.newBatsman)
        // left.push(btsmn.newBatsman);
        if(data.striker.name == e.target.value){
            l.push(data.nonStriker.name);

        }else{
            l.push(data.striker.name);
        }
        setLeft([...l]);
        console.log(l);

    }
    const handleOnStrike = (e) => {
        setStrike(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        var isFound = false;
        var atIdx = 0;
        if(selected=='Runout'){
          data[data.batting].wickets += 1;
          if(data.striker.name == out){
            data.striker.notout=false;
            data.striker.runOut=true;
            data[data.batting].batsmans.push(data.striker);
            if(data.nonStriker.name == strike){
                data.striker = data.nonStriker;
                //27-DEC-2023 changes to check if the new batsman is already present in the batsmand list(due to retd hurt or any such causes
                data[data.batting].batsmans.forEach((batsman,i) => {
                    if(batsman.name == btsmn.newBatsman){
                      data.nonStriker= {name:btsmn.newBatsman,runs:batsman.runs,balls:batsman.balls,fours:batsman.fours,sixes:batsman.sixes,dot:batsman.dot,strikeRate:batsman.strikeRate,notout:true,outBy:'',runOut:false};
                      isFound = true;
                    }
                });

                if(!isFound){
                  data.nonStriker={name:btsmn.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
                }
                
            }else{
              data[data.batting].batsmans.forEach((batsman,i) => {
                if(batsman.name == btsmn.newBatsman){
                 data.striker= {name:btsmn.newBatsman,runs:batsman.runs,balls:batsman.balls,fours:batsman.fours,sixes:batsman.sixes,dot:batsman.dot,strikeRate:batsman.strikeRate,notout:true,outBy:'',runOut:false};
                 isFound = true;
                }
            });

            if(!isFound){
              data.striker={name:btsmn.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
            }
              
            }
          }else{
            data.nonStriker.notout=false;
            data.nonStriker.runOut=true;
            data[data.batting].batsmans.push(data.nonStriker);
            if(data.striker.name == strike){
              data[data.batting].batsmans.forEach((batsman,i) => {
                if(batsman.name == btsmn.newBatsman){
                 data.nonStriker= {name:btsmn.newBatsman,runs:batsman.runs,balls:batsman.balls,fours:batsman.fours,sixes:batsman.sixes,dot:batsman.dot,strikeRate:batsman.strikeRate,notout:true,outBy:'',runOut:false};
                 isFound = true;
                 atIdx=i;
                }
            });

            if(!isFound){
                data.nonStriker={name:btsmn.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
            }else{
              data[data.batting].batsmans.splice(atIdx,1);
            }
            }else{
                data.nonStriker=data.striker;
                data[data.batting].batsmans.forEach((batsman,i) => {
                  if(batsman.name == btsmn.newBatsman){
                   data.striker= {name:btsmn.newBatsman,runs:batsman.runs,balls:batsman.balls,fours:batsman.fours,sixes:batsman.sixes,dot:batsman.dot,strikeRate:batsman.strikeRate,notout:true,outBy:'',runOut:false};
                   isFound = true;
                   atIdx=i;
                  }
              });

              if(!isFound){
                data.striker={name:btsmn.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
            }else{
              data[data.batting].batsmans.splice(atIdx,1);
            }
              
            }
         }

      }else{
        data[data.batting].wickets += 1;
        data.striker.notout=false;
        data.striker.outBy=data.bowler.name;
        data[data.batting].batsmans.push(data.striker);
        data.bowler.wicket += 1;
        if(data.nonStriker.name == strike){
          data.striker = data.nonStriker;
          data[data.batting].batsmans.forEach((batsman,i) => {
            console.log("batsman here in are ", batsman.name);
            console.log("new batsman here in are ", btsmn.newBatsman);
            if(batsman.name == btsmn.newBatsman){
              console.log("coming here for sure");

             data.nonStriker= {name:btsmn.newBatsman,runs:batsman.runs,balls:batsman.balls,fours:batsman.fours,sixes:batsman.sixes,dot:batsman.dot,strikeRate:batsman.strikeRate,notout:true,outBy:'',runOut:false};
             isFound = true;
             atIdx=i;
            }
        });
        if(!isFound){
          data.nonStriker = {name:btsmn.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
      }else{
        data[data.batting].batsmans.splice(atIdx,1);
      }
          
        }
        else{
          data[data.batting].batsmans.forEach((batsman,i) => {
            console.log("batsman here in are ", batsman.name);
            console.log("new batsman here in are ", btsmn.newBatsman);
            if(batsman.name == btsmn.newBatsman){
              console.log("coming here for sure");
             data.striker= {name:btsmn.newBatsman,runs:batsman.runs,balls:batsman.balls,fours:batsman.fours,sixes:batsman.sixes,dot:batsman.dot,strikeRate:batsman.strikeRate,notout:true,outBy:'',runOut:false};
             isFound = true;
             atIdx=i;
            }
        });
        if(!isFound){
          data.striker = {name:btsmn.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
      }else{
        data[data.batting].batsmans.splice(atIdx,1);
      }
        }

      }
        if(data.bowler.ballsDelivered >= 6){
            console.log("6th ball delivered");
            console.log(data[data.batting].overs);
            data.bowler.overs += 1;
            data.bowler.ballsDelivered = 0;
            // navigate("/newBowler");
        }
        
        if(data[data.batting].balls == 6){
          data[data.batting].overs = data[data.batting].overs+1;
          data[data.batting].balls = 0;

          var d=data[data.batting].bowlers.filter((b) => {
            if(b.name==data.bowler.name){
                return b;
            }
        });

        if(d.length == 0){
            data[data.bowling].bowlers.push(data.bowler);
        }
        his.push(JSON.parse(JSON.stringify(data)));
        console.log(his);
        data.bowler={name:"",runsGiven:0,wicket:0,ballsDelivered:0,overs:0,economy:0,timeline:[]};
        var dt=JSON.parse(localStorage.getItem('data'));
        dt[matchId]=data;
        console.log(dt);
        localStorage.setItem('data',JSON.stringify(dt));
        navigate(`/newBowler/${matchId}`);
      }
        else{
            his.push(JSON.parse(JSON.stringify(data)));
            console.log(his);
            // navigate("/mainPage");
            var dt=JSON.parse(localStorage.getItem('data'));
            dt[matchId]=data;
            console.log(dt);
            localStorage.setItem('data',JSON.stringify(dt));
            navigate(`/mainPage/${matchId}`);
        }
        // setData({...data});
        
        // console.log("nb - " + btsmn.newBatsman + "out - " + out + "strike -" + strike)
    }
    const onChange=(e) => {
      setBatsman({...btsmn,[e.target.name]:e.target.value})
      // console.log(fuzzySearch(btsmn.newBatsman));
      // setfData(fuzzySearch(btsmn.newBatsman));
    };

    // const setIt = (e) => {
    //   e.preventDefault();
    //   setBatsman({...batsman,newBatsman:e.target.innerText});
    //   setfData([]);
    // }
    // const onChange=e => setBatsman({...batsman,[e.target.name]:e.target.value});
    const showFields = () => {
        if(selected == "Runout"){
            return (
                <div>
        <div className={s.cta}>
          <form className={s.ctaForm} onSubmit={onSubmit}>
            <div>
              <label for="Team1">
                New Batsman
              </label>
              <input
                  value={btsmn.newBatsman} onChange={(e) => onChange(e)}
                  id="email-address"
                  name="newBatsman"
                  type="String"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New Batsman"
                />
            </div>
            <div>
                <label for="batting team">Who got out</label>
                <select value={out} 
                onChange={(e) => {handleOut(e)}} >
                <option value="">Please Select</option>
                <option value={data.striker.name}>{data.striker.name}</option>
                <option value={data.nonStriker.name}>{data.nonStriker.name}</option>
                </select>
            </div>
            <div>
                <label for="batting team">Who is on strike</label>
                <select value={strike} 
                onChange={(e) => {handleOnStrike(e)}} >
                <option value="">Please Select</option>
                <option value={left[0]}>{left[0]}</option>
                <option value={left[1]}>{left[1]}</option>
                </select>
            </div>
            <button
              type="submit"
              className="btn btnForm">
              Continue
            </button>
        </form>
        </div>
                </div>
            )
        }else{
          return (
            <div>
               <div className={s.cta}>
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
          <form className={s.ctaForm} onSubmit={onSubmit}>
            <div>
              <label for="Team1">
                New Batsman
              </label>
              <input
              value={btsmn.newBatsman} onChange={(e) => onChange(e)}
              id="email-address"
              name="newBatsman"
              type="String"
              // required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="New Batsman"
            />
            </div>
            <div>
                <label for="batting team">Who is on strike?</label>
            <select value={strike} 
            onChange={(e) => {handleOnStrike(e)}} >
            <option value="">Please Select</option>
            <option value={data.nonStriker.name}>{data.nonStriker.name}</option>
            <option value={btsmn.newBatsman}>{btsmn.newBatsman}</option>
            </select>
            </div>
            <button
              type="submit"
              className="btn btnForm">
              Continue
            </button>
        </form>
        </div>
            </div>
        )
        }
    }
    console.log(selected);
    return (
      <section className={s.ctaSection}>
        <div className="container">
        <div className={s.ctaForm}>
                <label for="batting team">Kaise out hua?</label>
                <select value={selected} 
                onChange={(e) => {handleChange(e)}}  >
                        <option value="">Please Select</option>
                        <option value="Runout">Runout</option>
                        <option value="Other">Other</option>
                </select>
          </div>
          {selected && showFields()}
        </div>
      </section>
    )
}

export default WicketPage;
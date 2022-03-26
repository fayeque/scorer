import React from "react";
import { useState } from "react";
import fuzzySearch from "../utils/regEx";
import Suggestion from "./Suggestion";

const Trial = ({data,setData,handleBowler,history,his}) => {
    const [selected,setSelected] = useState(null);
    const [batsman,setBatsman] = useState({
        newBatsman:""
    });
    var [fdata,setfData] = useState([]);
    const [left,setLeft] = useState([]);
    const [out,setOut] = useState("");
    const [strike,setStrike] = useState("");

    const handleChange = (e) =>{
        setSelected(e.target.value);
    }
    const handleOut = (e) => {
        setOut(e.target.value);
        console.log(batsman);
        left.push(batsman.newBatsman);
        if(data.striker.name == e.target.value){
            left.push(data.nonStriker.name);
        }else{
            left.push(data.striker.name);
        }
        setLeft([...left]);
        console.log(left);

    }
    const handleOnStrike = (e) => {
        setStrike(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(selected=='Runout'){
        if(data.striker.name == out){
            data[data.batting].batsmans.push(data.striker);
            if(data.nonStriker.name == strike){
                data.striker = data.nonStriker;
                data.nonStriker= {name:batsman.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0}
            }else{
                data.striker={name:batsman.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0}
            }
        }else{
            data[data.batting].batsmans.push(data.nonStriker);
            if(data.striker.name == strike){
                data.nonStriker={name:batsman.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0}
            }else{
                data.nonStriker=data.striker;
                data.striker={name:batsman.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0}
            }
        }
      }else{
        data[data.batting].batsmans.push(data.striker);
        if(data.nonStriker.name == strike){
          data.striker = data.nonStriker;
          data.nonStriker = {name:batsman.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0}
        }
        else{
          data.striker={name:batsman.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0}
        }
      }
        if(data.bowler.ballsDelivered >= 6){
            console.log("6th ball delivered");
            console.log(data[data.batting].overs);
            data[data.batting].overs = data[data.batting].overs+1;
            data.bowler.overs += 1;
            data.bowler.ballsDelivered = 0;
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
            data.bowler={name:"",runsGiven:0,ballsDelivered:0,overs:0,economy:0};
            
            history.push("/newBowler");
        }else{
            his.push(JSON.parse(JSON.stringify(data)));
            console.log(his);
            history.push("/mainPage");
        }
        // setData({...data});
        
        // console.log("nb - " + batsman.newBatsman + "out - " + out + "strike -" + strike)
    }


    const setIt = (e,bat) => {
      e.preventDefault();
      console.log(bat);
      setBatsman({...batsman,newBatsman:bat});
      console.log(batsman.newBatsman);
    }
    // const onChange=e => setBatsman({...batsman,[e.target.name]:e.target.value});
    const showFields = () => {
        if(selected == "Runout"){
            return (
                <div>
            <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                <label htmlFor="email-address" className="sr-only">
                  Who got out
                </label>
                <select value={out} 
                onChange={(e) => {handleOut(e)}} >
                <option value="">Please Select</option>
                <option value={data.striker.name}>{data.striker.name}</option>
                <option value={data.nonStriker.name}>{data.nonStriker.name}</option>
                </select>
                </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  New Batsman
                </label>
                <Suggestion onClic={setIt} />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Who is on Strike
                </label>
                <select value={strike} 
                onChange={(e) => {handleOnStrike(e)}} >
                <option value="">Please Select</option>
                <option value={left[0]}>{left[0]}</option>
                <option value={left[1]}>{left[1]}</option>
                </select>
                </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span>
                Continue
              </button>
            </div>
          </form>
                </div>
            )
        }else{
          return (
            <div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        {/* <input type="hidden" name="remember" defaultValue="true" /> */}
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              New Batsman
            </label>
            <Suggestion onClic={setIt} />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Who is on Strike
            </label>
            <select value={strike} 
            onChange={(e) => {handleOnStrike(e)}} >
            <option value="">Please Select</option>
            <option value={data.nonStriker.name}>{data.nonStriker.name}</option>
            <option value={batsman.newBatsman}>{batsman.newBatsman}</option>
            </select>
            </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
            Continue
          </button>
        </div>
      </form>
            </div>
        )
        }
    }
    console.log(selected);
    return (
        <div>
      <select 
        value={selected} 
        onChange={(e) => {handleChange(e)}} 
      >
        <option value="">Please Select</option>
       <option value="Runout">Runout</option>
        <option value="Other">Other</option>
      </select>
        {selected && showFields()};
        </div>
    )
}

export default Trial;
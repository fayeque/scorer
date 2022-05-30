import React from "react";
import { useState } from "react";
import fuzzySearch from "../utils/regEx";
import s from "./FirstDetail.module.css";

const WicketPage = ({data,setData,handleBowler,history,his,match}) => {
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
        var l=[];
        setOut(e.target.value);
        console.log(batsman);
        l.push(batsman.newBatsman)
        // left.push(batsman.newBatsman);
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
        if(selected=='Runout'){
          data[data.batting].wickets += 1;
          if(data.striker.name == out){
            data.striker.notout=false;
            data.striker.runOut=true;
            data[data.batting].batsmans.push(data.striker);
            if(data.nonStriker.name == strike){
                data.striker = data.nonStriker;
                data.nonStriker= {name:batsman.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
            }else{
                data.striker={name:batsman.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
            }
          }else{
            data.nonStriker.notout=false;
            data.nonStriker.runOut=true;
            data[data.batting].batsmans.push(data.nonStriker);
            if(data.striker.name == strike){
                data.nonStriker={name:batsman.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
            }else{
                data.nonStriker=data.striker;
                data.striker={name:batsman.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
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
          data.nonStriker = {name:batsman.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
        }
        else{
          data.striker={name:batsman.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
        }

      }
        if(data.bowler.ballsDelivered >= 6){
            console.log("6th ball delivered");
            console.log(data[data.batting].overs);
            data[data.batting].overs = data[data.batting].overs+1;
            data[data.batting].balls=0;
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
            data.bowler={name:"",runsGiven:0,wicket:0,ballsDelivered:0,overs:0,economy:0,timeline:[]};
            var dt=JSON.parse(localStorage.getItem('data'));
            dt[match.params.matchId]=data;
            console.log(dt);
            localStorage.setItem('data',JSON.stringify(dt));
            history.push(`/newBowler/${match.params.matchId}`);
            // history.push("/newBowler");
        }else{
            his.push(JSON.parse(JSON.stringify(data)));
            console.log(his);
            // history.push("/mainPage");
            var dt=JSON.parse(localStorage.getItem('data'));
            dt[match.params.matchId]=data;
            console.log(dt);
            localStorage.setItem('data',JSON.stringify(dt));
            history.push(`/mainPage/${match.params.matchId}`);
        }
        // setData({...data});
        
        // console.log("nb - " + batsman.newBatsman + "out - " + out + "strike -" + strike)
    }
    const onChange=(e) => {
      setBatsman({...batsman,[e.target.name]:e.target.value})
      // console.log(fuzzySearch(batsman.newBatsman));
      // setfData(fuzzySearch(batsman.newBatsman));
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
                  value={batsman.newBatsman} onChange={(e) => onChange(e)}
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
          <form className={s.ctaForm} onSubmit={onSubmit}>
            <div>
              <label for="Team1">
                New Batsman
              </label>
              <input
              value={batsman.newBatsman} onChange={(e) => onChange(e)}
              id="email-address"
              name="newBatsman"
              type="String"
              required
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
            <option value={batsman.newBatsman}>{batsman.newBatsman}</option>
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
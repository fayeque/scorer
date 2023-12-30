import React from "react";
import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import fuzzySearch from "../utils/regEx";
import s from "./FirstDetail.module.css";

const DeclaredPage = ({data,setData,handleBowler,his,match}) => {
    const [selected,setSelected] = useState(null);
    const [batsman,setBatsman] = useState({
        newBatsman:""
    });
    const [showthefields,setShowtheFields] = useState(false);
    var [fdata,setfData] = useState([]);
    const [left,setLeft] = useState([]);
    const [declared,setDeclared] = useState("");
    const [strike,setStrike] = useState("");
    const navigate = useNavigate();
    const { matchId } = useParams();


    const handleOnStrike = (e) => {
        setStrike(e.target.value);
    }

    const handleDeclared = (e) => {
      var l=[];
      setDeclared(e.target.value);
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

  console.log("newBatsman here is ", batsman.newBatsman);

    const onSubmit = (e) => {
        e.preventDefault();
        var isFound = false;
        var atIdx = 0;
        if(data.nonStriker.name == strike){
            data.striker.outBy='Retd';
          data[data.batting].batsmans.push(data.striker);
          data.striker = data.nonStriker;
          data[data.batting].batsmans.forEach((btsmn,i) => {
            console.log("batsman here in are ", btsmn.name);
            console.log("new batsman here in are ", batsman.newBatsman);
            if(btsmn.name == batsman.newBatsman){
              console.log("coming here for sure");
             data.nonStriker= {...data.nonStriker,name:batsman.newBatsman,runs:btsmn.runs,balls:btsmn.balls,fours:btsmn.fours,sixes:btsmn.sixes,dot:btsmn.dot,strikeRate:btsmn.strikeRate,notout:true,outBy:'',runOut:false};
             isFound = true;
             atIdx=i;
            }
        });
        if(!isFound){
          data.nonStriker = {name:batsman.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
      }else{
        data[data.batting].batsmans.splice(atIdx,1);
      }
          
        }
        else{
            data.nonStriker.outBy='Retd';
            data[data.batting].batsmans.push(data.nonStriker);
          data[data.batting].batsmans.forEach((btsmn,i) => {
            console.log("batsman here in are ", btsmn.name);
            console.log("new batsman here in are ", batsman.newBatsman);
            if(btsmn.name == batsman.newBatsman){
              console.log("coming here for sure");
             data.nonStriker= {...data.striker,name:batsman.newBatsman,runs:btsmn.runs,balls:btsmn.balls,fours:btsmn.fours,sixes:btsmn.sixes,dot:btsmn.dot,strikeRate:btsmn.strikeRate,notout:true,outBy:'',runOut:false};
             isFound = true;
             atIdx=i;
            }
        });
        if(!isFound){
          data.nonStriker = {name:batsman.newBatsman,runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false}
      }else{
        data[data.batting].batsmans.splice(atIdx,1);
      }
        
    }

            his.push(JSON.parse(JSON.stringify(data)));
            console.log(his);
            // navigate.push("/mainPage");
            var dt=JSON.parse(localStorage.getItem('data'));
            dt[matchId]=data;
            console.log(dt);
            localStorage.setItem('data',JSON.stringify(dt));
            navigate(`/mainPage/${matchId}`);
        
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
              // required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="New Batsman"
            />
            </div>

            <div className={s.ctaForm}>
                <label for="batting team">Kaun declared hua?</label>
                <select value={declared} 
                onChange={(e) => {handleDeclared(e)}} >
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
    }
    return (
      <section className={s.ctaSection}>
        <div className="container">
          {showFields()}
        </div>
      </section>
    )
}

export default DeclaredPage;
import React,{useState} from "react";
import s from "./FirstDetail.module.css";
// import fuzzySearch from "../utils/regEx";
const NewBowler = ({data,setData,history,match,handleCallback}) => {
    const  [formData,setformData] = useState({
        bowler:''
      });
      // var [dt,setDt] = useState([]);
      const {bowler} = formData;
      const onChange=(e) => {
        setformData({...formData,[e.target.name]:e.target.value})
        // console.log(fuzzySearch(formData.bowler));
        // setDt(fuzzySearch(formData.bowler));
      };

      const onSubmit = (e) => {
            e.preventDefault();
            console.log(e.target.innerText);
            // console.log(formData);
            // handleCallback(e.target.innerText,match.params.matchId);
            handleCallback(formData.bowler,match.params.matchId);
            history.push(`/mainPage/${match.params.matchId}`);
      }
      const handleOver = (e) => {
        data[data.batting].batsmans.push(data.striker);
        data[data.batting].batsmans.push(data.nonStriker);
        if(data.bowler.name != " "){
          data[data.bowling].bowlers.push(data.bowler);
        }
        data[data.batting].balls = data.bowler.ballsDelivered;
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
        setData({...data,battingFirst:false,toWin:data[data.batting].runs,overs:data.bowler.ballsDelivered >= 0 ? (data[data.batting].overs+1):(data[data.batting].overs),batting:data.bowling,bowling:data.batting,bowler:{name:"",runsGiven:0,ballsDelivered:0,overs:0,economy:0,wicket:0,timeline:[]},striker:{name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0}});
        history.push(`/matchSummary/${match.params.matchId}`);
        // console.log(data);
    }
      console.log(data);
    return (
        <div>
           <section className={s.ctaSection}>
      <div className="container">
        <div className={s.cta}>
          <form className={s.ctaForm} onSubmit={onSubmit}>
            <div>
              <label for="Team1">
                New Bowler
              </label>
              <input
                  value={bowler} onChange={(e) => onChange(e)}
                  id="email-address"
                  name="bowler"
                  type="String"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New Bowler"
                />
            </div>
            <button
              type="submit"
              className="btn btnForm">
              Start Match
            </button>
            <div style={{'marginTop':'10rem'}}>
            {data.battingFirst ? <button className="btn btnForm" onClick={handleOver}>Innings over</button>:<button className="btn btnForm" onClick={gameOver}>Game over</button>}
            </div>
        </form>
        </div>
      </div>
    </section>
        </div>
    )
};

export default NewBowler;
import React,{useState} from "react";
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
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
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
                {/* <div style={{position:'absolute',backgroundColor:"grey",marginLeft:'300px'}} className="showPlayers">
                  {dt.length > 0 && dt.map((d) => {
                    return <button onClick={(e) => onSubmit(e)}>{d.item}</button>
                  })}
                </div> */}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span>
                Start Match
              </button>
            </div>
          </form>
          {data.battingFirst ? <button onClick={handleOver}>Innings over</button>:<button onClick={gameOver}>Game over</button>}
        </div>
    )
};

export default NewBowler;
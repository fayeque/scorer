import axios from "axios";
import React,{useState} from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";


const Landing = (props) => {
  // const history = useHistory();
  
  console.log(props);
    const  [formData,setformData] = useState({
        team1:"",
        team2:"",
        batting:"",
        overs:0
      });
      const {team1,team2,batting,overs} = formData;
      
      const onChange=e => setformData({...formData,[e.target.name]:e.target.value});
      
      // useEffect(() => {
      //   props.setData({
      //     batting:'',
      //     bowling:'',
      //     battingFirst:true,
      //     toWin:0,
      //     overs:0,
      //     gameOver:false,
      //     winner:null,
      //     striker:{name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0},
      //     nonStriker:{name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0},
      //     bowler:{name:"",runsGiven:0,ballsDelivered:0,overs:0,economy:0,wicket:0,timeline:[]}
      //   })
      // },[]);

      const onSubmit = (e) => {
          e.preventDefault();
          var bowling = team1==batting ? team2 : team1; 
            console.log(props);
          var id=Math.floor(Math.random()*10000);
          if(localStorage.getItem('matchId') != null){
              var ids=JSON.parse(localStorage.getItem('matchId'));
              ids.push(id);
              localStorage.setItem('matchId',JSON.stringify(ids))
          }else{
            localStorage.setItem('matchId',JSON.stringify([id]));
            localStorage.setItem('data',JSON.stringify({}));
          }
          const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify({data:props.data,id:id});
        axios.post("/m",body,config);
          props.handleCallback(batting,bowling,overs,team1,team2,id);
          props.history.push(`/firstDetail/${id}`);
      }

      const handleBatting = (e) => {
        setformData({...formData,batting:e.target.value});
      }

    return (
      <div style={{width:'80%',height:'100vh',margin:'auto'}}>
        <form style={{height:'100vh'}} className="mt-8 space-y-6" onSubmit={onSubmit}>
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            <div  style={{height:'100vh'}} className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Team1
                </label>
                <input
                  value={team1} onChange={(e) => onChange(e)}
                  id="email-address"
                  name="team1"
                  type="string"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Team1"
                />
              </div>
              <div style={{marginTop:'20px'}}>
                <label htmlFor="password" className="sr-only">
                    Team2
                </label>
                <input
                  value={team2} 
                  onChange={(e) => onChange(e)}
                  id="password"
                  name="team2"
                  type="String"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="team2"
                />
              </div>
              <div>
            <h5>
              Batting team
            </h5>
            <select required value={formData.batting} 
            onChange={(e) => {handleBatting(e)}} >
            <option value="">Please Select</option>
            <option value={formData.team1}>{formData.team1}</option>
            <option value={formData.team2}>{formData.team2}</option>
            </select>
            </div>
              <div style={{marginTop:'20px'}}>
                <label htmlFor="password" className="sr-only">
                    Overs
                </label>
                <input
                  value={overs} 
                  onChange={(e) => onChange(e)}
                  id="password"
                  name="overs"
                  type="Number"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="overs"
                />
              </div>
           
            <div style={{marginTop:'20px'}}>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span>
                Start Match
              </button>
            </div>
            </div>
          </form>
        </div>
    )
}

export default Landing
import axios from "axios";
import React,{useState} from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Landing.module.css";


const Landing = (props) => {
  const navigate = useNavigate();
  
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
        axios.post("/",body,config);
          props.handleCallback(batting,bowling,overs,team1,team2,id);
          navigate(`/firstDetail/${id}`);
      }

      const handleBatting = (e) => {
        setformData({...formData,batting:e.target.value});
      }

    return (
      <section className={s.ctaSection}>
        <div className="container">
          <div className={s.cta}>
            <form className={s.ctaForm} onSubmit={onSubmit}>
              <div>
                <label for="Team1">
                  Team1
                </label>
                <input
                  value={team1} onChange={(e) => onChange(e)}
                  id="Team1"
                  name="team1"
                  type="string"
                  required
                  placeholder="Team1"
                />
              </div>
              <div>
                <label for="team2">
                    Team2
                </label>
                <input
                  value={team2} 
                  onChange={(e) => onChange(e)}
                  id="Team2"
                  name="team2"
                  type="String"
                  required
                  placeholder="Team2"
                />
              </div>
              <div>
                <label for="batting team">Batting team</label>
            <select required value={formData.batting} 
            onChange={(e) => {handleBatting(e)}} >
            <option value="">Please Select</option>
            <option value={formData.team1}>{formData.team1}</option>
            <option value={formData.team2}>{formData.team2}</option>
            </select>
            </div>
            <div>
                <label for="overs">
                    Overs
                </label>
                <input
                  value={overs} 
                  onChange={(e) => onChange(e)}
                  id="overs"
                  name="overs"
                  type="Number"
                  required
                  placeholder="Overs"
                />
              </div>
              <button
                type="submit"
                className="btn btnForm">
                Start Match
              </button>
          </form>
          </div>
        </div>
      </section>

    )
}

export default Landing
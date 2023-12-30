import React,{useState} from "react";
import { useEffect } from "react";
import { Router } from "react-router-dom";
import { useParams,useNavigate } from "react-router-dom";
import s from "./FirstDetail.module.css";

const SecondInning = (props) => {
    const  [formData,setformData] = useState({
        striker:"",
        nonStriker:"",
        bowler:""
      });
      const navigate = useNavigate;
      const {matchId} = useParams();
      const {striker,nonStriker,bowler} = formData;
      useEffect(() => {
        // console.log('data after first innings',props.data);
        var d=JSON.parse(localStorage.getItem('data'));
        var currentData=d[matchId]
        props.setData(currentData);
      },[]);
      const onChange=e => setformData({...formData,[e.target.name]:e.target.value});

      const onSubmit = (e) => {
            e.preventDefault();
            console.log(formData);
            props.handleCallback(striker,nonStriker,bowler,matchId);
            navigate(`/mainPage/${matchId}`);
      }
      console.log(props.data);
    return (
      <section className={s.ctaSection}>
      <div className="container">
        <div className={s.cta}>
          <form className={s.ctaForm} onSubmit={onSubmit}>
            <div>
              <label for="Team1">
                Striker
              </label>
              <input
                  value={striker} onChange={(e) => onChange(e)}
                  id="email-address"
                  name="striker"
                  type="String"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Striker"
                />
            </div>
            <div>
              <label for="team2">
                  Non Striker
              </label>
              <input
                  value={nonStriker} 
                  onChange={(e) => onChange(e)}
                  id="password"
                  name="nonStriker"
                  type="String"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Non-striker"
                />
            </div>
            <div>
              <label for="overs">
                  Bowler
              </label>
              <input
                  value={bowler} 
                  onChange={(e) => onChange(e)}
                  id="password"
                  name="bowler"
                  type="String"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Bowler"
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

export default SecondInning
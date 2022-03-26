import React,{useState} from "react";
import { useEffect } from "react";
import { Router } from "react-router-dom";


const FirstDetail = (props) => {
    const  [formData,setformData] = useState({
        striker:"",
        nonStriker:"",
        bowler:""
      });
      const {striker,nonStriker,bowler} = formData;
      console.log("data in first detail",props.data);
      useEffect(() => {
        if(localStorage.getItem('data')){
          // props.data.striker={name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false};
          // props.data.nonStriker={name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false};
        console.log('data after first innings',props.data);
        var d=JSON.parse(localStorage.getItem('data'));
        d[props.match.params.matchId]=props.data;
        console.log(d);
        localStorage.setItem('data',JSON.stringify(d));
        }
      },[]);
      const onChange=e => setformData({...formData,[e.target.name]:e.target.value});

      const onSubmit = (e) => {
            e.preventDefault();
            console.log(formData);
            props.handleCallback(striker,nonStriker,bowler,props.match.params.matchId);
            props.history.push(`/mainPage/${props.match.params.matchId}`);
      }
      console.log(props.data);
    return (
        <div style={{width:'80%',margin:'auto'}}>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
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
                <label htmlFor="password" className="sr-only">
                    Non-striker
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
                <label htmlFor="password" className="sr-only">
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
        </div>
    )
}

export default FirstDetail
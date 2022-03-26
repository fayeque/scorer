import { useState } from "react";
import { React } from "react";
import fuzzySearch from "../utils/regEx";

const Suggestion = (props)  => {

    const [data,setData] = useState([]);
    const [batsman,setBatsman] = useState({newB:''});

    const onChange = (e) => {
        console.log(fuzzySearch(e.target.value));
        setBatsman({...batsman,newB:e.target.value});
        setData(fuzzySearch(e.target.value))
    }

    const onClk = (e) => {
        setBatsman({...batsman,newB:e.target.innerText});
        e.preventDefault();
        setData([]);
        props.onClic(e,e.target.innerText);
    }
    console.log(batsman);
return (
    <div>
         <input
                  onChange={(e) => onChange(e)}
                  id="email-address"
                  name="bowler"
                  value={batsman.newB}
                  type="String"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New Bowler"
                />
                <div style={{position:'absolute',backgroundColor:"grey",marginLeft:'300px'}} className="showPlayers">
                  {data.length > 0 && data.map((d,i) => {
                    return <button key={i} onClick={(e) => onClk(e)}>{d.item}</button>
                  })}
                </div>
    </div>
)
}

export default Suggestion;
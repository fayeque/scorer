import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const MatchDetails = (props) => {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        var d=JSON.parse(localStorage.getItem('data'));
        var currentMatch = d[props.match.params.matchId];
        setData(currentMatch);
        setLoading(false)
    },[])
    console.log(data);
    return(
        <div>
            {!loading ?
            <div>
             {!data.gameOver  && !data.battingFirst ? <h5 style={{marginTop:'10px'}}>
                {data.batting} needs {data.toWin - data[data.batting].runs +1} runs in {data.overs*6 -  data[data.batting].overs*6 - data.bowler.ballsDelivered} balls
                         </h5> : ""}
                <div style={{display:'flex',padding:'15px',justifyContent:'space-between',alignItems:'center',marginTop:'15px',backgroundColor:'darkgreen',color:'white',height:'30px'}}> 
                    <h4>{data.batting}</h4>
                    <div style={{display:'flex'}}>
                    <h4>{data[data.batting].runs}/{data[data.batting].wickets}</h4>
                    <h6 style={{marginLeft:'5px'}}>({data[data.batting].overs + "." + data[data.batting].balls})</h6>

                    </div>
                </div>
                <div>
                <div className="flex flex-col">
  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Batsman
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                R
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                B
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                4s
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                6s
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                SR
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data[data.batting].batsmans.map((person,i) => (

              <tr key={i}>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-md font-medium text-gray-600">{person.name}</div>
                      {person.notout ? 
                      <h6>Not out</h6>
                      :
                      <div>{person.runOut ? <h6>Runout</h6> : <h6 className="text-md font-medium text-gray-600">b {person.outBy}</h6>}</div>}
                    </div>
                  </div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.runs}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.balls}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.fours}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.sixes}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.runs==0 ? 0 : ((person.runs/person.balls)*100).toFixed(2)}</div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

  <div className="flex flex-col">
  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Bowlers
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                O
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                R
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                W
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ER
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data[data.bowling].bowlers.map((person,i) => (

              <tr key={i}>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-md font-medium text-gray-600">{person.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.overs}.{person.ballsDelivered}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.runsGiven}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.wicket}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.runsGiven == 0 ? 0 : ((person.runsGiven)/(person.overs + person.ballsDelivered/6)).toFixed(1)}</div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
                    
                                <div style={{display:'flex',padding:'15px',justifyContent:'space-between',alignItems:'center',marginTop:'15px',backgroundColor:'darkgreen',color:'white',height:'30px'}}> 
                    <h4>{data.bowling}</h4>
                    <div style={{display:'flex'}}>
                    <h4>{data[data.bowling].runs}/{data[data.bowling].wickets}</h4>
                    <h6 style={{marginLeft:'5px'}}>({data[data.bowling].overs + "." + data[data.bowling].balls})</h6>

                    </div>
                </div>

<div className="flex flex-col">
  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Batsman
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                R
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                B
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                4s
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                6s
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                SR
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data[data.bowling].batsmans.map((person,i) => (

              <tr key={i}>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-md font-medium text-gray-600">{person.name}</div>
                      {person.notout ? 
                      <h6>Not out</h6>
                      :
                      <div>{person.runOut ? <h6>Runout</h6> : <h6 className="text-md font-medium text-gray-600">b {person.outBy}</h6>}</div>}
                    </div>
                  </div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.runs}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.balls}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.fours}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.sixes}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.runs==0 ? 0 : ((person.runs/person.balls)*100).toFixed(2)}</div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<div className="flex flex-col">
  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Bowlers
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                O
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                R
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                W
              </th>
              <th
                scope="col"
                className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ER
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data[data.batting].bowlers.map((person,i) => (

              <tr key={i}>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-md font-medium text-gray-600">{person.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.overs}.{person.ballsDelivered}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.runsGiven}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.wicket}</div>
                </td>
                <td className="px-2 py-1 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{person.runsGiven == 0 ? 0 : ((person.runsGiven)/(person.overs + person.ballsDelivered/6)).toFixed(1)}</div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

            </div>
            </div>
            
            :<div>Loading...</div>}
        </div>
    )
}

export default MatchDetails;
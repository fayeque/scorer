import logo from './logo.svg';
import React from "react";
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Landing from './components/Landing';
import { useState } from 'react';
import FirstDetail from './components/FirstDetail';
import MainPage from './components/MainPage';
import NewBowler from './components/NewBowler';
import WicketPage from './components/WicketPage';
import DeclaredPage from './components/DeclaredPage';
// import Trial from './components/Trial';
import MatchSummary from './components/MatchSummary';
import { useEffect } from 'react';
import Allmatches from './components/Allmatches';
import MatchDetails from './components/MatchDetails';
import Navbar from './components/Navbar';
import SecondInning from './components/SecondInning';
import PublicAllMatches from './components/PublicAllMatches';
import PublicMatchDetails from './components/PublicMatchDetail';
import PublicMainPage from './components/PublicMainPage';
import AdminSignin from './components/AdminSignin';
import OrangeCap from './components/OrangeCap';
import PurpleCap from './components/PurpleCap';
import Todos from './components/Todos';
var his = [];

function App(props) {
  var [data,setData] = useState({
    date:new Date(),
    matchId:'',
    batting:'',
    bowling:'',
    battingFirst:true,
    toWin:0,
    overs:0,
    gameOver:false,
    winner:null,
    striker:{name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false},
    nonStriker:{name:"",runs:0,balls:0,fours:0,sixes:0,dot:0,strikeRate:0,notout:true,outBy:'',runOut:false},
    bowler:{name:"",runsGiven:0,ballsDelivered:0,overs:0,economy:0,wicket:0,timeline:[]},
  });

  // const [loading,setLoading] = useState(true);

  // useEffect(() => {
  //   // console.log(localStorage.getItem('data'));
  //   // if(localStorage.getItem('data') != null){
  //   //   const dt=JSON.parse(localStorage.getItem('data'));
  //   //   console.log(dt);
  //   //   setData(dt);
  //   // }
  //   setLoading(false);
  // },[]);



  console.log(data);
  const handleCallback = (batting,bowling,overs,team1,team2,matchId) => {
    console.log(data);
    console.log('callback');
    data.matchId=matchId;
    data[team1]={runs:0,overs:0,balls:0,runRate:0,batsmans:[],bowlers:[],wickets:0};
    data[team2]={runs:0,overs:0,balls:0,runRate:0,batsmans:[],bowlers:[],wickets:0};
    setData({...data,batting:batting,bowling:bowling,overs:overs});
  }

  const handleFirstDetail = (striker,nonStriker,bowler,matchId) => {
    data.striker.name = striker;
    data.nonStriker.name=nonStriker;
    data.bowler.name=bowler;
    if(localStorage.getItem('data')){
    var d=JSON.parse(localStorage.getItem('data'));
    d[matchId]=data;
    console.log(d);
    localStorage.setItem('data',JSON.stringify(d));
    }
    setData({...data})
  }

  const handleBowler = (bowler,matchId) => {
    var idx;
    var d = data[data.bowling].bowlers.filter((b,i) => {
      if(b.name == bowler){
        idx=i;
      return b;
      }
    });

    if(d.length > 0){
      data.bowler = d[0];
      data.bowler.timeline=[];
      data[data.bowling].bowlers.splice(idx,1);
    }else{
      data.bowler.name=bowler;
    }
    var dt=JSON.parse(localStorage.getItem('data'));
    dt[matchId]=data;
    console.log(dt);
    localStorage.setItem('data',JSON.stringify(dt));
    setData({...data});
    return d;

  }



  return (
    <div className="App">
      {/* {!loading ? */}
      
      <Router>
        {console.log("app.js")}
        <Navbar />
        <Routes>
        <Route exact path="/mainPage/:matchId" element={
             <MainPage {...props} data={data} handleCallback={handleCallback} setData={setData} handleBowler={handleBowler} his={his} />
        }></Route> 

        <Route exact path="/public/mainPage/:matchId" element={
           <PublicMainPage {...props} data={data} handleCallback={handleCallback} setData={setData} handleBowler={handleBowler} his={his} />
        }
        
            // props => <MainPage {...props} data={data} handleCallback={handleCallback} setData={setData} handleBowler={handleBowler} his={his} />
          ></Route> 
          <React.Fragment>
          
          <Route exact path="/" element={ 
             <Allmatches {...props} setData={setData} handleCallback={handleCallback} />
          }></Route>
         <Route exact path="/adminSignin" element={ <AdminSignin {...props} />
          }></Route>

           <Route exact path="/public" element={<PublicAllMatches {...props} setData={setData} handleCallback={handleCallback} />} />
          
          <Route exact path="/matchDetails/:matchId" element={ <MatchDetails {...props} setData={setData} handleCallback={handleCallback} /> 
          }></Route>
          <Route exact path="/public/matchDetails/:matchId" element={ <PublicMatchDetails {...props} setData={setData} handleCallback={handleCallback} />
          }></Route>

          <Route exact path="/start" element={ <Landing {...props} data={data} setData={setData} handleCallback={handleCallback} />} />
          <Route exact path="/firstDetail/:matchId" element={  <FirstDetail {...props} data={data} handleCallback={handleFirstDetail} />
          }></Route> 

          <Route exact path="/secondInningsFirstDetails/:matchId" element={  <SecondInning {...props} data={data} setData={setData} handleCallback={handleFirstDetail} />
          }></Route> 

          <Route exact path="/newBowler/:matchId" element={ <NewBowler {...props} setData={setData} data={data} handleCallback={handleBowler} />
          }></Route> 
          <Route exact path="/wicketPage/:matchId" element={ <WicketPage {...props} data={data} setData={setData} handleBowler={handleBowler} his={his}/>
          }></Route> 
          <Route exact path="/declaredPage/:matchId" element={ <DeclaredPage {...props} data={data} setData={setData} handleBowler={handleBowler} his={his}/>
          }></Route> 
            <Route exact path="/matchSummary/:matchId" element={  <MatchSummary {...props} data={data} />
          }></Route> 
          <Route exact path="/public/orangeCap" element={ <OrangeCap {...props} />
          }></Route> 
          <Route exact path="/public/purpleCap" element={  <PurpleCap {...props} />
          }></Route> 
          <Route exact path="/public/todos" element={  <Todos {...props} />
          }></Route> 
          </React.Fragment>
        </Routes>
      </Router>
  {/* :<div>Loading...</div>} */}
    </div>
  );
}

export default App;

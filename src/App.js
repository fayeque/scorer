import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Landing from './components/Landing';
import { useState } from 'react';
import FirstDetail from './components/FirstDetail';
import MainPage from './components/MainPage';
import NewBowler from './components/NewBowler';
import WicketPage from './components/WicketPage';
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
        {/* <Navbar /> */}
        <Switch>
        <Route exact path="/mainPage/:matchId" render={(props) => {
            return <MainPage {...props} data={data} handleCallback={handleCallback} setData={setData} handleBowler={handleBowler} his={his} />
          }
        }
        
            // props => <MainPage {...props} data={data} handleCallback={handleCallback} setData={setData} handleBowler={handleBowler} his={his} />
          ></Route> 
        <Route exact path="/public/mainPage/:matchId" render={(props) => {
            return <PublicMainPage {...props} data={data} handleCallback={handleCallback} setData={setData} handleBowler={handleBowler} his={his} />
          }
        }
        
            // props => <MainPage {...props} data={data} handleCallback={handleCallback} setData={setData} handleBowler={handleBowler} his={his} />
          ></Route> 
          <div>
          <Navbar />
          <Route exact path="/" render={ 
            props => <Allmatches {...props} setData={setData} handleCallback={handleCallback} />
          }></Route>
          <Route exact path="/public" render={ 
            props => <PublicAllMatches {...props} setData={setData} handleCallback={handleCallback} />
          }></Route>
          <Route exact path="/matchDetails/:matchId" render={ 
            props => <MatchDetails {...props} setData={setData} handleCallback={handleCallback} />
          }></Route>
          <Route exact path="/public/matchDetails/:matchId" render={ 
            props => <PublicMatchDetails {...props} setData={setData} handleCallback={handleCallback} />
          }></Route>
          <Route exact path="/start" render={ 
            props => <Landing {...props} data={data} setData={setData} handleCallback={handleCallback} />
          }></Route> 
          <Route exact path="/firstDetail/:matchId" render={ 
            props => <FirstDetail {...props} data={data} handleCallback={handleFirstDetail} />
          }></Route> 
          <Route exact path="/secondInningsFirstDetails/:matchId" render={ 
            props => <SecondInning {...props} data={data} setData={setData} handleCallback={handleFirstDetail} />
          }></Route> 

          <Route exact path="/newBowler/:matchId" render={ 
            props => <NewBowler {...props} setData={setData} data={data} handleCallback={handleBowler} />
          }></Route> 
          <Route exact path="/wicketPage/:matchId" render={ 
            props => <WicketPage {...props} data={data} setData={setData} handleBowler={handleBowler} his={his}/>
          }></Route> 
            <Route exact path="/matchSummary/:matchId" render={ 
            props => <MatchSummary {...props} data={data} />
          }></Route> 
          </div>
        </Switch>
      </Router>
  {/* :<div>Loading...</div>} */}
    </div>
  );
}

export default App;

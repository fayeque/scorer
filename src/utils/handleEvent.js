const handleEvent = (extra,data,val,history,his,handleBowler,matchId) => {
    if(extra.wide){
        data.bowler.runsGiven += val + 1;
        data[data.batting].runs += val + 1;
        data.bowler.timeline.push({runs:val,extra:'wd',over:data[data.batting].overs})
    }
    if(extra.noBall){
        data.bowler.runsGiven += val + 1;
        data[data.batting].runs += val + 1;
        data.striker.runs += val;
        data.striker.balls += 1;
        if(val == 4){
            data.striker.fours += 1;
        }
        if(val == 6){
            data.striker.six += 1;
        }
        data.bowler.timeline.push({runs:val,extra:'nb',over:data[data.batting].overs})
    }
    if(extra.legBye){
        data[data.batting].runs += val;
        data.bowler.ballsDelivered += 1;
        data.striker.balls += 1;
        data[data.batting].balls += 1;
        data.bowler.timeline.push({runs:val,extra:'lb',over:data[data.batting].overs})
    }
    if(extra.wicket){
        if(!extra.wide && !extra.noBall && !extra.legBye){
            data[data.batting].runs += val;
            data.bowler.ballsDelivered += 1;
            data.bowler.runsGiven += val;
            data.striker.runs += val;
            data[data.batting].balls += 1;
            data.striker.balls += 1;
            data.bowler.timeline.push({runs:val,extra:'W',over:data[data.batting].overs})
        }
        history.push(`/wicketPage/${matchId}`);
        return 0;
    }
    if(!extra.wicket && !extra.wide && !extra.noBall && !extra.legBye){
    data[data.batting].runs += val;
    data.bowler.ballsDelivered += 1;
    data.bowler.runsGiven += val;
    data.striker.runs += val;
    data[data.batting].balls += 1;
    data.striker.balls += 1;
    if(val==0){
        data.striker.dot += 1;
    }
    if(val == 4){
        data.striker.fours += 1;
    }
    if(val == 6){
        data.striker.sixes += 1;
    }
    data.bowler.timeline.push({runs:val,extra:'',over:data[data.batting].overs})
    }

    if(data.bowler.ballsDelivered >= 6){
        console.log("6th ball delivered");
        console.log(data[data.batting].overs);
        data[data.batting].overs = data[data.batting].overs+1;
        data[data.batting].balls = 0;
        data.bowler.overs += 1;
        data.bowler.ballsDelivered = 0;
        // if(handleBowler(data.bowler.name).length == 0){
        //     data[data.bowling].bowlers.push(data.bowler);
        // }
        data[data.bowling].bowlers.push(data.bowler);
        data.bowler={name:"",runsGiven:0,ballsDelivered:0,overs:0,economy:0,wicket:0,timeline:[]};
        his.push(JSON.parse(JSON.stringify(data)));
        // var d=JSON.parse(localStorage.getItem('data'));
        // d[matchId]=data;
        // console.log(d);
        // localStorage.setItem('data',JSON.stringify(d));
        console.log(his);
        history.push(`/newBowler/${matchId}`);
    }else{
    his.push(JSON.parse(JSON.stringify(data)));
   
    // console.log(JSON.parse(localStorage.getItem('data')));
    // var d=JSON.parse(localStorage.getItem('data'));
    // d[matchId]=data;
    // console.log(d);
    // localStorage.setItem('data',JSON.stringify(d));
    console.log(his);
    }
}

export default handleEvent;
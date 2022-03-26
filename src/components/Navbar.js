import React from "react";
import s from "./Navbar.module.css";

const Navbar = () => {
return (
    // <div style={{display:"flex",color:"white",padding:"5px",justifyContent:"space-between",alignItems:"center",backgroundColor:"darkgreen",height:"30px"}} className="parent">
    //     <img  style={{width:"20%",height:"100%"}} src="https://www.freevector.com/uploads/vector/preview/30589/Cricket_Logo_vector_8-01.jpg" />
    //     <button><a href="/start">New Game</a></button>
	//     <button><a href="/">Home</a></button>
    // </div>
    <div style={{display:'flex',height:'8vh',padding:'5px',backgroundColor:'darkgreen',color:'white'}}>
        <h2><a style={{color:"white"}} href="/">Tarbangla</a></h2>
        <h4 style={{paddingTop:'8px',marginLeft:'5px'}}>Scorer</h4>
        <h4 style={{cursor:"pointer",marginLeft:'50px',padding:'2px 5px 2px 5px',border:'1px solid white'}}><a style={{color:"white"}} href="/start">Start Match</a></h4>
    </div>
)
}

export default Navbar;
import React from "react";
import s from "./Navbar.module.css";
import {Link} from 'react-router-dom';
import "../App.css";
const Navbar = (props) => {
    console.log("in navbar");
    console.log(window.location.pathname.includes('public'));
return (
    
    // <div style={{display:"flex",color:"white",padding:"5px",justifyContent:"space-between",alignItems:"center",backgroundColor:"darkgreen",height:"30px"}} className="parent">
    //     <img  style={{width:"20%",height:"100%"}} src="https://www.freevector.com/uploads/vector/preview/30589/Cricket_Logo_vector_8-01.jpg" />
    //     <button><a href="/start">New Game</a></button>
	//     <button><a href="/">Home</a></button>
    // </div>
    <section className={s.navbarSection}>
        <div className={s.parent}>
            <div className={s.left}>
                {window.location.pathname.includes('public') ? <h2><Link to="/public">Tarbangla Sporting</Link></h2> : <h2><Link to="/">Tarbangla Sporting</Link></h2> }
            </div>
            <div className={s.right}>
                {window.location.pathname.includes('public') ? <div><h5 style={{'color':'white'}}>Founder-Miran akhtar</h5><h5 style={{'color':'white'}}>Co-founder-Fayeque Hannan</h5></div>:<h3 className={s.startMatch}><a href="/start">Start Match</a></h3> }
            </div>
        </div>
    </section>  
)
}

export default Navbar;
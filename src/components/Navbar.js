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
    // <React.Fragment>
    <section className={s.navbarSection}>
        <div className={s.parent}>
            <div className={s.left}>
                {localStorage.getItem('privelage') == null || localStorage.getItem('privelage') != 'tarbangla' 
                ? <h2><Link to="/public">Tarbangla Sporting</Link></h2> : 
                <h2><Link to="/">Tarbangla Sporting</Link></h2> }
                {/* <h3><Link to="/orangeCap">Orange Cap</Link></h3> */}
            </div>
            <div className={s.right}>
                {localStorage.getItem('privelage') == null || localStorage.getItem('privelage') != 'tarbangla' ?
                 <div><h2 style={{'color':'white'}}>Dhukki Cup</h2></div>:
                 <h3 className={s.startMatch}><a href="/start">Start Match</a></h3> }
                {/* <h3><Link to="/purpleCap">Purple Cap</Link></h3> */}
            </div>
        </div>
        <div className={s.parent2}>

            <div className={s.left2}>
                <h3><Link to="/public/orangeCap">Orange Cap</Link></h3>
            </div>
            <div className={s.imageContainer}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtqOyti60PKGUNb3GdlHWjWh3EUNmk_vfXTg&usqp=CAU" />
            </div>
            <div className={s.right2}>
                <h3><Link to="/public/purpleCap">Purple Cap</Link></h3>
            </div>
        </div>
    </section>  
    // </React.Fragment>

)
}

export default Navbar;
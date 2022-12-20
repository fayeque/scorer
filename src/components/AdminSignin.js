import React,{useState} from "react";
import s from "./FirstDetail.module.css";
import axios from "axios";
// import fuzzySearch from "../utils/regEx";
const AdminSignin = ({data,setData,history,match,handleCallback}) => {
    const  [formData,setformData] = useState({
        passcode:''
      });

      const onChange=(e) => {
        setformData({...formData,[e.target.name]:e.target.value})
      };

      const onSubmit = (e) => {
            e.preventDefault();
            console.log(e.target.innerText);
            localStorage.setItem('privelage',formData.passcode);  
            // console.log(formData);
            // handleCallback(e.target.innerText,match.params.matchId);
            history.push(`/`);
      }
    return (
        <div>
           <section className={s.ctaSection}>
      <div className="container">
        <div className={s.cta}>
          <form className={s.ctaForm} onSubmit={onSubmit}>
            <div>
              <label for="Team1">
                Admin Passcode
              </label>
              <input
                  value={formData.passcode} onChange={(e) => onChange(e)}
                  id="email-address"
                  name="passcode"
                  type="String"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Passcode"
                />
            </div>
            <button
              type="submit"
              className="btn btnForm">
              Sign in
            </button>
        </form>
        </div>
      </div>
    </section>
        </div>
    )
};

export default AdminSignin;
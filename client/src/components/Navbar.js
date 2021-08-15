import React,{useContext} from "react"
import{Link,useHistory} from "react-router-dom";
import {UserContext} from "../App";

function Navbar() {
  const{state,dispatch}= useContext(UserContext);
  const history = useHistory();
  const renderList= ()=>{
    if(state){
      return[
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/createpost">Createpost</Link></li>,
        <li key="4"><Link to="/myfollowingpost">My following Posts</Link></li>,
        <li>
        <button onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"});
          history.push("/signin");
        }} className="btn waves-effect waves-light #e53935 red darken-1"  >
                LogOut
            </button>
        </li>
      ]
    } else {
      return [
        <li><Link to="/signin">Login</Link></li>,
        <li><Link to="/signup">SignUp</Link></li>
        
      ]
    }
  }
    return (
        <nav>
    <div className="nav-wrapper white" >
      <Link to={state ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right ">
        {renderList()}
      </ul>
    </div>
  </nav>
        
    )
}

export default Navbar

import React,{useState,useContext} from 'react';
import {Link,useHistory} from "react-router-dom";
import M from "materialize-css";
import {UserContext} from "../../App.js";

function Signin() {
    const {state,dispatch}= useContext(UserContext);
    const history= useHistory();
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    const postData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html: "Invalid Email",classes:"#d84315 deep-orange darken-3"})
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=> {
            console.log(data);
            if(data.error){
                
                M.toast({html: data.error,classes:"#d84315 deep-orange darken-3"})
            } else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Successfully SignedIn",classes:"#00e676 green accent-3"});
                history.push("/");
            }
        })
        .catch(err=>
            console.log(err));
    }

    return (
        <div className="my-card"> 
            <div className = "auth-card">
            <h2>Instagram</h2>
            <input 
        type = "text"
        placeholder = "Email"
        value = {email}
        onChange={event=>{
           return setEmail(event.target.value);
        }}
        />
        <input 
        type = "password"
        placeholder = "Password"
        value = {password}
        onChange={event=>{
           return setPassword(event.target.value);
        }}
        />
            <button onClick={()=>postData()} className="btn waves-effect waves-light" >
                Login
            </button>
            <h5>
            <Link to="/signup">Don't have an account?</Link>
        </h5>
            </div>
        </div>
        
    )
}

export default Signin

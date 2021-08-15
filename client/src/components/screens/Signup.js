import React,{useState,useEffect} from 'react'
import {Link,useHistory} from "react-router-dom";
import M from "materialize-css";




function Signup() {

    const history= useHistory();
    const[name,setName]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url)
        uploadFields()
    },[url])

    const uploadPic=()=>{
        const data= new FormData();
        data.append("file",image);
        data.append("upload_preset","Aryan-insta-clone");
        data.append("cloud_name","instaclone-1");
        fetch("https://api.cloudinary.com/v1_1/instaclone-1/image/upload",{
            method:"post",
            body:data,
        })
        .then(res => res.json())
        .then(data=>{
            setUrl(data.url);
        })
        .catch(err => console.log(err))
    }

    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html: "Invalid Email",classes:"#d84315 deep-orange darken-3"})
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=> {
            if(data.error){
                M.toast({html: data.error,classes:"#d84315 deep-orange darken-3"})
            } else{
                M.toast({html: data.message,classes:"#00e676 green accent-3"});
                history.push("/signin");
            }
        })
        .catch(err=>
            console.log(err));
    }

    const postData=()=>{
        if(image){
            uploadPic();
        } else {
            uploadFields();
        }
        
    }

    


    return (
        <div className="my-card"> 
        <div className = "auth-card">
        <h2>Instagram</h2>
        <input 
        type = "text"
        placeholder = "Full Name"
        value = {name}
        onChange={event=>{
           return setName(event.target.value);
        }}
        />
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
         <div className="file-field input-field">
                <div className="btn">
                <span>Upload Profile Picture</span>
                <input type="file"
                    onChange={e=> setImage(e.target.files[0])}
                 />
                </div>
                <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
                </div>
            </div>
        <button onClick={()=>postData()} className="btn waves-effect waves-light" >
            SignUp
        </button>
        <h5>
            <Link to="/signin">Already have an account?</Link>
        </h5>
        </div>
    </div>
    )
}

export default Signup

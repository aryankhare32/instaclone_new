import React,{useState,useEffect} from 'react';
import {useHistory} from "react-router-dom";
import M from "materialize-css";

function Createpost() {

    const[title,setTitle]=useState("");
    const[body,setBody]= useState("");
    const[image,setImage] = useState("");
    const[url,setUrl] = useState("");
    const history = useHistory();
    useEffect(() => {
        if(url){
            fetch("/createpost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+ localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    pic:url
                })
            }).then(res=>res.json())
            .then(data=> {
                if(data.error){
                    M.toast({html: data.error,classes:"#d84315 deep-orange darken-3"})
                } else{
                    M.toast({html: "Successfully Created Post",classes:"#00e676 green accent-3"});
                    history.push("/");
                }
            })
            .catch(err=>
                console.log(err));
        }
        
        
    }, [url])
    const postDetails= ()=>{
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


    return (
        <div className= "card input-field" style={{
            maxWidth:"500px",
            margin:"30px auto",
            padding:"20px", 
            textAlign:"center"
        }}>
            <input
             type="text" 
             placeholder="Title"
             onChange={(e)=>setTitle(e.target.value)}
             value={title}
              />
            <input 
            type="text" 
            placeholder="body" 
            onChange={(e)=>setBody(e.target.value)}
             value={body}
            />
            <div className="file-field input-field">
                <div className="btn">
                <span>Upload Image</span>
                <input type="file"
                    onChange={e=> setImage(e.target.files[0])}
                 />
                </div>
                <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button onClick={()=>postDetails()} className="btn waves-effect waves-dark" >
            Post
        </button>
        </div>
        
    )
}

export default Createpost

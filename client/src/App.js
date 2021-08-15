import React,{useEffect,createContext,useReducer,useContext} from "react";
import{BrowserRouter,Route,Switch,useHistory} from "react-router-dom";
import Navbar  from "./components/Navbar";
import "./App.css";
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Signup from "./components/screens/Signup";
import Profile from "./components/screens/Profile";
import Createpost from "./components/screens/Createpost";
import {reducer,initialState} from "./reducers/userReducer";
import UserProfile from "./components/screens/UserProfile";
import SubscribedUserPost from "./components/screens/SubscribedUserPost"

export const UserContext = createContext();

const Routing=()=>{
  const history = useHistory();
  const{state,dispatch}= useContext(UserContext);
  useEffect(()=>{
    const user= JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER",payload:user});
      // history.push("/");
    } else {
      history.push("/signin");
    }
  },[])
  return(
    <Switch>
<Route exact path="/" >
    <Home />
    </Route>
    <Route path="/signup">
      <Signup></Signup>
    </Route>
    <Route path="/signin">
      <Signin />
    </Route>
    <Route exact path="/profile">
      <Profile />
    </Route>
    <Route path="/createpost">
      <Createpost />
    </Route>
    <Route path="/profile/:userid">
      <UserProfile />
    </Route>
    <Route path="/myfollowingpost">
        <SubscribedUserPost />
    </Route>
    </Switch>
  )
}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar />
    <Routing />
    </BrowserRouter> 
    </UserContext.Provider>
  );
}

export default App;

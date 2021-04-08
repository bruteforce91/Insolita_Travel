import React, { useState, useContext } from "react";
import App from "../App";
import { BrowserRouter as Router,Switch,Route, Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import AuthApi from './AuthApi';
import Cookies from 'js-cookie';
import '../assets/css/routing.css';


/** occorrono le librerie routing e cookie */


//passo 1 
function Routing() {
  const [auth,setAuth]=useState(false)

  const readCookie=()=>{
    const user = Cookies.get("user");
    //console.log("user",typeof user)
    if(user){
        setAuth(true);
      }
    }

    

  React.useEffect(() => {
    readCookie();
      }, [])

      //passo 2
  return (
    <> 
    <AuthApi.Provider value={{auth,setAuth}}>
      <Router>
          <Routes />
      </Router>
    </AuthApi.Provider>  
    </>
    // <>
    //   <Router>
    //     <Redirect to="/home" />
    //     <Route exact path="/home">
    //       <App />
    //     </Route>
    //   </Router>
    // </>
    );
  }
  
  
  //passo 3
  const Routes=() =>{
  const Auth=useContext(AuthApi)
  return(
    <Switch>
      <ProtectedLogin path="/login"  auth={Auth.auth} component={Login} />
      <ProtectedRoute path='/home' auth={Auth.auth} component={Home} />
      <Route path="/"><Redirect to="/login" /></Route>
    </Switch>

  )
}

//component per login
//passo 4
const ProtectedRoute =({auth,component:Component,...rest})=>{
  return(
    <Route //localhost/{...rest} ovvero il path
    {...rest}
    render = {()=> auth? (
      <Component /> //<Home />
      ):
      (
      <Redirect to="/login" />
      )
    }
    />
    
    )
  }
  
  //passo4
  const ProtectedLogin =({auth,component:Component,...rest})=>{
    return(
      <Route 
      {...rest}
      render = {()=> !auth? (
        <Component />
        ):
    (
      <Redirect to="/home" />
      )
    }
    />
    
    )
  }
  export default Routing;
  

  //passo 5
const Login=()=>{
  const Auth=useContext(AuthApi)
  const [ error , setError ] = useState("")
  const userAdmin={user:'team6',psw:'123456'}
  
  //controlla i dati ritornati da LoginForm.js
  const handleOnClick=(params)=>{
    if(params.username === userAdmin.user && params.password === userAdmin.psw){
      console.log("params.username",params.username)
      console.log("params.pass",params.username)
      Auth.setAuth(true);}
    else{setError("E-mail o password errata")}

    Cookies.set("user","loginTrue")
  }

  return(
    <>
    <LoginForm Login={handleOnClick} Error={error} />
    </>
  )

}

//passo5
//component per la Home
const Home =()=>{
  const Auth = useContext(AuthApi)
  
  const handleOnClick = () =>{
      console.log("ciao")
      Auth.setAuth(false);
      Cookies.remove("user");
  }

  return(
    <>
    <div className="container-fluid topbar">
      <div className="row rowTopbar">
        <div className="col textWelcome">
          <h2 className="welcome">Benvenuto</h2>
        </div>
        <div className="col">
          <button onClick={handleOnClick} className="logout btn btn-primary">Logout</button>
        </div>
      </div>
    </div>
    <App />
    </>
  )
}



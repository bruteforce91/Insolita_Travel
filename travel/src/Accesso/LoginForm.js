import React, {useState, useContext } from "react";
import '../assets/css/accesso.css'
import { Redirect } from 'react-router-dom'
// import AuthApi from "./AuthApi";
// import Routing from "./Routing"


function LoginForm({Login,Error}) {
   
    const [params,setParams]=useState({username:"",password:""})



   
        
        //invia i dati inseriti
        const handleSubmit=(event)=>{
            event.preventDefault();
            console.log(params)
            //const isValid = validate();
            //const correctDati=controlloLogin();
            //console.log("correctDati",correctDati)
        //     if(isValid){
        //         setUsername({username:''});
        //         setPassword({password:''})
        //         setDatiNonCorretti({datiNonCorretti:""})
        //         setUsernameError({usernameError:''})
        //         setPasswordError({passwordError:''})
        //     }
        //     if(correctDati){
        //         setDatiCorretti({datiCorretti:true});
        // }
            Login(params)
            //return(<Redirect to="/home" />)
        //console.log("bool",correctDati)
    }

    return (
        // (datiCorretti)?
        //     <Routing /> 
        //     :

        <>
            <form className="formBody" onSubmit={handleSubmit} noValidate>
                <div class="form-group">
                    <h2 className="titleLogin">Login - Travel</h2>
                    {( Error != "") ? (<div className="error">{Error}</div>) : ""}
                    {/* <label for="exampleInputEmail1" className="username">Username</label> */}
                    <input
                        className="form-control"
                        type="text"
                        name="username"
                        placeholder="Username"
                        id="username"
                        onChange={ e => setParams({...params, username:e.target.value,  })}
                        value={params.name} required
                    />
                </div>
                    <div className="form-group">
                        {/* <label for="exampleInputPassword1" className="password">Password</label> */}
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                            id="password"
                            onChange={ e => setParams({...params, password:e.target.value,  })} 
                            value={params.password} required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{marginTop:20}}>ACCEDI</button>
            </form>
        </>
    )
}

export default LoginForm


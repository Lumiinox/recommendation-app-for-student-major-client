import axios from "axios"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../../redux";

export default function AdminLogin (){

    const [emailInput, setEmail] = useState('');
    const [passwordInput, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {updateProfileData} = bindActionCreators(actionCreators, dispatch);

    const loginStatus = useSelector((state: State) => state.userData.loginStatus)
    const status = useSelector((state: State) => state.userData.status)

    const LoginApi = () => {
        console.log(passwordInput);
        axios.post('http://localhost:3001/api/login-admin',{
            email: emailInput,
            password: passwordInput,
        }).then((response)=>{
            const userData = response.data[0];
            console.log(userData);
            updateProfileData(userData.Nama, userData.email, userData.status, "");
            console.log(loginStatus);
            console.log(status);
            navigate('/admin/home');
        })
    }

    return(
        <div className="loginWrapper">
            <h1>Admin Login</h1>
            <label>Email</label>
            <input type="text" onChange={(e) => {setEmail(e.target.value)}}></input>
            <label>Password</label>
            <input type="password" onChange={(e) => {setPassword(e.target.value)}}></input>
            <button onClick={LoginApi}>Log In</button>
        </div>
    )
}
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";

import "./index.style.css";
import "../../styles/index.style.ts";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../../redux";
import { apiLoginStaff, apiLoginStudent } from "../../../database-api";

export default function MainLoginPage(){
    const [usernameIn, setUsernameIn] = useState<string>("");
    const [passwordIn, setPasswordIn] = useState<string>("");

    let container: HTMLElement;
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const loginStatus = useSelector((state: State) => state.userData.loginStatus)
    const status = useSelector((state: State) => state.userData.status)

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {updateProfileData} = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        container = document.getElementById('container')!;
      }, []);

    useEffect(() => {
        const userData = localStorage.getItem('loginUser');
        console.log("FROM LOCAL STORAGE");
        console.log(userData);
        if(userData){
            const parsedUserData = JSON.parse(userData);
            console.log(parsedUserData);
            if(parsedUserData.status === "admin"){
                updateProfileData(parsedUserData.name, parsedUserData.email, parsedUserData.status, 0);
                navigate('/admin/home');
            } else if (parsedUserData.status === "student"){
                updateProfileData(parsedUserData.name, parsedUserData.email, parsedUserData.status, parsedUserData.nim);
                navigate('/student/home');
            }
        }
    })
    
    const staffSignInHandler = () => {
      console.log(container);
      container.classList.toggle("right-panel-active");
    }
    
    const studentSignInHandler = () => {
      console.log(container);
      container.classList.toggle("right-panel-active");
    }
    
    const signInHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, choice: number) => {
        event.preventDefault();
        let data;
        switch(choice){                                      
            case 1: data = await apiLoginStaff(usernameIn, passwordIn);
                    console.log("DATA IS BELLOW HERE");
                    console.log(data);
                    updateProfileData(data.name, data.email, data.status, 0);
                    localStorage.setItem('loginUser', JSON.stringify(data));
                    navigate('/admin/home');
                    break;

            case 2: data = await apiLoginStudent(usernameIn, passwordIn);
                    // console.log(data);
                    updateProfileData(data.name, data.email, data.status, data.nim);
                    localStorage.setItem('loginUser', JSON.stringify(data));
                    navigate('/student/home');
                    break;
        }

        if (status === 1){
            console.log("Hi Admin");
        }
        else if (status === 2){
            console.log("Hi Student");
        }
        else{
            console.log("Test")
        }
    }
    
    return(
        <div className="pageWrapper">
            <div className="container" id="container">
                <div className="form-container staff-container">
                    <form action="#">
                        <h1>Staff</h1>
                        <input type="text" placeholder="Email" onChange={(e) => setUsernameIn(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPasswordIn(e.target.value)}/>
                        <button className="btn" onClick={(event) => signInHandler(event, 1)}>Sign In</button>
                    </form>
                </div>

                <div className="form-container student-container">
                    <form action="#">
                        <h1>Student</h1>
                        <input type="text" placeholder="Email" onChange={(e) => setUsernameIn(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPasswordIn(e.target.value)}/>
                        <button className="btn" onClick={(event) => signInHandler(event, 2)}>Sign In</button>
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Not a staff?</h1>
                            <button className="ghost" onClick={staffSignInHandler}>Sign In as Student</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Not a student?</h1>
                            <button className="ghost" onClick={studentSignInHandler}>Sign In as Staff</button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

    )
}
import { ChildProcess } from "child_process";
import { useEffect, useState } from "react"
import { apiLoginStaff, apiLoginStudent } from "../../../database-api";


import "./MainLoginStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../../redux";
import { updateProfileData } from "../../../redux/action-creators";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";

export default function MainLoginPage(){
    const [usernameIn, setUsernameIn] = useState<string>("");
    const [passwordIn, setPasswordIn] = useState<string>("");

    let container: HTMLElement;
    
    const loginStatus = useSelector((state: State) => state.userData.loginStatus)
    const status = useSelector((state: State) => state.userData.status)

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {updateProfileData} = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        container = document.getElementById('container')!;
      }, []);

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
        console.log("hello");
        let data;
        switch(choice){                                      
            case 1: data = await apiLoginStaff(usernameIn, passwordIn);
                    console.log(data);
                    updateProfileData(data[0].name, data[0].email, data[0].status, "");
                    navigate('/admin/home');
                    break;

            case 2: data = await apiLoginStudent(usernameIn, passwordIn);
                    console.log(data);
                    updateProfileData(data[0].name, data[0].email, data[0].status, data[0].NIM);
                    navigate('/student/home');
                    break;
        }

        if (status === "admin"){
            console.log("Hi Admin");
        }
        else if (status === "student"){
            console.log("Hi Student");
        }
        else{
            console.log("Test")
        }
    }
    
    return(
        <>
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
        </>

    )
}
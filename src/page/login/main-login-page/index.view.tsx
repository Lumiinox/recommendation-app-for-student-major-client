/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";

import "./index.style.css";
import "../../styles/index.style.ts";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../../redux";
import { apiLoginStaff, apiLoginStudent } from "../../../database-api";
import { buttonGhost, loginMainContainer, loginPageWrapper, panelContent, panelLeft, panelRight, panelWrapper, staffFormContainer, studentFormContainer } from "./index.style";

export default function MainLoginPage(){
    const [usernameIn, setUsernameIn] = useState<string>("");
    const [passwordIn, setPasswordIn] = useState<string>("");
    const [isRightPanelActive, setIsRightPanelActive] = useState<boolean>(false);
    
    const status = useSelector((state: State) => state.userData.status)

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {updateProfileData} = bindActionCreators(actionCreators, dispatch);

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
                updateProfileData(parsedUserData.name, parsedUserData.email, parsedUserData.status, parsedUserData.currentId);
                navigate('/student/home');
            }
        }
    })
    
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
        <div css={loginPageWrapper}>
            <div css={loginMainContainer} id="container">
                <div css={staffFormContainer(isRightPanelActive)}>
                    <form action="#">
                        <h1>Staff</h1>
                        <input type="text" placeholder="Email" onChange={(e) => setUsernameIn(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPasswordIn(e.target.value)}/>
                        <button className="btn" onClick={(event) => signInHandler(event, 1)}>Sign In</button>
                    </form>
                </div>

                <div css={studentFormContainer(isRightPanelActive)}>
                    <form action="#">
                        <h1>Student</h1>
                        <input type="text" placeholder="Email" onChange={(e) => setUsernameIn(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPasswordIn(e.target.value)}/>
                        <button className="btn" onClick={(event) => signInHandler(event, 2)}>Sign In</button>
                    </form>
                </div>

                <div css={panelWrapper(isRightPanelActive)}>
                    <div css={panelContent(isRightPanelActive)}>
                        <div css={panelLeft(isRightPanelActive)}>
                            <h1>Not a staff?</h1>
                            <button css={buttonGhost} onClick={() => setIsRightPanelActive(!isRightPanelActive)}>Sign In as Student</button>
                        </div>
                        <div css={panelRight(isRightPanelActive)}>
                            <h1>Not a student?</h1>
                            <button css={buttonGhost} onClick={() => setIsRightPanelActive(!isRightPanelActive)}>Sign In as Staff</button>
                        </div>
                    </div>
                </div> 
            </div>
        </div>

    )
}
/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";

import "../../styles/index.style.ts";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../../redux";
import { apiLoginStaff, apiLoginStudent, apiRegisterAdmin, apiRegisterStudent } from "../../../database-api";
import { buttonGhost, buttonGhostRegist, buttonLoginPage, loginFormPanels, loginMainContainer, loginPageWrapper, panelContent, panelLeft, panelRight, panelWrapper, registrationTitle, registrationWrapper, staffFormContainer, studentFormContainer } from "./index.style";

export default function MainLoginPage(){
    const [usernameIn, setUsernameIn] = useState<string>("");
    const [passwordIn, setPasswordIn] = useState<string>("");
    const [emailRegistIn, setEmailRegistIn] = useState<string>("");
    const [nameRegistIn, setNameRegistIn] = useState<string>("");
    const [passRegistIn, setPassRegistIn] = useState<string>("");
    const [passConfirmIn, setPassConfirm] = useState<string>("");
    const [isRegistrationFormActive, setIsRegistrationFormActive] = useState<boolean>(false);
    const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
    
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
                    updateProfileData(data.name, data.email, data.status, data.currentId);
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
    
    const submitRegistrationData = async () => {
        console.log(nameRegistIn);
        console.log(emailRegistIn);
        console.log(passRegistIn);
        if(!isAdminMode){
            await apiRegisterStudent(nameRegistIn, emailRegistIn, passRegistIn);
            setIsRegistrationFormActive(!isRegistrationFormActive)
        } else {
            await apiRegisterAdmin(nameRegistIn, emailRegistIn, passRegistIn);
            setIsRegistrationFormActive(!isRegistrationFormActive)
        }
    }

    const registrationForm = () => {
        console.log("Show Regist")
        return(
            <div css={registrationWrapper}>
                <h1 css={registrationTitle}>{!isAdminMode ? "Student Registration" : "Staff Registration"}</h1>
                <form>
                    <input type="text" placeholder="Email" onChange={(e) => setEmailRegistIn(e.target.value)}/>
                    <input type="text" placeholder="Name" onChange={(e) => setNameRegistIn(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e) => setPassRegistIn(e.target.value)}/>
                    <input type="password" placeholder="Confirm Password" onChange={(e) => setPassConfirm(e.target.value)}/>
                    <button css={buttonGhostRegist}onClick={submitRegistrationData}>Submit</button>
                    <button css={buttonGhostRegist}onClick={() => setIsRegistrationFormActive(!isRegistrationFormActive)}>Cancel</button>
                </form>
            </div>
        )
    }

    return(
        <div css={loginPageWrapper}>
            <div css={loginMainContainer} id="container">

                {isRegistrationFormActive && registrationForm()}

                <div css={staffFormContainer(isAdminMode)}>
                    <form css={loginFormPanels} action="#">
                        <h1>Staff</h1>
                        <input type="text" placeholder="Email" onChange={(e) => setUsernameIn(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPasswordIn(e.target.value)}/>
                        <button css={buttonLoginPage}onClick={(event) => signInHandler(event, 1)}>Sign In</button>
                        <button css={buttonLoginPage} onClick={() => setIsRegistrationFormActive(!isRegistrationFormActive)}>Register</button>
                    </form>
                </div>

                <div css={studentFormContainer(isAdminMode)}>
                    <form css={loginFormPanels} action="#">
                        <h1>Student</h1>
                        <input type="text" placeholder="Email" onChange={(e) => setUsernameIn(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPasswordIn(e.target.value)}/>
                        <button css={buttonLoginPage} onClick={(event) => signInHandler(event, 2)}>Sign In</button>
                        <button css={buttonLoginPage} onClick={() => setIsRegistrationFormActive(!isRegistrationFormActive)}>Register</button>
                    </form>
                </div>

                <div css={panelWrapper(isAdminMode)}>
                    <div css={panelContent(isAdminMode)}>
                        <div css={panelLeft(isAdminMode)}>
                            <h1>Not a staff?</h1>
                            <button css={buttonGhost} onClick={() => setIsAdminMode(!isAdminMode)}>Sign In as Student</button>
                        </div>
                        <div css={panelRight(isAdminMode)}>
                            <h1>Not a student?</h1>
                            <button css={buttonGhost} onClick={() => setIsAdminMode(!isAdminMode)}>Sign In as Staff</button>
                        </div>
                    </div>
                </div> 
            </div>
        </div>

    )
}
/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";

import "../../styles/index.style.ts";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../../redux";
import { apiLoginStaff, apiLoginStudent, apiRegisterAdmin, apiRegisterStudent } from "../../../database-api";
import { buttonGhost, buttonGhostRegist, buttonLoginPage, errorMsgStyle, loginFormPanels, loginMainContainer, loginPageWrapper, panelContent, panelLeft, panelRight, panelWrapper, registrationTitle, registrationWrapper, staffFormContainer, studentFormContainer } from "./index.style";
import { checkConfirmedPassword, checkEmail, checkPassword } from "../../../functions";

export default function MainLoginPage(){
    const [usernameIn, setUsernameIn] = useState<string>("");
    const [passwordIn, setPasswordIn] = useState<string>("");
    const [emailRegistIn, setEmailRegistIn] = useState<string>("");
    const [nameRegistIn, setNameRegistIn] = useState<string>("");
    const [passRegistIn, setPassRegistIn] = useState<string>("");
    const [passConfirmIn, setPassConfirm] = useState<string>("");

    const [isRegistrationFormActive, setIsRegistrationFormActive] = useState<boolean>(false);
    const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
    const [isStudentCredWrong, setIsStudentCredWrong] = useState<boolean>(false);
    const [isAdminCredWrong, setIsAdminCredWrong] = useState<boolean>(false);

    const [emailCorrectState, setEmailCorrectState] = useState<boolean>(true);
    const [passCorrectState, setPassCorrectState] = useState<boolean>(true);
    const [passMatchState, setPassMatchState] = useState<boolean>(true);
    const [emptyFieldsState, setEmptyFieldsState] = useState<boolean>(true);
    
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
            updateProfileData(parsedUserData.name, parsedUserData.email, parsedUserData.status, parsedUserData.currentId);
            console.log(parsedUserData);
            if(parsedUserData.status === 1){
                console.log("Admin data from storage");            
                navigate(parsedUserData.lastUrl);
            } else if (parsedUserData.status === 2){
                console.log("Admin data from student");
                navigate(parsedUserData.lastUrl);
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
                    const adminDataToLocal = {
                        name: data?.name,
                        email: data?.email,
                        status: data?.status,
                        currentId: data?.currentId,
                        lastUrl: "admin/home"
                    };
                    console.log(adminDataToLocal);
                    if(data !== null){
                        updateProfileData(data.name, data.email, data.status, data.currentId);
                        localStorage.setItem('loginUser', JSON.stringify(adminDataToLocal));
                        navigate(adminDataToLocal.lastUrl);
                    } else {
                        setIsAdminCredWrong(true);
                    }
                    break;

            case 2: data = await apiLoginStudent(usernameIn, passwordIn);
                    console.log(data);
                    const studentDataToLocal = {
                        name: data?.name,
                        email: data?.email,
                        status: data?.status,
                        currentId: data?.currentId,
                        lastUrl: "student/home"
                    };
                    console.log(studentDataToLocal);
                    if(data !== null){
                        updateProfileData(data.name, data.email, data.status, data.currentId);
                        localStorage.setItem('loginUser', JSON.stringify(studentDataToLocal));
                        navigate(studentDataToLocal.lastUrl);
                    } else {
                        setIsStudentCredWrong(true);
                    }
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
    
    const submitVerification = async () => {
        const isFieldsEmpty = !(emailRegistIn !== '' && nameRegistIn !== '' && passRegistIn !== '')
        const isEmailCorrent =  (checkEmail(emailRegistIn));
        const isPasswordCorrect = (checkPassword(passRegistIn));
        const isPasswordMatch = (checkConfirmedPassword(passRegistIn, passConfirmIn))
        console.log(isEmailCorrent);
        console.log(isPasswordCorrect);
        console.log(isPasswordMatch);
        if(isEmailCorrent && isPasswordCorrect && isPasswordMatch){
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
            setEmailCorrectState(true);
            setPassCorrectState(true);
            setPassMatchState(true);
            setEmptyFieldsState(true);
        } else {
            if(!isFieldsEmpty){
                setEmailCorrectState(isEmailCorrent);
                setPassCorrectState(isPasswordCorrect);
                setPassMatchState(isPasswordMatch);
            } else {
                setEmptyFieldsState(!isFieldsEmpty);
            }
            
        }
    }

    const registrationForm = () => {
        console.log("Show Regist")
        return(
            <div css={registrationWrapper}>
                <h1 css={registrationTitle}>{!isAdminMode ? "Student Registration" : "Staff Registration"}</h1>
                <form>
                    <input type="text" placeholder="Email" onChange={(e) => setEmailRegistIn(e.target.value)}/>
                    {!emailCorrectState && <div css={errorMsgStyle}>*Please enter the correct email format</div>}
                    <input type="text" placeholder="Name" onChange={(e) => setNameRegistIn(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e) => setPassRegistIn(e.target.value)}/>
                    {!passCorrectState && <div css={errorMsgStyle}>*Password must be at least 8 characters long and include numbers 0 - 9 and alphabetic characters</div>}
                    <input type="password" placeholder="Confirm Password" onChange={(e) => setPassConfirm(e.target.value)}/>
                    {!passMatchState && <div css={errorMsgStyle}>*Password not match</div>}
                    {!emptyFieldsState && <div css={errorMsgStyle}>*Fields are empty</div>}
                    <button css={buttonGhostRegist}onClick={submitVerification}>Submit</button>
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
                        {isAdminCredWrong && <div css={errorMsgStyle}>*Email or password is wrong</div>}
                        <button css={buttonLoginPage}onClick={(event) => signInHandler(event, 1)}>Sign In</button>
                        <button css={buttonLoginPage} onClick={() => setIsRegistrationFormActive(!isRegistrationFormActive)}>Register</button>
                    </form>
                </div>

                <div css={studentFormContainer(isAdminMode)}>
                    <form css={loginFormPanels} action="#">
                        <h1>Student</h1>
                        <input type="text" placeholder="Email" onChange={(e) => setUsernameIn(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPasswordIn(e.target.value)}/>
                        {isStudentCredWrong && <div css={errorMsgStyle}>*Email or password is wrong</div>}
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
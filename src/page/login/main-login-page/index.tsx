import { ChildProcess } from "child_process";
import { useState } from "react"
import AdminLogin from "../admin-login";
import StudentLogin from "../student-login";

export default function MainLoginPage(){
    const [loginType, setLoginType] = useState("none");

    const ChangeToStudent = () => {
            console.log("login type changed to student");
            setLoginType("student");
            console.log(loginType);
    }

    const ChangeToAdmin = () => {
            console.log("login type changed to admin");
            setLoginType("admin");
    }

    const ChangeToNone = () => {
        console.log("login type changed to none");
            setLoginType("none");
    }
    
    return(
        <div className="mainLoginPageWrapper">
            {loginType === "none" && 
            <>
                <h1>Select Login Type</h1>
                <button onClick={ChangeToStudent}>Student</button>
                <button onClick={ChangeToAdmin}>Admin</button>
            </>}
            {loginType === "student" && 
            <>
                <StudentLogin/>
                <button onClick={ChangeToNone}>Back</button>
            </>}
            {loginType === "admin" && 
            <>
                <AdminLogin/>
                <button onClick={ChangeToNone}>Back</button>
            </>}
        </div>
    )
}
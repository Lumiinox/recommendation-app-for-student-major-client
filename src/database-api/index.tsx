import axios from "axios";
import { updateProfileData } from "../redux/action-creators";

export const apiLoginStaff = async (emailInput: string, passwordInput: string) => {
    console.log("api called")
    const response = await axios.post('http://localhost:3001/api/login-admin',{
        email: emailInput,
        password: passwordInput,
    })
    return response.data;
}

export const apiLoginStudent = async (emailInput: string, passwordInput: string) => {
    console.log("api called")
    const response = await axios.post('http://localhost:3001/api/login-student',{
        email: emailInput,
        password: passwordInput,
    })
    return response.data;
}
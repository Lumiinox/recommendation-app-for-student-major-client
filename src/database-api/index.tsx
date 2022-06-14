import axios from "axios";

export const apiLoginStaff = async (emailInput: string, passwordInput: string) => {
    console.log("api called");
    const response = await axios.post('http://localhost:3001/api/login-admin',{
        email: emailInput,
        password: passwordInput,
    })
    return response.data;
}

export const apiLoginStudent = async (emailInput: string, passwordInput: string) => {
    console.log("api called");
    const response = await axios.post('http://localhost:3001/api/login-student',{
        email: emailInput,
        password: passwordInput,
    })
    return response.data;
}

export const apiSubmitQuestion = async (code_type: string, questionText: string, choice_1: string, choice_2: string, choice_3: string, choice_4: string, answer: string) => {
    console.log("test")
    const response = await axios.post('http://localhost:3001/api/insert/question/', {
      code_type      : code_type,
      questionText    : questionText, 
      choice_1      : choice_1,
      choice_2      : choice_2, 
      choice_3      : choice_3,
      choice_4      : choice_4, 
      answer  : answer,
    })
    return response.data;
}

export const apiGetTestResultData = async () => {
    console.log("api called");
    const response = await axios.get('http://localhost:3001/api/get/test_result');
    return response.data;
}

export const apiShowQuestion = async () => {
    const response = await axios.get('http://localhost:3001/api/get/questions')
    return response.data;
  }

export const apiGetQuestionWithStats = async () => {
    const response = await axios.get('http://localhost:3001/api/get/questions_stat');
    return response.data;
}
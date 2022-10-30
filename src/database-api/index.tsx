import axios from 'axios';

const hostName = 'https://recommendation-app-for-student.herokuapp.com/';

export const apiLoginStaff = async (emailInput: string, passwordInput: string) => {
    console.log('api called');
    const response = await axios.post(`${hostName}api/login-admin`,{
        email: emailInput,
        password: passwordInput,
    });
    console.log("bellow this is a response");
    console.log(response.data[0]);
    const formatedData = {
        name: response.data[0].nameAdmin, 
        email: response.data[0].emailAdmin, 
        status: response.data[0].status, 
        nim: ''
    }
    return formatedData;
}

export const apiLoginStudent = async (emailInput: string, passwordInput: string) => {
    console.log('api called');
    const response = await axios.post(`${hostName}api/login-student`,{
        email: emailInput,
        password: passwordInput,
    });
    const formatedData = {
        name: response.data[0].name, 
        email: response.data[0].email, 
        status: response.data[0].status, 
        nim: response.data[0].NIM,
    }
    return formatedData;
}

export const apiSubmitQuestion = async (code_type: string, questionText: string, choice_1: string, choice_2: string, choice_3: string, choice_4: string, answer: string) => {
    console.log('test')
    const response = await axios.post(`${hostName}api/insert/question/`, {
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
    console.log('api called');
    const response = await axios.get(`${hostName}api/get/test_result`);
    return response.data;
}

export const apiShowQuestion = async () => {
    const response = await axios.get(`${hostName}api/get/questions`)
    return response.data;
  }

export const apiGetQuestionWithStats = async () => {
    const response = await axios.get(`${hostName}api/get/questions_stat`);
    return response.data;
}
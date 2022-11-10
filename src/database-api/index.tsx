import axios from 'axios';
import { HOST_NAME } from '../page/constants/index.constants';

export const apiLoginStaff = async (emailInput: string, passwordInput: string) => {
    console.log('api called');
    const response = await axios.post(`${HOST_NAME}api/login_admin`,{
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
    const response = await axios.post(`${HOST_NAME}api/login_student`,{
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

export const apiSubmitQuestion = async (code_type: number, questionText: string, choice_1: string, choice_2: string, choice_3: string, choice_4: string, answer: string) => {
    console.log('test')
    const response = await axios.post(`${HOST_NAME}api/insert/question/`, {
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

export const apiAddQuestionCategory = async (categoryName: string) => {
    console.log(categoryName);
    const response = await axios.post(`${HOST_NAME}api/new_question_category`, {
        nameCategory: categoryName,
      });
      return response.data;
}

export const apiShowQuestion = async () => {
    const response = await axios.get(`${HOST_NAME}api/get/question`)
    return response.data;
}

export const apiGetQuestionWithStats = async () => {
    const response = await axios.get(`${HOST_NAME}api/get/question_stat`);
    return response.data;
}

export const apiGetQuestionCategory = async (idCategory: number) => {
    const response = await axios.get(`${HOST_NAME}api/get/question_category/${idCategory}`);
    return response.data;
}

export const apiGetAllQuestionCategory = async () => {
    const response = await axios.get(`${HOST_NAME}api/get/question_category_all`);
    return response.data;
}

export const apiGetAllQuestion = async () => {
    const response = await axios.get(`${HOST_NAME}api/get/question`);
    return response.data;
}

export const apiGetTestResultData = async () => {
    console.log('api called');
    const response = await axios.get(`${HOST_NAME}api/get/test_result`);
    return response.data;
}

export const apiGetQuestionRandom = async (codeType: number) => {
    const response = await axios.get(`${HOST_NAME}api/get/question_random/${codeType}`);
    return response.data;
}

export const apiPostTestResult = async (nim: number, scoreTemp: number, dateTime: string, codeType: number) => {
    const response = await axios.post(`${HOST_NAME}api/insert/test_result`,{
        nim: nim,
        score: scoreTemp,
        dateTime: dateTime,
        codeType: codeType,
    })
    return response.data;
}

export const apiGetTestId = async (nim: number, dateTime: string) => {
    const response = await axios.get(`${HOST_NAME}api/get/test_id/${nim}/${dateTime}`);
    return response.data;
}

export const apiPostQuestionHistory = async (stringQuery: string) => {
    const response = await axios.post(`${HOST_NAME}api/insert/question_history`,{
        value_to_be_inserted: stringQuery,
    });
    return response.data;
}
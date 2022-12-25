import axios from "axios";
import { HOST_NAME } from "../page/constants/index.constants";

export const apiLoginStaff = async (
    emailInput: string,
    passwordInput: string
) => {
    console.log("api called");
    const response = await axios.post(`${HOST_NAME}/login_admin`, {
        email: emailInput,
        password: passwordInput,
    });
    console.log("bellow this is a response");
    console.log(response);
    if(response.data.length > 0){
        console.log(response.data[0]);
        const formatedData = {
            name: response.data[0].nameAdmin,
            email: response.data[0].emailAdmin,
            status: response.data[0].status,
            currentId:  response.data[0].idAdmin,
        }
      return formatedData;
    }
    else {
        return null;
    };
};

export const apiLoginStudent = async (
  emailInput: string,
  passwordInput: string
) => {
  console.log("api called");
  const response = await axios.post(`${HOST_NAME}/login_student`, {
    email: emailInput,
    password: passwordInput,
  });
  console.log(response);
  if(response.data.length > 0){
    const formatedData = {
      name: response.data[0].nameStudent,
      email: response.data[0].emailStudent,
      status: response.data[0].status,
      currentId: response.data[0].idStudent,
    };
    return formatedData;
  }
  else {
    return null;
  };
};

export const apiSubmitQuestion = async (
  code_type: number,
  questionText: string,
  choice_1: string,
  choice_2: string,
  choice_3: string,
  choice_4: string,
  answer: string
) => {
  console.log("test");
  const response = await axios.post(`${HOST_NAME}/insert/question/`, {
    code_type: code_type,
    questionText: questionText,
    choice_1: choice_1,
    choice_2: choice_2,
    choice_3: choice_3,
    choice_4: choice_4,
    answer: answer,
  });
  return response.data;
};

export const apiAddQuestionCategory = async (categoryName: string) => {
  console.log(categoryName);
  const response = await axios.post(`${HOST_NAME}/new_question_category`, {
    nameCategory: categoryName,
  });
  return response.data;
};

export const apiRegisterAdmin = async (
  nameAdminIn: string,
  emailAdminIn: string,
  passAdminIn: string
) => {
  const response = await axios.post(`${HOST_NAME}/admin_registration`, {
    nameAdmin: nameAdminIn,
    emailAdmin: emailAdminIn,
    passAdmin: passAdminIn,
  });
  return response.data;
};

export const apiRegisterStudent = async (
    nameStudentIn: string,
    emailStudentIn: string,
    passStudentIn: string
  ) => {
    console.log(nameStudentIn);
    console.log(emailStudentIn);
    console.log(passStudentIn);
    const response = await axios.post(`${HOST_NAME}/student_registration`, {
      nameStudent: nameStudentIn,
      emailStudent: emailStudentIn,
      passStudent: passStudentIn,
    });
    return response.data;
  };

export const apiAddTest = async (questionCategory: number, testName: string, testDuration: number, numberOfQuestions: number) => {
  const response = await axios.post(`${HOST_NAME}/add-test`, {
    questionCategory: questionCategory,
    testName: testName,
    testDuration: testDuration,
    numberOfQuestions:numberOfQuestions,
  });
  return response.data;
};

export const apiDeactivateTest = async (idTest: number) => {
  const response = await axios.post(`${HOST_NAME}/deactivate/test-entry`, {
    idTest: idTest,
  });
  return response.data;
};

export const apiReactivateTest = async (idTest: number) => {
  const response = await axios.post(`${HOST_NAME}/reactivate/test-entry`, {
    idTest: idTest,
  });
  return response.data;
};


export const apiShowQuestion = async () => {
  const response = await axios.get(`${HOST_NAME}/get/question`);
  return response.data;
};

export const apiGetQuestionWithStats = async () => {
  const response = await axios.get(`${HOST_NAME}/get/question_stat`);
  return response.data;
};

export const apiGetQuestionCategory = async (idCategory: number) => {
  const response = await axios.get(
    `${HOST_NAME}/get/question_category/${idCategory}`
  );
  return response.data;
};

export const apiGetAllQuestionCategory = async () => {
  const response = await axios.get(`${HOST_NAME}/get/question_category_all`);
  return response.data;
};

export const apiGetAllQuestion = async () => {
  const response = await axios.get(`${HOST_NAME}/get/question`);
  return response.data;
};

export const apiGetTestResultData = async () => {
  console.log("api called");
  const response = await axios.get(`${HOST_NAME}/get/test_result`);
  return response.data;
};

export const apiGetStudentTestData = async (currentId: number) => {
  console.log("api called");
  const response = await axios.get(`${HOST_NAME}/get/test_result/${currentId}`);
  console.log(response);
  return response.data;
};

export const apiGetQuestionRandom = async (codeType: number, questionAmount: number) => {
  const response = await axios.get(
    `${HOST_NAME}/get/question_random/${codeType}/${questionAmount}`
  );
  return response.data;
};

export const apiPostTestResult = async (
  currentId: number,
  idTest: number,
  scoreTemp: number,
  dateTime: string,
  codeType: number
) => {
  const response = await axios.post(`${HOST_NAME}/insert/test_result`, {
    currentId: currentId,
    idTest: idTest,
    score: scoreTemp,
    dateTime: dateTime,
    codeType: codeType,
  });
  return response.data;
};

export const apiGetTestResultId = async (currentId: number, dateTime: string) => {
  const response = await axios.get(
    `${HOST_NAME}/get/test_id/${currentId}/${dateTime}`
  );
  return response.data;
};

export const apiPostQuestionHistory = async (stringQuery: string) => {
  const response = await axios.post(`${HOST_NAME}/insert/question_history`, {
    value_to_be_inserted: stringQuery,
  });
  return response.data;
};

export const apiGetTestData = async () => {
  const response = await axios.get(`${HOST_NAME}/get/test_data`);
  return response.data;
}

export const apiGetTestResultStudent = async (idStudent: number) => {
  const response = await axios.get(`${HOST_NAME}/get/test_result/${idStudent}`);
  return response.data;
};

export const apiGetTestList = async () => {
  const response = await axios.get(`${HOST_NAME}/get/test_list`);
  return response.data;
}
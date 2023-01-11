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
    document.cookie = '';
    if(response.data){
      sessionStorage.setItem('authToken', response.data.accessToken);
      return response.data;
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
  console.log(response.data);
  document.cookie = '';
  if(response){
    sessionStorage.setItem('authToken', response.data.accessToken);
    return response.data;
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
  },{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  return response.data;
};

export const apiAddQuestionCategory = async (categoryName: string) => {
  console.log(categoryName);
  const response = await axios.post(`${HOST_NAME}/new_question_category`, {
    nameCategory: categoryName,
  },{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
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
  },{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  return response.data;
};

export const apiEditTest = async (questionCategory: number, testName: string, testDuration: number, numberOfQuestions: number, idTest: number) => {
  const response = await axios.post(`${HOST_NAME}/update/test`, {
    questionCategory: questionCategory,
    testName: testName,
    testDuration: testDuration,
    numberOfQuestions: numberOfQuestions,
    idTest: idTest,
  },{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  })
  return response.data;
}

export const apiDeactivateTest = async (idTest: number) => {
  const response = await axios.post(`${HOST_NAME}/deactivate/test-entry`, {
    idTest: idTest,
  },{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  return response.data;
};

export const apiReactivateTest = async (idTest: number) => {
  const response = await axios.post(`${HOST_NAME}/reactivate/test-entry`, {
    idTest: idTest,
  },{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  return response.data;
};


export const apiShowQuestion = async () => {
  const response = await axios.get(`${HOST_NAME}/get/question` ,{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  return response.data;
};

export const apiGetQuestionWithStats = async (tokenIn: string) => {
  console.log("TOKEN IN API");
  console.log(tokenIn);
  const response = await axios.get(`${HOST_NAME}/get/question_stat`, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  return response.data;
};

export const apiGetQuestionCategory = async (idCategory: number) => {
  const response = await axios.get(
    `${HOST_NAME}/get/question_category/${idCategory}`,{
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
      }
    }
  );
  return response.data;
};

export const apiGetAllQuestionCategory = async () => {
  const response = await axios.get(`${HOST_NAME}/get/question_category_all`,{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  return response.data;
};

export const apiGetAllQuestion = async () => {
  const response = await axios.get(`${HOST_NAME}/get/question`,{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  return response.data;
};

export const apiGetTestResultData = async () => {
  console.log("api called");
  const response = await axios.get(`${HOST_NAME}/get/test_result`,{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  return response.data;
};

export const apiGetStudentTestData = async (currentId: number) => {
  console.log("api called");
  const response = await axios.get(`${HOST_NAME}/get/test_result/${currentId}`,{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  console.log(response);
  return response.data;
};

export const apiGetQuestionRandom = async (codeType: number, questionAmount: number) => {
  const response = await axios.get(
    `${HOST_NAME}/get/question_random/${codeType}/${questionAmount}`,{
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
      }
    }
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
  },{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  return response.data;
};

export const apiGetTestResultId = async (currentId: number, dateTime: string) => {
  const response = await axios.get(
    `${HOST_NAME}/get/test_id/${currentId}/${dateTime}`,{
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
      }
    }
  );
  return response.data;
};

export const apiPostQuestionHistory = async (stringQuery: string) => {
  const response = await axios.post(`${HOST_NAME}/insert/question_history`, {
    value_to_be_inserted: stringQuery,
  },{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  return response.data;
};

export const apiGetTestData = async () => {
  const response = await axios.get(`${HOST_NAME}/get/test_data` ,{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  return response.data;
}

export const apiGetTestResultStudent = async (idStudent: number) => {
  console.log("ID STUDENT")
  console.log(idStudent);
  const response = await axios.get(`${HOST_NAME}/get/test_result/${idStudent}` ,{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  return response.data;
};

export const apiGetActiveTest = async () => {
  const response = await axios.get(`${HOST_NAME}/get/active_test` ,{
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  return response.data;
};

export const apiDeleteQuestion = async (questionId: number) => {
  const response = await axios.post(`${HOST_NAME}/delete/question`, {
    questionId: questionId,
  } , {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
    }
  });
  return response.data;
};


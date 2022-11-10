/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { State } from "../../../redux";
import { InitAnswerData } from "./type";
import { QuestionViewComponent } from "../../../component/QuestionView/index.view";
import { ParentGridStyle } from '../../styles/index.style';
import HeaderComp from "../../../component/HeaderComponent/index.view";
import { HOME_MODE, TEST_TITLE } from "../../constants/index.constants";
import { apiGetAllQuestionCategory, apiGetQuestionRandom, apiGetTestId, apiPostQuestionHistory, apiPostTestResult } from "../../../database-api";

interface QuestionsData {
    idQuestion: number;
    idCategory: number;
    answer: string;
    questionText: string;
    questionChoice1: string;
    questionChoice2: string;
    questionChoice3: string;
    questionChoice4: string;
  }

interface AnswerData {
    answer: number;
    correctness: boolean;
}

export default function StudentTest () {
    const [questionsData, setQuestionsData] = useState<QuestionsData[]>([]);
    const [answerData, setAnswerData] = useState<AnswerData[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [score, setScore] = useState<number>();
    const [codeType, setCodeType] = useState<number>(0);
    const navigate = useNavigate();
    const [categoryNameArr, setCategoryNameArr] = useState<Array<string>>([]);
    const [categoryIdArr, setCategoryId] = useState<Array<number>>([]);
    
    useEffect(() => {
        const fetchData = async () => {
          const questionCategoryData = await apiGetAllQuestionCategory();
          console.log(questionCategoryData);
          const categoryNameTemp = [];
          const categoryIdTemp = [];
          for (const i in questionCategoryData){
            categoryNameTemp.push(questionCategoryData[i].nameCategory);
            categoryIdTemp.push(questionCategoryData[i].idCategory);
          }
          setCategoryNameArr(categoryNameTemp);
          setCategoryId(categoryIdTemp);
        }
        fetchData();
      }, [])
    const nim = useSelector((state: State) => state.userData.nim);

    const GetDateandTime = () => {
        let current = new Date();
        let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        let dateTime = cDate + ' ' + cTime;
        return dateTime;
    }

    const GetQuestion = async () =>{
        console.log(codeType)
        const response = await apiGetQuestionRandom(codeType)
        console.log(response);
        setQuestionsData(response);
        const initAnswerData = [] as Array<InitAnswerData>;
        for (let i = 0; i < response.length; i++){
            initAnswerData.push({
                answer: 0,
                correctness: false
            })
        }
        console.log(initAnswerData)
        setAnswerData(initAnswerData);
    }

    const answerDataHandler = (index: number, answer: number) => {
        const tempAnswerData = [...answerData];
        console.log(answerData);
        console.log(tempAnswerData);
        tempAnswerData[index].answer = answer;
        setAnswerData(tempAnswerData);
        console.log(tempAnswerData);
    }

    const SubmitHandler = async () => {
        let counter = 0;
        let tempAnswerData = [...answerData]
        for (let i = 0; i < answerData.length; i++){
            if (tempAnswerData[i].answer === parseInt(questionsData[i].answer)){
                counter = counter + 1;
                tempAnswerData[i].correctness = true;
            }
            else{
                tempAnswerData[i].correctness = false;
            }
        }
        console.log(tempAnswerData);
        const scoreTemp = Math.round(counter * (100/answerData.length));
        console.log(scoreTemp);
        setScore(scoreTemp);

        const dateTime = GetDateandTime();

        await apiPostTestResult(nim, scoreTemp, dateTime, codeType).then((res) => {
            SubmitQuestionHistory(dateTime);
        })
        
        navigate('/student/home');
    }



    const SubmitQuestionHistory = async (dateTime: string) => {
        let stringQuery = ""
        const response = await apiGetTestId(nim, dateTime);
        console.log(response);
        const tempTestId = response[0].idTest;
        for (let i:number = 0; i < questionsData.length; i++){
            stringQuery = stringQuery + `(${(questionsData[i].idQuestion).toString()}, "${tempTestId}", "${answerData[i].answer}", "${answerData[i].correctness}")`
            if (i < questionsData.length - 1){
                stringQuery = stringQuery + ",";
            }
        }
        console.log(stringQuery);
        
        await apiPostQuestionHistory(stringQuery).then((res) => {
            alert("TestDone");
        })
    }
    

    const RadioButtonQuestionType = (choice: number) => {
        if (choice === 1) setCodeType(11);
        else if (choice === 2) setCodeType(21);
    }

    return(
        <div>
            <div css={ParentGridStyle}>
                <HeaderComp headerTitle={TEST_TITLE} headerButtonMode={HOME_MODE}/>
                
                <div>
                    <input type='radio' value="personality" name="question_type" onChange={() => RadioButtonQuestionType(1)}/>Personality
                    <input type='radio' value="kemampuanDasar" name="question_type" onChange={() => RadioButtonQuestionType(2)}/>Kemampuan Dasar
                    <button onClick={GetQuestion}>Get Questions</button>
                    {questionsData.map((value, index) => {
                        return (
                            <QuestionViewComponent 
                            key={index}
                            questionId={value.idQuestion}
                            codeType={categoryNameArr[categoryIdArr.indexOf(value.idCategory)]}
                            questionText={value.questionText}
                            choice1={value.questionChoice1}
                            choice2={value.questionChoice2}
                            choice3={value.questionChoice3}
                            choice4={value.questionChoice4}
                            answer={value.answer}
                            index = {index}
                            answerDataHandler = {answerDataHandler}   
                            isATest={true}       
                            />
                        )
                    })}
                    <button onClick={SubmitHandler}>Submit</button>
                </div>
            </div>
      </div>
    )
}
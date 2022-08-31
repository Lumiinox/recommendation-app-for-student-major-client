import React from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShowQuestion } from "../../../component/question";
import { State } from "../../../redux";
import { InitAnswerData } from "./type";

interface QuestionsData {
    question_id: number;
    code_type: string;
    questionText: string;
    choice_1: string;
    choice_2: string;
    choice_3: string;
    choice_4: string;
    answer: string;
  }

interface AnswerData {
    answer: number;
    correctness: boolean;
}

export default function StudentTest () {
    const [questionsData, setQuestionsData] = useState<QuestionsData[]>([]);
    const [answerData, setAnswerData] = useState<AnswerData[]>([]);
    const [score, setScore] = useState<Number>();
    const [codeType, setCodeType] = useState<string>("");
    const navigate = useNavigate();

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
        await axios.get(`http://localhost:3001/api/get/questions-random/${codeType}`,)
        .then((response) => {
            console.log(response.data);
            setQuestionsData(response.data);
            const initAnswerData = [] as Array<InitAnswerData>;
            for (let i = 0; i < response.data.length; i++){
                initAnswerData.push({
                    answer: 0,
                    correctness: false
                })
            }
            setAnswerData(initAnswerData);
        })
    }

    const answerDataHandler = (index: number, answer: number) => {
        const tempAnswerData = [...answerData];
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
        const scoreTemp = counter * 20;
        console.log(scoreTemp);
        setScore(scoreTemp);

        const dateTime = GetDateandTime();

        await axios.post('http://localhost:3001/api/insert/test_result',{
            nim: nim,
            score: scoreTemp,
            dateTime: dateTime,
            codeType: codeType,
        }).then((res) => {
            SubmitQuestionHistory(dateTime);
        })
        
        navigate('/student/home');
    }



    const SubmitQuestionHistory = async (dateTime: string) => {
        let stringQuery = ""
        await axios.get(`http://localhost:3001/api/get/test_id/${nim}/${dateTime}`,
        ).then((response) => {
            const tempTestId = response.data[0].test_id;
            for (let i:number = 0; i < questionsData.length; i++){
                stringQuery = stringQuery + `(${(questionsData[i].question_id).toString()}, "${tempTestId}", "${answerData[i].answer}", "${answerData[i].correctness}")`
                if (i < questionsData.length - 1){
                    stringQuery = stringQuery + ",";
                }
            }
            console.log(stringQuery);
        })
        
        await axios.post('http://localhost:3001/api/insert/question_history',{
            value_to_be_inserted: stringQuery,
        }).then((res) => {
            alert("TestDone");
        })
    }
    

    const RadioButtonQuestionType = (choice: number) => {
        if (choice == 1) setCodeType("Personality");
        else if (choice == 2) setCodeType("KemampuanDasar");
    }
    return(
        <>
            <input type='radio' value="personality" name="question_type" onChange={() => RadioButtonQuestionType(1)}/>Personality
            <input type='radio' value="kemampuanDasar" name="question_type" onChange={() => RadioButtonQuestionType(2)}/>Kemampuan Dasar
            <button onClick={GetQuestion}>Get Questions</button>
            {questionsData.map((value, index) =>
                    <ShowQuestion
                        key = {index}
                        index = {index}
                        question = {value.questionText}
                        choice_1 = {value.choice_1}
                        choice_2 = {value.choice_2}
                        choice_3 = {value.choice_3}
                        choice_4 = {value.choice_4}
                        answerDataHandler = {answerDataHandler}
                    />
            )}
            <button onClick={SubmitHandler}>Submit</button>
        </>
    )
}
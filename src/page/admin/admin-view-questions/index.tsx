import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetQuestionWithStats } from "../../../database-api";

interface QuestionWithStatProps {
    code_type: string,
    false_answer: number | null,
    questionText: string,
    question_id: number,
    true_answer: number | null
}

export default function ViewQuestionsPage(){
    const [questionWithStat, setQuestionWithStat] = useState<QuestionWithStatProps[]>([])

    const navigate = useNavigate();
    
    const GetQuestionWithStats = async () => {
        const data = await apiGetQuestionWithStats();
        setQuestionWithStat(data);
    }

    const HomeBtnHandler = () => {
        navigate('/admin/home');
    }
    return(
        <>
            <h1>List of Test Result</h1>
            <button onClick={HomeBtnHandler}>Home</button>
            <button onClick={GetQuestionWithStats}>Get Questions With Stats</button>
            <div>
                {questionWithStat.map((data) => {
                    return (
                        <>
                            <br/>
                            <br/>
                            <p>{`${data.question_id}`}</p>
                            <p>{`${data.code_type}`}</p>
                            <p>{`${data.questionText}`}</p>
                            <p>{`Correct Answer: ${data.true_answer}`}</p>
                            <p>{`Wrong Answer: ${data.false_answer}`}</p>
                        </>
                    )
                })}
            </div>
        </>
    )
}
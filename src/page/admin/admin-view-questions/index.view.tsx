/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetQuestionWithStats } from "../../../database-api";
import { ButtonStyle, HeaderButtonStyle, HeaderOneStyle, HeadWrapperStyle, ParentGridStyle } from "../../styles/index.style";

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
        <div>
            <div css={ParentGridStyle}>
                <div css={HeadWrapperStyle}>
                        <div>BINUS</div>
                        <div><b>Create Question</b></div>
                        <div css={HeaderButtonStyle} onClick={HomeBtnHandler}>Home</div>
                </div>
                
                <h1 css={HeaderOneStyle}>View Question</h1>
                <button css={ButtonStyle} onClick={HomeBtnHandler}>Home</button>
                <button css={ButtonStyle} onClick={GetQuestionWithStats}>Get Questions With Stats</button>
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
            </div>
        </div>
    )
}
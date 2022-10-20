/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import HeaderComp from "../../../component/HeaderComponent/index.view";
import { apiGetQuestionWithStats } from "../../../database-api";
import { HOME_MODE, VIEW_QUESTION_TITLE } from "../../constants/index.constants";
import { ParentGridStyle } from "../../styles/index.style";
import { falseColumnStyle, mainContentRow, noColumnStyle, questionColumnStyle, tableContainer, tableContent, tableHead, tableHeadRow, trueColumnStyle, typeColumnStyle, wholeContentWrapperStyle } from "./index.style";

interface QuestionWithStatProps {
    code_type: string,
    false_answer: number | null,
    questionText: string,
    question_id: number,
    true_answer: number | null
}

export default function ViewQuestionsPage(){
    const [questionWithStat, setQuestionWithStat] = useState<Array<QuestionWithStatProps>>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await apiGetQuestionWithStats();
            setQuestionWithStat(data);
        }
        fetchData();
      }, [])
      
    return(
        <div>
            <div css={ParentGridStyle}>
                <HeaderComp headerTitle={VIEW_QUESTION_TITLE} headerButtonMode={HOME_MODE}/>

                <div css={wholeContentWrapperStyle}>
                    <div>
                        <div css={tableContainer}>
                            <table css={tableHead}>
                                <tr css={tableHeadRow}>
                                    <td css={noColumnStyle}>No</td>
                                    <td css={typeColumnStyle}>Type</td>
                                    <td css={questionColumnStyle}>Question</td>
                                    <td css={trueColumnStyle}>True</td>
                                    <td css={falseColumnStyle}>False</td>
                                </tr>
                            </table>
                            <table css={tableContent}>
                                {questionWithStat.map((data, index) => {
                                    return (
                                        <tr css={mainContentRow}>
                                            <td css={noColumnStyle}>{index+1}</td>
                                            <td css={typeColumnStyle}>{data.code_type}</td>
                                            <td css={questionColumnStyle}>{data.questionText}</td>
                                            <td css={trueColumnStyle}>{data.true_answer}</td>
                                            <td css={falseColumnStyle}>{data.false_answer}</td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
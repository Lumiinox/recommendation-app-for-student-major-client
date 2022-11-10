/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import HeaderComp from "../../../component/HeaderComponent/index.view";
import { apiGetAllQuestionCategory, apiGetQuestionWithStats } from "../../../database-api";
import { HOME_MODE, VIEW_QUESTION_TITLE } from "../../constants/index.constants";
import { ParentGridStyle } from "../../styles/index.style";
import { falseColumnStyle, mainContentRow, noColumnStyle, questionColumnStyle, tableContainer, tableContent, tableHead, tableHeadRow, trueColumnStyle, typeColumnStyle, wholeContentWrapperStyle } from "./index.style";

interface QuestionWithStatProps {
    idCategory: number,
    falseAnswer: number | null,
    questionText: string,
    idQuestion: number,
    trueAnswer: number | null
}

export default function ViewQuestionsPage(){
    const [questionWithStat, setQuestionWithStat] = useState<Array<QuestionWithStatProps>>([]);
    const [categoryNameArr, setCategoryNameArr] = useState<Array<string>>([]);
    const [categoryIdArr, setCategoryId] = useState<Array<number>>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await apiGetQuestionWithStats();
            console.log(data);
            setQuestionWithStat(data);
        }
        fetchData();
      }, [])
    
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
                                <tbody>
                                    {questionWithStat ?  questionWithStat.map((data, index) => {
                                        return (
                                            <tr css={mainContentRow} key={index}>
                                                <td css={noColumnStyle}>{index+1}</td>
                                                <td css={typeColumnStyle}>{categoryNameArr[categoryIdArr.indexOf(data.idCategory)]}</td>
                                                <td css={questionColumnStyle}>{data.questionText}</td>
                                                <td css={trueColumnStyle}>{data.trueAnswer}</td>
                                                <td css={falseColumnStyle}>{data.falseAnswer}</td>
                                            </tr>
                                        )
                                    }) : "No Data"}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
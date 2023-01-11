/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import HeaderComp from '../../../component/HeaderComponent/index.view';
import { apiGetAllQuestionCategory, apiGetTestResultData } from '../../../database-api';
import { updateLastUrl } from '../../../functions';
import { HOME_MODE_ADMIN, TEST_RESULT_TITLE } from '../../constants/index.constants';
import { ParentGridStyle } from '../../styles/index.style';
import { dateColumnStyle, mainContentRow, nameColumnStyle, nimColumnStyle, scoreColumnStyle, tableContainer, tableContent, tableHead, tableHeadRow, typeColumnStyle, wholeContentWrapperStyle } from './index.style';

interface TestResultDataProps {
    idCategory: number,
    idStudent: number,
    idTest: number,
    nameStudent: string,
    testDate: string,
    testScore: number,
}

export default function ListOfTestResult(){
    const [testResultData, setTestResultData] = useState<TestResultDataProps[]>([]);
    const [categoryNameArr, setCategoryNameArr] = useState<Array<string>>([]);
    const [categoryIdArr, setCategoryId] = useState<Array<number>>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await apiGetTestResultData();
            console.log(data);
            setTestResultData(data);
        }
        fetchData();
      }, [])
    
    useEffect(() => {
        updateLastUrl(window.location.pathname);
    }, []);
    
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
                <div>
                    <HeaderComp headerTitle={TEST_RESULT_TITLE} headerButtonMode={HOME_MODE_ADMIN}/>
                </div>


                <div css={wholeContentWrapperStyle}>
                    <div>
                        <div css={tableContainer}>
                            <table css={tableHead}>
                                <tr css={tableHeadRow}>
                                    <td css={nimColumnStyle}>ID</td>
                                    <td css={nameColumnStyle}>Name</td>
                                    <td css={typeColumnStyle}>Type</td>
                                    <td css={scoreColumnStyle}>Score</td>
                                    <td css={dateColumnStyle}>Date</td>
                                </tr>
                            </table>
                            <table css={tableContent}>
                                <tbody>
                                    {testResultData.map((data, index) => {
                                        return (
                                            <tr css={mainContentRow}>
                                                <td css={nimColumnStyle}>{data.idStudent}</td>
                                                <td css={nameColumnStyle}>{data.nameStudent}</td>
                                                <td css={typeColumnStyle}>{categoryNameArr[categoryIdArr.indexOf(data.idCategory)]}</td>
                                                <td css={scoreColumnStyle}>{data.testScore}</td>
                                                <td css={dateColumnStyle}>{data.testDate.slice(0,16).replace('T', ' | ')}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}
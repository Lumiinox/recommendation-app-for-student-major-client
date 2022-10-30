/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import HeaderComp from '../../../component/HeaderComponent/index.view';
import { apiGetTestResultData } from '../../../database-api';
import { HOME_MODE, TEST_RESULT_TITLE } from '../../constants/index.constants';
import { ParentGridStyle } from '../../styles/index.style';
import { dateColumnStyle, mainContentRow, nameColumnStyle, nimColumnStyle, scoreColumnStyle, tableContainer, tableContent, tableHead, tableHeadRow, typeColumnStyle, wholeContentWrapperStyle } from './index.style';

interface TestResultDataProps {
    NIM: string,
    name: string,
    code_type: string,
    score: string,
    test_date: string
}

export default function ListOfTestResult(){
    const [testResultData, setTestResultData] = useState<TestResultDataProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await apiGetTestResultData();
            setTestResultData(data);
        }
        fetchData();
      }, [])

    return(
        <div>
            <div css={ParentGridStyle}>
                <HeaderComp headerTitle={TEST_RESULT_TITLE} headerButtonMode={HOME_MODE}/>

                <div css={wholeContentWrapperStyle}>
                    <div>
                        <div css={tableContainer}>
                            <table css={tableHead}>
                                <tr css={tableHeadRow}>
                                    <td css={nimColumnStyle}>NIM</td>
                                    <td css={nameColumnStyle}>Name</td>
                                    <td css={typeColumnStyle}>Type</td>
                                    <td css={scoreColumnStyle}>Score</td>
                                    <td css={dateColumnStyle}>Date</td>
                                </tr>
                            </table>
                            <table css={tableContent}>
                                {testResultData.map((data, index) => {
                                    return (
                                        <tr css={mainContentRow}>
                                            <td css={nimColumnStyle}>{data.NIM}</td>
                                            <td css={nameColumnStyle}>{data.name}</td>
                                            <td css={typeColumnStyle}>{data.code_type}</td>
                                            <td css={scoreColumnStyle}>{data.score}</td>
                                            <td css={dateColumnStyle}>{data.test_date.slice(0,16).replace('T', ' | ')}</td>
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
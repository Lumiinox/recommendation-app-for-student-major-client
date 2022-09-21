/** @jsxImportSource @emotion/react */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetTestResultData } from '../../../database-api';
import { ButtonStyle, HeaderButtonStyle, HeaderOneStyle, HeadWrapperStyle, ParentGridStyle } from '../../styles/index.style';
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

    const navigate = useNavigate();

    const HomeBtnHandler = () => {
        navigate('/admin/home');
    }
    return(
        <div>
            <div css={ParentGridStyle}>
                <div css={HeadWrapperStyle}>
                    <div>BINUS</div>
                    <div><b>Test Result</b></div>
                    <div css={HeaderButtonStyle} onClick={HomeBtnHandler}>Home</div>
                </div>

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
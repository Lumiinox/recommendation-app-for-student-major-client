/** @jsxImportSource @emotion/react */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetTestResultData } from '../../../database-api';
import { ButtonStyle, HeaderButtonStyle, HeaderOneStyle, HeadWrapperStyle, ParentGridStyle } from '../../styles/index.style';

interface TestResultDataProps {
    NIM: string,
    name: string,
    code_type: string,
    score: string,
    test_date: string
}

export default function ListOfTestResult(){
    const [testResultData, setTestResultData] = useState<TestResultDataProps[]>([]);

    const navigate = useNavigate();
    
    const GetTestResultData = async () => {
        const data = await apiGetTestResultData();
        setTestResultData(data);
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
                
                <h1 css={HeaderOneStyle}>List of Test Result</h1>
                <button css={ButtonStyle} onClick={HomeBtnHandler}>Home</button>
                <button css={ButtonStyle} onClick={GetTestResultData}>Get Test Result</button>
                <div>
                    {testResultData.map((data) => {
                        return (
                            <>
                                <br/>
                                <br/>
                                <p>{`${data.NIM}`}</p>
                                <p>{`${data.name}`}</p>
                                <p>{`${data.code_type}`}</p>
                                <p>{`${data.score}`}</p>
                                <p>{`${data.test_date}`}</p>
                            </>
                        )
                    })}
                </div>
            </div>
        </div> 
    )
}
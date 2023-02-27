/** @jsxImportSource @emotion/react */

import './index.style.ts';
import HeaderComp from "../../../component/HeaderComponent/index.view";
import { HOME_MODE_STUDENT } from "../../constants/index.constants";
import { StudentTestResultWrapper, testResultBoxHeader, TestResultContentHeadListStyle, TestResultContentListStyle, testResultWrapper } from './index.style';
import { useSelector } from 'react-redux';
import { State } from '../../../redux';
import { useEffect, useState } from 'react';
import { apiGetStudentTestData } from '../../../database-api';
import { updateLastUrl } from '../../../functions';
import { ParentGridStyle } from '../../styles/index.style';

interface testResultData {
  idStudent: number;
  idTest: number;
  nameStudent: string;
  testScore: number;
  nameTest: string;
}

const skyBlue = '#0098D7';
// const darkGray = '#5F5F5F';

export default function StudentTestResult () {
  const [testResultData, setTestResultData] = useState<Array<testResultData>>([]);
  const currentId = useSelector((state: State) => state.userData.currentId);

  useEffect(() =>{
    const fetchData = async () => {
      
      
      const response = await apiGetStudentTestData(currentId);
      
      setTestResultData(response);
    }
    fetchData();
  }, [currentId]); 

  useEffect(() => {
    updateLastUrl(window.location.pathname);
  }, [])

  return(
    <div css={ParentGridStyle}>
      <div>
        <HeaderComp headerTitle={"Student Test Result"} headerButtonMode={HOME_MODE_STUDENT}/>
      </div>

      <div>
        <div css={StudentTestResultWrapper}>
          <div css={testResultWrapper}>
            <div css={TestResultContentHeadListStyle}>
                <div>Test Name</div>
                <div>Score</div>
              </div>
              {testResultData.map((data: any) => {
                return(
                  <div css={TestResultContentListStyle}>
                    <div css={testResultBoxHeader(skyBlue)}>{data.nameTest}</div>
                    <div>{data.testScore}</div>
                  </div>
                )
              })}
          </div>
        </div>  
      </div>
    </div>
  )
}
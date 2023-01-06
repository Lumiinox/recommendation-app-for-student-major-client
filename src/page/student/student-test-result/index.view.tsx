/** @jsxImportSource @emotion/react */

import './index.style.ts';
import HeaderComp from "../../../component/HeaderComponent/index.view";
import { HOME_MODE_STUDENT } from "../../constants/index.constants";
import { StudentTestResultWrapper, testResultBoxHeader, TestResultContentHeadListStyle, TestResultContentListStyle } from './index.style';
import { useSelector } from 'react-redux';
import { State } from '../../../redux';
import { useEffect, useState } from 'react';
import { apiGetStudentTestData } from '../../../database-api';
import { ContentCardStyle } from '../../styles/index.style';
import { updateLastUrl } from '../../../functions';

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
  const studentName = useSelector((state: State) => state.userData.name);

  useEffect(() =>{
    const fetchData = async () => {
      console.log("TESTING");
      console.log(studentName);
      console.log(currentId);
      const response = await apiGetStudentTestData(currentId);
      console.log(response);
      setTestResultData(response);
    }
    fetchData();
  }, [currentId]); 

  useEffect(() => {
    updateLastUrl(window.location.pathname);
  }, [])

  return(
    <div>
      <HeaderComp headerTitle={"Student Test Result"} headerButtonMode={HOME_MODE_STUDENT}/>
      <div css={StudentTestResultWrapper}>
        <div css={ContentCardStyle}>
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


      {/* <div>
        <div css={testResultBoxStyle}>
          <h2 css={testResultBoxHeader(darkGray)}>DEF Test</h2>
          <h4>not yet</h4>
        </div>
      </div> */}
    </div>
  )
}
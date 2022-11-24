/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { CustomDropDown } from '../../../component/DropdownComponent/index.view';
import HeaderComp from '../../../component/HeaderComponent/index.view';
import { CREATE_QUESTION_TITLE, HOME_MODE_ADMIN } from '../../constants/index.constants';
import { FormSectionStyle, FormTextAreaStyle, FormTitleStle, ParentGridStyle } from '../../styles/index.style';
import { AddQuizFormStyle, formContainer } from './index.style';
import { apiAddTest, apiGetAllQuestionCategory } from '../../../database-api';

export default function AdminCreateQuiz (){
    const [questionCategory, setQuestionCategory] = useState(0);
    const [testName, setTestName] = useState<string>('');
    const [testDuration, setTestDuration] = useState<number>(0);
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
    const [categoryNameArr, setCategoryNameArr] = useState<Array<string>>([]);
    const [categoryIdArr, setCategoryId] = useState<Array<number>>([]);
  
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const handleSubmit = async () => {
        console.log(questionCategory);
        console.log(testName);
        console.log(testDuration);
        console.log(numberOfQuestions);
        await apiAddTest(questionCategory, testName, testDuration, numberOfQuestions);
    }

    return(
        <div>
            <div css={ParentGridStyle}>
                <HeaderComp headerTitle={CREATE_QUESTION_TITLE} headerButtonMode={HOME_MODE_ADMIN}/>

                <div css={formContainer}>
                    <div css={AddQuizFormStyle}>
                        <h2>Create Test</h2>
                        <div>
                            <div css={FormSectionStyle}>
                                <div css={FormTitleStle}>Test Name</div>
                                <input css={FormTextAreaStyle} name="testName" onChange={(e) => {setTestName(e.target.value)}}></input>
                            </div>
                            <div css={FormSectionStyle}>
                                <div css={FormTitleStle}>Question Category</div>
                                <CustomDropDown dropdownName={categoryNameArr} dropdownId={categoryIdArr} onClickHandler={setQuestionCategory}/>
                            </div>
                            <div css={FormSectionStyle}>
                                <div css={FormTitleStle}>Test Duration (in seconds)</div>
                                <input css={FormTextAreaStyle} name="testDuration" onChange={(e) => {setTestDuration(Number(e.target.value))}}></input>
                            </div>
                            <div css={FormSectionStyle}>
                                <div css={FormTitleStle}>Number of Questions</div>
                                <input css={FormTextAreaStyle} name="numberQuestion" onChange={(e) => {setNumberOfQuestions(Number(e.target.value))}}></input>
                            </div>
            
                            <button onClick={handleSubmit}>Submit</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
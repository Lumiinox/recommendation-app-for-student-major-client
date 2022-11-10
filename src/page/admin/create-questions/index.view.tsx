/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { apiAddQuestionCategory, apiGetAllQuestion, apiGetAllQuestionCategory, apiSubmitQuestion } from '../../../database-api';
import '../../styles/index.style.ts';
import {
  CreateQuestionFormWrapperStyle,
  CreateQuestionFormStyle,
  CreateQuestionContentWrapper,
  QuestionListWrapperStyle,
  AnswerChoiceLabelStyle,
  QuestionLabelStyle,
  FormTitleStle,
  FormSectionStyle,
  FormTextAreaStyle,
  FormInputTextStyle,
} from './index.style';
import { ParentGridStyle, RegularButtonStyle } from '../../styles/index.style';
import { QuestionViewComponent } from '../../../component/QuestionView/index.view';
import HeaderComp from '../../../component/HeaderComponent/index.view';
import { CREATE_QUESTION_TITLE, HOME_MODE } from '../../constants/index.constants';
import { CustomDropDown } from '../../../component/DropdownComponent/index.view';

interface DataPertanyaan {
  idQuestion: number;
  idCategory: number;
  answer: string;
  questionText: string;
  questionChoice1: string;
  questionChoice2: string;
  questionChoice3: string;
  questionChoice4: string;
}

export default function AdminCreateQuestion (){
    
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [questionCategory, setQuestionCategory] = useState(0);
  const [questionText, setQuestionText] = useState('');
  const [choice_1, setChoice1] = useState('');
  const [choice_2, setChoice2] = useState('');
  const [choice_3, setChoice3] = useState('');
  const [choice_4, setChoice4] = useState('');
  const [answer, setAnswer] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [displayCreateQuestionForm, setDisplayCreateQuestionForm] = useState(false);
  const [displayCategoryQuestionForm, setDisplayCategoryQuestionForm] = useState(false);
  const [pageHeight, setPageHeight] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const [dataPertanyaan, setDataPertanyaan] = useState<Array<DataPertanyaan>>([]);
  const [categoryNameArr, setCategoryNameArr] = useState<Array<string>>([]);
  const [categoryIdArr, setCategoryId] = useState<Array<number>>([]);


  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const questionData = await apiGetAllQuestion();
      const questionCategoryData = await apiGetAllQuestionCategory();
      console.log(questionCategoryData);
      const categoryNameTemp = [];
      const categoryIdTemp = [];
      for (const i in questionCategoryData){
        categoryNameTemp.push(questionCategoryData[i].nameCategory);
        categoryIdTemp.push(questionCategoryData[i].idCategory);
      }
      setDataPertanyaan(questionData);
      setCategoryNameArr(categoryNameTemp);
      setCategoryId(categoryIdTemp);
    }
    fetchData();
  }, [])

  const SubmitQuestion = async () => {
    console.log("test")
    await apiSubmitQuestion(questionCategory, questionText, choice_1, choice_2, choice_3, choice_4, answer);
    ShowFormHandler(1);
    RefreshQuestionList();
  }

  const SubmitCategory = async () => {
    console.log(categoryName);
    await apiAddQuestionCategory(categoryName);
    ShowFormHandler(2);
  }

  const ShowFormHandler = (type: number) => {
    const tempPageHeight = divRef.current?.clientHeight as number;
    const tempPageWidth = divRef.current?.clientWidth as number;
    console.log(tempPageHeight);
    if(tempPageHeight > window.innerHeight){
      setPageHeight(tempPageHeight + 50);
    } else {
      setPageHeight(window.innerHeight + 50);
    }

    setPageWidth(tempPageWidth);
    if(type === 1){
      setDisplayCreateQuestionForm(!displayCreateQuestionForm);
    } else if (type === 2) {
      setDisplayCategoryQuestionForm(!displayCategoryQuestionForm);
    }

  }

  const CreateQuestionForm = () => {
    return(
      <div css={CreateQuestionFormWrapperStyle(pageHeight, pageWidth)}>
        <div>
          <div css={CreateQuestionFormStyle}>
            <h2>Create Question</h2>
            <div className="form">

              <div css={FormSectionStyle}>
                <div css={FormTitleStle}>Question Type</div>
                <CustomDropDown dropdownName={categoryNameArr} dropdownId={categoryIdArr} onClickHandler={setQuestionCategory}/>
              </div>

              <div css={FormSectionStyle}>
                <div css={FormTitleStle}>Question</div>
                <textarea css={FormTextAreaStyle} name="pertanyaan" onChange={(e) => {setQuestionText(e.target.value)}}></textarea>
              </div>

              <div css={FormSectionStyle}>
                <div css={FormTitleStle}>Answer Choice</div>
                <div css={AnswerChoiceLabelStyle}>
                  <div css={QuestionLabelStyle}>A</div>
                  <input css={FormInputTextStyle}  type="text" name="pilihan1" onChange={(e) => {setChoice1(e.target.value)}}></input>
                  <div css={QuestionLabelStyle}>B</div>
                  <input css={FormInputTextStyle}  type="text" name="pilihan2" onChange={(e) => {setChoice2(e.target.value)}}></input>
                  <div css={QuestionLabelStyle}>C</div>
                  <input css={FormInputTextStyle}  type="text" name="pilihan3" onChange={(e) => {setChoice3(e.target.value)}}></input>
                  <div css={QuestionLabelStyle}>D</div>
                  <input css={FormInputTextStyle}  type="text" name="pilihan4" onChange={(e) => {setChoice4(e.target.value)}}></input>
                </div>
              </div>

              <div css={FormSectionStyle}>
                <div css={FormTitleStle}>Correct Answer</div>
                <input type="text" name="kunciJawaban" onChange={(e) => {setAnswer(e.target.value)}}></input>
              </div>

              <button css={RegularButtonStyle} onClick={SubmitQuestion}>Submit</button>
              <button css={RegularButtonStyle} onClick={() => ShowFormHandler(1)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const AddNewCategoryForm = () => {
    return(
      <div css={CreateQuestionFormWrapperStyle(pageHeight, pageWidth)}>
        <div>
          <div css={CreateQuestionFormStyle}>
            <h2>Add New Category</h2>
            <div className="form">

              <div css={FormSectionStyle}>
                <div css={FormTitleStle}>Category Name</div>
                <input css={FormInputTextStyle} type="text" name="categoryName" onChange={(e) => {setCategoryName(e.target.value)}}></input>
              </div>

              <button css={RegularButtonStyle} onClick={SubmitCategory}>Submit</button>
              <button css={RegularButtonStyle} onClick={() => ShowFormHandler(2)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const RefreshQuestionList = async () => {
    const questionData = await apiGetAllQuestion();
    setDataPertanyaan(questionData);
  }

  return(
      <div ref={divRef}>
        <div css={ParentGridStyle}>
          <HeaderComp headerTitle={CREATE_QUESTION_TITLE} headerButtonMode={HOME_MODE}/>

          <div>
            {displayCreateQuestionForm && CreateQuestionForm()}
            {displayCategoryQuestionForm && AddNewCategoryForm()}
          </div>
          <div css={CreateQuestionContentWrapper}>
            <div css={QuestionListWrapperStyle}>

              <button css={RegularButtonStyle} onClick={() => ShowFormHandler(1)}>Add Question</button>
              <button css={RegularButtonStyle} onClick={() => ShowFormHandler(2)}>Add Category</button>
              <button css={RegularButtonStyle} onClick={RefreshQuestionList}>Refresh</button>
              {dataPertanyaan &&
                dataPertanyaan.map((value, index) => {
                  return (
                      <QuestionViewComponent 
                        key={index}
                        questionnNo={index+1}
                        questionId={value.idQuestion}
                        codeType={categoryNameArr[categoryIdArr.indexOf(value.idCategory)]}
                        questionText={value.questionText}
                        choice1={value.questionChoice1}
                        choice2={value.questionChoice2}
                        choice3={value.questionChoice3}
                        choice4={value.questionChoice4}
                        answer={value.answer}          
                      />
                    )
                })
              }


            </div>
          </div>
        </div>
      </div>
  )
}
/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { apiSubmitQuestion } from '../../../database-api';
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
  FormInputTextStyle
} from './index.style';
import { ParentGridStyle, RegularButtonStyle } from '../../styles/index.style';
import { QuestionViewComponent } from '../../../component/QuestionView/index.view';
import HeaderComp from '../../../component/HeaderComponent/index.view';
import { CREATE_QUESTION_TITLE, HOME_MODE } from '../../constants/index.constants';
interface DataPertanyaan {
  question_id: number;
  code_type: string;
  answer: string;
  questionText: string;
  choice_1: string;
  choice_2: string;
  choice_3: string;
  choice_4: string;
}


export default function AdminCreateQuestion (){
    
  const [code_type, setCode_type] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [choice_1, setChoice1] = useState('');
  const [choice_2, setChoice2] = useState('');
  const [choice_3, setChoice3] = useState('');
  const [choice_4, setChoice4] = useState('');
  const [answer, setAnswer] = useState('');
  const [displayForm, setDisplayForm] = useState(false);
  const [dataPertanyaan, setDataPertanyaan] = useState<Array<DataPertanyaan>>([]);
  const [pageHeight, setPageHeight] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);

  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/api/get/questions');
      setDataPertanyaan(response.data);
    }
    fetchData();
  }, [])

  const SubmitQuestion = async () => {
    console.log("test")
    await apiSubmitQuestion(code_type, questionText, choice_1, choice_2, choice_3, choice_4, answer)
  }

  const ShowFormHandler = () => {
    const tempPageHeight = divRef.current?.clientHeight as number;
    const tempPageWidth = divRef.current?.clientWidth as number;
    console.log(tempPageHeight);
    setPageHeight(tempPageHeight);
    setPageWidth(tempPageWidth);
    setDisplayForm(!displayForm);
  }

  const ShowForm = () => {
    return(
      <div css={CreateQuestionFormWrapperStyle(pageHeight, pageWidth)}>
        <div>
          <div css={CreateQuestionFormStyle}>
            <h2>Create Question</h2>
            <div className="form">

              <div css={FormSectionStyle}>
                <div css={FormTitleStle}>Question Type</div>
                <input css={FormInputTextStyle} type="text" name="kodeTipe" onChange={(e) => {setCode_type(e.target.value)}}></input>
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
              <button css={RegularButtonStyle} onClick={ShowFormHandler}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return(
      <div ref={divRef}>
        <div css={ParentGridStyle}>
          <HeaderComp headerTitle={CREATE_QUESTION_TITLE} headerButtonMode={HOME_MODE}/>

          <div>
            {displayForm && ShowForm()}
          </div>
          <div css={CreateQuestionContentWrapper}>
            <div css={QuestionListWrapperStyle}>

              <button css={RegularButtonStyle} onClick={ShowFormHandler}>Add Question</button>
              {dataPertanyaan.map((value, index) => {
                return (
                    <QuestionViewComponent 
                      key={index}
                      questionId={value.question_id}
                      codeType={value.code_type}
                      questionText={value.questionText}
                      choice1={value.choice_1}
                      choice2={value.choice_2}
                      choice3={value.choice_3}
                      choice4={value.choice_4}
                      answer={value.answer}          
                    />
                  )
              })}

            </div>
          </div>
        </div>
      </div>
  )
}
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiSubmitQuestion } from '../../../database-api';
import '../../styles/index.style.ts';
import {
  CreateQuestionFormWrapperStyle,
  CreateQuestionFormStyle,
  FormSubmitButtonStyle
} from './index.style';
import { ButtonStyle, ContentListStyle, ContentWrapperStyle, HeaderButtonStyle, HeadWrapperStyle, ParentGridStyle } from '../../styles/index.style';
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

  const [dataPertanyaan, setDataPertanyaan] = useState<DataPertanyaan[]>([]);

  const navigate = useNavigate();

  const SubmitQuestion = async () => {
    console.log("test")
    await apiSubmitQuestion(code_type, questionText, choice_1, choice_2, choice_3, choice_4, answer)
  }

  const ShowQuestion = async () => {
    const response = await axios.get('http://localhost:3001/api/get/questions')
    setDataPertanyaan(response.data);
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

                <div css={CreateQuestionFormWrapperStyle}>
                  <div css={CreateQuestionFormStyle}>
                    <div className="form">
                      <label>Kode Tipe</label>
                      <input type="text" name="kodeTipe" onChange={(e) => {setCode_type(e.target.value)}}></input>
                      <label>Pertanyaan</label>
                      <input type="text" name="pertanyaan" onChange={(e) => {setQuestionText(e.target.value)}}></input>
                      <label>Pilihan 1</label>
                      <input type="text" name="pilihan1" onChange={(e) => {setChoice1(e.target.value)}}></input>
                      <label>Pilihan 2</label>
                      <input type="text" name="pilihan2" onChange={(e) => {setChoice2(e.target.value)}}></input>
                      <label>Pilihan 3</label>
                      <input type="text" name="pilihan3" onChange={(e) => {setChoice3(e.target.value)}}></input>
                      <label>Pilihan 4</label>
                      <input type="text" name="pilihan4" onChange={(e) => {setChoice4(e.target.value)}}></input>
                      <label>Kunci Jawaban</label>
                      <input type="text" name="kunciJawaban" onChange={(e) => {setAnswer(e.target.value)}}></input>
                      <button css={FormSubmitButtonStyle} onClick={SubmitQuestion}>Submit</button>
                    </div>
                  </div>
                </div>
                <div css={ContentWrapperStyle}>
                    <div css={ContentListStyle}>
                    <button css={ButtonStyle} onClick={ShowQuestion}>Show Question</button>
                    </div>
                </div>
            </div>
        
        <br/>
        <br/>
        {dataPertanyaan.map((value) => {
            return (
            <>
                <br/>
                <br/>
                <div>
                <p>{`${value.question_id}. ${value.questionText}`}</p>
                <p>{`A. ${value.choice_1}`}</p>
                <p>{`B. ${value.choice_2}`}</p>
                <p>{`C. ${value.choice_3}`}</p>
                <p>{`D. ${value.choice_4}`}</p>
                <p>{`Kode Soal: ${value.code_type}`}</p>
                </div>
            </>
            )
        })}
      </div>
  )
}
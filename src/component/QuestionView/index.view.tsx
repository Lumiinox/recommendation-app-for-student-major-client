/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import {QuestionViewHeaderWrapperStyle, QuestionViewContentStyle, TextMargin, MgrnTop20px, QuestionLetterStyle, QuestionTextContainer, QuestionTestLetterStyle } from './index.style';

interface QuestionViewComponentTypes{
    questionId: number;
    codeType: string;
    questionText: string;
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
    answer: string;
    isATest?: boolean;
    index?: number;
    questionnNo?: number;
    answerDataHandler?: (index: number, answer: number) => void;
}

export const QuestionViewComponent = ({    
    questionId, 
    codeType, 
    questionText, 
    choice1, 
    choice2, 
    choice3, 
    choice4, 
    answer,
    index = 0,
    isATest = false,
    questionnNo = 1,
    answerDataHandler,
    }: QuestionViewComponentTypes) => {
    const [choiceStatus1, setChoiceStatus1] = useState<boolean>(false);
    const [choiceStatus2, setChoiceStatus2] = useState<boolean>(false);
    const [choiceStatus3, setChoiceStatus3] = useState<boolean>(false);
    const [choiceStatus4, setChoiceStatus4] = useState<boolean>(false);
    
    const choiceHandler1 = () => {
        if (isATest && index !== undefined && answerDataHandler){
            setChoiceStatus1(true);
            setChoiceStatus2(false);
            setChoiceStatus3(false);
            setChoiceStatus4(false);
            answerDataHandler(index, 1);
        }
    }

    const choiceHandler2 = () => {
        if (isATest && index !== undefined && answerDataHandler){
            setChoiceStatus1(false);
            setChoiceStatus2(true);
            setChoiceStatus3(false);
            setChoiceStatus4(false);
            answerDataHandler(index, 2);
        }
    }

    const choiceHandler3 = () => {
        if (isATest && index !== undefined && answerDataHandler){
            setChoiceStatus1(false);
            setChoiceStatus2(false);
            setChoiceStatus3(true);
            setChoiceStatus4(false);
            answerDataHandler(index, 3);
        }
    }

    const choiceHandler4 = () => {
        if (isATest && index !== undefined && answerDataHandler){
            setChoiceStatus1(false);
            setChoiceStatus2(false);
            setChoiceStatus3(false);
            setChoiceStatus4(true);
            answerDataHandler(index, 4);
        }
    }

    if (isATest && index){
        questionnNo = index+1;
    }

    return(
        <div>
            <div css={QuestionViewHeaderWrapperStyle}> 
                <div><b>Question {questionnNo}</b></div>
            </div>
            <div css={QuestionViewContentStyle}>
                <div>
                    <div css={TextMargin}><b>Question Type</b></div>
                    <div css={TextMargin}>{codeType}</div>
                </div>
                <div css={MgrnTop20px}>
                    <div css={TextMargin}><b>{questionText}</b></div>
                    <div css={TextMargin}>
                        <div onClick={choiceHandler1}>
                            <div css={isATest ? QuestionTestLetterStyle(choiceStatus1) : QuestionLetterStyle(Number(answer) === 1 ? true : false)}>A</div> 
                            <div css={QuestionTextContainer}>{choice1}</div>
                        </div>
                        <div onClick={choiceHandler2}>
                            <div css={isATest ? QuestionTestLetterStyle(choiceStatus2) : QuestionLetterStyle(Number(answer) === 2 ? true : false)}>B</div> 
                            <div css={QuestionTextContainer}>{choice2}</div>
                        </div>
                        <div onClick={choiceHandler3}>
                            <div css={isATest ? QuestionTestLetterStyle(choiceStatus3) : QuestionLetterStyle(Number(answer) === 3 ? true : false)}>C</div> 
                            <div css={QuestionTextContainer}>{choice3}</div>
                        </div>
                        <div onClick={choiceHandler4}>
                            <div css={isATest ? QuestionTestLetterStyle(choiceStatus4) : QuestionLetterStyle(Number(answer) === 4 ? true : false)}>D</div> 
                            <div css={QuestionTextContainer}>{choice4}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
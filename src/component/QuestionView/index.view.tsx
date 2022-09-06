/** @jsxImportSource @emotion/react */
import React from 'react';
import {QuestionViewWrapperStyle, QuestionViewHeaderWrapperStyle, QuestionViewContentStyle, TextMargin, MgrnTop20px } from './index.style';

interface QuestionViewComponent{
    questionId: number;
    codeType: string;
    questionText: string;
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
    answer: string;
}

export const QuestionViewComponent = ({    
    questionId, 
    codeType, 
    questionText, 
    choice1, 
    choice2, 
    choice3, 
    choice4, 
    answer
    }: QuestionViewComponent) => {
    return(
        <div>
            <div css={QuestionViewHeaderWrapperStyle}> 
                <div><b>Question {questionId}</b></div>
            </div>
            <div css={QuestionViewContentStyle}>
                <div>
                    <div css={TextMargin}><b>Question Type</b></div>
                    <div css={TextMargin}>{codeType}</div>
                </div>
                <div css={MgrnTop20px}>
                    <div css={TextMargin}><b>{questionText}</b></div>
                    <div css={TextMargin}>
                        <div css={TextMargin}>A. {choice1}</div>
                        <div css={TextMargin}>B. {choice2}</div>
                        <div css={TextMargin}>C. {choice3}</div>
                        <div css={TextMargin}>D. {choice4}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}
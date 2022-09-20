/** @jsxImportSource @emotion/react */
import React from 'react';
import {QuestionViewHeaderWrapperStyle, QuestionViewContentStyle, TextMargin, MgrnTop20px, QuestionLetterStyle, QuestionTextContainer } from './index.style';

interface QuestionViewComponentTypes{
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
    }: QuestionViewComponentTypes) => {
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
                        <div>
                            <span css={QuestionLetterStyle(Number(answer) === 1 ? true : false)}>A</span> <span css={QuestionTextContainer}>{choice1}</span>
                        </div>
                        <div>
                            <span css={QuestionLetterStyle(Number(answer) === 2 ? true : false)}>B</span> <span css={QuestionTextContainer}>{choice2}</span>
                        </div>
                        <div>
                            <span css={QuestionLetterStyle(Number(answer) === 3 ? true : false)}>C</span> <span css={QuestionTextContainer}>{choice3}</span>
                        </div>
                        <div>
                            <span css={QuestionLetterStyle(Number(answer) === 4 ? true : false)}>D</span> <span css={QuestionTextContainer}>{choice4}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
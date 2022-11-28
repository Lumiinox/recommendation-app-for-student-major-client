import {css} from '@emotion/react';

export const QuestionViewWrapperStyle = css`
    display:flex;
    justify-content: center;
`;

export const QuestionViewHeaderWrapperStyle = css`
    background-color: #b5b5b5;
    padding: 10px 10px 10px 24px;
    min-width: 100vh;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    box-shadow: 1px -1px 2px rgb(150, 150, 150);
    margin-top: 15px;
`;

export const QuestionViewContentStyle = css`
    padding: 10px 10px 10px 24px;
    min-width: 100vh;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 1px 1px 2px rgb(150, 150, 150);
    margin-bottom: 15px;
`;

export const TextMargin = css`
    margin: 10px 0px;
`;

export const MgrnTop20px = css`
    margin-top: 20px;
`;

export const QuestionLetterStyle = (correct: boolean) => css`
    background-color: ${correct ? "#50fc8f" : "#fc5555"};
    font-size: 14px;
    text-align: center;
    width: 20px;
    float: left;
    margin-right: 5px;
    border-radius:5px;
    cursor: pointer;
`;

export const QuestionTestLetterStyle = (selected: boolean) => css`
    background-color: ${selected ? "#69ccfd" : "#ffffff"};
    font-size: 14px;
    text-align: center;
    width: 20px;
    float: left;
    margin-right: 5px;
    border-radius:5px;
    cursor: pointer;
`;


export const QuestionTextContainer = css`
    height: 20px;
    font-size: 14px;
    cursor: pointer;
`;
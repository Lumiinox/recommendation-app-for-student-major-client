import { css } from "@emotion/react";

export const CreateQuestionContentWrapper = css`
    padding: 30px 20%;
`;

export const FormSubmitButtonStyle = css`
    margin-top: 20px;
`;

export const QuestionListWrapperStyle = css`
    display: grid;
    grid-template-columns: auto;
`;

export const CreateQuestionFormWrapperStyle = (pageHeight: number, pageWidth: number) => css`
    padding: 50px 0;
    background:rgba(0,0,0,0.8);
    position: absolute;
    width: ${pageWidth}px;
    height: ${pageHeight}px;
    display: flex;
    justify-content: center;
`;

export const CreateQuestionFormStyle = css`
    opacity: 1;
    background-color: white;
    width: 100vh;
    padding: 30px;
    border-radius: 50px;
`;

export const AnswerChoiceLabelStyle = css`
    display: grid;
    grid-template-columns: 50px 50px auto;
`;


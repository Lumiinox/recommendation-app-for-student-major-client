import { css } from "@emotion/react";

export const CreateQuestionContentWrapper = css`
    display: flex;
    justify-content: center;
    padding: 30px 0px;

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
    box-shadow: 0px 5px 10px rgb(150, 150, 150);
    &:hover{
        transition-duration: 0.2s;
        box-shadow: 0px 10px 13px rgb(150, 150, 150);
    };
`;
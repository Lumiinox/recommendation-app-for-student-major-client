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
`;

export const AnswerChoiceLabelStyle = css`
    display: grid;
    grid-template-columns: 50px auto;
`;

export const QuestionLabelStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
`; 

export const FormTitleStle = css`
    font-weight: bold;
    font-size: 20px;
`;

export const FormSectionStyle = css`
    padding: 20px 0;
`;

export const FormTextAreaStyle = css`
    width: 100%;
    background-color: #eee;
    border-radius: 30px;
    border: 0;
    resize: none;
    padding: 10px 25px;
    font-size: 20px;
    margin-top: 10px;
`;

export const FormInputTextStyle = css`
    width: 100%;
    background-color: #eee;
    border-radius: 30px;
    border: 0;
    resize: none;
    font-size: 20px;
    margin-top: 10px;
`;

export const DropDownSelectedStyle = css`
    width: 30%;
    background-color: #eee;
    border-radius: 30px;
    border: 0;
    resize: none;
    font-size: 20px;
    margin-top: 10px;
    padding: 10px 20px;
`;


export const DropDownListContainer = css`
    width: 30%;
    background-color: #eee;
    border-radius: 30px;
    border: 0;
    resize: none;
    font-size: 20px;
    padding: 10px 20px;
    position: absolute;
    transform: translate(0,-50px);
`;
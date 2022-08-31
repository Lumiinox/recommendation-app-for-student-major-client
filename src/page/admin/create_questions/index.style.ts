import { css } from "@emotion/react";

export const CreateQuestionFormWrapperStyle = css`
    display: flex;
    justify-content: center;
    padding: 50px 0;
`;

export const CreateQuestionFormStyle = css`
    width: 100vh;
    padding: 30px;
    border-radius: 50px;
    box-shadow: 0px 5px 10px rgb(150, 150, 150);
    &:hover{
        transition-duration: 0.2s;
        box-shadow: 0px 10px 13px rgb(150, 150, 150);
    };
`;

export const FormSubmitButtonStyle = css`
    margin-top: 20px;
`;

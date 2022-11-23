import { css } from "@emotion/react";

export const AddQuizFormStyle = css`
    opacity: 1;
    background-color: white;
    width: 100vh;
    padding: 30px;
    border-radius: 50px;
`;

export const formContainer = css`
    display: flex;
    flex-direction: column;
    margin: 50px auto;
    padding: 50px 70px;
    box-shadow: 0px 5px 10px rgb(150, 150, 150);
    border-radius: 50px;
    &:hover {
        transition-duration: 0.2s;
        box-shadow: 0px 10px 13px rgb(150, 150, 150);
    }
`;
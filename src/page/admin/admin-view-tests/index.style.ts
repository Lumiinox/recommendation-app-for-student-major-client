import { css } from "@emotion/react";

export const wholeContentWrapperStyle = css`
    padding: 50px 200px;
`;

export const tableContainer = css`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    padding: 50px 70px;
    box-shadow: 0px 5px 10px rgb(150, 150, 150);
    border-radius: 50px;
    &:hover {
        transition-duration: 0.2s;
        box-shadow: 0px 10px 13px rgb(150, 150, 150);
    }
`;

export const nameTestColumnStyle = css`
    width: 200px;
`;

export const categoryNameColumnStyle = css`
    width: 150px;
`;

export const durationColumnStyle = css`
    width: 150px;
`;

export const numQuestionColumnStyle = css`
    width: 150px;
`;

export const statusColumnStyle = css`
    width: 100px;
`;

export const actionColumnStyle = css`
    width: 100px;   
`;

export const tableHead = css`
    border-bottom: 2px solid #dadada;
    margin-bottom: 20px;
    font-weight: bold;
`;

export const tableHeadRow = css`
    font-size: 24px;
    text-align: center;
`;

export const tableContent = css`
    font-size: 20px;
    text-align: center;
    border-collapse: collapse; 
`;

export const mainContentRow = css`
    border-bottom: 2px solid #f1f1f1;
`;

export const actionColumnsStyle = css`
    border-bottom: 2px solid #f1f1f1;
`;

export const actionColumnsContentWrapperStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const playButtonStyle = css`
    margin-right: 10px;
    cursor: pointer;
    color: #015e01;
`;

export const stopButtonStyle = css`
    margin-right: 10px;
    cursor: pointer;
    color: #a10000;
`;

export const repeatButtonStyle = css`
    color: #0059b5;
    cursor: pointer;
`;

export const activeStatusText = (status: number) => css`
    color: ${status === 1 ? "#015e01" : "#a10000"};
`;

export const formContainer = css`
    border-radius: 50px;
    background-color: #FFFFFF;
    padding: 50px;
    min-width: 700px;
`;

export const AddQuizFormStyle = css`
    opacity: 1;
    background-color: white;
    width: 100vh;
    padding: 30px;
    border-radius: 50px;
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
import { css } from "@emotion/react";

export const testResultWrapper = css`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    padding: 50px 70px;
    box-shadow: 0px 5px 10px rgb(150 150 150);
    border-radius: 50px;
    width: 100%;
`;

export const StudentTestResultWrapper = css`
    display: flex;
    justify-content: center;
    margin: 50px 10%;
`;

export const testResultBoxHeader = (color: string) => css`
  color: ${color};
`;

export const TestResultContentListStyle = css`
    padding: 10px 0;
    display: grid;
    grid-template-columns: 65% 35%;
    grid-gap: 20px;
    border-bottom: 1px solid #aaa;
    align-items: center;
    font-size: 30px;
`;

export const TestResultContentHeadListStyle = css`
    padding: 10px 0;
    display: grid;
    grid-template-columns: 65% 35%;
    grid-gap: 20px;
    border-bottom: 1px solid #aaa;
    align-items: center;
    font-weight: bold;
    font-size: 35px;
`;

import { css } from "@emotion/react";

export const testResultWrapper = css`
  display: flex;
  flex-wrap: wrap;
  padding: 0 200px;
`;

export const StudentTestResultWrapper = css`
    display: flex;
    justify-content: center;
    margin: 50px auto;
`;

export const testResultBoxHeader = (color: string) => css`
  color: ${color};
`;

export const TestResultContentListStyle = css`
    padding: 10px 0;
    display: grid;
    grid-template-columns: 300px 200px;
    grid-gap: 20px;
    border-bottom: 1px solid #aaa;
    align-items: center;
    font-size: 30px;
`;

export const TestResultContentHeadListStyle = css`
    padding: 10px 0;
    display: grid;
    grid-template-columns: 300px 200px;
    grid-gap: 20px;
    border-bottom: 1px solid #aaa;
    align-items: center;
    font-weight: bold;
    font-size: 35px;
`;

import { css } from "@emotion/react";

export const wholeContentWrapperStyle = css`
    padding: 50px 10%;
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

export const noColumnStyle = css`
    width: 10%;
`;

export const typeColumnStyle = css`
    width: 20%;
`;

export const questionColumnStyle = css`
    width: 50%;
`;

export const trueColumnStyle = css`
    width: 10%;
`;

export const falseColumnStyle = css`
    width: 10%;
`;

export const tableHead = css`
    border-bottom: 2px solid #dadada;
    margin-bottom: 20px;
`;

export const tableHeadRow = css`
    font-weight: bold;
    font-size: 24px;
`;

export const tableContent = css`
    font-size: 20px;
    border-collapse: collapse;
`;

export const mainContentRow = css`
    border-bottom: 1px solid #f1f1f1;
`;
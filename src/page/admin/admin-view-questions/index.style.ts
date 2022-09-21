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

export const noColumnStyle = css`
    min-width: 80px;
`;

export const typeColumnStyle = css`
    min-width: 200px;
`;

export const questionColumnStyle = css`
    min-width: 700px;
`;

export const trueColumnStyle = css`
    min-width: 100px;
`;

export const falseColumnStyle = css`
    min-width: 100px;
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
`;

export const mainContentRow = css`
    border: 1px solid;
`;
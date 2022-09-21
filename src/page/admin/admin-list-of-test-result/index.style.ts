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

export const nimColumnStyle = css`
    width: 170px;
`;

export const nameColumnStyle = css`
    width: 500px;
`;

export const typeColumnStyle = css`
    width: 200px;
`;

export const scoreColumnStyle = css`
    width: 100px;
`;

export const dateColumnStyle = css`
`;

export const tableHead = css`
    border-bottom: 2px solid #dadada;
    margin-bottom: 20px;
    font-weight: bold;
`;

export const tableHeadRow = css`
    font-size: 24px;
`;

export const tableContent = css`
    font-size: 20px;
`;

export const mainContentRow = css`
`;
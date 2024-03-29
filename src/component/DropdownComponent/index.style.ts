import { css } from "@emotion/react";

export const DropDownSelectedStyle = css`
    min-width: 200px;
    background-color: #eee;
    border-radius: 30px;
    border: 0;
    resize: none;
    font-size: 20px;
    margin-top: 10px;
    padding: 10px 20px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
`;


export const DropDownListContainer = css`
    background-color: #eee;
    border-radius: 30px;
    border: 0;
    resize: none;
    font-size: 20px;
    padding: 10px 20px;
    position: absolute;
    transform: translate(0,-50px);
`;

export const DropDownItemStyle = css`
    padding: 0 20px;
    border-radius: 30px;
    cursor: pointer;
    &:hover {
        background-color: white;
    }
`;

export const DrowDownAngleDown = css`
    font-size: 24px;
    color: #4e4e4e;
`;
import { css } from "@emotion/react";

export const DropDownSelectedStyle = css`
    width: 30%;
    background-color: #eee;
    border-radius: 30px;
    border: 0;
    resize: none;
    font-size: 20px;
    margin-top: 10px;
    padding: 10px 20px;
    cursor: pointer;
`;


export const DropDownListContainer = css`
    width: 20%;
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
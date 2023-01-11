import { css } from "@emotion/react";

export const DoTestContentWrapper = css`
    display: flex;
    justify-content: center;
    margin: 50px 10%;
`;

export const TableWrapperStyle = css`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    padding: 50px 70px;
    box-shadow: 0px 5px 10px rgb(150 150 150);
    border-radius: 50px;
`;

export const TestContentListStyle = css`
    padding: 10px 0;
    display: grid;
    grid-template-columns: 35% 10% 10% 10% 25%;
    grid-gap: 20px;
    border-bottom: 1px solid #aaa;
    align-items: center;
`;

export const TestContentHeadListStyle = css`
    padding: 10px 0;
    display: grid;
    grid-template-columns: 35% 10% 10% 10% 35%;
    grid-gap: 20px;
    border-bottom: 1px solid #aaa;
    align-items: center;
    font-weight: bold;
`;

export const PopUpCardStyle = css`
    text-align: center;
    padding: 20px;
    width: 500px;
    height: 100px;
    border-radius: 30px;
    background: white;
`;

export const PopUpWrapper = css`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding: auto;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);;
`;

export const timerStyle = css`
    background: #d5d5d5;
    width: 150px;
    height: 100px;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    margin: 120px 20px 30px 40px;
    position: fixed;
`;
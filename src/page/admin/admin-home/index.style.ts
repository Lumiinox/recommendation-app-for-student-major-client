import {css} from '@emotion/react';

export const AdminHeadTitleStyle = css`
    padding-left: 35px;
`;

export const ProfileWrapperStyle = css`
    display: flex;
    justify-content: center;
`;

export const ProfileCardStyle = css`
    text-align: center;
    margin: 30px 0;
    padding: 20px 0;
    width: 160vh;
    height: 20vh;
    border-radius: 30px;
    box-shadow: 0px 5px 10px rgb(150, 150, 150);
    &:hover {
        transition-duration: 0.2s;
        box-shadow: 0px 10px 13px rgb(150, 150, 150);
    }
`;

export const ContentCardStyle = css`
    text-align: center;
    padding: 20px;
    width: 50vh;
    height: 20vh;
    border-radius: 30px;
    box-shadow: 0px 5px 10px rgb(150, 150, 150);
    &:hover{
        transition-duration: 0.2s;
        cursor: pointer;
        box-shadow: 0px 10px 13px rgb(150, 150, 150);
    }
`;

export const LogOutButtonStyle = css`
    border: 1px solid white;
    text-align: center;
    width: 80px;
    padding: 2px;
    border-radius: 10px;
    &:hover{
        background-color: white;
        color: black;
        cursor: pointer;
    }
    &:active{
        background-color: rgb(68, 149, 255);
        color: white;
        -webkit-user-select: none;       
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none; 
    }
`;

import { css } from "@emotion/react";

export const loginPageWrapper = css`
    align-items: center;
    background: #f6f5f7;
    display: flex;
    flex-direction: column;
    font-family: Montserrat,sans-serif;
    height: 100vh;
    justify-content: center;
    margin: -20px 0 50px;
`;

export const loginMainContainer = css`
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22);
    max-width: 100%;
    min-height: 480px;
    overflow: hidden;
    position: relative;
    width: 768px;    
`;

export const staffFormContainer = (isRightPanelActive: boolean) => css`
    left: 0;
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    transition: all .6s ease-in-out;

    ${!isRightPanelActive &&
        `opacity: 0;
        z-index: 1;`
    }

    ${isRightPanelActive &&    
        `animation: show .6s;
        opacity: 1;
        transform: translateX(100%);
        z-index: 5;`
    }
`;

export const studentFormContainer = (isRightPanelActive: boolean) =>  css`
    left: 0;
    width: 50%;
    z-index: 2;
    height: 100%;
    position: absolute;
    top: 0;
    transition: all .6s ease-in-out;
    ${isRightPanelActive && `transform: translateX(100%);`}

`;

export const panelWrapper  = (isRightPanelActive: boolean) => css`
    height: 100%;
    left: 50%;
    overflow: hidden;
    position: absolute;
    top: 0;
    transition: -webkit-transform .6s ease-in-out;
    transition: transform .6s ease-in-out;
    transition: transform .6s ease-in-out,-webkit-transform .6s ease-in-out;
    width: 50%;
    z-index: 100;
    ${isRightPanelActive && `transform: translateX(-100%);`}
`;

export const panelContent = (isRightPanelActive: boolean) => css`
    background: linear-gradient(90deg,#0098d7,#19baff);
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: cover;
    color: #fff;
    height: 100%;
    left: -100%;
    position: relative;
    transform: translateX(0);
    transition: transform .6s ease-in-out,-webkit-transform .6s ease-in-out;
    width: 200%;
    ${!isRightPanelActive && `transform: translateX(0);`}
    ${isRightPanelActive && `transform: translateX(50%);`}
`;

export const panelLeft = (isRightPanelActive: boolean) => css`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: 0 40px;
    position: absolute;
    text-align: center;
    top: 0;
    transition: transform .6s ease-in-out,-webkit-transform .6s ease-in-out;
    width: 50%;
    ${!isRightPanelActive && `transform: translateX(-20%);`}
    ${isRightPanelActive && `transform: translateX(0);`}
`;

export const panelRight = (isRightPanelActive: boolean) => css`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: 0 40px;
    position: absolute;
    text-align: center;
    top: 0;
    transition: transform .6s ease-in-out,-webkit-transform .6s ease-in-out;
    width: 50%;
    right: 0;
    ${!isRightPanelActive && `transform: translateX(0);`}
    ${isRightPanelActive && `transform: translateX(20%);`}
`;

export const buttonGhost = css`
    background-color: transparent !important;
    border-color: #fff !important;
`;

export const buttonLoginPage = css`
    min-width: 200px;
    margin-top: 16px;
`;

export const registrationWrapper = css`
    background: linear-gradient(90deg,#0098d7,#19baff);
    position: absolute;
    z-index: 101;
    width: 100%;
    height: 100%;
    background-color: red;
    padding: 50px;
`;

export const loginFormPanels = css`
    background-color: #FFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
`;

export const registrationTitle = css`
    color: #FFF;
`;

export const buttonGhostRegist = css`
    background-color: transparent !important;
    border-color: #fff !important;
    margin: 20px 30px 0 0;
`;
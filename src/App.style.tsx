import { css } from "@emotion/react";

export const GlobalAppStyle = css`
    @font-face {
        font-family:  'Poppins';
        src: url(../../assets/font/Poppins/Poppins-Regular.ttf);
    }

    * {
	box-sizing: border-box;
    }
    
    h1 {
	    font-weight: bold;
	    margin: 10px 0 20px 0;
    }

    p {
        font-size: 14px;
        font-weight: 100;
        line-height: 20px;
        letter-spacing: 0.5px;
        margin: 20px 0 30px;
    }

    span {
	    font-size: 12px;
    }

    a {
        color: #333;
        font-size: 14px;
        text-decoration: none;
        margin: 15px 0;
    }

    .btn {
        border-radius: 20px;
        border: 1px solid #0098D7;
        background-color: #0098D7;
        color: #FFFFFF;
        font-size: 12px;
        font-weight: bold;
        padding: 12px 45px;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: transform 80ms ease-in;
    }  

    button {
        border-radius: 20px;
        border: 1px solid #0098D7;
        background-color: #0098D7;
        color: #FFFFFF;
        font-size: 12px;
        font-weight: bold;
        padding: 12px 45px;
        letter-spacing: 1px;
        text-transform: uppercase;
        transition: transform 80ms ease-in;
    }

    button:active {
        transform: scale(0.95);
    }

    button:focus {
        outline: none;
    }

    button.ghost {
        background-color: transparent;
        border-color: #FFFFFF;
    }

    form {
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 50px;
        height: 100%;
        text-align: center;
    }

    input {
        border-radius: 20px;
        background-color: #eee;
        border: none;
        padding: 12px 15px;
        margin: 8px 0;
        width: 100%;
    }

`;
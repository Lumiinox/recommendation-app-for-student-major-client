/** @jsxImportSource @emotion/react */
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { HeadTitleStyle, HeadWrapperStyle, LogOutButtonStyle } from "../../page/styles/index.style";
import { actionCreators } from "../../redux";

interface HeaderCompType{
    headerTitle: string;
    headerButtonMode: number;
}

export default function HeaderComp({headerTitle, headerButtonMode}: HeaderCompType){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {removeProfileData} = bindActionCreators(actionCreators, dispatch);

    const headerButtonHandler = (choice: number) => {
        switch(choice){
            case 1: removeProfileData();
                    localStorage.setItem('loginUser', '');
                    navigate('/');
                    break;

            case 2: navigate('/admin/home');
                    break;
        }
    }

    const headerButttonText = (choice: number) => {
        switch(choice){
            case 1: return "Log Out";
            case 2: return "Home";
        }
    }

    return(
        <div css={HeadWrapperStyle}>
            <div>BINUS</div>
            <div css={HeadTitleStyle}>{headerTitle}</div>
            <div css={LogOutButtonStyle} onClick={() => headerButtonHandler(headerButtonMode)}>{headerButttonText(headerButtonMode)}</div>
        </div>
    )
}
/** @jsxImportSource @emotion/react */

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../../redux";
import { ContentListStyle, HeadTitleStyle, ContentCardStyle, ContentWrapperStyle, ProfileCardStyle, ProfileWrapperStyle, LogOutButtonStyle, HeadWrapperStyle, ParentGridStyle } from "../../styles/index.style";

export default function StudentHome (){
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {removeProfileData} = bindActionCreators(actionCreators, dispatch);
    
    const name = useSelector((state: State) => state.userData.name);
    const status = useSelector((state: State) => state.userData.status);
    const nim = useSelector((state: State) => state.userData.nim);

    const menuBtnHandler = (choice:number) => {
        switch(choice) {
            case 1: navigate(`/student/do-test`);
                    break;
            case 2: removeProfileData();
                    navigate('/');
                    break;
        }
    }
    return(
        <div>
            <div css={ParentGridStyle}>
                <div css={HeadWrapperStyle}>
                    <div>BINUS</div>
                    <div css={HeadTitleStyle}>Hi, Student</div>
                    <div css={LogOutButtonStyle} onClick={() => menuBtnHandler(2)}>Log Out</div>
                </div>
                <div css={ProfileWrapperStyle}>
                    <div css={ProfileCardStyle}>
                        <div></div>
                        <div>{name}</div>
                        <div>{status}</div>
                        <div>{nim}</div>
                    </div>
                </div>
                <div css={ContentWrapperStyle}>
                    <div css={ContentListStyle}>
                        <div css={ContentCardStyle} onClick={() => menuBtnHandler(1)}> Do Test </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
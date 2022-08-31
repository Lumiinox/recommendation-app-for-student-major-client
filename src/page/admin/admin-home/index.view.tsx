/** @jsxImportSource @emotion/react */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../../redux";
import { ContentListStyle, ContentWrapperStyle, HeadWrapperStyle, ParentGridStyle } from "../../styles/index.style";
import { AdminHeadTitleStyle, ContentCardStyle, LogOutButtonStyle, ProfileCardStyle, ProfileWrapperStyle } from "./index.style";

export default function AdminHome (){    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {removeProfileData} = bindActionCreators(actionCreators, dispatch);
    
    const name = useSelector((state: State) => state.userData.name)
    const status = useSelector((state: State) => state.userData.status)

    const menuBtnHandler = (choice:number) => {
        switch(choice) {
            case 1: navigate(`/admin/create-question`);
                    break;
            case 2: navigate(`/admin/view-question`);
                    break;
            case 3: navigate(`/admin/view-test-result`);
                    break;
            case 4: removeProfileData();
                    navigate('/');
                    break;
        }
    }

    return(
        <div>
            <div css={ParentGridStyle}>
                <div css={HeadWrapperStyle}>
                    <div>BINUS</div>
                    <div css={AdminHeadTitleStyle}>Hi, Admin</div>
                    <div css={LogOutButtonStyle} onClick={() => menuBtnHandler(4)}>Log Out</div>
                </div>
                <div css={ProfileWrapperStyle}>
                    <div css={ProfileCardStyle}>
                        <div></div>
                        <div>{name}</div>
                        <div>{status}</div>
                    </div>
                </div>
                <div css={ContentWrapperStyle}>
                    <div css={ContentListStyle}>
                        <div css={ContentCardStyle} onClick={() => menuBtnHandler(1)}> Create Question </div>
                        <div css={ContentCardStyle}  onClick={() => menuBtnHandler(2)}> Question List </div>
                        <div css={ContentCardStyle}  onClick={() => menuBtnHandler(3)}> Test Result  </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
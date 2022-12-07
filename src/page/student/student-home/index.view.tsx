/** @jsxImportSource @emotion/react */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import HeaderComp from "../../../component/HeaderComponent/index.view";
import { getIdName, updateLastUrl } from "../../../functions";
import { actionCreators, State } from "../../../redux";
import { LOGOUT_MODE, TEST_TITLE } from "../../constants/index.constants";
import { 
    ContentListStyle, 
    ContentCardStyle, 
    ContentWrapperStyle, 
    ProfileCardStyle, 
    ProfileWrapperStyle, 
    ParentGridStyle 
} from "../../styles/index.style";

export default function StudentHome (){
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {removeProfileData} = bindActionCreators(actionCreators, dispatch);
    
    const name = useSelector((state: State) => state.userData.name);
    const status = useSelector((state: State) => state.userData.status);
    const currentId = useSelector((state: State) => state.userData.currentId);
    
    useEffect(() => {
        updateLastUrl(window.location.pathname);
    }, []);
    
    const menuBtnHandler = (choice:number) => {
        switch(choice) {
            case 1: navigate(`/student/do-test`);
                    break;
            case 2: removeProfileData();
                    navigate('/');
                    break;
            case 3: navigate('/student/test-result');
                    break;
        }
    }
    return(
        <div>
            <div css={ParentGridStyle}>
                <HeaderComp headerTitle={TEST_TITLE} headerButtonMode={LOGOUT_MODE}/>
                <div css={ProfileWrapperStyle}>
                    <div css={ProfileCardStyle}>
                        <div></div>
                        <div>{name}</div>
                        <div>{getIdName(status)}</div>
                        <div>{currentId}</div>
                    </div>
                </div>
                <div css={ContentWrapperStyle}>
                    <div css={ContentListStyle}>
                        <div css={ContentCardStyle} onClick={() => menuBtnHandler(1)}> Do Test </div>
                        <div css={ContentCardStyle} onClick={() => menuBtnHandler(3)}> Test Result </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
/** @jsxImportSource @emotion/react */
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderComp from "../../../component/HeaderComponent/index.view";
import { getIdName } from "../../../functions";
import { State } from "../../../redux";
import { ADMIN_HOME_TITLE, LOGOUT_MODE } from "../../constants/index.constants";
import { 
    ContentListStyle,  
    ContentCardStyle, 
    ContentWrapperStyle, 
    ProfileCardStyle, 
    ProfileWrapperStyle, 
    ParentGridStyle 
    } from "../../styles/index.style";

export default function AdminHome (){   
    const navigate = useNavigate();

    
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
        }
    }

    return(
        <div>
            <div css={ParentGridStyle}>
                <HeaderComp headerTitle={ADMIN_HOME_TITLE} headerButtonMode={LOGOUT_MODE}/>
                
                <div css={ProfileWrapperStyle}>
                    <div css={ProfileCardStyle}>
                        <div></div>
                        <div>{name}</div>
                        <div>{getIdName(status)}</div>
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
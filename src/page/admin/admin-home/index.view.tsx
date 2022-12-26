/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderComp from "../../../component/HeaderComponent/index.view";
import { getIdName, updateLastUrl } from "../../../functions";
import { State } from "../../../redux";
import { ADMIN_HOME_TITLE, LOGOUT_MODE } from "../../constants/index.constants";
import { 
    ContentListStyle,  
    ContentCardStyle, 
    ContentWrapperStyle, 
    ProfileCardStyle, 
    ProfileWrapperStyle, 
    ParentGridStyle, 
    homeCardIconStyle
    } from "../../styles/index.style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPlus, faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons'

export default function AdminHome (){   
    const navigate = useNavigate();

    useEffect(() => {
        updateLastUrl(window.location.pathname);
    }, [])
    
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
            case 4: navigate(`/admin/create-quiz`);
                    break;
            case 5: navigate(`/admin/view-test-list`);
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
                        <div css={ContentCardStyle} onClick={() => menuBtnHandler(1)}>
                            <FontAwesomeIcon icon={faPlus} css={homeCardIconStyle}/> 
                            Create Question 
                            </div>
                        <div css={ContentCardStyle}  onClick={() => menuBtnHandler(2)}> 
                            <FontAwesomeIcon icon={faList} css={homeCardIconStyle}/>
                            Question List 
                        </div>
                        <div css={ContentCardStyle}  onClick={() => menuBtnHandler(3)}>
                            <FontAwesomeIcon icon={faSquarePollHorizontal} css={homeCardIconStyle}/>
                            Test Result  
                        </div>
                        <div css={ContentCardStyle}  onClick={() => menuBtnHandler(4)}> 
                            <FontAwesomeIcon icon={faPlus} css={homeCardIconStyle}/>
                            Create Quiz  
                        </div>
                        <div css={ContentCardStyle}  onClick={() => menuBtnHandler(5)}> 
                            <FontAwesomeIcon icon={faList} css={homeCardIconStyle}/>
                            View Test List 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
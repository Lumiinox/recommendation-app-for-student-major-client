import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../../redux";
import AdminCreateQuestion from "../create_questions";
import ProfilePic from "../../../assets/img/img_avatar2.png";
import './index.style.css';

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
        <div className="adminHomePageWrapper">
            <div className="parentGrid">
                <div className="headWrapper">
                        <div>BINUS</div>
                        <div>Hi, Admin</div>
                        <div className="logoutButtonStyle" onClick={() => menuBtnHandler(4)}>Log Out</div>
                </div>
                <div className="profileWrapper">
                    <div className="profileCardStyle">
                        <div></div>
                        <div>{name}</div>
                        <div>{status}</div>
                    </div>
                </div>
                <div className="contentWrapper">
                    <div className="contentList">
                        <div className="contentCard" onClick={() => menuBtnHandler(1)}> Test Result </div>
                        <div className="contentCard" onClick={() => menuBtnHandler(2)}> Question List </div>
                        <div className="contentCard" onClick={() => menuBtnHandler(3)}> Create Question </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../../redux";

export default function StudentHome (){
    const [shownContent, setShownContent] = useState<number>(1);
    
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
        <div className="adminHomePageWrapper">
            <div className="parentGrid">
                <div className="headWrapper">
                        <div>BINUS</div>
                        <div>Hi, Admin</div>
                        <div className="logoutButtonStyle" onClick={() => menuBtnHandler(2)}>Log Out</div>
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
                        <div className="contentCard" onClick={() => menuBtnHandler(1)}> Do Test </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
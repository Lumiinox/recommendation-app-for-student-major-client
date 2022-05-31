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

    const doTestHandler = () => {
        navigate('/student/do-test')
    }

    const logoutBtnHandler = () => {
        removeProfileData();
        navigate('/');
    }

    return(
        <div className="adminHomeWrapper">
            <h3>Name: {name}</h3>
            <h3>Status: {status}</h3>
            <h3>Nim: {nim}</h3>
            <button>Home</button>
            <button onClick={doTestHandler}>Do Test</button>
            <button onClick={logoutBtnHandler}>Log Out</button>
        </div>
    )
}
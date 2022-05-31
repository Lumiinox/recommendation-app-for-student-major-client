import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../../redux";

export default function AdminHome (){
    const [shownContent, setShownContent] = useState<number>(1);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {removeProfileData} = bindActionCreators(actionCreators, dispatch);
    
    const name = useSelector((state: State) => state.userData.name)
    const status = useSelector((state: State) => state.userData.status)

    const createQuestionBtnHandler = () => {
        navigate('/admin/create-question')
    }

    const logoutBtnHandler = () => {
        removeProfileData();
        navigate('/');
    }

    return(
        <div className="adminHomeWrapper">
            <h3>Name: {name}</h3>
            <h3>Status: {status}</h3>
            <button>Home</button>
            <button onClick={createQuestionBtnHandler}>Create Question</button>
            <button>Show Question</button>
            <button>List of Test Result</button>
            <button onClick={logoutBtnHandler}>Log Out</button>
        </div>
    )
}
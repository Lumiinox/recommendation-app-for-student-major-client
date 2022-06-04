import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../../redux";
import AdminCreateQuestion from "../create_questions";

export default function AdminHome (){    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {removeProfileData} = bindActionCreators(actionCreators, dispatch);
    
    const name = useSelector((state: State) => state.userData.name)
    const status = useSelector((state: State) => state.userData.status)

    const menuBtnHandler = (choice:number) => {
        switch(choice) {
            case 1: navigate(`/admin/home`);
                    break;
            case 2: navigate(`/admin/create-question`);
                    break;
            case 3: navigate(`/admin/view-question`);
                    break;
            case 4: navigate(`/admin/view-test-result`);
                    break;
            case 5: removeProfileData();
                    navigate('/');
                    break;
        }
    }

    return(
        <div className="adminHomeWrapper">
            <div className="profileWrapper">
                <h3>Name: {name}</h3>
                <h3>Status: {status}</h3>
            </div>
            <div className="menuWrapper">
                <button onClick={() => menuBtnHandler(1)}>Home</button>
                <button onClick={() => menuBtnHandler(2)}>Create Question</button>
                <button onClick={() => menuBtnHandler(3)}>View Question</button>
                <button onClick={() => menuBtnHandler(4)}>List of Test Result</button>
                <button onClick={() => menuBtnHandler(5)}>Log Out</button>
            </div>
        </div>
    )
}
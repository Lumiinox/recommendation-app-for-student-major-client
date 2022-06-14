import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../../redux";
import AdminCreateQuestion from "../create_questions";
import './AdminHomeStyle.css';
import ProfilePic from "../../../assets/img/img_avatar2.png";

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
        <div className="wrapperAdminHome">
            <nav className="navbar">
            <div className="ml"></div>
            <h2 className="text-white text-center ml">Hi, Admin!</h2>
            <button className="text-white font-bold text-center" onClick={() => menuBtnHandler(5)}>logout</button>
            </nav>
            <section className="mt">
                <div id="content">
                    <div className="w-full card center mt">
                        <div className="mt mb">
                            <img src={ProfilePic} alt="" className="rounded-full"/>
                            <h3 className="text-center line-height-low">{name}</h3>
                            <h4 className="text-orange text-center line-height-low">{status}</h4>
                        </div>
                    </div>
                </div>
                <div id="content">
                    <div className="w-full flex space-between mt">
                        <div className="grid-container">
                            <div className="grid-item">
                                <div className="card center mt p">
                                    <div className="mt mb">
                                        <h3 className="text-center line-height-low">Create Question</h3>
                                        <p className="text-center text-black text-sm"></p>
                                        <button className="btn bg-orange text-white" onClick={() => menuBtnHandler(1)}>VIEW</button>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-item">
                                <div className="card center mt p">
                                    <div className="mt mb">
                                        <h3 className="text-center line-height-low">Question List</h3>
                                        <p className="text-center text-black text-sm"></p>
                                        <button className="btn bg-orange text-white" onClick={() => menuBtnHandler(2)}>VIEW</button>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-item">
                                <div className="card center mt p">
                                    <div className="mt mb">
                                        <h3 className="text-center line-height-low">Test Result</h3>
                                        <p className="text-center text-black text-sm"></p>
                                        <button className="btn bg-orange text-white" onClick={() => menuBtnHandler(3)}>ADD</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>   
    )
}
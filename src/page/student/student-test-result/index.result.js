import './App.css';
import { useNavigate } from "react-router-dom";
import HeaderComp from "../../../component/HeaderComponent/index.view";
import { HOME_MODE_STUDENT, TEST_TITLE } from "../../constants/index.constants";

export default function StudentTestResult () {
  return(
    <div>
      <HeaderComp headerTitle={TEST_TITLE} headerButtonMode={HOME_MODE_STUDENT}/>
      <div className="box box-1">
        <h2>ABC Test</h2>
        <h1>100</h1>
      </div>
      <div className="box box-2">
        <h2>DEF Test</h2>
        <h4>not yet</h4>
      </div>
    </div>
  )
}
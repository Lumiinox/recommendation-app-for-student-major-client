/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';
import HeaderComp from '../../../component/HeaderComponent/index.view';
import { 
    apiDeactivateTest, 
    apiGetAllQuestionCategory, 
    apiReactivateTest, 
    apiGetTestData, 
    apiAddTest 
} from '../../../database-api';
import { updateLastUrl } from '../../../functions';
import { HOME_MODE_ADMIN, TEST_RESULT_TITLE } from '../../constants/index.constants';
import { 
    FormSectionStyle, 
    FormTextAreaStyle, 
    FormTitleStle, 
    ParentGridStyle 
} from '../../styles/index.style';
import { 
    mainContentRow, 
    nameTestColumnStyle, 
    categoryNameColumnStyle, 
    durationColumnStyle, 
    numQuestionColumnStyle, 
    statusColumnStyle,  
    actionColumnStyle, 
    tableContainer, 
    tableContent, 
    tableHead, 
    tableHeadRow, 
    wholeContentWrapperStyle, 
    stopButtonStyle, 
    playButtonStyle, 
    repeatButtonStyle, 
    activeStatusText, 
    actionColumnsContentWrapperStyle, 
    formContainer, 
    AddQuizFormStyle 
} from './index.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faCircleStop, faRepeat } from '@fortawesome/free-solid-svg-icons'
import { CustomDropDown } from '../../../component/DropdownComponent/index.view';
interface TestListData {
    idTest: number; 
    idCategory: number;
    questionAmount: number;
    timeAmount: number;
    nameTest: string;
    activeStatus: number;
}

export default function ListofTest(){
    const [testListData, setTestListData] = useState<Array<TestListData>>([]);
    const [categoryNameArr, setCategoryNameArr] = useState<Array<string>>([]);
    const [categoryIdArr, setCategoryId] = useState<Array<number>>([]);
    const [questionCategory, setQuestionCategory] = useState(0);
    const [testName, setTestName] = useState<string>('');
    const [testDuration, setTestDuration] = useState<number>(0);
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
    const [showReAddForm, setShowReAddForm] = useState<boolean>(false);
    const [testRedoData, setTestRedoData] = useState<TestListData>();
    const [pageHeight, setPageHeight] = useState(0);
    const [pageWidth, setPageWidth] = useState(0);

    const divRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        fetchTestData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          const questionCategoryData = await apiGetAllQuestionCategory();
          console.log(questionCategoryData);
          const categoryNameTemp = [];
          const categoryIdTemp = [];
          for (const i in questionCategoryData){
            categoryNameTemp.push(questionCategoryData[i].nameCategory);
            categoryIdTemp.push(questionCategoryData[i].idCategory);
          }
          setCategoryNameArr(categoryNameTemp);
          setCategoryId(categoryIdTemp);
        }
        fetchData();
    }, []);

    useEffect(() => {
        updateLastUrl(window.location.pathname);
    }, []);

    const showFormHandler = (curentData: TestListData) => {
        setTestRedoData(curentData);
        const tempPageHeight = divRef.current?.clientHeight as number;
        const tempPageWidth = divRef.current?.clientWidth as number;
        if(tempPageHeight > window.innerHeight){
            setPageHeight(tempPageHeight + 50);
        } else {
            setPageHeight(window.innerHeight + 50);
        }
        setPageWidth(tempPageWidth);
        setShowReAddForm(!showReAddForm);
    };

    const handleSubmit = async () => {
        console.log(questionCategory);
        console.log(testName);
        console.log(testDuration);
        console.log(numberOfQuestions);
        await apiAddTest(questionCategory, testName, testDuration, numberOfQuestions);
        await fetchTestData();
        setShowReAddForm(false);
    }
    
    const RemakeTest = () => {
        if(testRedoData){
            setTestName(testRedoData.nameTest);
            setNumberOfQuestions(testRedoData.questionAmount);
            setTestDuration(testRedoData.questionAmount);
            setQuestionCategory(categoryIdArr.indexOf(testRedoData.idCategory));
            return(
                <div css={formContainer}>
                    <div css={AddQuizFormStyle}>
                        <h2>Create Test</h2>
                        <div>
                            <div css={FormSectionStyle}>
                                <div css={FormTitleStle}>Test Name</div>
                                <input css={FormTextAreaStyle} name="testName" onChange={(e) => {setTestName(e.target.value)}} value={testRedoData.nameTest}></input>
                            </div>
                            <div css={FormSectionStyle}>
                                <div css={FormTitleStle}>Question Category</div>
                                <CustomDropDown dropdownName={categoryNameArr} dropdownId={categoryIdArr} onClickHandler={setQuestionCategory} preSelectedIndex={categoryIdArr.indexOf(testRedoData.idCategory)}/>
                            </div>
                            <div css={FormSectionStyle}>
                                <div css={FormTitleStle}>Test Duration (in minutes)</div>
                                <input css={FormTextAreaStyle} name="testDuration" onChange={(e) => {setTestDuration(Number(e.target.value))}} value={testRedoData.timeAmount}></input>
                            </div>
                            <div css={FormSectionStyle}>
                                <div css={FormTitleStle}>Number of Questions</div>
                                <input css={FormTextAreaStyle} name="numberQuestion" onChange={(e) => {setNumberOfQuestions(Number(e.target.value))}} value={testRedoData.questionAmount}></input>
                            </div>
                
                            <button onClick={handleSubmit}>Submit</button>
                            <button onClick={() => setShowReAddForm(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(<></>);
        }

    }

    const fetchTestData = async () => {
        const data = await apiGetTestData();
        console.log(data);
        setTestListData(data);
    };

    const handleActionsStatusClick = async (idTest: number, status: number) => {
        if (status === 1){
            console.log("Test Active change to Not Active");
            await apiDeactivateTest(idTest);
        } 
        else if(status === 0) {
            console.log("Test Not Active change to Active");
            await apiReactivateTest(idTest);
        }
        fetchTestData();
    }

    return(
        <div>
            <div css={ParentGridStyle}>
                <HeaderComp headerTitle={TEST_RESULT_TITLE} headerButtonMode={HOME_MODE_ADMIN}/>

                {showReAddForm && <RemakeTest/>}
                <div css={wholeContentWrapperStyle}>
                    <div>
                        <div css={tableContainer}>
                            <table css={tableHead}>
                                <tbody>
                                    <tr css={tableHeadRow}>
                                        <td css={nameTestColumnStyle}>Test Name</td>
                                        <td css={categoryNameColumnStyle}>Category</td>
                                        <td css={durationColumnStyle}>Duration</td>
                                        <td css={numQuestionColumnStyle}>No of Question</td>
                                        <td css={statusColumnStyle}>Status</td>
                                        <td css={actionColumnStyle}>Action</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table css={tableContent}>
                                <tbody>
                                    {testListData.map((data, index) => {
                                        return (
                                            <tr css={mainContentRow} key={index}>
                                                <td css={nameTestColumnStyle}>{data.nameTest}</td>
                                                <td css={categoryNameColumnStyle}>{categoryNameArr[categoryIdArr.indexOf(data.idCategory)]}</td>
                                                <td css={durationColumnStyle}>{data.timeAmount}</td>
                                                <td css={numQuestionColumnStyle}>{data.questionAmount}</td>
                                                <td css={statusColumnStyle}>
                                                    <div css={activeStatusText(data.activeStatus)}>
                                                    {data.activeStatus === 1 ? 
                                                            'Active'
                                                            : 
                                                            'Not Active'
                                                        }
                                                    </div>
                                                </td>
                                                <td css={actionColumnStyle}>
                                                    <div css={actionColumnsContentWrapperStyle}>
                                                        <div onClick={() => handleActionsStatusClick(data.idTest, data.activeStatus)}>
                                                            {data.activeStatus === 1 ? 
                                                                <FontAwesomeIcon icon={faCircleStop} css={stopButtonStyle}/> 
                                                                : 
                                                                <FontAwesomeIcon icon={faCirclePlay} css={playButtonStyle}/>
                                                            }
                                                        </div>
                                                        <div onClick={() => showFormHandler(data)}>
                                                            <FontAwesomeIcon icon={faRepeat} css={repeatButtonStyle}/>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}
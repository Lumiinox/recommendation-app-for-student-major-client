/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react';
import HeaderComp from '../../../component/HeaderComponent/index.view';
import { 
    apiDeactivateTest, 
    apiGetAllQuestionCategory, 
    apiReactivateTest, 
    apiGetTestData, 
    apiAddTest, 
    apiEditTest
} from '../../../database-api';
import { checkIfNumber, updateLastUrl } from '../../../functions';
import { HOME_MODE_ADMIN, VIEW_TEST_LIST_TITLE } from '../../constants/index.constants';
import { 
    errorMsgStyle,
    FormSectionStyle, 
    FormTextAreaStyle, 
    FormTitleStle, 
    ParentGridStyle, 
    RegularButtonStyle
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
    CreateQuestionFormWrapperStyle,
    editButtonStyle
} from './index.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faCircleStop, faPencil, faRepeat } from '@fortawesome/free-solid-svg-icons'
import { CustomDropDown } from '../../../component/DropdownComponent/index.view';
interface TestListData {
    idTest: number; 
    idCategory: number;
    questionAmount: number;
    timeAmount: number;
    nameTest: string;
    activeStatus: number;
};

export default function ListofTest(){
    const [testListData, setTestListData] = useState<Array<TestListData>>([]);
    const [categoryNameArr, setCategoryNameArr] = useState<Array<string>>([]);
    const [categoryIdArr, setCategoryId] = useState<Array<number>>([]);
    const [questionCategory, setQuestionCategory] = useState(-1);
    const [testName, setTestName] = useState<string>('');
    const [testDuration, setTestDuration] = useState<string>('');
    const [numberOfQuestions, setNumberOfQuestions] = useState<string>('');
    const [showReAddForm, setShowReAddForm] = useState<boolean>(false);
    const [pageHeight, setPageHeight] = useState(0);
    const [pageWidth, setPageWidth] = useState(0);
    const [selectedIdTest, setIdTest] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    const [isDurationError, setIsDurationError] = useState(false);
    const [isNumQuestionError, setIsNumQuestionError] = useState(false);
    const [isEmptyFieldsError, setIsEmptyFieldsError] = useState(false);
    const [isCategoryError, setIsCategoryError] = useState(false);
    const [isDurZeroOrBellow, setIsDurZeroOrBellow] = useState(false);
    const [isNumQuestionZeroOrBellow, setIsNumQuestionZeroOrBellow] = useState(false);

    const divRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        fetchTestData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          const questionCategoryData = await apiGetAllQuestionCategory();
          
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

    const showFormHandler = (data?: TestListData, isEdit?: boolean, isAdd?: boolean) => {
        if(data){
            setTestName(data.nameTest);
            setNumberOfQuestions(String(data.questionAmount));
            setTestDuration(String(data.timeAmount));
            setQuestionCategory(data.idCategory);
            if(isEdit){
                setIsEditMode(true);
                setIdTest(data.idTest);
            }
        }
        if(isAdd){
            setIsEditMode(false);
            setIsAddMode(true);
        }
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

    const clearErrorState = () => {
        setIsCategoryError(false);
        setIsDurationError(false);
        setIsEmptyFieldsError(false);
        setIsNumQuestionError(false);
        setIsDurZeroOrBellow(false);
        setIsNumQuestionZeroOrBellow(false);
    }

    const clearInputState = () => {
        setTestName("");
        setNumberOfQuestions("");
        setTestDuration("");
        setQuestionCategory(-1);
    }
    const handleSubmit = async () => {
        let isNumberOfQuestionCorrect = numberOfQuestions === '0' ? true : checkIfNumber(numberOfQuestions);
        let isTestDuration = testDuration === '0' ? true : checkIfNumber(testDuration);
        let isLocalNumQuestError = false;
        let isLocalCategoryError = false;
        let isLocalDurError = false;
        let isLocalEmptyFieldError = false;
        if (testName === "" || testDuration === "" || numberOfQuestions === "") {
            setIsEmptyFieldsError(true);
            isLocalEmptyFieldError = true;
        } else {
            setIsEmptyFieldsError(false);
        }
        if (isNumberOfQuestionCorrect){
            setIsNumQuestionError(false);
            if(Number(numberOfQuestions) <= 0){
                setIsNumQuestionZeroOrBellow(true);
                isLocalNumQuestError = true;
            }else {
                setIsNumQuestionZeroOrBellow(false);
            }
        } else {
            setIsNumQuestionError(true);
            isLocalNumQuestError = true;
        }
        if (isTestDuration){
            setIsDurationError(false);
            
            if(Number(testDuration) <= 0){
                setIsDurZeroOrBellow(true);
                isLocalDurError = true;
            } else {
                setIsDurZeroOrBellow(false);
            }

        } else {
            setIsDurationError(true);
            isLocalDurError = true;
        }
        if (questionCategory === -1){
            setIsCategoryError(true);
            isLocalCategoryError = true;
        } else {
            setIsCategoryError(false);
        }
        
        if(!isLocalCategoryError && !isLocalDurError && !isLocalEmptyFieldError && !isLocalNumQuestError){
            switch(isEditMode){
                case false: await apiAddTest(questionCategory, testName, Number(testDuration), Number(numberOfQuestions));
                            await fetchTestData();
                            setShowReAddForm(false);
                            setIsEditMode(false);
                            clearErrorState();
                            clearInputState();
                            alert("Test Added");
                            break;
                case true:  await apiEditTest(questionCategory, testName, Number(testDuration), Number(numberOfQuestions), selectedIdTest);
                            await fetchTestData();
                            setShowReAddForm(false);
                            setIsEditMode(false);
                            clearErrorState();
                            clearInputState();
                            alert("Test Updated");
                            break;
            }
        } 
    }

    const handleCancel = () => {
        clearInputState();
        setShowReAddForm(false);
    }

    const ShowTestForm = () => {
        var formTitle = '';
        if(isEditMode){
            formTitle = 'Edit Test';
        } else if (isAddMode){
            formTitle = 'Add Test';
        } else {
            formTitle = 'Duplicate Test';
        }
        return(
            <div css={CreateQuestionFormWrapperStyle(pageHeight, pageWidth)}>
                <div>   
                    <div css={formContainer}>
                        <h2>{formTitle}</h2>
                        <div>
                            <div css={FormSectionStyle}>
                                <div css={FormTitleStle}>Test Name</div>
                                <input css={FormTextAreaStyle} type="text" name="testName" onChange={(e) => {setTestName(e.target.value)}} value={testName}></input>
                            </div>
                            <div css={FormSectionStyle}>
                                <div css={FormTitleStle}>Question Category</div>
                                <CustomDropDown dropdownName={categoryNameArr} dropdownId={categoryIdArr} onClickHandler={setQuestionCategory} preSelectedIndex={categoryIdArr.indexOf(questionCategory)}/>
                                {isCategoryError && <div css={errorMsgStyle}>*Please select a category</div>}
                            </div>
                            <div css={FormSectionStyle}>
                                <div css={FormTitleStle}>Test Duration (in minutes)</div>
                                <input css={FormTextAreaStyle} name="testDuration" onChange={(e) => {setTestDuration(e.target.value)}} value={testDuration}></input>
                                {isDurationError && <div css={errorMsgStyle}>*Numeric character only</div>}
                                {isDurZeroOrBellow && <div css={errorMsgStyle}>*Must be above 0</div>}
                            </div>
                            <div css={FormSectionStyle}>
                                <div css={FormTitleStle}>Number of Questions</div>
                                <input css={FormTextAreaStyle} name="numberQuestion" onChange={(e) => {setNumberOfQuestions(e.target.value)}} value={numberOfQuestions}></input>
                                {isNumQuestionError && <div css={errorMsgStyle}>*Numeric character only</div>}
                                {isNumQuestionZeroOrBellow && <div css={errorMsgStyle}>*Must be above 0</div>}
                            </div>
                            {isEmptyFieldsError && <div css={errorMsgStyle}>*Fields cannot be empty</div>}

                            <button css={RegularButtonStyle} onClick={handleSubmit}>Submit</button>
                            <button css={RegularButtonStyle} onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }

    const fetchTestData = async () => {
        const data = await apiGetTestData();
        
        setTestListData(data);
    };

    const handleActionsStatusClick = async (idTest: number, status: number) => {
        if (status === 1){
            
            alert("Test Deactivated");
            await apiDeactivateTest(idTest);
        } 
        else if(status === 0) {
            
            alert("Test Activated");
            await apiReactivateTest(idTest);
        }
        fetchTestData();
    }

    return(
        <div ref={divRef}>
            <div css={ParentGridStyle}>
                <div>
                    <HeaderComp headerTitle={VIEW_TEST_LIST_TITLE} headerButtonMode={HOME_MODE_ADMIN}/>
                </div>


                {showReAddForm && ShowTestForm()}
                <div css={wholeContentWrapperStyle}>
                <button onClick={() => showFormHandler(undefined, false, true)}>Add Test</button>
                    <div>
                        <div css={tableContainer}>
                            <table css={tableHead}>
                                <tbody>
                                    <tr css={tableHeadRow}>
                                        <td css={nameTestColumnStyle}>Test Name</td>
                                        <td css={categoryNameColumnStyle}>Category</td>
                                        <td css={durationColumnStyle}>Duration</td>
                                        <td css={numQuestionColumnStyle}>Question</td>
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
                                                        <div onClick={() => showFormHandler(data, true)}>
                                                            <FontAwesomeIcon icon={faPencil} css={editButtonStyle}/>
                                                        </div>
                                                        <div onClick={() => handleActionsStatusClick(data.idTest, data.activeStatus)}>
                                                            {data.activeStatus === 1 ? 
                                                                <FontAwesomeIcon icon={faCircleStop} css={stopButtonStyle}/> 
                                                                : 
                                                                <FontAwesomeIcon icon={faCirclePlay} css={playButtonStyle}/>
                                                            }
                                                        </div>
                                                        <div onClick={() => showFormHandler(data, false)}>
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
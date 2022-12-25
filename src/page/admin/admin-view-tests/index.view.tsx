/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import HeaderComp from '../../../component/HeaderComponent/index.view';
import { apiDeactivateTest, apiGetAllQuestionCategory, apiReactivateTest, apiGetTestData } from '../../../database-api';
import { updateLastUrl } from '../../../functions';
import { HOME_MODE_ADMIN, TEST_RESULT_TITLE } from '../../constants/index.constants';
import { ParentGridStyle } from '../../styles/index.style';
import { mainContentRow, nameTestColumnStyle, categoryNameColumnStyle, durationColumnStyle, numQuestionColumnStyle, statusColumnStyle,  actionColumnStyle, tableContainer, tableContent, tableHead, tableHeadRow, wholeContentWrapperStyle, stopButtonStyle, playButtonStyle, repeatButtonStyle, activeStatusText, actionColumnsContentWrapperStyle } from './index.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faCircleStop, faRepeat } from '@fortawesome/free-solid-svg-icons'
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
                                                        <FontAwesomeIcon icon={faRepeat} css={repeatButtonStyle}/>
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
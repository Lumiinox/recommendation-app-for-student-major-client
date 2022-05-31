/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

interface questionProps{
    question: string;
    choice_1: string;
    choice_2: string;
    choice_3: string;
    choice_4: string;
    index: number;
    answerDataHandler: (index: number, answer: number) => void;
}

export const ShowQuestion = (props: questionProps) => {
    const [choiceStatus1, setChoiceStatus1] = useState<boolean>(false);
    const [choiceStatus2, setChoiceStatus2] = useState<boolean>(false);
    const [choiceStatus3, setChoiceStatus3] = useState<boolean>(false);
    const [choiceStatus4, setChoiceStatus4] = useState<boolean>(false);

    const choiceHandler1 = () => {
        setChoiceStatus1(true);
        setChoiceStatus2(false);
        setChoiceStatus3(false);
        setChoiceStatus4(false);
        props.answerDataHandler(props.index, 1);
    }

    const choiceHandler2 = () => {
        setChoiceStatus1(false);
        setChoiceStatus2(true);
        setChoiceStatus3(false);
        setChoiceStatus4(false);
        props.answerDataHandler(props.index, 2);
    }

    const choiceHandler3 = () => {
        setChoiceStatus1(false);
        setChoiceStatus2(false);
        setChoiceStatus3(true);
        setChoiceStatus4(false);
        props.answerDataHandler(props.index, 3);
    }

    const choiceHandler4 = () => {
        setChoiceStatus1(false);
        setChoiceStatus2(false);
        setChoiceStatus3(false);
        setChoiceStatus4(true);
        props.answerDataHandler(props.index, 4);
    }

    return (
        <div className="QuestionWrapper">
            <p>{props.index+1}. {props.question}</p>
            <button onClick={choiceHandler1}>{props.choice_1}</button>
            <button onClick={choiceHandler2}>{props.choice_2}</button>
            <button onClick={choiceHandler3}>{props.choice_3}</button>
            <button onClick={choiceHandler4}>{props.choice_4}</button>
        </div>
    )
}
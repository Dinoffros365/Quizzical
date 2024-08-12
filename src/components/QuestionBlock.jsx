import { decode } from "html-entities";
import { nanoid } from "nanoid";
import QuestionItem from "./QuestionItem";

export default function QuestionBlock(props) {

  let answers = props.answerList.map((listItem) => (
    <QuestionItem
      key={nanoid()}
      text={listItem.answer}
      checkingQustion={() => props.checkingQustion(props.id ,listItem.id)}
      isTrue={listItem.isTrue}
      isCheck={listItem.isCheck}   
      isAnswer={listItem.isAnswer}
    />));

  return (
    <div className="section-quizz__block">
      <h3 className="section-quizz__header">{decode(props.question)}</h3>
      <ul className="section-quizz__list">{answers}</ul>
    </div>
  );
}

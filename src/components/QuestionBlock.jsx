import { decode } from "html-entities";
import QuestionItem from "./QuestionItem";
import { nanoid } from "nanoid";

export default function QuestionBlock(props) {
  const [choice, setChoise] = React.useState('')

  let questionList = [
    ...props.item.incorrect_answers,
    props.item.correct_answer,
  ];

  function activeAnswer() {
    
  }
  

  
  questionList = questionList.map((listItem, index) => {
      return (<QuestionItem 
        key = {nanoid()}
        text = {listItem}
        isAnswer = {index === questionList.length ? 'false' : 'true'}
      />) 
    })
    
    questionList.sort((a, b) => {
      return 0.5 - Math.random();
    });
  return (
    <div className="section-quizz__block">
      <h3 className="section-quizz__header">{decode(props.question)}</h3>
      <ul className="section-quizz__list">{questionList}</ul>
    </div>
  );
}

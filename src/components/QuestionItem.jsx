import { decode } from "html-entities";
import classNames from 'classnames';

export default function QuestionItem(props) {
  let btnClass = classNames({
    'section-quizz__answer-btn' : true,
    'is-active': props.isCheck,
    'is-null': props.isAnswer === null,
  });

  if (props.isAnswer !== undefined && props.isAnswer !== null) btnClass += props.isAnswer ? ' is-true' : ' is-false';

  return (
    <li className="section-quizz__item">
      <button className={btnClass} onClick={props.checkingQustion}>
        {decode(props.text)}
      </button>
    </li>
  );
}
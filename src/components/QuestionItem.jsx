import { decode } from "html-entities";
import classNames from 'classnames';

export default function QuestionItem(props) {
  let btnClass = classNames({
    'section-quizz__answer-btn' : true,
    // 'is-active':
  });
  
  return (
    <li className="section-quizz__item">
      <button className={btnClass} >
        {decode(props.text)}
      </button>
    </li>
  );
}

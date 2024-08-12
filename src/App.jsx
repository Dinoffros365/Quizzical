import React from "react";
import "./App.css";
import { nanoid } from "nanoid";
import QuestionBlock from "./components/QuestionBlock";

function App() {
  const [start, setStart] = React.useState(false);
  const [question, setQuestion] = React.useState([]);
  const [finishQizz , setFinishQizz] = React.useState(false)
  const [restart,   setRestart] = React.useState(0)

  React.useEffect(() => {
    const abortController = new AbortController();
    let timerID
  
    async function getQuesetion() {
      try {
        let response = await fetch(
          "https://opentdb.com/api.php?amount=4&category=23&difficulty=medium&type=multiple",
          { signal: abortController.signal }
        );

        if(!response.ok) {
          let error = new Error(response.status);
          throw  error
        }

        let result = await response.json();

        setQuestion( () => result.results.map( (item) => ({
          id : nanoid(),
          question : item.question,
          correct_answer : item.correct_answer,
          incorrect_answers : item.incorrect_answers,
          answerList: createNewList(item),
      })))

      } catch (error) {
        if (error.message === '429') {
          clearTimeout(timerID)
          timerID = setTimeout(() => setRestart((old) => old += 1 ), 1200)
        }
      }
    }
    getQuesetion();
    return () => abortController.abort();
  }, [restart]);

  function startQuizz() {
    setStart(true);
  }

  function createNewList(item) {
    let arrAnswers = [...item.incorrect_answers, item.correct_answer];

    arrAnswers.sort(() => {
      return 0.5 - Math.random();
    });

    return arrAnswers.map((answer) => ({
      id: nanoid(),
      answer: answer,
      isTrue: item.correct_answer === answer,
      isCheck: false,
    }));
  }

  function checkingQustion(blockId, itemId) {
    setQuestion((oldQuestion) => oldQuestion.map((item) => {
      if (item.id === blockId) {
        item.answerList = item.answerList.map((answers) => {
          return answers.id === itemId ? { ...answers, isCheck: true } : {...answers, isCheck: false};
        })
      }

      return item
    }))
  }

  function checkAnswers(){
    let correctAnswers = 0;

    question.map((item) => item.answerList.map((el) => {
      if (el.isCheck && el.isTrue) correctAnswers++
    }))

    setQuestion((oldQuestion) => oldQuestion.map((item) => {
      item.answerList = item.answerList.map((answers) => {
        if (answers.isTrue) {
          return { ...answers, isAnswer: true }
        } else if (answers.isCheck) {
          return { ...answers, isAnswer: false }
        }

        return {...answers, isAnswer: null}
      })

      return item
    }))
    setFinishQizz(correctAnswers)
  }


  function restartGame() {
    setFinishQizz(false)
    setQuestion((old) => [])
    setRestart((old) => old += 1)
  }

  let questionList = question.map( (item) => 
    (<QuestionBlock 
            key = {item.id}
            id={item.id}
            question = {item.question}
            correct_answer = {item.correct_answer}
            incorrect_answers = {item.incorrect_answers}
            answerList={item.answerList}
            checkingQustion={checkingQustion}
          />))
  return (
    <>
      <main className="main">
        {start ? (
          <section className="main__section-quizz section-quizz">
            <div className="section-quizz__contaner container">
              {questionList.length > 1 ? questionList : "Wait ..."}
              { finishQizz !== false  ? (
                <div className="section-quizz__subtitle-block">
                  <span className="section-quizz__span">You scored {finishQizz}/4 correct answers</span> 
                  <button className="section-quizz__btn section-quizz__btn_again" onClick={restartGame}>Play again</button>
                </div>
              ) : (
                <button className="section-quizz__btn" onClick={checkAnswers}>Check answers</button>
              )}
            </div>
          </section>
        ) : (
          <section className="main__section-start section-start">
            <h1 className="section-start__header">Quizzical</h1>
            <span className="section-start__text">
              Some description if needed
            </span>
            <button onClick={startQuizz} className="section-start__start-btn">
              Start quiz
            </button>
          </section>
        )}
      </main>
    </>
  );
}

export default App;

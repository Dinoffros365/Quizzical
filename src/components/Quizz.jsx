import React from "react";
import {nanoid} from "nanoid";
import QuestionBlock from './QuestionBlock'

export default function Quizz() {
  const [question, setQuestion] = React.useState([]);

  React.useEffect(() => {
    const abortController = new AbortController();

    async function getQuesetion(){
        try{
            let response = await fetch(
                "https://opentdb.com/api.php?amount=4&category=23&difficulty=medium&type=multiple"
              , {signal: abortController.signal});
        
              let result = await response.json();

              setQuestion(() => result.results.map((item) => (
              <QuestionBlock
                key={nanoid()}
                question={item.question}
                item={item}
              />)))
            } catch (error) {
              console.log(error)
            }
        }
        
        getQuesetion();
        
        return () => abortController.abort()
    }, []);


  return (
    <section className="main__section-quizz section-quizz">
      <div className="section-quizz__contaner container">
        {question.length > 0 ? question : 'Not load'}
        {question.length > 0 ? <button className="section-quizz__btn">Check answers</button> : ''}
      </div>
    </section>
  );
}

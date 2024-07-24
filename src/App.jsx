import React from "react";
import "./App.css";
import Quizz from "./components/Quizz";

function App() {
  const [start, setStart] = React.useState(false);

  function startQuizz() {
    setStart(true);
  }

  return (
    <>
      <main className="main">
        {start ? (
          <Quizz />
        ) : (
          <section className="main__section-start section-start">
            <h1 className="section-start__header">
              Quizzical
            </h1>
            <span className="section-start__text">Some description if needed</span>
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

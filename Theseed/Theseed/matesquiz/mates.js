// Se utiliza react prara renderizar en el DOM y gsap para animaciones  


import React, {
useRef,
useState,
useEffect } from
"https://cdn.skypack.dev/react";
import { render } from "https://cdn.skypack.dev/react-dom";

import gsap from "https://cdn.skypack.dev/gsap";


// Array de objetos para preguntas y respuestas


const questions = [
{
  id: 0,
  text: "Pregunta 1",
  answers: ["Opción A","Opción B","Opción C","Opción D"],
  correct: 0,
  selection: null },

{
  id: 1,
  text:
  "Pregunta 2",
  answers: ["Opción A","Opción B","Opción C","Opción D"],
  correct: 2,
  selection: null },

{
  id: 2,
  text: "Pregunta 3",
  answers: ["Opción A","Opción B","Opción C","Opción D"],
  correct: 2,
  selection: null },

{
  id: 3,
  text: "Pregunta 4",
  answers: ["Opción A","Opción B","Opción C","Opción D"],
  correct: 0,
  selection: null },

{
  id: 4,
  text: "Pregunta 5",
  answers: ["Opción A","Opción B","Opción C","Opción D"],
  correct: 0,
  selection: null },

{
  id: 5,
  text: "Pregunta 6",
  answers: ["Opción A","Opción B","Opción C","Opción D"],
  correct: 1,
  selection: null },

{
  id: 6,
  text:
  "Pregunta 7",
  answers: ["Opción A","Opción B","Opción C","Opción D"],
  correct: 2,
  selection: null },

{
  id: 7,
  text: "Pregunta 8",
  answers: ["Opción A","Opción B","Opción C","Opción D"],
  correct: 3,
  selection: null },

{
  id: 8,
  text:
  "Pregunta 9",
  answers: ["Opción A","Opción B","Opción C","Opción D"],
  correct: 0,
  selection: null },

{
  id: 9,
  text: "Pregunta 10",
  answers: ["Opción A","Opción B","Opción C","Opción D"],
  correct: 2,
  selection: null }];


// Contar respuestas correctas, incorrectas o sin respuesta en el cuestionario. 


function useCounter(initialState) {
  const [value, setValue] = useState(initialState);
  const reset = () => setValue(0);

  const add = () => setValue(value => value += 1);

  return { value, add, reset };
}


// Presenta las preguntas, opciones de respuesta y lógica de selección de respuesta


function Question({
  data,
  buttonText,
  hasButton = true,
  onQuestionButtonClick,
  showAnswer = false,
  markSelection = null })
{
  const [answer, setAnswer] = useState(null);
  const parseValue = value => value ? parseInt(value.split("-")[1]) : null;
  const questionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
    questionRef.current.querySelector(".question-text"),
    {
      x: 40,
      opacity: 0 },

    {
      x: 0,
      opacity: 1,
      duration: 0.4 });


    gsap.fromTo(
    questionRef.current.querySelectorAll("li"),
    {
      opacity: 0,
      x: 40 },

    {
      x: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1 });


  }, [data]);

  return (
    React.createElement("div", { className: "question", ref: questionRef }, 
    React.createElement("div", { className: "question-inner" }, 
    React.createElement("h2", { className: "question-text" }, data.text), 
    React.createElement("ul", { className: "question-answers" },
    data.answers.map((text, index) => {
      const value = `q${data.id}-${index}`;
      return (
        React.createElement("li", {
          className:
          index === data.correct && showAnswer ? "is-true" : "",

          "data-selected": markSelection === index ? true : null }, 

        React.createElement("input", {
          type: "radio",
          name: `q_${data.id}`,
          value: value,
          id: value,
          onChange: e => setAnswer(e.target.value),
          checked:
          !showAnswer ? answer === value : markSelection === index }), 


        React.createElement("label", { className: "question-answer", htmlFor: value },
        text)));
    }))),
    hasButton && 
    React.createElement("button", {
      className: "question-button",
      onClick: () => onQuestionButtonClick(parseValue(answer), data) },

    buttonText)));
}


// Muestra resultados del cuestionario, respuestas correctas, incorrectas y sin contestar


function Results({ wrong, correct, empty }) {
  return (
    React.createElement("div", { className: "result" }, 
    React.createElement("div", { className: "result-item is-correct" }, 
    React.createElement("span", { className: "result-count" }, correct), 
    React.createElement("span", { className: "result-text" }, 
    React.createElement("svg", {
      width: "16",
      height: "16",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      className: "css-i6dzq1",
      viewBox: "0 0 24 24" }, 

    React.createElement("path", { d: "M22 11.08V12a10 10 0 11-5.93-9.14" }), 
    React.createElement("path", { d: "M22 4L12 14.01 9 11.01" })), "CORRECTO")), 




    React.createElement("div", { className: "result-item is-wrong" }, 
    React.createElement("span", { className: "result-count" }, wrong), 
    React.createElement("span", { className: "result-text" }, 
    React.createElement("svg", {
      width: "16",
      height: "16",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      className: "css-i6dzq1",
      viewBox: "0 0 24 24" }, 

    React.createElement("circle", { cx: "12", cy: "12", r: "10" }), 
    React.createElement("path", { d: "M15 9L9 15" }), 
    React.createElement("path", { d: "M9 9L15 15" })), "INCORRECTO")), 




    React.createElement("div", { className: "result-item is-empty" }, 
    React.createElement("span", { className: "result-count" }, empty), 
    React.createElement("span", { className: "result-text" }, 
    React.createElement("svg", {
      width: "16",
      height: "16",
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      className: "css-i6dzq1",
      viewBox: "0 0 24 24" }, 

    React.createElement("circle", { cx: "12", cy: "12", r: "10" }), 
    React.createElement("path", { d: "M8 12L16 12" })), "SIN CONTESTAR"))));
}


// Corrección de todas las preguntas y su respuesta correcta


function QuestionCorrection({ wrong, correct, empty }) {
  return (
    React.createElement("div", { className: "correction" },
    questions.map(question => {
      return (
        React.createElement(Question, {
          hasButton: false,
          markSelection: question.selection,
          showAnswer: true,
          data: question }));
    })));
}


// Contiene la lógica principal, como el manejo de preguntas, respuestas, y el control del flujo del cuestionario.


function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameSize, setGameSize] = useState({});
  const totalQuestion = questions.length - 1;
  const gameRef = useRef(null);
  const gameOverlayRef = useRef(null);

  const question = useCounter(0);
  const correct = useCounter(0);
  const wrong = useCounter(0);
  const empty = useCounter(0);

  const handleNewQuestionClick = (selectedValue, currQuestion) => {
    if (totalQuestion >= question.value) {
      if (selectedValue === currQuestion.correct) {
        correct.add();
      } else if (
      selectedValue !== null &&
      selectedValue !== currQuestion.correct)
      {
        wrong.add();
      } else {
        empty.add();
      }
      questions[currQuestion.id].selection = selectedValue;
      question.add();
    }
  };

  const resetSelection = () => {
    questions.forEach(q => q.selection = null);
  };

  const handleRestartClick = () => {
    setGameFinished(false);
    setGameStarted(false);
    resetSelection();
    question.reset();
    correct.reset();
    wrong.reset();
    empty.reset();
  };

  const indicatorBg = index => {
    if (question.value > index) {
      return "#fff";
    } else if (question.value === index) {
      return "#588157";
    } else {
      return "rgba(255,255,255,.2)";
    }
  };

  useEffect(() => {
    if (gameStarted) {
      document.body.classList.add("game-started");
    } else {
      document.body.classList.remove("game-started");
    }
  }, [gameStarted]);

  useEffect(() => {
    if (question.value > totalQuestion) {
      gameRef.current.scrollTop = 0;
    }
  }, [question.value]);

  return (
    React.createElement("div", {
      className: "game",
      ref: gameRef,
      "data-game-started": gameStarted ? true : null,
      "data-game-finished": question.value > totalQuestion ? true : null }, 

    React.createElement("div", { className: "intro" }, 
    React.createElement("div", { className: "intro-inner" }, 
    React.createElement("h1", { className: "intro-title" }, "Matemáticas"),
    !gameStarted && 
    React.createElement(React.Fragment, null, 
    React.createElement("p", { className: "intro-desc" },
    `INGRESA para ver las preguntas: bit.ly/3PcQb0a `),
    

    React.createElement("button", {
      className: "intro-button",
      onClick: () => setGameStarted(true) }, "Empezar")),





    gameStarted && 
    React.createElement("div", { className: "indicator" },
    questions.map((q, index) => {
      return (
        React.createElement("span", {
          className: "indicator-item",
          style: {
            backgroundColor: indicatorBg(index) } }));



    })), 


    React.createElement(Results, {
      wrong: wrong.value,
      correct: correct.value,
      empty: empty.value }), 

    React.createElement("button", {
      className: "restart-button",
      onClick: () => handleRestartClick() }, "Reiniciar"))), 





    React.createElement("div", { className: "game-area" },
    questions[question.value] && 
    React.createElement(Question, {
      data: questions[question.value],
      buttonText:
      question.value !== totalQuestion ? "Siguiente" : "Terminar Quiz",

      onQuestionButtonClick: handleNewQuestionClick }),


    !questions[question.value] && 
    React.createElement(React.Fragment, null, 
    React.createElement(QuestionCorrection, { data: questions })))));
}


// Renderización del componente principal, el equipo proyecta la app


render( React.createElement(App, null), document.querySelector("#app"));
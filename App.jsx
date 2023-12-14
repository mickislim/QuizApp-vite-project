import React, { useEffect, useState } from "react";
import { data } from './data.js';




function App() {
  const [questions, setQuestions] = useState(data);
  const [value, setValue] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [correctAns,setCorrectAns]= useState([])
  const [showNext, setShowNext] = useState(false);
  const [score,setScore] = useState(0)
  const [isCorrect,setIScorrect] = useState(null)
  const [ alert,setAlert] = useState({show:false,type:'',msg:''})
  const [successAlert,setSuccessAlert] = useState({show:false,type:'',msg:''})
  const [isWrongAlert,setIsWrongAlert] = useState({ show:false,type:'',msg:''})


  

  const currentQuestion = questions[value];



  const handleAns = (selected) => {
    const correctAnswer = currentQuestion.answer.find(answer => answer.correct);

    if (currentQuestion) {
      setCorrectAns(correctAnswer);
      setSelectedAnswer(true)
      setShowNext(true);
    
  
    } else {
      setSelectedAnswer(null);
      setShowNext(false);
      setCorrectAns(null)
     
    }

    if (selected && selected.correct) {
      setScore(score + 1);
      setIScorrect(true)
      setSuccessAlert({show:true,msg:'Genius',type:'success'})
     
    }else{
      setIScorrect(false)
      setIsWrongAlert({show:true,msg:'Incorrect Answer', type:'wrong'})

    }

      


  };

  const handleNext = () => {


  
    setShowNext(false);
    setSelectedAnswer(null);
    setValue(value + 1 >= questions.length ? 0 : value + 1);
  };



  
  useEffect(() => {
    setShowNext(false);
    setSelectedAnswer(null);
    setIsWrongAlert({show:true})
setSuccessAlert({show:true})
  }, [questions, value]);

  return (
    <div className="container">
      <div className="main">
        <header >
        <h1>Quiz App</h1>
        <h2 >{score}</h2>
        </header>
     
        <h3>{currentQuestion.question}</h3>
        
        {isCorrect? <p className={successAlert.type}> {successAlert.msg}</p>: <p className={isWrongAlert.type}>{isWrongAlert.msg}</p> }
      



        <div className="btn-grid">
          {currentQuestion.answer.map((item, itemIndex) => (
            <button
              key={itemIndex}
              onClick={() => handleAns(item)}
              className={correctAns === item ? 'btn active' : 'btn'}
              disabled={selectedAnswer !== null} 
            >
              {item.text}
            </button>
          ))}

          {showNext && (
            <div className="next-btn">
              <button onClick={handleNext} className="next">
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
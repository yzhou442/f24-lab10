import React, { useState, useEffect, useRef } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore';
import QuizQuestion from '../core/QuizQuestion';

const Quiz: React.FC = () => {
  const quizCoreRef = useRef(new QuizCore());
  const quizCore = quizCoreRef.current;

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(quizCore.getCurrentQuestion());
  const [score, setScore] = useState<number>(quizCore.getScore());
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  const handleButtonClick = (): void => {
    if (selectedAnswer) {
      quizCore.answerQuestion(selectedAnswer);
      setScore(quizCore.getScore());
    }

    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setCurrentQuestion(quizCore.getCurrentQuestion());
      setSelectedAnswer(null);
    } else {
      setIsQuizCompleted(true);
    }
  };

  if (!currentQuestion && !isQuizCompleted) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion?.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion?.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>
        {quizCore.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>

      {isQuizCompleted && (
        <div>
          <h2>Quiz Completed</h2>
          <p>Final Score: {score} out of {quizCore.getTotalQuestions()}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;

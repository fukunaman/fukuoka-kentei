import React, { useState, useEffect } from 'react';
import { TestData, UserAnswer } from '../types';
import QuestionCard from './QuestionCard';

interface TestInterfaceProps {
  testData: TestData;
  onTestComplete: (answers: UserAnswer[], timeSpent: number) => void;
  onBackToMenu: () => void;
}

const TestInterface: React.FC<TestInterfaceProps> = ({
  testData,
  onTestComplete,
  onBackToMenu,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(testData.questions.length).fill(null)
  );
  const [timeRemaining, setTimeRemaining] = useState(testData.timeLimit * 60); // convert to seconds
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 60000); // convert to minutes
    const userAnswers: UserAnswer[] = answers.map((answer, index) => ({
      questionId: testData.questions[index].id,
      selectedAnswer: answer ?? -1,
      isCorrect: answer === testData.questions[index].correctAnswer,
    }));
    
    onTestComplete(userAnswers, timeSpent);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredQuestions = answers.filter(answer => answer !== null).length;
  const currentQuestion = testData.questions[currentQuestionIndex];

  return (
    <div className="test-interface">
      <header className="test-header">
        <div className="test-info">
          <h2>{testData.year} {testData.difficulty}</h2>
          <button onClick={onBackToMenu} className="back-button">
            メニューに戻る
          </button>
        </div>
        <div className="test-status">
          <span className="time-remaining">
            残り時間: {formatTime(timeRemaining)}
          </span>
          <span className="progress">
            回答済み: {answeredQuestions} / {testData.questions.length}問
          </span>
        </div>
      </header>

      <main className="test-content">
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={answers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={testData.questions.length}
        />
      </main>

      <footer className="test-footer">
        <div className="navigation-buttons">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="nav-button prev-button"
          >
            前の問題
          </button>
          
          {currentQuestionIndex === testData.questions.length - 1 ? (
            <button onClick={handleSubmit} className="submit-button">
              解答を提出する
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="nav-button next-button"
            >
              次の問題
            </button>
          )}
        </div>

        <div className="question-navigator">
          {testData.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`question-nav-button ${
                index === currentQuestionIndex ? 'current' : ''
              } ${
                answers[index] !== null ? 'answered' : ''
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default TestInterface;
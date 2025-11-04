import React, { useState, useEffect } from 'react';
import type { TestData, UserAnswer } from '../types';
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
  const [showResult, setShowResult] = useState<boolean[]>(
    new Array(testData.questions.length).fill(false)
  );
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<number | null>(null);

  // コンポーネントのアンマウント時にタイマーをクリーンアップ
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer !== null) {
        clearTimeout(autoAdvanceTimer);
      }
    };
  }, [autoAdvanceTimer]);

  const handleAnswerSelect = (answer: number) => {
    // 既に回答済みの場合は何もしない
    if (showResult[currentQuestionIndex]) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    
    // 即座に正誤を表示
    const newShowResult = [...showResult];
    newShowResult[currentQuestionIndex] = true;
    setShowResult(newShowResult);
    
    // 既存のタイマーをクリア
    if (autoAdvanceTimer !== null) {
      clearTimeout(autoAdvanceTimer);
    }
    
    // 1秒後に自動で次の問題に遷移（最後の問題でない場合）
    if (currentQuestionIndex < testData.questions.length - 1) {
      const timer = setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAutoAdvanceTimer(null);
      }, 1000);
      setAutoAdvanceTimer(timer);
    }
  };

  const handleNextQuestion = () => {
    // 自動遷移タイマーをクリア
    if (autoAdvanceTimer !== null) {
      clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }
    
    if (currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    // 自動遷移タイマーをクリア
    if (autoAdvanceTimer !== null) {
      clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const userAnswers: UserAnswer[] = answers.map((answer, index) => ({
      questionId: testData.questions[index].id,
      selectedAnswer: answer ?? -1,
      isCorrect: answer === testData.questions[index].correctAnswer,
    }));
    
    onTestComplete(userAnswers, 0); // 時間は0に設定
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
          showResult={showResult[currentQuestionIndex]}
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
              onClick={() => {
                // 自動遷移タイマーをクリア
                if (autoAdvanceTimer !== null) {
                  clearTimeout(autoAdvanceTimer);
                  setAutoAdvanceTimer(null);
                }
                setCurrentQuestionIndex(index);
              }}
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
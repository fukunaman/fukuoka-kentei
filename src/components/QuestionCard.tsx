import React from 'react';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (answer: number) => void;
  questionNumber: number;
  totalQuestions: number;
  showResult?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
  showResult = false,
}) => {
  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-number">
          第{questionNumber}問 / {totalQuestions}問
        </span>
      </div>
      
      <div className="question-text">
        {question.question}
      </div>
      
      <div className="options">
        {question.options.map((option, index) => {
          let buttonClass = 'option-button';
          if (selectedAnswer === index) {
            buttonClass += ' selected';
          }
          if (showResult && selectedAnswer !== null) {
            if (index === question.correctAnswer) {
              buttonClass += ' correct-answer';
            } else if (index === selectedAnswer && index !== question.correctAnswer) {
              buttonClass += ' incorrect-answer';
            }
          }
          
          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => !showResult && onAnswerSelect(index)}
              disabled={showResult}
            >
              <span className="option-number">{'①②③④'[index]}</span>
              <span className="option-text">{option}</span>
              {showResult && index === question.correctAnswer && (
                <span className="result-icon correct">✓</span>
              )}
              {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                <span className="result-icon incorrect">✗</span>
              )}
            </button>
          );
        })}
      </div>
      
      {showResult && question.explanation && (
        <div className="explanation">
          <h4>解説</h4>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
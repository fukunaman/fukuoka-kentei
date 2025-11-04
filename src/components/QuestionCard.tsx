import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (answer: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
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
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedAnswer === index ? 'selected' : ''}`}
            onClick={() => onAnswerSelect(index)}
          >
            <span className="option-number">{'①②③④'[index]}</span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
import React from 'react';
import type { TestResult, TestData } from '../types';

interface ResultScreenProps {
  result: TestResult;
  testData: TestData;
  onRetakeTest: () => void;
  onBackToMenu: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  testData,
  onRetakeTest,
  onBackToMenu,
}) => {
  const getScoreMessage = (score: number) => {
    if (score >= 80) return { message: '優秀！', color: 'excellent' };
    if (score >= 70) return { message: '合格！', color: 'good' };
    if (score >= 60) return { message: 'もう少し！', color: 'average' };
    return { message: '再チャレンジ！', color: 'poor' };
  };

  const scoreInfo = getScoreMessage(result.score);

  return (
    <div className="result-screen">
      <header className="result-header">
        <h2>テスト結果</h2>
        <div className="test-info">
          {testData.year} {testData.difficulty}
        </div>
      </header>

      <main className="result-content">
        <div className={`score-card ${scoreInfo.color}`}>
          <div className="score-value">{result.score}点</div>
          <div className="score-message">{scoreInfo.message}</div>
          <div className="score-details">
            {result.correctAnswers} / {result.totalQuestions} 問正解
          </div>
        </div>

        <div className="result-stats">
          <div className="stat-item">
            <span className="stat-label">テスト時間</span>
            <span className="stat-value">{result.timeSpent}分</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">正答率</span>
            <span className="stat-value">{result.score}%</span>
          </div>
        </div>

        <div className="passing-score-info">
          <h3>福岡検定の合格点</h3>
          <p>福岡検定の合格点は、初級が70%、中級が60%、上級が80%です。</p>
        </div>

        <div className="answer-review">
          <h3>解答一覧</h3>
          <div className="answer-grid">
            {result.answers.map((answer, index) => (
              <div
                key={index}
                className={`answer-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
              >
                <span className="question-num">Q{index + 1}</span>
                <span className="answer-result">
                  {answer.selectedAnswer === -1 ? '未回答' : 
                   answer.isCorrect ? '○' : '×'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="detailed-results">
          <h3>詳細結果</h3>
          {testData.questions.map((question, index) => {
            const userAnswer = result.answers[index];
            const isCorrect = userAnswer.isCorrect;
            const selectedOption = userAnswer.selectedAnswer;
            const correctOption = question.correctAnswer;

            return (
              <div key={question.id} className={`question-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="question-header">
                  <span className="question-number">第{index + 1}問</span>
                  <span className={`result-badge ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {selectedOption === -1 ? '未回答' : isCorrect ? '正解' : '不正解'}
                  </span>
                </div>
                <div className="question-text">{question.question}</div>
                <div className="answer-comparison">
                  {selectedOption !== -1 && (
                    <div className={`user-answer ${isCorrect ? 'correct' : 'incorrect'}`}>
                      あなたの回答: {'①②③④'[selectedOption]} {question.options[selectedOption]}
                    </div>
                  )}
                  {!isCorrect && (
                    <div className="correct-answer">
                      正解: {'①②③④'[correctOption]} {question.options[correctOption]}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="result-footer">
        <button onClick={onRetakeTest} className="retake-button">
          もう一度テストする
        </button>
        <button onClick={onBackToMenu} className="menu-button">
          メニューに戻る
        </button>
      </footer>
    </div>
  );
};

export default ResultScreen;
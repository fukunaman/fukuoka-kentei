import React from 'react';

interface YearDifficultySelectorProps {
  selectedYear: string;
  selectedDifficulty: '初級' | '上級';
  onYearChange: (year: string) => void;
  onDifficultyChange: (difficulty: '初級' | '上級') => void;
  onStartTest: () => void;
}

const availableYears = ['令和6年度'];
const difficulties: ('初級' | '上級')[] = ['初級', '上級'];

const YearDifficultySelector: React.FC<YearDifficultySelectorProps> = ({
  selectedYear,
  selectedDifficulty,
  onYearChange,
  onDifficultyChange,
  onStartTest,
}) => {
  return (
    <div className="year-difficulty-selector">
      <h1>福岡検定オンラインテスト</h1>
      
      <div className="selection-container">
        <div className="selector-group">
          <label htmlFor="year-select">年度を選択してください</label>
          <select 
            id="year-select"
            value={selectedYear} 
            onChange={(e) => onYearChange(e.target.value)}
            className="selector"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="selector-group">
          <label htmlFor="difficulty-select">難易度を選択してください</label>
          <select
            id="difficulty-select"
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value as '初級' | '上級')}
            className="selector"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>

        <button onClick={onStartTest} className="start-button">
          テストを開始する
        </button>
      </div>

      <div className="info">
        <p>選択された設定:</p>
        <ul>
          <li>年度: {selectedYear}</li>
          <li>難易度: {selectedDifficulty}</li>
          <li>制限時間: 30分</li>
          <li>問題数: 50問</li>
        </ul>
      </div>
    </div>
  );
};

export default YearDifficultySelector;
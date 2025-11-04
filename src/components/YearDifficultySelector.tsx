import React from 'react';

interface YearDifficultySelectorProps {
  selectedYear: string;
  selectedDifficulty: '初級';
  onYearChange: (year: string) => void;
  onDifficultyChange: (difficulty: '初級') => void;
  onStartTest: () => void;
}

const availableYears = ['令和6年度'];
const difficulties: ('初級')[] = ['初級'];

const YearDifficultySelector: React.FC<YearDifficultySelectorProps> = ({
  selectedYear,
  selectedDifficulty,
  onYearChange,
  onDifficultyChange,
  onStartTest,
}) => {
  return (
    <main className="year-difficulty-selector" role="main">
      <header>
        <h1>福岡検定オンラインテスト</h1>
      </header>
      
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
            onChange={(e) => onDifficultyChange(e.target.value as '初級')}
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

      <footer className="data-source">
        <p>データ元: <a href="https://fukuokakentei.com/past/" target="_blank" rel="noopener noreferrer">福岡検定過去問題</a></p>
        <p>開発: <a href="https://github.com/fukunaman/fukuoka-kentei" target="_blank" rel="noopener noreferrer">ふくなまん</a></p>
      </footer>
    </main>
  );
};

export default YearDifficultySelector;

import { useState } from 'react';
import YearDifficultySelector from './components/YearDifficultySelector';
import TestInterface from './components/TestInterface';
import ResultScreen from './components/ResultScreen';
import type { TestData, TestResult, UserAnswer } from './types';
import { calculateScore } from './utils/scoring';
import testDataR6Shokyu from './data/questions/r6_shokyu.json';
import './App.css';

type AppState = 'menu' | 'test' | 'result';

function App() {
  const [appState, setAppState] = useState<AppState>('menu');
  const [selectedYear, setSelectedYear] = useState('令和6年度');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'初級' | '上級'>('初級');
  const [currentTestData, setCurrentTestData] = useState<TestData | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const getTestData = (year: string, difficulty: '初級' | '上級'): TestData | null => {
    if (year === '令和6年度' && difficulty === '初級') {
      return testDataR6Shokyu as TestData;
    }
    
    return null;
  };

  const handleStartTest = () => {
    const testData = getTestData(selectedYear, selectedDifficulty);
    if (testData) {
      setCurrentTestData(testData);
      setAppState('test');
    } else {
      alert('選択された年度・難易度のテストデータが見つかりません。');
    }
  };

  const handleTestComplete = (answers: UserAnswer[], timeSpent: number) => {
    const result = calculateScore(answers, timeSpent);
    setTestResult(result);
    setAppState('result');
  };

  const handleBackToMenu = () => {
    setAppState('menu');
    setCurrentTestData(null);
    setTestResult(null);
  };

  const handleRetakeTest = () => {
    setAppState('test');
    setTestResult(null);
  };

  return (
    <div className="app">
      {appState === 'menu' && (
        <YearDifficultySelector
          selectedYear={selectedYear}
          selectedDifficulty={selectedDifficulty}
          onYearChange={setSelectedYear}
          onDifficultyChange={setSelectedDifficulty}
          onStartTest={handleStartTest}
        />
      )}

      {appState === 'test' && currentTestData && (
        <TestInterface
          testData={currentTestData}
          onTestComplete={handleTestComplete}
          onBackToMenu={handleBackToMenu}
        />
      )}

      {appState === 'result' && testResult && currentTestData && (
        <ResultScreen
          result={testResult}
          testData={currentTestData}
          onRetakeTest={handleRetakeTest}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}

export default App

# 福岡検定 Web アプリ

福岡検定の過去問題を練習できるWebアプリケーションです。

## 概要

このアプリケーションは、福岡検定の試験対策として過去問題を解くことができます。実際の試験と同様の形式で、制限時間内に問題を解答し、結果を確認することができます。

## 機能

- **年度・難易度選択**: 試験の年度と難易度（初級・上級）を選択可能
- **制限時間付き試験**: 実際の試験と同様の制限時間で問題に挑戦
- **リアルタイム採点**: 回答後すぐに正誤と得点を確認
- **詳細な結果表示**: 各問題の正誤、正答率、所要時間を表示
- **レスポンシブデザイン**: PC・タブレット・スマートフォンに対応

## 技術スタック

- **フロントエンド**: React 19.1
- **言語**: TypeScript 5.9
- **ビルドツール**: Vite 7.1
- **スタイリング**: CSS
- **リンター**: ESLint 9.36

## 必要な環境

- Node.js 18.x 以上
- pnpm (推奨パッケージマネージャー)

## セットアップ

### インストール

```bash
# リポジトリのクローン
git clone <repository-url>
cd fukuoka-kentei

# 依存関係のインストール
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

開発サーバーが起動し、`http://localhost:5173` でアプリケーションにアクセスできます。

### ビルド

```bash
# プロダクションビルド
pnpm build

# ビルドしたアプリのプレビュー
pnpm preview
```

### リント

```bash
pnpm lint
```

## プロジェクト構成

```
fukuoka-kentei/
├── public/              # 静的ファイル
├── src/
│   ├── components/      # Reactコンポーネント
│   │   ├── YearDifficultySelector.tsx  # 年度・難易度選択画面
│   │   ├── TestInterface.tsx           # 試験画面
│   │   ├── QuestionCard.tsx            # 問題カード
│   │   └── ResultScreen.tsx            # 結果表示画面
│   ├── data/
│   │   └── questions/   # 問題データ（JSON形式）
│   │       └── r6_shokyu.json         # 令和6年度初級
│   ├── types/           # TypeScript型定義
│   ├── utils/           # ユーティリティ関数
│   │   └── scoring.ts   # 採点ロジック
│   ├── App.tsx          # メインアプリケーション
│   ├── App.css          # アプリケーションスタイル
│   ├── main.tsx         # エントリーポイント
│   └── index.css        # グローバルスタイル
├── index.html           # HTMLテンプレート
├── package.json         # パッケージ設定
├── vite.config.ts       # Vite設定
└── tsconfig.json        # TypeScript設定
```

## 問題データの追加

新しい年度や難易度の問題を追加する場合は、以下の形式のJSONファイルを `src/data/questions/` に配置してください。

```json
{
  "year": "令和6年度",
  "difficulty": "初級",
  "timeLimit": 30,
  "questions": [
    {
      "id": 1,
      "question": "問題文",
      "options": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
      "correctAnswer": 0,
      "explanation": "解説（オプション）"
    }
  ]
}
```

その後、`src/App.tsx` の `getTestData` 関数に読み込みロジックを追加してください。

## 使い方

1. トップページで試験の年度と難易度を選択
2. 「試験開始」ボタンをクリック
3. 制限時間内に問題を解答
4. 全問回答後、または「試験を終了する」ボタンで採点
5. 結果画面で正答率と各問題の正誤を確認
6. 「もう一度挑戦」または「メニューに戻る」を選択

## ライセンス

MIT License

## 貢献

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容を議論してください。

## お問い合わせ

質問や提案がある場合は、GitHubのissueでお知らせください。

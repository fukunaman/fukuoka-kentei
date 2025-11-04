# 福岡検定過去問テスト

福岡検定の過去問題をブラウザ上で練習できるWebアプリケーションです。

[![GitHub](https://img.shields.io/badge/GitHub-fukunaman/fukuoka--kentei-blue)](https://github.com/fukunaman/fukuoka-kentei)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🌟 特徴

- **即座の正誤判定**: 1問ずつ回答するたびに正誤がすぐわかる
- **解説表示**: 正解とともに詳しい解説を表示
- **モダンなUI**: ガラスモーフィズムデザインで美しいインターフェース
- **レスポンシブ対応**: PC・タブレット・スマートフォンで快適に利用可能
- **タイマーなし**: 自分のペースで学習できる

## 🚀 デモ

[デモサイト](https://fukunaman.github.io/fukuoka-kentei/) で実際に試すことができます。

## 📱 機能

### 試験機能
- **年度選択**: 利用可能な試験年度から選択
- **難易度選択**: 初級（現在は初級のみ対応）
- **即時フィードバック**: 回答後すぐに正誤と解説を表示
- **進捗表示**: 回答済み問題数の確認
- **問題ナビゲーション**: 任意の問題に移動可能

### 結果機能
- **詳細な採点結果**: 総合得点と各問題の正誤
- **パフォーマンス分析**: 正答率に基づく評価
- **復習機能**: 間違えた問題の確認と解説
- **再挑戦**: 同じ試験の再受験

## 🛠 技術スタック

### フロントエンド
- **React** 19.1 - UIライブラリ
- **TypeScript** 5.9 - 型安全な開発
- **Vite** 7.1 - 高速ビルドツール
- **CSS** - ガラスモーフィズムデザイン

### 開発ツール
- **ESLint** 9.36 - コード品質管理
- **pnpm** - 効率的なパッケージ管理

## 🏗 セットアップ

### 必要な環境
- Node.js 18.x 以上
- pnpm (推奨)

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/fukunaman/fukuoka-kentei.git
cd fukuoka-kentei

# 依存関係のインストール
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで `http://localhost:5173` にアクセスしてください。

### ビルドとデプロイ

```bash
# プロダクションビルド
pnpm build

# ビルド結果のプレビュー
pnpm preview
```

## 📁 プロジェクト構成

```
fukuoka-kentei/
├── public/                  # 静的ファイル
├── src/
│   ├── components/          # Reactコンポーネント
│   │   ├── YearDifficultySelector.tsx  # 試験選択画面
│   │   ├── TestInterface.tsx           # 試験実施画面
│   │   ├── QuestionCard.tsx            # 問題表示コンポーネント
│   │   └── ResultScreen.tsx            # 結果表示画面
│   ├── data/
│   │   └── questions/       # 問題データ（JSON）
│   │       └── r6_shokyu.json         # 令和6年度初級
│   ├── types/               # TypeScript型定義
│   │   └── index.ts
│   ├── utils/               # ユーティリティ関数
│   │   └── scoring.ts       # 採点ロジック
│   ├── App.tsx              # メインアプリケーション
│   ├── App.css              # アプリケーションスタイル
│   ├── main.tsx             # エントリーポイント
│   └── index.css            # グローバルスタイル
├── CLAUDE.md                # AI開発アシスタント向けガイド
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 📊 現在利用可能なデータ

- **令和6年度 初級**: 50問（完全対応）

## 📝 問題データの追加

新しい問題データを追加する場合は、以下の形式でJSONファイルを作成してください：

```json
{
  "year": "令和7年度",
  "difficulty": "初級",
  "timeLimit": 30,
  "questions": [
    {
      "id": 1,
      "question": "問題文をここに記述",
      "options": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
      "correctAnswer": 0,
      "explanation": "解説をここに記述（任意）"
    }
  ]
}
```

ファイルを `src/data/questions/` に配置し、`src/App.tsx` の `getTestData` 関数を更新してください。

## 🎯 使い方

1. **年度・難易度選択**: トップページで試験を選択
2. **テスト開始**: 「テストを開始する」ボタンをクリック
3. **問題回答**: 各問題で選択肢を選んで即座に正誤を確認
4. **解説確認**: 正解とともに表示される解説を読む
5. **問題移動**: 前後の問題や任意の問題に移動
6. **結果確認**: 全問終了後に詳細な結果を確認
7. **再挑戦**: 必要に応じて再受験

## 🔗 データソース

問題データは[福岡検定公式サイト](https://fukuokakentei.com/past/)の過去問題を基に作成されています。

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 🤝 貢献

プルリクエストや改善提案を歓迎します！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 👨‍💻 開発者

**ふくなまん** - [@fukunaman](https://github.com/fukunaman)

## 📞 お問い合わせ

質問や提案がある場合は、[GitHub Issues](https://github.com/fukunaman/fukuoka-kentei/issues)でお知らせください。

---

Made with ❤️ for 福岡検定受験者の皆様
# Markdown Memo App 📝

> **AI駆動開発**で構築された、プロフェッショナルなマークダウンメモアプリケーション

**バイブコーディング（Vibe Coding）**の手法を用いて、Claude Codeと協働で開発したモダンなメモアプリです。
知識の蓄積とAI学習システムを組み込んだ、次世代の開発プロセスの実証プロジェクトです。

![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0.8-green?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-blue?style=flat-square&logo=tailwindcss)

## ✨ 主要機能

- 📝 **メモのCRUD機能** - 作成、編集、削除、一覧表示
- 👀 **リアルタイムマークダウンプレビュー** - 編集とプレビューのタブ切り替え
- 🎨 **シンタックスハイライト** - 14+のプログラミング言語に対応
- 📋 **コピー機能付きコードブロック** - ワンクリックでコード複製
- 💾 **ローカルストレージ永続化** - ブラウザ再起動後も情報を保持
- 📱 **レスポンシブデザイン** - モバイル・デスクトップ対応
- 🔄 **自動保存** - メモの変更を即座に保存
- 🔍 **カテゴリー管理** - メモの整理と分類

## 🛠️ 技術スタック

### フロントエンド
- **React 18** - モダンなUIライブラリ
- **TypeScript** - 型安全性とコード品質の向上
- **Tailwind CSS** - ユーティリティファーストCSS
- **Vite** - 高速ビルドツール

### ライブラリ
- **marked.js** - マークダウンパーサー
- **prism-react-renderer** - シンタックスハイライト
- **React Hooks** - 状態管理とロジック

### 開発ツール
- **ESLint** - コード品質チェック
- **TypeScript Compiler** - 型チェック
- **Claude Code** - AI開発アシスタント

## 🚀 セットアップ方法

### 前提条件
- Node.js 18+ 
- npm 9+ または yarn

### インストール
```bash
# リポジトリをクローン
git clone https://github.com/kirikab-27/markdown-memo-app.git

# ディレクトリに移動
cd markdown-memo-app

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

アプリが http://localhost:5173 で起動します。

### ビルド
```bash
# 本番用ビルド
npm run build

# プレビュー
npm run preview
```

## 📖 使い方

### メモの基本操作
1. **新規作成**: 「新しいメモ」ボタンをクリック
2. **編集**: メモをクリックして編集画面を開く
3. **削除**: メモの右上の「×」ボタンをクリック
4. **保存**: 自動保存されるため手動保存不要

### マークダウン機能
```markdown
# 見出し
## サブ見出し

**太字** *斜体* `インラインコード`

- リスト項目1
- リスト項目2

\`\`\`javascript
const hello = "Hello, World!";
console.log(hello);
\`\`\`
```

### サポート言語（シンタックスハイライト）
JavaScript, TypeScript, Python, HTML, CSS, JSON, Bash, SQL, Java, Go, Rust, PHP, Ruby, Swift など

## 🤖 AI開発について

このプロジェクトは**バイブコーディング（Vibe Coding）**という革新的な開発手法で構築されました。

### AI学習システム
- **`.ai/CLAUDE.md`** - 完全な20ステップ開発ワークフロー
- **`.ai/troubleshooting.md`** - 問題と解決策のデータベース
- **`.ai/tech-notes.md`** - 技術的決定事項の記録
- **`.ai/lessons-learned.md`** - 開発で得られた知見の蓄積

### バイブコーディングの特徴
1. **知識の継承** - 過去の問題と解決策を蓄積
2. **エラー予防** - 既知の問題を自動回避
3. **効率化** - 構造化されたワークフローで開発速度向上
4. **品質向上** - 蓄積された知見による継続的改善

### Claude Code統合
- **設定ファイル** (`.claude/settings.json`) でプロジェクト固有の権限管理
- **セキュリティ** - 権限ベースアーキテクチャで安全な開発
- **自動化** - 繰り返しタスクの効率化

## 📂 プロジェクト構造

```
markdown-memo-app/
├── .ai/                    # AI開発システム
│   ├── CLAUDE.md          # 完全な開発ワークフロー
│   ├── troubleshooting.md # 問題解決データベース
│   ├── tech-notes.md      # 技術決定記録
│   └── lessons-learned.md # 学習知見
├── .claude/               # Claude Code設定
│   └── settings.json      # プロジェクト権限設定
├── src/
│   ├── components/        # Reactコンポーネント
│   │   ├── MemoList.tsx   # メモ一覧表示
│   │   ├── MemoForm.tsx   # メモ編集フォーム
│   │   ├── CodeBlock.tsx  # シンタックスハイライト
│   │   └── MarkdownPreview.tsx # プレビュー表示
│   ├── hooks/             # カスタムフック
│   │   └── useLocalStorage.ts # 永続化フック
│   ├── types/             # TypeScript型定義
│   │   └── Memo.ts        # メモデータ型
│   ├── utils/             # ユーティリティ
│   │   ├── markdown.ts    # マークダウン処理
│   │   └── sampleData.ts  # サンプルデータ
│   └── styles/            # スタイルファイル
│       ├── index.css      # メインCSS
│       └── markdown.css   # マークダウン専用CSS
└── public/                # 静的ファイル
```

## 🎯 開発の成果

### 実装した機能
- ✅ 完全なメモ管理システム
- ✅ プロフェッショナルなUI/UX
- ✅ 高度なマークダウンレンダリング
- ✅ データ永続化システム
- ✅ レスポンシブデザイン

### 解決した技術課題
- **prismjs** → **prism-react-renderer** (Vite互換性問題)
- **WSL環境でのネットワーク設定** (localhost接続問題)  
- **TypeScript型安全性** (厳格な型定義)
- **パフォーマンス最適化** (バンドルサイズ削減)

### AI開発システムの成果
- **1000行以上のドキュメント** による知識蓄積
- **自動エラー予防システム** の構築
- **再現可能な開発プロセス** の確立
- **継続的学習メカニズム** の実装

## 🤝 開発チーム

**Human Developer** - プロジェクト企画・要件定義・レビュー  
**Claude Code (AI Assistant)** - 実装・ドキュメント作成・問題解決  

**開発期間**: 2025年6月21日（1日集中開発）  
**開発手法**: バイブコーディング（AI協働開発）

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🔗 リンク

- **GitHub Repository**: https://github.com/kirikab-27/markdown-memo-app
- **Claude Code公式ドキュメント**: https://docs.anthropic.com/ja/docs/claude-code/overview
- **開発ワークフロー**: [.ai/CLAUDE.md](.ai/CLAUDE.md)

---

**🤖 Built with Claude Code** - AI-powered development for the future

> このプロジェクトは、AIとの協働によってソフトウェア開発がどのように変革されるかを示すデモンストレーションです。

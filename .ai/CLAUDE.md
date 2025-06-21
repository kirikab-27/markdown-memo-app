# CLAUDE.md - AI開発アシスタント作業指示書

## 概要
このドキュメントは、マークダウンメモアプリプロジェクトのAI開発アシスタント用の完全な作業指示書です。
過去の問題と解決策を蓄積し、将来の開発効率を向上させます。

## 前提条件
1. **必ず以下のドキュメントを参照してから作業を開始**
   - `.ai/troubleshooting.md` - 過去のエラーと解決策
   - `.ai/tech-notes.md` - 技術的決定事項
   - `.ai/lessons-learned.md` - 学習した知識

2. **開発環境**
   - WSL2 (Linux環境)
   - Node.js 18+ / npm 9+
   - Git設定済み

3. **プロジェクト技術スタック**
   - React 18 + TypeScript
   - Vite (ビルドツール)
   - Tailwind CSS
   - prism-react-renderer (シンタックスハイライト)
   - marked.js (マークダウンパーサー)

## ドキュメント管理システム

### 記録すべき情報の種類
1. **トラブルシューティング (troubleshooting.md)**
   - エラーメッセージ
   - 発生状況
   - 解決方法
   - 予防策

2. **技術ノート (tech-notes.md)**
   - 技術選定の理由
   - 実装方針の決定
   - パフォーマンス考慮事項

3. **学習記録 (lessons-learned.md)**
   - ベストプラクティス
   - アンチパターン
   - 効率化のヒント

## STEP1-5: 環境構築

### STEP1: プロジェクト初期化
```bash
npm create vite@latest my-vibe-project -- --template react-ts
cd my-vibe-project
```

**⚠️ エラーが発生したら:**
```markdown
## troubleshooting.mdに追記
### [日付] プロジェクト初期化エラー
**エラー:** [エラーメッセージ]
**原因:** [原因]
**解決:** [解決方法]
```

### STEP2: 依存関係インストール
```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npm install marked prism-react-renderer
```

**💡 技術選定の記録:**
```markdown
## tech-notes.mdに追記
### [日付] ライブラリ選定
- **prism-react-renderer選択理由:** 
  - prismjsはViteとの互換性問題あり
  - Reactコンポーネントとして統合が容易
  - TypeScript型定義が充実
```

### STEP3: Tailwind CSS設定
```bash
npx tailwindcss init -p
```

設定ファイル更新:
```javascript
// tailwind.config.js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

### STEP4: TypeScript設定
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### STEP5: 開発サーバー設定
```typescript
// vite.config.ts
server: {
  host: '0.0.0.0',  // WSL環境でのアクセス許可
  port: 5173
}
```

**📝 既知の問題:**
```markdown
## troubleshooting.mdに追記
### WSL localhost接続問題
**問題:** WSLからlocalhostにアクセスできない
**解決:** vite.config.tsでhost: '0.0.0.0'を設定
```

## STEP6-10: 基本機能実装

### STEP6: ディレクトリ構造
```
src/
├── components/     # Reactコンポーネント
├── hooks/         # カスタムフック
├── types/         # TypeScript型定義
├── utils/         # ユーティリティ関数
└── styles/        # CSS/スタイルファイル
```

### STEP7: 型定義
```typescript
// src/types/Memo.ts
export interface Memo {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### STEP8: 基本コンポーネント作成
- MemoList: メモ一覧表示
- MemoForm: メモ作成・編集フォーム
- App: 状態管理とコンポーネント統合

**💡 コンポーネント設計の記録:**
```markdown
## tech-notes.mdに追記
### コンポーネント設計方針
- 単一責任の原則を遵守
- propsによる疎結合
- TypeScriptで型安全性を確保
```

### STEP9: 状態管理
```typescript
// useStateでローカル状態管理
const [memos, setMemos] = useState<Memo[]>([]);
```

### STEP10: Git初期化とコミット
```bash
git init
git add .
git commit -m "feat: 初期実装"
```

**⚠️ コミット規約:**
- feat: 新機能
- fix: バグ修正
- docs: ドキュメント
- style: フォーマット
- refactor: リファクタリング

## STEP11-15: 高度な機能

### STEP11: マークダウンプレビュー
```typescript
// marked.jsでマークダウンをHTMLに変換
import { marked } from 'marked';
```

### STEP12: シンタックスハイライト
**🚨 重要な技術的決定:**
```markdown
## tech-notes.mdに追記
### prismjsからprism-react-rendererへの移行
**理由:**
1. prismjsのインポートエラー (Vite互換性)
2. React統合の困難さ
3. TypeScriptサポートの不足

**解決:**
- npm uninstall prismjs
- npm install prism-react-renderer
- Highlightコンポーネントを使用
```

実装例:
```typescript
import { Highlight, themes } from 'prism-react-renderer';
```

### STEP13: ローカルストレージ
```typescript
// カスタムフックで永続化
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 実装
}
```

**📝 エラーハンドリング:**
```markdown
## lessons-learned.mdに追記
### ローカルストレージのエラー処理
- QuotaExceededErrorの検出
- JSONパースエラーの処理
- 型安全性の確保 (ジェネリクス使用)
```

### STEP14: コードブロック機能
- 言語名表示
- コピーボタン
- 行番号
- VS Codeテーマ

### STEP15: エラーバウンダリ
```typescript
// エラー境界の実装（オプション）
class ErrorBoundary extends React.Component {
  // 実装
}
```

## STEP16-20: 品質保証とドキュメント化

### STEP16: Linting設定
```bash
npm run lint
```

**⚠️ よくあるLintエラー:**
```markdown
## troubleshooting.mdに追記
### @typescript-eslint/no-explicit-any
**解決:** 具体的な型を定義するか、unknownを使用
### no-prototype-builtins
**解決:** Object.prototype.hasOwnProperty.call()を使用
```

### STEP17: ビルド最適化
```bash
npm run build
```

**📊 パフォーマンス記録:**
```markdown
## tech-notes.mdに追記
### ビルドサイズ最適化
- 初期: 300KB+
- 最適化後: 277KB
- 手法: 動的インポート、Tree shaking
```

### STEP18: テスト（オプション）
```bash
npm test
```

### STEP19: デプロイ準備
- GitHub Pages
- Vercel
- Netlify

### STEP20: ドキュメント更新
必ず以下を更新:
1. README.md
2. troubleshooting.md
3. tech-notes.md
4. lessons-learned.md

## 実際に発生した問題と解決策

### 1. prismjsビルドエラー
**問題:**
```
Cannot find module 'prismjs/components/prism-javascript'
```

**解決:**
```bash
npm uninstall prismjs @types/prismjs
npm install prism-react-renderer
```

### 2. WSL環境でのlocalhost問題
**問題:** ブラウザからlocalhostにアクセスできない

**解決:**
```typescript
// vite.config.ts
server: {
  host: '0.0.0.0',
  port: 5173
}
```

### 3. 文字化け問題
**問題:** 日本語が文字化けする

**解決:**
- UTF-8エンコーディングを確認
- HTMLメタタグでcharset指定
- エディタの文字コード設定確認

## 開発フロー

### 新機能追加時
1. `troubleshooting.md`で過去の類似問題を確認
2. `tech-notes.md`で技術方針を確認
3. 実装
4. エラーが発生したら即座に記録
5. 解決後、`lessons-learned.md`に知見を追加

### エラー対応時
1. エラーメッセージを正確に記録
2. `troubleshooting.md`で既知の問題か確認
3. 新規の場合は解決策を探す
4. 解決後、必ず文書化

### コードレビュー時
1. Lintエラーがないか確認
2. TypeScript型エラーがないか確認
3. ビルドが成功するか確認
4. 新しい学びがあれば記録

## メンテナンス

### 定期的な更新
- 月1回: ドキュメントの整理
- 四半期: 依存関係の更新
- 半年: 大規模リファクタリング検討

### 知識の継承
- 新しいAIアシスタントは必ずこれらのドキュメントを読む
- 重要な決定は必ず記録する
- エラーと解決策は即座に文書化

## コマンドリファレンス

```bash
# 開発
npm run dev

# ビルド
npm run build

# Lint
npm run lint

# プレビュー
npm run preview

# Git操作
git add .
git commit -m "feat: 機能説明"
git push origin main
```

---

最終更新: 2025-06-21
次回レビュー予定: 2025-07-21
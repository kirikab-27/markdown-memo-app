# CLAUDE.md - AI開発アシスタント作業指示書

## 概要
このドキュメントは、マークダウンメモアプリプロジェクトのAI開発アシスタント用の完全な作業指示書です。
過去の問題と解決策を蓄積し、将来の開発効率を向上させます。

## 公式ドキュメント
**Claude Code公式ドキュメント:** https://docs.anthropic.com/ja/docs/claude-code/overview

## STEP0: Claude Code前提知識

### Claude Codeの基本機能
- **ターミナルベースのコーディングツール**で開発を加速
- プロジェクト全体の構造を理解し、コンテキストを維持
- 自然言語でのコマンド実行
- ファイル編集、バグ修正、テスト実行、Git操作が可能

### 基本コマンド
```bash
# 対話型セッション開始
claude

# ワンタイムクエリ実行
claude -p "query"

# 最新の会話を継続
claude -c

# アップデート
claude update
```

### CLIフラグ
```bash
--add-dir          # 追加の作業ディレクトリを指定
--print, -p        # 対話型モードなしで応答を表示
--output-format    # 出力形式を指定 (text, json, stream-json)
--verbose          # 詳細ログを有効化
--model            # AIモデルを設定
```

### スラッシュコマンド
```bash
/bug               # バグ報告
/clear             # 会話履歴をクリア
/config            # 設定の表示・変更
/memory            # CLAUDE.mdメモリファイルを編集
/model             # AIモデルの選択・変更
/permissions       # 権限の表示・更新
/vim               # Vimライクキーバインディング
```

### 特別なショートカット
- `#` でメモリに素早く追加
- `\` または Option+Enter/Shift+Enter で複数行入力
- 自然言語での複雑なタスク指示

### 設定ファイル管理
**設定の優先順位:**
1. エンタープライズポリシー
2. コマンドライン引数
3. ローカルプロジェクト設定 (`.claude/settings.local.json`)
4. 共有プロジェクト設定 (`.claude/settings.json`)
5. ユーザー設定 (`~/.claude/settings.json`)

**推奨設定ファイル構成:**
```json
// .claude/settings.json (チーム共有)
{
  "permissions": {
    "allowedDirectories": ["src", "docs", ".ai"],
    "allowedCommands": ["npm", "git", "lint"],
    "requireApproval": ["rm", "sudo", "curl"]
  },
  "environment": {
    "NODE_ENV": "development"
  }
}

// .claude/settings.local.json (個人用、Git除外)
{
  "apiKey": "your-api-key",
  "preferences": {
    "outputFormat": "text",
    "verbose": true
  }
}
```

### セキュリティとベストプラクティス
**権限ベースアーキテクチャ:**
- デフォルトで読み取り専用権限
- ファイル編集やコマンド実行には明示的承認が必要
- 開始ディレクトリとサブディレクトリのみアクセス可能

**セキュリティ機能:**
- プロンプトインジェクション保護
- 危険なコマンドのブロック (`curl`, `wget`等)
- コンテキスト認識による有害な指示の検出
- ユーザー入力のサニタイズ

**推奨セキュリティ設定:**
1. センシティブなリポジトリでは厳格な権限設定
2. 変更承認前の確認を徹底
3. 定期的な権限設定の監査
4. 追加分離が必要な場合はdevcontainerを使用

### 開発ワークフローの最適化
**効率的な使用方法:**
- 関連するタスクはバッチで実行
- `/memory`コマンドでプロジェクト知識を蓄積
- `#`でクイックメモを活用
- プロジェクト固有の設定で一貫性を保持

**避けるべき事項:**
- 未確認のファイル変更の一括承認
- セキュリティ設定の無効化
- 機密情報のプレーンテキスト保存

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

## プロジェクト固有の設定

### Claude Code設定ファイル
プロジェクトには以下のClaude Code設定が適用されています：

**`.claude/settings.json` (チーム共有設定):**
- 許可ディレクトリ: `src`, `public`, `docs`, `.ai`, `dist`
- 許可コマンド: `npm`, `npx`, `git`, `node`, `tsc`, `eslint`, `prettier`
- 承認必須コマンド: `rm`, `sudo`, `curl`, `wget`, `chmod`, `chown`
- 自動保存とLint on Save有効

**個人設定 (`.claude/settings.local.json`):**
```json
{
  "apiKey": "your-api-key",
  "preferences": {
    "outputFormat": "text",
    "verbose": true,
    "theme": "dark"
  }
}
```

### セキュリティ設定
- **読み取り専用デフォルト:** ファイル変更には明示的承認が必要
- **ディレクトリ制限:** プロジェクトディレクトリ内のみアクセス可能
- **コマンド制限:** 危険なコマンドはブロックまたは承認必須

## コマンドリファレンス

### Claude Codeコマンド
```bash
# 対話型セッション開始
claude

# プロジェクト設定確認
claude -p "/config"

# メモリファイル編集
claude -p "/memory"

# 権限確認
claude -p "/permissions"

# モデル変更
claude -p "/model"
```

### 開発コマンド
```bash
# 開発
npm run dev

# ビルド
npm run build

# Lint
npm run lint

# プレビュー
npm run preview
```

### Git操作
```bash
git add .
git commit -m "feat: 機能説明"
git push origin main
```

---

最終更新: 2025-06-21
次回レビュー予定: 2025-07-21
import { Memo } from '../types/Memo';

export const sampleMemos: Memo[] = [
  {
    id: '1',
    title: 'React学習メモ',
    content: `# React学習メモ

## useState フック
- 状態を管理するためのフック
- \`const [state, setState] = useState(initialValue)\`

## useEffect フック
- 副作用を処理するためのフック
- コンポーネントのマウント、アップデート、アンマウント時に実行

### 使用例
\`\`\`javascript
useEffect(() => {
  // 副作用の処理
  return () => {
    // クリーンアップ処理
  };
}, [依存配列]);
\`\`\``,
    category: 'プログラミング',
    createdAt: new Date('2025-06-20T10:00:00'),
    updatedAt: new Date('2025-06-20T15:30:00'),
  },
  {
    id: '2',
    title: 'プロジェクト計画',
    content: `# マークダウンメモアプリ開発計画

## フェーズ1: 基本機能
- [x] プロジェクトセットアップ
- [x] 基本コンポーネント作成
- [ ] ローカルストレージ対応
- [ ] マークダウンプレビュー機能

## フェーズ2: 拡張機能
- [ ] 検索機能
- [ ] カテゴリーフィルター
- [ ] エクスポート機能
- [ ] ダークモード

## 技術スタック
- React + TypeScript
- Tailwind CSS
- Vite
- marked.js`,
    category: '開発',
    createdAt: new Date('2025-06-19T14:20:00'),
    updatedAt: new Date('2025-06-20T09:15:00'),
  },
  {
    id: '3',
    title: '今日のタスク',
    content: `# 今日のタスク (2025-06-21)

## 完了
- [x] プロジェクトの初期セットアップ
- [x] GitHubリポジトリの作成
- [x] 基本コンポーネントの実装

## 進行中
- [ ] メモ管理機能の実装
- [ ] マークダウンプレビューの追加

## 今後の予定
- [ ] テスト追加
- [ ] デプロイ準備
- [ ] ドキュメント作成

## メモ
バイブコーディングの手法を学びながら進めている。
段階的に機能を追加していく方針。`,
    category: 'タスク',
    createdAt: new Date('2025-06-21T08:00:00'),
    updatedAt: new Date('2025-06-21T08:00:00'),
  },
];
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

### 使用例（JavaScript）
\`\`\`javascript
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // クリーンアップ処理
    return () => clearInterval(interval);
  }, []);

  return <div>経過時間: {seconds}秒</div>;
}
\`\`\`

### TypeScriptでの型定義
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);
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
    title: 'プログラミング言語サンプル',
    content: `# 各種プログラミング言語のサンプルコード

## Python
\`\`\`python
def fibonacci(n):
    """フィボナッチ数列のn番目の値を返す"""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# リスト内包表記
squares = [x**2 for x in range(10) if x % 2 == 0]
print(squares)  # [0, 4, 16, 36, 64]
\`\`\`

## HTML
\`\`\`html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>サンプルページ</title>
</head>
<body>
    <h1>こんにちは世界</h1>
    <p>これはサンプルのHTMLです。</p>
</body>
</html>
\`\`\`

## CSS
\`\`\`css
/* モダンなボタンスタイル */
.btn-primary {
    background-color: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
}

.btn-primary:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
\`\`\`

## SQL
\`\`\`sql
-- ユーザーと投稿を結合して表示
SELECT 
    u.name AS user_name,
    p.title,
    p.created_at
FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE p.created_at >= '2025-01-01'
ORDER BY p.created_at DESC
LIMIT 10;
\`\`\`

## Bash
\`\`\`bash
#!/bin/bash
# ディレクトリ内のファイル数をカウント
count=$(ls -1 | wc -l)
echo "ファイル数: $count"

# 条件分岐
if [ $count -gt 10 ]; then
    echo "ファイルが多すぎます"
else
    echo "適切なファイル数です"
fi
\`\`\``,
    category: 'プログラミング',
    createdAt: new Date('2025-06-21T09:00:00'),
    updatedAt: new Date('2025-06-21T09:00:00'),
  },
  {
    id: '4',
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
import { Memo } from '../types/Memo';

interface MemoListProps {
  memos: Memo[];
  onSelectMemo: (memo: Memo) => void;
  onDeleteMemo: (id: string) => void;
}

export default function MemoList({ memos, onSelectMemo, onDeleteMemo }: MemoListProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">メモ一覧</h2>
      {memos.length === 0 ? (
        <p className="text-gray-500 text-center py-8">メモがありません</p>
      ) : (
        <div className="space-y-3">
          {memos.map((memo) => (
            <div
              key={memo.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onSelectMemo(memo)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 truncate flex-1">
                  {memo.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteMemo(memo.id);
                  }}
                  className="text-red-500 hover:text-red-700 ml-2 p-1 rounded"
                  aria-label="メモを削除"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                {memo.content.substring(0, 100)}
                {memo.content.length > 100 && '...'}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {memo.category}
                </span>
                <span>{formatDate(memo.updatedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
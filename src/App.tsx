import { useState, useEffect } from 'react';
import { Memo, MemoFormData } from './types/Memo';
import MemoList from './components/MemoList';
import MemoForm from './components/MemoForm';
import { sampleMemos } from './utils/sampleData';
import { useMemosStorage } from './hooks/useLocalStorage';

function App() {
  const { value: storedMemos, setValue: setStoredMemos, error: storageError, isLoading } = useMemosStorage();
  const [memos, setMemos] = useState<Memo[]>([]);
  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // ローカルストレージからメモを読み込み、空の場合はサンプルデータを使用
  useEffect(() => {
    if (!isLoading) {
      if (storedMemos.length > 0) {
        // ローカルストレージにデータがある場合
        const parsedMemos = storedMemos.map((memo) => ({
          ...memo,
          createdAt: new Date(memo.createdAt),
          updatedAt: new Date(memo.updatedAt),
        }));
        setMemos(parsedMemos);
      } else {
        // ローカルストレージが空の場合はサンプルデータを使用
        setMemos(sampleMemos);
        setStoredMemos(sampleMemos);
      }
    }
  }, [storedMemos, isLoading, setStoredMemos]);

  // メモの状態が変更されるたびにローカルストレージに保存
  useEffect(() => {
    if (memos.length > 0 && !isLoading) {
      setStoredMemos(memos);
    }
  }, [memos, setStoredMemos, isLoading]);

  const handleSelectMemo = (memo: Memo) => {
    setSelectedMemo(memo);
    setIsFormOpen(true);
  };

  const handleNewMemo = () => {
    setSelectedMemo(null);
    setIsFormOpen(true);
  };

  const handleSaveMemo = (formData: MemoFormData) => {
    const now = new Date();
    
    if (selectedMemo) {
      // 既存メモの更新
      setMemos(prev => prev.map(memo => 
        memo.id === selectedMemo.id 
          ? { ...memo, ...formData, updatedAt: now }
          : memo
      ));
    } else {
      // 新規メモの作成
      const newMemo: Memo = {
        id: Date.now().toString(),
        ...formData,
        createdAt: now,
        updatedAt: now,
      };
      setMemos(prev => [newMemo, ...prev]);
    }
    
    setIsFormOpen(false);
    setSelectedMemo(null);
  };

  const handleDeleteMemo = (id: string) => {
    if (confirm('このメモを削除しますか？')) {
      setMemos(prev => prev.filter(memo => memo.id !== id));
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setSelectedMemo(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">メモを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {storageError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>エラー:</strong> {storageError}
          </div>
        )}
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            マークダウンメモアプリ
          </h1>
          <button
            onClick={handleNewMemo}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            新しいメモ
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <MemoList
              memos={memos}
              onSelectMemo={handleSelectMemo}
              onDeleteMemo={handleDeleteMemo}
            />
          </div>
          
          <div>
            {isFormOpen && (
              <MemoForm
                memo={selectedMemo}
                onSave={handleSaveMemo}
                onCancel={handleCancel}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
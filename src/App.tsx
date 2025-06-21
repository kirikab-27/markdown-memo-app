import { useState } from 'react';
import { Memo, MemoFormData } from './types/Memo';
import MemoList from './components/MemoList';
import MemoForm from './components/MemoForm';
import { sampleMemos } from './utils/sampleData';

function App() {
  const [memos, setMemos] = useState<Memo[]>(sampleMemos);
  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
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
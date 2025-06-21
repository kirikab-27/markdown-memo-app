import { useState, useEffect } from 'react';
import { Memo, MemoFormData } from '../types/Memo';
import MarkdownPreview from './MarkdownPreview';

interface MemoFormProps {
  memo?: Memo | null;
  onSave: (formData: MemoFormData) => void;
  onCancel: () => void;
}

export default function MemoForm({ memo, onSave, onCancel }: MemoFormProps) {
  const [formData, setFormData] = useState<MemoFormData>({
    title: '',
    content: '',
    category: '',
  });
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    if (memo) {
      setFormData({
        title: memo.title,
        content: memo.content,
        category: memo.category,
      });
    } else {
      setFormData({
        title: '',
        content: '',
        category: '',
      });
    }
  }, [memo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('タイトルと内容を入力してください');
      return;
    }
    onSave(formData);
  };

  const handleChange = (field: keyof MemoFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {memo ? 'メモを編集' : '新しいメモ'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="メモのタイトルを入力"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            カテゴリー
          </label>
          <input
            type="text"
            id="category"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="カテゴリーを入力"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              内容
            </label>
            <div className="flex bg-gray-100 rounded-md p-1">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  activeTab === 'edit'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                編集
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                プレビュー
              </button>
            </div>
          </div>
          
          {activeTab === 'edit' ? (
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="メモの内容をマークダウン形式で入力"
              required
            />
          ) : (
            <div className="w-full min-h-[250px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
              {formData.content ? (
                <MarkdownPreview content={formData.content} />
              ) : (
                <p className="text-gray-500 italic">プレビューするには内容を入力してください</p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {memo ? '更新' : '保存'}
          </button>
        </div>
      </form>
    </div>
  );
}
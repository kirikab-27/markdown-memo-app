import { useState, useEffect } from 'react';
import { Memo } from '../types/Memo';

type SetValue<T> = (value: T | ((val: T) => T)) => void;

interface UseLocalStorageResult<T> {
  value: T;
  setValue: SetValue<T>;
  error: string | null;
  isLoading: boolean;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageResult<T> {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初期値をローカルストレージから読み込み
  useEffect(() => {
    try {
      setIsLoading(true);
      setError(null);
      
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsedValue = JSON.parse(item);
        setValue(parsedValue);
      }
    } catch (err) {
      setError(`ローカルストレージからの読み込みに失敗しました: ${err}`);
      console.error('Error reading from localStorage:', err);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  // 値の更新とローカルストレージへの保存
  const setStoredValue: SetValue<T> = (newValue) => {
    try {
      setError(null);
      
      // 関数の場合は現在の値を渡して実行
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      
      setValue(valueToStore);
      
      // ローカルストレージに保存
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      if (err instanceof DOMException && err.code === 22) {
        // QuotaExceededError
        setError('ストレージ容量が不足しています。古いデータを削除してください。');
      } else {
        setError(`ローカルストレージへの保存に失敗しました: ${err}`);
      }
      console.error('Error saving to localStorage:', err);
    }
  };

  return {
    value,
    setValue: setStoredValue,
    error,
    isLoading,
  };
}

// メモ専用のフック
export function useMemosStorage() {
  const STORAGE_KEY = 'markdown-memo-app-memos';
  
  return useLocalStorage<Memo[]>(STORAGE_KEY, []);
}

// ストレージユーティリティ関数
export const storageUtils = {
  // ストレージの使用量を取得（概算）
  getStorageSize: (): number => {
    let total = 0;
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  },

  // ストレージの使用量を人間が読みやすい形式で取得
  getStorageSizeFormatted: (): string => {
    const size = storageUtils.getStorageSize();
    if (size < 1024) return `${size} bytes`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  },

  // 特定のキーのデータを削除
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error('Error removing item from localStorage:', err);
    }
  },

  // すべてのデータをクリア
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (err) {
      console.error('Error clearing localStorage:', err);
    }
  },

  // データのエクスポート
  exportData: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      console.error('Error exporting data from localStorage:', err);
      return null;
    }
  },

  // データのインポート
  importData: (key: string, data: string): boolean => {
    try {
      localStorage.setItem(key, data);
      return true;
    } catch (err) {
      console.error('Error importing data to localStorage:', err);
      return false;
    }
  },
};
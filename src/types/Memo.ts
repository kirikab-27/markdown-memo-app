export interface Memo {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemoFormData {
  title: string;
  content: string;
  category: string;
}
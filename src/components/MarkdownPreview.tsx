import { parseMarkdown } from '../utils/markdown';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export default function MarkdownPreview({ content, className = '' }: MarkdownPreviewProps) {
  const htmlContent = parseMarkdown(content);

  return (
    <div
      className={`markdown-preview ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
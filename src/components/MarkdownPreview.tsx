import { useEffect, useRef } from 'react';
import { parseMarkdown } from '../utils/markdown';
import CodeBlock from './CodeBlock';
import ReactDOM from 'react-dom/client';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export default function MarkdownPreview({ content, className = '' }: MarkdownPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Parse markdown to HTML
    const htmlContent = parseMarkdown(content);
    containerRef.current.innerHTML = htmlContent;
    
    // Find all code block placeholders and replace with React components
    const codeBlocks = containerRef.current.querySelectorAll('[data-code-block]');
    
    codeBlocks.forEach((placeholder) => {
      const language = placeholder.getAttribute('data-language') || 'text';
      const code = decodeURIComponent(placeholder.getAttribute('data-code') || '');
      
      // Create a container for the React component
      const container = document.createElement('div');
      placeholder.parentNode?.replaceChild(container, placeholder);
      
      // Render the CodeBlock component
      const root = ReactDOM.createRoot(container);
      root.render(<CodeBlock code={code} language={language} />);
    });
    
    // Cleanup function
    return () => {
      const roots = containerRef.current?.querySelectorAll('[data-code-block]');
      roots?.forEach((root) => {
        // Clean up React roots if needed
      });
    };
  }, [content]);

  return (
    <div
      ref={containerRef}
      className={`markdown-preview ${className}`}
    />
  );
}
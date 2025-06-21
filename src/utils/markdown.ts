import { marked } from 'marked';

// Custom renderer for code blocks
const renderer = new marked.Renderer();

renderer.code = (code: string, language?: string) => {
  const lang = language || 'text';
  const id = `code-block-${Math.random().toString(36).substr(2, 9)}`;
  
  // Return a placeholder that will be replaced by React component
  return `<div data-code-block="${id}" data-language="${lang}" data-code="${encodeURIComponent(code)}"></div>`;
};

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
  renderer: renderer,
});

export const parseMarkdown = (markdown: string): string => {
  try {
    return marked(markdown);
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return markdown;
  }
};

export const stripMarkdown = (markdown: string): string => {
  // Simple function to strip basic markdown for preview text
  return markdown
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\n{2,}/g, '\n') // Reduce multiple newlines
    .trim();
};
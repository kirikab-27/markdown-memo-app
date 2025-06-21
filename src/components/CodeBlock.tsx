import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const languageNames: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  jsx: 'React JSX',
  tsx: 'React TSX',
  py: 'Python',
  python: 'Python',
  java: 'Java',
  css: 'CSS',
  scss: 'SCSS',
  html: 'HTML',
  json: 'JSON',
  md: 'Markdown',
  markdown: 'Markdown',
  bash: 'Bash',
  sh: 'Shell',
  shell: 'Shell',
  yaml: 'YAML',
  yml: 'YAML',
  sql: 'SQL',
  c: 'C',
  cpp: 'C++',
  go: 'Go',
  rust: 'Rust',
  php: 'PHP',
  ruby: 'Ruby',
  kotlin: 'Kotlin',
  swift: 'Swift',
};

export default function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const displayLanguage = languageNames[language] || language.toUpperCase();

  return (
    <div className="relative group my-4">
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700 z-10 rounded-t-lg">
        <span className="text-xs text-gray-400 font-medium">
          {displayLanguage}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      
      <Highlight
        theme={themes.vsDark}
        code={code.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre 
            className={`${className} !mt-0 !pt-12 !pb-4 !rounded-lg overflow-x-auto`}
            style={{
              ...style,
              backgroundColor: '#1e1e1e',
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                <span className="table-cell text-right pr-4 select-none text-gray-500 text-sm w-8">
                  {i + 1}
                </span>
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
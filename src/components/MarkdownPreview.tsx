import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";

type Props = {
  markdown: string;
  className?: string;
};

function mapPrismLanguage(lang: string): string {
  if (lang === "ts" || lang === "tsx") return "typescript";
  return lang;
}

type CodeProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
  className?: string;
  children?: ReactNode;
};

/**
 * Markdown 渲染：GFM、代码高亮、外链新窗口、图片懒加载。
 */
export function MarkdownPreview({ markdown, className = "" }: Props) {
  const components: Components = {
    a: ({ href, children, ...rest }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-clip-text text-transparent bg-accent-gradient underline decoration-white/30 underline-offset-2 hover:decoration-white/60"
        {...rest}
      >
        {children}
      </a>
    ),
    img: ({ src, alt, ...rest }) => (
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
        className="max-w-full rounded-md border border-white/10"
        {...rest}
      />
    ),
    code({ inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className ?? "");
      if (inline || !match) {
        return (
          <code
            className="rounded bg-white/10 px-1 py-0.5 font-mono text-sm text-cyan-200"
            {...props}
          >
            {children}
          </code>
        );
      }
      const language = mapPrismLanguage(match[1]);
      const code = String(children).replace(/\n$/, "");
      return (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          customStyle={{
            margin: "0.75rem 0",
            borderRadius: "0.5rem",
            fontSize: "0.85rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <div
      className={`prose prose-invert max-w-none prose-headings:bg-clip-text prose-headings:text-transparent prose-headings:bg-accent-gradient prose-p:text-white/90 prose-li:text-white/90 prose-strong:text-white prose-a:no-underline ${className}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

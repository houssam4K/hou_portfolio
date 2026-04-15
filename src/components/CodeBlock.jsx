import { useState } from "react";
import { Highlight } from "prism-react-renderer";
import "./CodeBlock.css";

// Custom cyber-themed palette matching the rest of the portfolio
const cyberTheme = {
  plain: {
    color: "#d6e2ee",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#5a6b7a", fontStyle: "italic" },
    },
    {
      types: ["punctuation"],
      style: { color: "#7a8a9a" },
    },
    {
      types: ["namespace"],
      style: { opacity: 0.7 },
    },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol"],
      style: { color: "#ff79c6" },
    },
    {
      types: ["selector", "attr-name", "string", "char", "inserted"],
      style: { color: "#00ff9c" },
    },
    {
      types: ["operator", "entity", "url"],
      style: { color: "#00e5ff" },
    },
    {
      types: ["atrule", "attr-value", "keyword"],
      style: { color: "#ff5f87", fontWeight: "600" },
    },
    {
      types: ["function", "class-name"],
      style: { color: "#00e5ff" },
    },
    {
      types: ["builtin", "regex", "important"],
      style: { color: "#bd93f9" },
    },
    {
      types: ["deleted"],
      style: { color: "#ff3864" },
    },
    {
      types: ["variable"],
      style: { color: "#d6e2ee" },
    },
  ],
};

export default function CodeBlock({
  code,
  language = "text",
  title,
  showLineNumbers = true,
}) {
  const [copied, setCopied] = useState(false);
  const trimmed = code.replace(/^\n+|\n+$/g, "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trimmed);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) {
      // noop
    }
  };

  return (
    <div className="cb">
      <div className="cb__bar">
        <div className="cb__dots">
          <span />
          <span />
          <span />
        </div>
        <div className="cb__title">
          {title && <span className="cb__file">{title}</span>}
          <span className="cb__lang">{language}</span>
        </div>
        <button
          type="button"
          className={`cb__copy ${copied ? "is-copied" : ""}`}
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              copied
            </>
          ) : (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              copy
            </>
          )}
        </button>
      </div>

      <Highlight code={trimmed} language={language} theme={cyberTheme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`cb__pre ${className}`} style={style}>
            <code>
              {tokens.map((line, i) => {
                const { key: _lineKey, ...lineProps } = getLineProps({
                  line,
                  key: i,
                });
                return (
                  <div key={i} className="cb__line" {...lineProps}>
                    {showLineNumbers && (
                      <span className="cb__ln">{i + 1}</span>
                    )}
                    <span className="cb__line-content">
                      {line.map((token, key) => {
                        const { key: _tokenKey, ...tokenProps } = getTokenProps(
                          { token, key }
                        );
                        return <span key={key} {...tokenProps} />;
                      })}
                    </span>
                  </div>
                );
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}

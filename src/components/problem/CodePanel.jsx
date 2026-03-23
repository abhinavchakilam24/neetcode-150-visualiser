import { useRef, useEffect } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

const LIGHT_THEME = {
  ...themes.github,
  plain: {
    color: '#2D2B28',
    backgroundColor: 'transparent',
  },
};

export default function CodePanel({ code, activeLines = [], language = 'java', annotations = {} }) {
  if (!code) return null;
  const containerRef = useRef(null);

  useEffect(() => {
    if (activeLines.length > 0 && containerRef.current) {
      const lineEl = containerRef.current.querySelector(`[data-line="${activeLines[0]}"]`);
      if (lineEl) lineEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeLines]);

  return (
    <div ref={containerRef} className="overflow-auto h-full" style={{ backgroundColor: 'var(--bg-code)' }}>
      <Highlight theme={LIGHT_THEME} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} text-[12px] leading-6 py-2 px-0`}
            style={{ ...style, margin: 0, background: 'transparent' }}
          >
            {tokens.map((line, lineIndex) => {
              const lineNum = lineIndex + 1;
              const isActive = activeLines.includes(lineNum);

              return (
                <div
                  key={lineIndex}
                  data-line={lineNum}
                  {...getLineProps({ line })}
                  className="flex items-center min-h-[24px] px-3 transition-all duration-100"
                  style={{
                    backgroundColor: isActive ? 'var(--clr-active-bg)' : 'transparent',
                    borderLeft: isActive ? '2px solid var(--clr-active)' : '2px solid transparent',
                  }}
                >
                  <span
                    className="select-none w-7 flex-shrink-0 text-right mr-3 text-[11px]"
                    style={{ color: isActive ? 'var(--clr-active)' : 'var(--text-muted)', fontWeight: isActive ? 700 : 400 }}
                  >
                    {lineNum}
                  </span>
                  <span className="flex-1">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

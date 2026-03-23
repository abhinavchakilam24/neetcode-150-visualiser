import { useState, useRef, useCallback, Suspense, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProblemBySlug } from '../data/index.js';
import { artifactRegistry } from '../artifacts/index.js';
import { useStepPlayer } from '../hooks/useStepPlayer.js';
import { useKeyboardNav } from '../hooks/useKeyboardNav.js';
import { useProgressStore } from '../store/progressStore.js';

import CodePanel from '../components/problem/CodePanel.jsx';
import ExplanationBox from '../components/problem/ExplanationBox.jsx';
import ArtifactControls from '../components/ui/ArtifactControls.jsx';
import CustomInputModal from '../components/problem/CustomInputModal.jsx';
import DifficultyBadge from '../components/ui/DifficultyBadge.jsx';

import { ChevronRight, ExternalLink, CheckCircle2 } from 'lucide-react';

/* ── Draggable divider hook ── */
function useResizable(initialFraction, direction = 'horizontal') {
  const [fraction, setFraction] = useState(initialFraction);
  const dragging = useRef(false);
  const containerRef = useRef(null);

  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    dragging.current = true;
    const onMouseMove = (e) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let f;
      if (direction === 'horizontal') {
        f = (e.clientX - rect.left) / rect.width;
      } else {
        f = (e.clientY - rect.top) / rect.height;
      }
      setFraction(Math.min(0.75, Math.max(0.2, f)));
    };
    const onMouseUp = () => {
      dragging.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [direction]);

  return { fraction, containerRef, onMouseDown };
}

/* ── Mobile detection hook ── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

/* ── Drag handle component ── */
function DragHandle({ direction = 'horizontal', onMouseDown }) {
  const isH = direction === 'horizontal';
  return (
    <div
      onMouseDown={onMouseDown}
      className={`flex-shrink-0 relative flex items-center justify-center group transition-colors ${
        isH
          ? 'w-[7px] cursor-col-resize hover:bg-[var(--clr-active-bg)]'
          : 'h-[7px] cursor-row-resize hover:bg-[var(--clr-active-bg)]'
      }`}
      style={{ backgroundColor: 'var(--bg-raised)' }}
    >
      <div
        className={`rounded-full bg-[var(--border-strong)] group-hover:bg-[var(--clr-active)] transition-colors ${
          isH ? 'w-[3px] h-8' : 'h-[3px] w-8'
        }`}
      />
    </div>
  );
}

/* ── Mobile tab switcher ── */
function MobileTabBar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'problem', label: 'Problem' },
    { id: 'visualizer', label: 'Visualizer' },
    { id: 'code', label: 'Code' },
  ];
  return (
    <div
      className="flex border-b flex-shrink-0"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
    >
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="flex-1 py-2.5 text-xs font-medium transition-colors"
          style={{
            color: activeTab === tab.id ? 'var(--clr-active)' : 'var(--text-muted)',
            borderBottom: activeTab === tab.id ? '2px solid var(--clr-active)' : '2px solid transparent',
            fontWeight: activeTab === tab.id ? 600 : 400,
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default function ProblemDetail() {
  const { slug } = useParams();
  const problem = getProblemBySlug(slug);
  const { isSolved, toggleSolved } = useProgressStore();
  const isMobile = useIsMobile();

  const [activeApproach, setActiveApproach] = useState('optimal');
  const [activeScenario, setActiveScenario] = useState('standard');
  const [customSteps, setCustomSteps] = useState(null);
  const [customInput, setCustomInput] = useState(null);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [codeLang, setCodeLang] = useState('java');
  const [mobileTab, setMobileTab] = useState('visualizer');

  const hResize = useResizable(0.35, 'horizontal');
  const vResize = useResizable(0.55, 'vertical');

  const approach = problem?.approaches?.[activeApproach] || problem?.approaches?.optimal;

  const steps = useMemo(() => {
    if (customSteps) return customSteps;
    const scenarios = approach?.dryRunScenarios;
    if (!scenarios) return [];
    const scenario = scenarios[activeScenario] || Object.values(scenarios)[0];
    return scenario?.steps || [];
  }, [approach, activeScenario, customSteps]);

  const currentInput = useMemo(() => {
    if (customInput) return customInput;
    const scenarios = approach?.dryRunScenarios;
    if (!scenarios) return null;
    const scenario = scenarios[activeScenario] || Object.values(scenarios)[0];
    return scenario?.input || null;
  }, [approach, activeScenario, customInput]);

  const player = useStepPlayer(steps);

  useKeyboardNav({
    onNext: player.stepForward,
    onPrev: player.stepBackward,
    onPlayPause: () => player.isPlaying ? player.pause() : player.play(),
    onReset: player.reset,
    onJumpToEnd: player.jumpToEnd,
  });

  const handleScenarioChange = (id) => {
    setActiveScenario(id);
    setCustomSteps(null);
    setCustomInput(null);
  };

  const handleApproachChange = (key) => {
    setActiveApproach(key);
    setActiveScenario('standard');
    setCustomSteps(null);
    setCustomInput(null);
  };

  const handleCustomRun = (input) => {
    const computeFn = approach?.computeSteps;
    if (computeFn) {
      try {
        setCustomSteps(computeFn(input));
        setCustomInput(input);
      } catch (e) {
        console.error('computeSteps error:', e);
      }
    }
  };

  if (!problem) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Problem not found</h1>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          <span className="font-mono">{slug}</span> doesn't have a data file yet.
        </p>
        <Link to="/" className="text-sm font-medium" style={{ color: 'var(--clr-active)' }}>← Back to Home</Link>
      </div>
    );
  }

  const ArtifactComponent = artifactRegistry[problem.artifactType];
  const scenarios = approach?.dryRunScenarios
    ? Object.values(approach.dryRunScenarios).map(s => ({ id: s.id, label: s.label }))
    : [];
  const solved = isSolved(problem.slug);
  const codeToShow = codeLang === 'python'
    ? (approach?.pythonCode || approach?.javaCode)
    : codeLang === 'cpp'
      ? (approach?.cppCode || approach?.javaCode)
      : approach?.javaCode;
  const codeLangForPrism = codeLang === 'python' ? 'python' : codeLang === 'cpp' ? 'cpp' : 'java';

  /* ── Shared sub-components ── */
  const ProblemInfoContent = (
    <div className="p-5">
      <nav className="flex items-center gap-1 text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
        <Link to="/" className="hover:underline">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/topics/${problem.topic}`} className="hover:underline">{problem.topicLabel}</Link>
      </nav>

      <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{problem.title}</h1>
      <div className="flex items-center gap-2.5 flex-wrap mb-5">
        <DifficultyBadge difficulty={problem.difficulty} />
        <button
          onClick={() => toggleSolved(problem.slug)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors"
          style={{
            borderColor: solved ? 'var(--clr-found)' : 'var(--border)',
            backgroundColor: solved ? 'var(--clr-found-bg)' : 'transparent',
            color: solved ? 'var(--clr-found)' : 'var(--text-muted)',
          }}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          {solved ? 'Solved' : 'Mark Solved'}
        </button>
        {problem.leetcodeLink && (
          <a
            href={problem.leetcodeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs transition-colors hover:underline"
            style={{ color: 'var(--text-muted)' }}
          >
            <ExternalLink className="w-3 h-3" />
            LeetCode
          </a>
        )}
      </div>

      {problem.problem && (
        <div className="mb-5">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {problem.problem}
          </p>
        </div>
      )}

      {problem.examples?.length > 0 && (
        <div className="mb-5">
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Examples</h3>
          <div className="space-y-2.5">
            {problem.examples.map((ex, i) => (
              <div key={i} className="rounded-lg p-3 text-xs font-mono leading-relaxed" style={{ backgroundColor: 'var(--bg-raised)' }}>
                <div><span style={{ color: 'var(--text-muted)' }}>Input: </span><span style={{ color: 'var(--text-primary)' }}>{ex.input}</span></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Output: </span><span style={{ color: 'var(--clr-found)' }}>{ex.output}</span></div>
                {ex.explanation && <div className="mt-1 font-sans" style={{ color: 'var(--text-muted)' }}>{ex.explanation}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {problem.constraints?.length > 0 && (
        <div className="mb-5">
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Constraints</h3>
          <ul className="space-y-1">
            {problem.constraints.map((c, i) => (
              <li key={i} className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>• {c}</li>
            ))}
          </ul>
        </div>
      )}

      {problem.complexity && (
        <div className="mb-5">
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Complexity</h3>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="text-left py-1.5 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Approach</th>
                <th className="text-left py-1.5 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Time</th>
                <th className="text-left py-1.5 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Space</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(problem.complexity).map(([key, val]) => (
                <tr key={key} style={{ borderBottom: '1px solid var(--bg-raised)' }}>
                  <td className="py-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {problem.approaches[key]?.label || key}
                  </td>
                  <td className="py-1.5 text-sm font-mono font-medium" style={{ color: 'var(--clr-active)' }}>{val.time}</td>
                  <td className="py-1.5 text-sm font-mono font-medium" style={{ color: 'var(--clr-pointer)' }}>{val.space}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {problem.companies?.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Companies</h3>
          <div className="flex flex-wrap gap-1.5">
            {problem.companies.map(c => (
              <span key={c} className="px-2.5 py-1 rounded-md text-xs font-medium" style={{ backgroundColor: 'var(--bg-raised)', color: 'var(--text-secondary)' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const TopBar = (
    <div
      className="flex items-center justify-between flex-wrap gap-1 px-3 sm:px-4 border-b flex-shrink-0 overflow-x-auto"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
    >
      <div className="flex items-center gap-0 min-w-0">
        {['brute', 'better', 'optimal'].map(key => {
          const a = problem.approaches[key];
          if (!a) return null;
          const isActive = activeApproach === key;
          const tierColor = { brute: 'var(--hard)', better: 'var(--medium)', optimal: 'var(--clr-found)' }[key];
          return (
            <button
              key={key}
              onClick={() => handleApproachChange(key)}
              className="px-2 sm:px-3 py-2.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
              style={{
                color: isActive ? tierColor : 'var(--text-muted)',
                borderBottom: isActive ? `2px solid ${tierColor}` : '2px solid transparent',
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {a.label}
              <span className="ml-1 font-mono text-[10px] sm:text-xs opacity-60 hidden sm:inline">{a.timeComplexity}</span>
            </button>
          );
        })}

        <div className="w-px h-5 mx-2 sm:mx-3 flex-shrink-0" style={{ backgroundColor: 'var(--border)' }} />

        {scenarios.map(s => (
          <button
            key={s.id}
            onClick={() => handleScenarioChange(s.id)}
            className="px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium border transition-all mx-0.5 whitespace-nowrap"
            style={{
              borderColor: (!customSteps && activeScenario === s.id) ? 'var(--clr-active)' : 'var(--border)',
              backgroundColor: (!customSteps && activeScenario === s.id) ? 'var(--clr-active-bg)' : 'transparent',
              color: (!customSteps && activeScenario === s.id) ? 'var(--clr-active)' : 'var(--text-muted)',
            }}
          >
            {s.label}
          </button>
        ))}
        {approach?.computeSteps && (
          <button
            onClick={() => setShowCustomModal(true)}
            className="px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium border transition-all mx-0.5 whitespace-nowrap"
            style={{
              borderColor: customSteps ? 'var(--clr-active)' : 'var(--border)',
              backgroundColor: customSteps ? 'var(--clr-active-bg)' : 'transparent',
              color: customSteps ? 'var(--clr-active)' : 'var(--text-muted)',
            }}
          >
            + Custom
          </button>
        )}
      </div>

      <div className="flex items-center gap-0">
        {['java', 'cpp', 'python'].map(lang => (
          <button
            key={lang}
            onClick={() => setCodeLang(lang)}
            className="px-2 sm:px-2.5 py-2.5 text-[10px] sm:text-xs font-mono transition-colors"
            style={{
              color: codeLang === lang ? 'var(--text-primary)' : 'var(--text-muted)',
              borderBottom: codeLang === lang ? '2px solid var(--clr-active)' : '2px solid transparent',
              fontWeight: codeLang === lang ? 600 : 400,
            }}
          >
            {{ java: 'Java', cpp: 'C++', python: 'Python' }[lang]}
          </button>
        ))}
      </div>
    </div>
  );

  const VisualizerContent = (
    <>
      <div className="flex-1 px-3 sm:px-5 py-3 sm:py-4 overflow-y-auto flex items-center justify-center">
        <Suspense fallback={<div className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>Loading...</div>}>
          {ArtifactComponent && (
            <ArtifactComponent
              step={player.step}
              prevStep={player.prevStep}
              animating={player.isPlaying}
              input={currentInput}
            />
          )}
        </Suspense>
      </div>

      <div className="flex-shrink-0 px-3 sm:px-5 pb-2">
        <ExplanationBox step={player.step} />
        {player.step?.variables && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {Object.entries(player.step.variables).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono"
                style={{ backgroundColor: 'var(--bg-raised)', color: 'var(--text-primary)' }}
              >
                <span style={{ color: 'var(--clr-pointer)' }}>{key}</span>
                <span style={{ color: 'var(--text-muted)' }}>=</span>
                <span style={{ color: 'var(--clr-active)' }}>
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex-shrink-0">
        <ArtifactControls
          currentStep={player.currentStep}
          totalSteps={player.totalSteps}
          isPlaying={player.isPlaying}
          speed={player.speed}
          onPlay={player.play}
          onPause={player.pause}
          onPrev={player.stepBackward}
          onNext={player.stepForward}
          onReset={player.reset}
          onJumpToEnd={player.jumpToEnd}
          onSpeedChange={player.setSpeed}
          onScrub={player.scrubTo}
        />
      </div>
    </>
  );

  /* ── MOBILE LAYOUT ── */
  if (isMobile) {
    return (
      <div className="flex flex-col h-[calc(100vh-48px)] overflow-hidden">
        <MobileTabBar activeTab={mobileTab} onTabChange={setMobileTab} />

        {mobileTab === 'problem' && (
          <div className="flex-1 overflow-y-auto" style={{ backgroundColor: 'var(--bg-card)' }}>
            {ProblemInfoContent}
          </div>
        )}

        {mobileTab === 'visualizer' && (
          <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--bg-card)' }}>
            {TopBar}
            <div className="flex-1 flex flex-col overflow-hidden">
              {VisualizerContent}
            </div>
          </div>
        )}

        {mobileTab === 'code' && (
          <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--bg-code)' }}>
            {TopBar}
            <div className="flex-1 overflow-hidden">
              <CodePanel
                code={codeToShow}
                activeLines={player.step?.lineNumbers || []}
                annotations={approach?.lineAnnotations}
                language={codeLangForPrism}
              />
            </div>
          </div>
        )}

        <CustomInputModal
          isOpen={showCustomModal}
          onClose={() => setShowCustomModal(false)}
          onRun={handleCustomRun}
          problem={problem}
        />
      </div>
    );
  }

  /* ── DESKTOP LAYOUT ── */
  return (
    <div
      ref={hResize.containerRef}
      className="h-[calc(100vh-48px)] flex overflow-hidden"
    >
      {/* LEFT PANEL */}
      <div
        className="flex-shrink-0 overflow-y-auto"
        style={{
          width: `${hResize.fraction * 100}%`,
          backgroundColor: 'var(--bg-card)',
        }}
      >
        {ProblemInfoContent}
      </div>

      <DragHandle direction="horizontal" onMouseDown={hResize.onMouseDown} />

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {TopBar}

        <div ref={vResize.containerRef} className="flex-1 flex flex-col overflow-hidden">
          <div
            className="flex flex-col min-h-0 overflow-hidden"
            style={{ height: `${vResize.fraction * 100}%`, backgroundColor: 'var(--bg-card)' }}
          >
            {VisualizerContent}
          </div>

          <DragHandle direction="vertical" onMouseDown={vResize.onMouseDown} />

          <div
            className="min-h-0 overflow-hidden"
            style={{ height: `${(1 - vResize.fraction) * 100}%`, backgroundColor: 'var(--bg-code)' }}
          >
            <CodePanel
              code={codeToShow}
              activeLines={player.step?.lineNumbers || []}
              annotations={approach?.lineAnnotations}
              language={codeLangForPrism}
            />
          </div>
        </div>
      </div>

      <CustomInputModal
        isOpen={showCustomModal}
        onClose={() => setShowCustomModal(false)}
        onRun={handleCustomRun}
        problem={problem}
      />
    </div>
  );
}

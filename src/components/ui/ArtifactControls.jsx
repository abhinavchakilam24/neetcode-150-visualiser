import { SkipBack, ChevronLeft, Play, Pause, ChevronRight, SkipForward } from 'lucide-react';

const SPEEDS = [0.5, 0.75, 1, 1.5, 2];

export default function ArtifactControls({
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  onPlay,
  onPause,
  onPrev,
  onNext,
  onReset,
  onJumpToEnd,
  onSpeedChange,
  onScrub,
}) {
  return (
    <div
      className="px-4 py-2.5 border-t flex items-center gap-3"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-raised)' }}
    >
      {/* Transport buttons */}
      <div className="flex items-center gap-0.5">
        <Btn onClick={onReset} disabled={currentStep === 0} title="Jump to start" aria-label="Jump to start">
          <SkipBack className="w-3.5 h-3.5" />
        </Btn>
        <Btn onClick={onPrev} disabled={currentStep === 0} title="Step back" aria-label="Step back">
          <ChevronLeft className="w-4 h-4" />
        </Btn>
        <button
          onClick={isPlaying ? onPause : onPlay}
          title={isPlaying ? 'Pause' : 'Play'}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all mx-0.5"
          style={{
            backgroundColor: isPlaying ? 'var(--clr-active-bg)' : 'var(--clr-found-bg)',
            color: isPlaying ? 'var(--clr-active)' : 'var(--clr-found)',
            border: `1.5px solid ${isPlaying ? 'var(--clr-active)' : 'var(--clr-found)'}`,
          }}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>
        <Btn onClick={onNext} disabled={currentStep >= totalSteps - 1} title="Step forward" aria-label="Step forward">
          <ChevronRight className="w-4 h-4" />
        </Btn>
        <Btn onClick={onJumpToEnd} disabled={currentStep >= totalSteps - 1} title="Jump to end" aria-label="Jump to end">
          <SkipForward className="w-3.5 h-3.5" />
        </Btn>
      </div>

      {/* Scrubber */}
      <input
        type="range"
        min={0}
        max={Math.max(0, totalSteps - 1)}
        value={currentStep}
        onChange={e => onScrub?.(Number(e.target.value))}
        aria-label="Step scrubber"
        className="flex-1 min-w-0"
      />

      {/* Step counter */}
      <span
        className="text-xs font-mono whitespace-nowrap tabular-nums select-none"
        style={{ color: 'var(--text-secondary)', minWidth: '3.5rem', textAlign: 'right' }}
      >
        {currentStep + 1} / {totalSteps}
      </span>

      {/* Speed */}
      <div
        className="flex items-center rounded-md overflow-hidden"
        style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
      >
        {SPEEDS.map(s => (
          <button
            key={s}
            onClick={() => onSpeedChange?.(s)}
            className="px-1.5 py-1 text-xs font-mono transition-colors"
            style={{
              color: speed === s ? 'var(--clr-active)' : 'var(--text-muted)',
              fontWeight: speed === s ? 700 : 400,
              backgroundColor: speed === s ? 'var(--clr-active-bg)' : 'transparent',
            }}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}

function Btn({ onClick, children, disabled, title, 'aria-label': ariaLabel }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      className="w-7 h-7 rounded-md flex items-center justify-center transition-colors disabled:opacity-25 hover:bg-[var(--bg-hover)]"
      style={{ color: 'var(--text-secondary)' }}
    >
      {children}
    </button>
  );
}

import { useState, useEffect } from 'react';
import { X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Infer a human-friendly field type from a sample value.
 * Returns: 'number' | 'string' | 'number[]' | 'string[]' | 'number[][]' | 'string[][]' | 'json'
 */
function inferType(value) {
  if (value === null || value === undefined) return 'string';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') return 'string';
  if (Array.isArray(value)) {
    if (value.length === 0) return 'json';
    const first = value[0];
    if (Array.isArray(first)) {
      // 2D array
      const inner = first[0];
      if (typeof inner === 'string') return 'string[][]';
      return 'number[][]';
    }
    if (typeof first === 'number' || (typeof first === 'number' && first === null)) return 'number[]';
    if (typeof first === 'string') return 'string[]';
    // Mixed or object array
    return 'json';
  }
  return 'json';
}

/** Format a value for display in an input field */
function formatForInput(value, type) {
  if (value === null || value === undefined) return '';
  if (type === 'number') return String(value);
  if (type === 'string') return String(value);
  if (type === 'number[]') return Array.isArray(value) ? value.join(', ') : String(value);
  if (type === 'string[]') return Array.isArray(value) ? value.join(', ') : String(value);
  // For 2D arrays and complex types, use JSON
  return JSON.stringify(value);
}

/** Human-friendly label for a field type */
function typeHint(type) {
  switch (type) {
    case 'number': return 'number';
    case 'string': return 'text';
    case 'number[]': return 'comma-separated numbers';
    case 'string[]': return 'comma-separated strings';
    case 'number[][]': return 'JSON 2D array, e.g. [[1,2],[3,4]]';
    case 'string[][]': return 'JSON 2D array, e.g. [["a","b"],["c","d"]]';
    case 'json': return 'JSON';
    default: return '';
  }
}

/** Parse a raw string input back to the correct type */
function parseValue(raw, type) {
  const trimmed = raw.trim();
  if (type === 'number') {
    const n = Number(trimmed);
    if (isNaN(n)) throw new Error(`Expected a number, got "${trimmed}"`);
    return n;
  }
  if (type === 'string') {
    return trimmed;
  }
  if (type === 'number[]') {
    if (!trimmed) return [];
    // Support both "1, 2, 3" and "[1, 2, 3]"
    const cleaned = trimmed.replace(/^\[|\]$/g, '');
    return cleaned.split(',').map(s => {
      const v = s.trim();
      if (v === 'null') return null;
      const n = Number(v);
      if (isNaN(n)) throw new Error(`"${v}" is not a number`);
      return n;
    });
  }
  if (type === 'string[]') {
    if (!trimmed) return [];
    // Try JSON first
    if (trimmed.startsWith('[')) {
      try { return JSON.parse(trimmed); } catch {}
    }
    // Fallback: comma-separated, strip quotes
    return trimmed.split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
  }
  // 2D arrays and complex types: parse as JSON
  if (type === 'number[][]' || type === 'string[][]' || type === 'json') {
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      throw new Error(`Invalid JSON: ${e.message}`);
    }
  }
  return trimmed;
}

/** Convert a camelCase key to a human-friendly label */
function humanize(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, c => c.toUpperCase())
    .replace(/_/g, ' ');
}

export default function CustomInputModal({ isOpen, onClose, onRun, problem }) {
  const [fields, setFields] = useState({});
  const [fieldTypes, setFieldTypes] = useState({});
  const [error, setError] = useState('');

  // Derive input schema from the problem's first scenario
  useEffect(() => {
    if (!isOpen || !problem) return;

    // Find the first available approach and its first scenario's input
    const approach = problem.approaches?.optimal || problem.approaches?.brute;
    if (!approach?.dryRunScenarios) return;

    const firstScenario = approach.dryRunScenarios.standard || Object.values(approach.dryRunScenarios)[0];
    if (!firstScenario?.input) return;

    const sampleInput = firstScenario.input;
    const types = {};
    const values = {};

    for (const [key, value] of Object.entries(sampleInput)) {
      const type = inferType(value);
      types[key] = type;
      values[key] = formatForInput(value, type);
    }

    setFieldTypes(types);
    setFields(values);
    setError('');
  }, [isOpen, problem]);

  const handleRun = () => {
    try {
      setError('');
      const parsed = {};
      for (const [key, raw] of Object.entries(fields)) {
        parsed[key] = parseValue(raw, fieldTypes[key]);
      }
      onRun(parsed);
      onClose();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleRun();
    }
  };

  const fieldEntries = Object.entries(fields);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.15 }}
            className="relative rounded-xl p-5 w-full max-w-md shadow-xl"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Custom Input
              </h3>
              <button onClick={onClose} className="w-6 h-6 flex items-center justify-center rounded" style={{ color: 'var(--text-muted)' }}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {fieldEntries.map(([key, value]) => {
                const type = fieldTypes[key];
                const isMultiline = type === 'number[][]' || type === 'string[][]' || type === 'json';

                return (
                  <div key={key}>
                    <label className="block text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                      <span className="font-mono font-medium">{key}</span>
                      <span className="ml-1.5 opacity-60">({typeHint(type)})</span>
                    </label>
                    {isMultiline ? (
                      <textarea
                        value={value}
                        onChange={e => setFields(f => ({ ...f, [key]: e.target.value }))}
                        onKeyDown={handleKeyDown}
                        rows={3}
                        className="w-full rounded-lg px-3 py-2 text-sm font-mono focus:outline-none resize-y"
                        style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-raised)', color: 'var(--text-primary)' }}
                      />
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={e => setFields(f => ({ ...f, [key]: e.target.value }))}
                        onKeyDown={handleKeyDown}
                        className="w-full rounded-lg px-3 py-2 text-sm font-mono focus:outline-none"
                        style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-raised)', color: 'var(--text-primary)' }}
                      />
                    )}
                  </div>
                );
              })}

              {fieldEntries.length === 0 && (
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  No input schema found for this problem.
                </p>
              )}

              {error && <p className="text-xs" style={{ color: 'var(--clr-eliminated)' }}>{error}</p>}

              <button
                onClick={handleRun}
                disabled={fieldEntries.length === 0}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
                style={{ backgroundColor: 'var(--clr-active)' }}
              >
                <Play className="w-3.5 h-3.5" />
                Run
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

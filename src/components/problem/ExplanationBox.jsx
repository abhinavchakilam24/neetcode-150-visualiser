import { motion, AnimatePresence } from 'framer-motion';

export default function ExplanationBox({ step }) {
  if (!step?.explanation) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.stepId}
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.12 }}
        className="rounded-lg px-3 py-2.5"
        style={{ backgroundColor: 'var(--bg-raised)', border: '1px solid var(--border)' }}
      >
        {step.shortLabel && (
          <p
            className="text-xs font-semibold mb-1 font-mono"
            style={{ color: 'var(--clr-active)' }}
          >
            {step.shortLabel}
          </p>
        )}
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {step.explanation}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

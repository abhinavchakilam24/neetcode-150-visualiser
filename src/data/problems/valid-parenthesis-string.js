export const validParenthesisString = {
  id: 128,
  slug: "valid-parenthesis-string",
  title: "Valid Parenthesis String",
  difficulty: "Medium",
  topic: "greedy",
  topicLabel: "Greedy",
  neetcodeNumber: 128,
  artifactType: "ArrayHashMap",
  companies: ["Amazon", "Google", "Meta", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/valid-parenthesis-string/",

  pattern: "Greedy Range Tracking",
  patternExplanation: `Track the range [lo, hi] of possible open-paren counts. '(' increases both,
    ')' decreases both, '*' expands the range (could be '(', ')' or empty).`,

  intuition: {
    coreInsight: `The wildcard '*' can be '(', ')' or empty. Instead of trying all possibilities,
      track the RANGE of possible open-parenthesis counts. 'lo' = minimum possible open count,
      'hi' = maximum possible open count. If hi ever goes negative, too many ')'. At the end,
      if lo <= 0, the string can be balanced.`,

    mentalModel: `Imagine counting open parentheses with an uncertain counter. Each '(' adds 1
      to both min and max. Each ')' subtracts 1 from both. Each '*' subtracts 1 from min (if
      it's ')') and adds 1 to max (if it's '('). The counter shows a range of possibilities.
      If the range ever includes 0 at the end, some assignment of '*'s makes it valid.`,

    whyNaiveFails: `With k wildcards, there are 3^k possible assignments. For k=50, that's
      over 10^23 possibilities. The greedy range approach processes everything in O(n).`,

    keyObservation: `lo tracks the most conservative estimate (treat '*' as ')') and hi tracks
      the most optimistic (treat '*' as '('). If hi < 0 at any point, even the most optimistic
      interpretation fails. lo is clamped to 0 because negative open count just means extra
      wildcards were used as empty. At the end, lo == 0 means balanced is achievable.`,
  },

  problem: `Given a string s containing only three types of characters: '(', ')' and '*',
    return true if s is valid. A valid string has: every '(' has a corresponding ')', every ')'
    has a corresponding '(', and '(' comes before ')'. '*' can be treated as '(' or ')' or empty.`,

  examples: [
    { input: 's = "()"', output: "true", explanation: "Standard valid parentheses" },
    { input: 's = "(*)"', output: "true", explanation: "'*' can be empty, giving '()'" },
    { input: 's = "(*))"', output: "true", explanation: "'*' acts as '(', giving '(())'" },
  ],

  constraints: [
    "1 <= s.length <= 100",
    "s[i] is '(', ')' or '*'.",
  ],

  approaches: {
    brute: {
      label: "Try All Assignments",
      tier: "brute",
      timeComplexity: "O(3^n)",
      spaceComplexity: "O(n)",
      idea: "For each '*', try all three options: '(', ')', or empty. Check if any assignment is valid.",

      javaCode: `public boolean checkValidString(String s) {
    return check(s, 0, 0);
}

private boolean check(String s, int i, int open) {
    if (open < 0) return false;
    if (i == s.length()) return open == 0;
    char c = s.charAt(i);
    if (c == '(') return check(s, i+1, open+1);
    if (c == ')') return check(s, i+1, open-1);
    return check(s, i+1, open+1) ||
           check(s, i+1, open-1) ||
           check(s, i+1, open);
}`,

      cppCode: `bool checkValidString(string s) {
    return check(s, 0, 0);
}

bool check(string& s, int i, int open) {
    if (open < 0) return false;
    if (i == s.size()) return open == 0;
    char c = s[i];
    if (c == '(') return check(s, i+1, open+1);
    if (c == ')') return check(s, i+1, open-1);
    return check(s, i+1, open+1) ||
           check(s, i+1, open-1) ||
           check(s, i+1, open);
}`,

      pythonCode: `def checkValidString(s: str) -> bool:
    def check(i, open_count):
        if open_count < 0: return False
        if i == len(s): return open_count == 0
        if s[i] == '(': return check(i+1, open_count+1)
        if s[i] == ')': return check(i+1, open_count-1)
        return (check(i+1, open_count+1) or
                check(i+1, open_count-1) or
                check(i+1, open_count))
    return check(0, 0)`,

      lineAnnotations: {
        5: "Negative open count = invalid",
        6: "End of string: valid only if all parens matched",
        8: "'(' always adds to open count",
        9: "')' always subtracts from open count",
        10: "'*': try as '(', ')', or empty",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { s: "(*)" },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0, lineNumbers: [1], shortLabel: "Try all * assignments",
              explanation: 'String "(*)" has 1 wildcard. Try 3 assignments: "(())", "())", "()".',
              variables: { s: "(*)", wildcards: 1, branches: 3 },
              dataStructure: { arrayStates: {0:"default",1:"default",2:"default"}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [10, 12], shortLabel: "* as empty → '()' → valid!",
              explanation: "Treating '*' as empty gives '()' which is valid. Return true.",
              variables: { assignment: "empty", result: "()", answer: true },
              dataStructure: { arrayStates: {0:"found",1:"found",2:"found"}, pointers: [], hashMap: {} },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s }) {
        const stars = s.split('').filter(c => c === '*').length;
        // Simple: just compute the answer
        let lo = 0, hi = 0;
        let valid = true;
        for (const c of s) {
          if (c === '(') { lo++; hi++; }
          else if (c === ')') { lo--; hi--; }
          else { lo--; hi++; }
          if (hi < 0) { valid = false; break; }
          lo = Math.max(lo, 0);
        }
        if (lo !== 0) valid = false;
        return [
          { stepId: 0, lineNumbers: [1], shortLabel: "Start", explanation: `String "${s}" has ${stars} wildcards.`, variables: { s, wildcards: stars }, dataStructure: { arrayStates: {}, pointers: [], hashMap: {} }, delta: {}, isAnswer: false },
          { stepId: 1, lineNumbers: [6], shortLabel: `Result: ${valid}`, explanation: valid ? "Valid assignment exists." : "No valid assignment.", variables: { answer: valid }, dataStructure: { arrayStates: {}, pointers: [], hashMap: {} }, delta: {}, isAnswer: true },
        ];
      },
    },

    better: null,

    optimal: {
      label: "Greedy Range [lo, hi]",
      tier: "optimal",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      idea: `Track range [lo, hi] of possible open-paren counts. '(' → both increase.
        ')' → both decrease. '*' → lo decreases, hi increases. Clamp lo to 0.
        If hi < 0 → impossible. At end, lo == 0 → valid.`,

      javaCode: `public boolean checkValidString(String s) {
    int lo = 0, hi = 0;

    for (char c : s.toCharArray()) {
        if (c == '(') {
            lo++;
            hi++;
        } else if (c == ')') {
            lo--;
            hi--;
        } else {
            lo--;
            hi++;
        }
        if (hi < 0) return false;
        lo = Math.max(lo, 0);
    }

    return lo == 0;
}`,

      cppCode: `bool checkValidString(string s) {
    int lo = 0, hi = 0;

    for (char c : s) {
        if (c == '(') {
            lo++;
            hi++;
        } else if (c == ')') {
            lo--;
            hi--;
        } else {
            lo--;
            hi++;
        }
        if (hi < 0) return false;
        lo = max(lo, 0);
    }

    return lo == 0;
}`,

      pythonCode: `def checkValidString(s: str) -> bool:
    lo = hi = 0

    for c in s:
        if c == '(':
            lo += 1
            hi += 1
        elif c == ')':
            lo -= 1
            hi -= 1
        else:
            lo -= 1
            hi += 1
        if hi < 0:
            return False
        lo = max(lo, 0)

    return lo == 0`,

      lineAnnotations: {
        2: "lo = min possible open parens, hi = max possible",
        5: "'(' definitely opens: both increase",
        8: "')' definitely closes: both decrease",
        11: "'*' could be (, ), or empty: expand range",
        15: "If even optimistic count < 0, impossible",
        16: "Clamp lo to 0 (negative = excess ')' absorbed by '*' as empty)",
        19: "Valid if zero open parens is achievable",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: '"(*)" → valid',
          input: { s: "(*)" },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0, lineNumbers: [2],
              shortLabel: "Init lo=0, hi=0",
              explanation: "Start with range [0, 0]. No characters processed yet. Zero open parens.",
              variables: { lo: 0, hi: 0, s: "(*)" },
              dataStructure: {
                arrayStates: {0:"default",1:"default",2:"default"},
                pointers: [],
                hashMap: { lo: {value:0}, hi: {value:0} },
              },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [5, 6],
              shortLabel: "c='(': lo=1, hi=1",
              explanation: "'(' opens a paren. Both lo and hi increase to 1. Range: [1, 1] — exactly 1 open paren.",
              variables: { c: "(", lo: 1, hi: 1, range: "[1,1]" },
              dataStructure: {
                arrayStates: {0:"active",1:"default",2:"default"},
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { lo: {value:1,isNew:true}, hi: {value:1,isNew:true} },
              },
              delta: { changedIndices: [0] }, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [11, 12],
              shortLabel: "c='*': lo=0, hi=2",
              explanation: "'*' expands the range. Could be ')' (lo=0), '(' (hi=2), or empty (stays 1). Range: [0, 2].",
              variables: { c: "*", lo: 0, hi: 2, range: "[0,2]" },
              dataStructure: {
                arrayStates: {0:"visited",1:"active",2:"default"},
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { lo: {value:0,isNew:true}, hi: {value:2,isNew:true} },
              },
              delta: { changedIndices: [1] }, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [8, 9],
              shortLabel: "c=')': lo=-1→0, hi=1",
              explanation: "')' closes: lo=-1 (clamped to 0), hi=1. Range: [0, 1]. hi ≥ 0, valid so far.",
              variables: { c: ")", lo: 0, hi: 1, range: "[0,1]" },
              dataStructure: {
                arrayStates: {0:"visited",1:"visited",2:"active"},
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { lo: {value:0,isNew:true}, hi: {value:1,isNew:true} },
              },
              delta: { changedIndices: [2] }, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [19],
              shortLabel: "lo==0 → true",
              explanation: "lo is 0, meaning zero open parens is achievable. The string is valid! (Treating '*' as empty gives '()').",
              variables: { lo: 0, answer: true },
              dataStructure: {
                arrayStates: {0:"found",1:"found",2:"found"},
                pointers: [],
                hashMap: { lo: {value:0,isHighlighted:true}, hi: {value:1} },
              },
              delta: {}, isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "All Stars",
          description: '"***" → all wildcards, valid (treat all as empty)',
          input: { s: "***" },
          expectedOutput: "true",
          steps: [
            {
              stepId: 0, lineNumbers: [2],
              shortLabel: "Init lo=0, hi=0",
              explanation: 'String "***". All wildcards — each can be (, ), or empty.',
              variables: { lo: 0, hi: 0, s: "***" },
              dataStructure: { arrayStates: {0:"default",1:"default",2:"default"}, pointers: [], hashMap: { lo:{value:0}, hi:{value:0} } },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 1, lineNumbers: [11, 12],
              shortLabel: "*: lo=0, hi=1",
              explanation: "First '*': lo=-1→0, hi=1. Range [0,1].",
              variables: { c: "*", lo: 0, hi: 1 },
              dataStructure: { arrayStates: {0:"active",1:"default",2:"default"}, pointers: [{name:"i",index:0,color:"pointer"}], hashMap: { lo:{value:0}, hi:{value:1} } },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 2, lineNumbers: [11, 12],
              shortLabel: "*: lo=0, hi=2",
              explanation: "Second '*': lo=-1→0, hi=2. Range [0,2].",
              variables: { c: "*", lo: 0, hi: 2 },
              dataStructure: { arrayStates: {0:"visited",1:"active",2:"default"}, pointers: [{name:"i",index:1,color:"pointer"}], hashMap: { lo:{value:0}, hi:{value:2} } },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 3, lineNumbers: [11, 12],
              shortLabel: "*: lo=0, hi=3",
              explanation: "Third '*': lo=-1→0, hi=3. Range [0,3].",
              variables: { c: "*", lo: 0, hi: 3 },
              dataStructure: { arrayStates: {0:"visited",1:"visited",2:"active"}, pointers: [{name:"i",index:2,color:"pointer"}], hashMap: { lo:{value:0}, hi:{value:3} } },
              delta: {}, isAnswer: false,
            },
            {
              stepId: 4, lineNumbers: [19],
              shortLabel: "lo==0 → true",
              explanation: "lo is 0. Treat all three '*' as empty → valid empty expression.",
              variables: { answer: true },
              dataStructure: { arrayStates: {0:"found",1:"found",2:"found"}, pointers: [], hashMap: { lo:{value:0,isHighlighted:true} } },
              delta: {}, isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ s }) {
        const steps = [];
        let lo = 0, hi = 0;

        steps.push({
          stepId: 0, lineNumbers: [2],
          shortLabel: "Init lo=0, hi=0",
          explanation: `Process "${s}". Track range of possible open paren counts.`,
          variables: { lo: 0, hi: 0, s },
          dataStructure: { arrayStates: Object.fromEntries(s.split('').map((_,i)=>[i,"default"])), pointers: [], hashMap: { lo:{value:0}, hi:{value:0} } },
          delta: {}, isAnswer: false,
        });

        for (let i = 0; i < s.length; i++) {
          const c = s[i];
          if (c === '(') { lo++; hi++; }
          else if (c === ')') { lo--; hi--; }
          else { lo--; hi++; }

          if (hi < 0) {
            steps.push({
              stepId: steps.length, lineNumbers: [15],
              shortLabel: `hi<0 at i=${i} → false`,
              explanation: `hi dropped below 0. Even treating all '*' as '(' can't save it.`,
              variables: { i, c, lo, hi, answer: false },
              dataStructure: { arrayStates: Object.fromEntries(s.split('').map((_,j)=>[j,j<=i?"eliminated":"default"])), pointers: [], hashMap: { lo:{value:lo}, hi:{value:hi} } },
              delta: {}, isAnswer: true,
            });
            return steps;
          }
          lo = Math.max(lo, 0);

          steps.push({
            stepId: steps.length, lineNumbers: c === '(' ? [5,6] : c === ')' ? [8,9] : [11,12],
            shortLabel: `c='${c}': lo=${lo}, hi=${hi}`,
            explanation: `'${c}': range becomes [${lo}, ${hi}].`,
            variables: { i, c, lo, hi },
            dataStructure: { arrayStates: Object.fromEntries(s.split('').map((_,j)=>[j,j<i?"visited":j===i?"active":"default"])), pointers: [{name:"i",index:i,color:"pointer"}], hashMap: { lo:{value:lo}, hi:{value:hi} } },
            delta: { changedIndices: [i] }, isAnswer: false,
          });
        }

        const result = lo === 0;
        steps.push({
          stepId: steps.length, lineNumbers: [19],
          shortLabel: `lo==${lo} → ${result}`,
          explanation: result ? "lo is 0 — balanced is achievable. Valid!" : `lo is ${lo} — too many unmatched '('. Invalid.`,
          variables: { lo, answer: result },
          dataStructure: { arrayStates: Object.fromEntries(s.split('').map((_,i)=>[i,result?"found":"eliminated"])), pointers: [], hashMap: { lo:{value:lo,isHighlighted:true}, hi:{value:hi} } },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute: { time: "O(3^n)", space: "O(n)", explanation: "Each '*' branches into 3 options" },
    optimal: { time: "O(n)", space: "O(1)", explanation: "Single pass tracking lo/hi range", tradeoff: "Greedy range tracking replaces exponential branching" },
  },

  interviewTips: [
    "Explain the lo/hi range concept clearly — it's the core insight.",
    "lo = treat '*' as ')' (pessimistic), hi = treat '*' as '(' (optimistic).",
    "If hi < 0, even optimism can't save it. If lo > 0 at end, pessimism can't balance it.",
    "Clamping lo to 0 is crucial — negative just means extra '*' became empty.",
    "Alternative approach: two passes (left-to-right and right-to-left) also works.",
  ],

  relatedProblems: ["valid-parentheses", "generate-parentheses", "longest-valid-parentheses"],
};

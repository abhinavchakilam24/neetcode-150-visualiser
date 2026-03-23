export const encodeDecodeStrings = {
  id: 6,
  slug: "encode-decode-strings",
  title: "Encode and Decode Strings",
  difficulty: "Medium",
  topic: "arrays-hashing",
  topicLabel: "Arrays & Hashing",
  neetcodeNumber: 6,
  artifactType: "ArrayHashMap",
  companies: ["Google", "Meta", "Amazon", "Apple", "Microsoft"],
  leetcodeLink: "https://leetcode.com/problems/encode-and-decode-strings/",

  pattern: "Length-Prefix Encoding",
  patternExplanation: `When serializing a list of strings into a single string, prepend each
    string with its length followed by a delimiter. This avoids ambiguity because the length
    tells the decoder exactly how many characters to consume, regardless of what characters
    appear inside the string.`,

  intuition: {
    coreInsight: `The fundamental challenge is: how do you join strings into one string and
      split them back perfectly, even when the strings themselves contain any character —
      including your delimiter? A simple delimiter like "," fails if a string contains ",".
      The key insight is to use length-prefixing: before each string, write its length and
      a separator (like "#"). The decoder reads the number, knows exactly how many characters
      to grab, and never confuses content for metadata.`,

    mentalModel: `Imagine packing boxes of varying sizes into a single shipping container.
      If you just stack them with dividers, someone could mistake a divider-shaped item
      inside a box for an actual divider. Instead, you label each box with its exact weight
      before sealing it. The receiver reads "5kg" on the label, weighs out exactly 5kg of
      content, then reads the next label. The label IS the length prefix — it tells you
      exactly where each box starts and ends, no guessing required.`,

    whyNaiveFails: `Using a simple delimiter (comma, semicolon, etc.) breaks when strings
      contain that delimiter. Even escaping gets tricky: if the string contains the escape
      character itself, you need double-escaping, which compounds complexity. For example,
      with delimiter ",": ["a,b", "c"] encodes to "a,b,c" — is that two strings or three?
      The decoder cannot tell. Any character-based delimiter is fundamentally fragile.`,

    keyObservation: `By prefixing each string with its length and a fixed separator character
      (e.g., "4#lint"), the decoder never needs to scan for delimiters inside the string.
      It reads the number up to "#", then consumes exactly that many characters. Even if the
      string contains "#" or digits, it doesn't matter — the length tells us precisely where
      the string boundaries are. This makes the encoding unambiguous for ANY string content.`,
  },

  problem: `Design an algorithm to encode a list of strings to a single string. The encoded
    string is then sent over the network and is decoded back to the original list of strings.
    Implement the encode and decode methods. The strings may contain any possible characters
    including special characters, delimiters, and empty strings.`,

  examples: [
    { input: '["lint","code","love","you"]', output: '["lint","code","love","you"]', explanation: 'encode then decode returns original list' },
    { input: '["we","say",":","yes"]', output: '["we","say",":","yes"]', explanation: 'Works even with special characters like ":"' },
    { input: '[""]', output: '[""]', explanation: 'Empty string is handled correctly: encoded as "0#"' },
  ],

  constraints: [
    '0 <= strs.length <= 200',
    '0 <= strs[i].length <= 200',
    'strs[i] contains any possible characters including special characters',
  ],

  approaches: {
    brute: {
      label: "Delimiter Join",
      tier: "brute",
      timeComplexity: "O(n * k)",
      spaceComplexity: "O(n * k)",
      idea: `Join all strings with a non-printable or unlikely delimiter (e.g., a special
        character sequence like ":::"). Split on that delimiter when decoding. This works
        for most inputs but fails if strings contain the delimiter itself.`,

      javaCode: `public String encode(List<String> strs) {
    return String.join(":::", strs);
}

public List<String> decode(String s) {
    return Arrays.asList(s.split(":::", -1));
}`,

      cppCode: `string encode(vector<string>& strs) {
    string result = "";
    for (int i = 0; i < strs.size(); i++) {
        result += strs[i];
        if (i < strs.size() - 1) result += ":::";
    }
    return result;
}

vector<string> decode(string s) {
    vector<string> result;
    size_t pos = 0;
    string delim = ":::";
    while ((pos = s.find(delim)) != string::npos) {
        result.push_back(s.substr(0, pos));
        s.erase(0, pos + delim.length());
    }
    result.push_back(s);
    return result;
}`,

      pythonCode: `def encode(strs: List[str]) -> str:
    return ":::".join(strs)

def decode(s: str) -> List[str]:
    return s.split(":::")`,

      lineAnnotations: {
        2: "Join all strings using ':::' as delimiter",
        6: "Split the encoded string back on ':::'",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          input: { strs: ["lint", "code", "love", "you"] },
          expectedOutput: '["lint","code","love","you"]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [1, 2],
              shortLabel: "Start encode",
              explanation: "We have 4 strings to encode: [\"lint\", \"code\", \"love\", \"you\"]. We'll join them with the delimiter \":::\".",
              variables: { strs: '["lint","code","love","you"]', delimiter: ":::" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [2],
              shortLabel: "Join with :::",
              explanation: "Concatenate all strings with \":::\" between them: \"lint:::code:::love:::you\". This is our encoded result.",
              variables: { encoded: "lint:::code:::love:::you" },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                pointers: [],
                hashMap: {},
              },
              delta: { changedIndices: [0, 1, 2, 3] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [5, 6],
              shortLabel: "Decode: split on :::",
              explanation: "To decode, split \"lint:::code:::love:::you\" on \":::\". We get back [\"lint\", \"code\", \"love\", \"you\"]. Works for this input, but would break if any string contained \":::\".",
              variables: { input: "lint:::code:::love:::you", result: '["lint","code","love","you"]' },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ strs }) {
        const steps = [];
        const n = strs.length;
        const defaultStates = () => Object.fromEntries(strs.map((_, i) => [i, "default"]));

        steps.push({
          stepId: 0, lineNumbers: [1, 2],
          shortLabel: "Start encode",
          explanation: `We have ${n} strings to encode. We'll join them with delimiter ":::".`,
          variables: { strs: JSON.stringify(strs), delimiter: ":::" },
          dataStructure: { arrayStates: defaultStates(), pointers: [], hashMap: {} },
          delta: {}, isAnswer: false,
        });

        const encoded = strs.join(":::");
        steps.push({
          stepId: 1, lineNumbers: [2],
          shortLabel: "Join with :::",
          explanation: `Encoded result: "${encoded}". All strings joined with ":::".`,
          variables: { encoded },
          dataStructure: {
            arrayStates: Object.fromEntries(strs.map((_, i) => [i, "found"])),
            pointers: [], hashMap: {},
          },
          delta: { changedIndices: strs.map((_, i) => i) }, isAnswer: false,
        });

        steps.push({
          stepId: 2, lineNumbers: [5, 6],
          shortLabel: "Decode: split on :::",
          explanation: `Split "${encoded}" on ":::". Result: ${JSON.stringify(strs)}. Warning: fails if any string contains ":::".`,
          variables: { input: encoded, result: JSON.stringify(strs) },
          dataStructure: {
            arrayStates: Object.fromEntries(strs.map((_, i) => [i, "found"])),
            pointers: [], hashMap: {},
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },

    better: null,

    optimal: {
      label: "Length Prefix",
      tier: "optimal",
      timeComplexity: "O(n * k)",
      spaceComplexity: "O(n * k)",
      idea: `Encode each string as its length, followed by "#", followed by the string itself.
        For example, ["lint","code"] becomes "4#lint4#code". To decode, read digits until "#",
        parse the length, then consume exactly that many characters. This is unambiguous for
        any string content.`,

      javaCode: `public String encode(List<String> strs) {
    StringBuilder sb = new StringBuilder();
    for (String s : strs) {
        sb.append(s.length());
        sb.append('#');
        sb.append(s);
    }
    return sb.toString();
}

public List<String> decode(String s) {
    List<String> result = new ArrayList<>();
    int i = 0;
    while (i < s.length()) {
        int j = i;
        while (s.charAt(j) != '#') {
            j++;
        }
        int len = Integer.parseInt(s.substring(i, j));
        String str = s.substring(j + 1, j + 1 + len);
        result.add(str);
        i = j + 1 + len;
    }
    return result;
}`,

      cppCode: `string encode(vector<string>& strs) {
    string result = "";
    for (const string& s : strs) {
        result += to_string(s.length()) + "#" + s;
    }
    return result;
}

vector<string> decode(string s) {
    vector<string> result;
    int i = 0;
    while (i < s.size()) {
        int j = i;
        while (s[j] != '#') {
            j++;
        }
        int len = stoi(s.substr(i, j - i));
        string str = s.substr(j + 1, len);
        result.push_back(str);
        i = j + 1 + len;
    }
    return result;
}`,

      pythonCode: `def encode(strs: List[str]) -> str:
    result = ""
    for s in strs:
        result += str(len(s)) + "#" + s
    return result

def decode(s: str) -> List[str]:
    result = []
    i = 0
    while i < len(s):
        j = i
        while s[j] != "#":
            j += 1
        length = int(s[i:j])
        result.append(s[j + 1 : j + 1 + length])
        i = j + 1 + length
    return result`,

      lineAnnotations: {
        2:  "StringBuilder for efficient concatenation",
        3:  "Iterate through each string in the list",
        4:  "Append the length of the current string",
        5:  "Append '#' as separator between length and content",
        6:  "Append the actual string content",
        11: "Result list to collect decoded strings",
        12: "Pointer i tracks our position in the encoded string",
        13: "Continue until we've consumed the entire encoded string",
        14: "Start scanning for '#' from current position",
        15: "Advance j until we find the '#' delimiter",
        18: "Parse the length number from digits before '#'",
        19: "Extract exactly 'len' characters after '#'",
        20: "Add the decoded string to our result",
        21: "Move i past the current string to the next length prefix",
      },

      dryRunScenarios: {
        standard: {
          id: "standard",
          label: "Standard",
          description: "Four simple strings — clean encode and decode",
          input: { strs: ["lint", "code", "love", "you"] },
          expectedOutput: '["lint","code","love","you"]',
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Start encoding",
              explanation: "We have 4 strings: [\"lint\", \"code\", \"love\", \"you\"]. For each string, we'll prepend its length followed by '#'. This creates an unambiguous encoding.",
              variables: { strs: '["lint","code","love","you"]', encoded: "" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Encode "lint" → "4#lint"',
              explanation: "First string is \"lint\" with length 4. We append \"4#lint\" to the result. The '4' tells the decoder to read exactly 4 characters after the '#'.",
              variables: { currentStr: "lint", length: 4, encoded: "4#lint" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "str", index: 0, color: "pointer" }],
                hashMap: { "lint": { value: "4#lint", isNew: true } },
              },
              delta: { changedIndices: [0], mapAdded: [{ key: "lint", value: "4#lint" }] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Encode "code" → append "4#code"',
              explanation: "Second string is \"code\" with length 4. Append \"4#code\". Running encoded string: \"4#lint4#code\".",
              variables: { currentStr: "code", length: 4, encoded: "4#lint4#code" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default", 3: "default" },
                pointers: [{ name: "str", index: 1, color: "pointer" }],
                hashMap: { "lint": { value: "4#lint" }, "code": { value: "4#code", isNew: true } },
              },
              delta: { changedIndices: [1], mapAdded: [{ key: "code", value: "4#code" }] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Encode "love" → append "4#love"',
              explanation: "Third string is \"love\" with length 4. Append \"4#love\". Running encoded: \"4#lint4#code4#love\".",
              variables: { currentStr: "love", length: 4, encoded: "4#lint4#code4#love" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active", 3: "default" },
                pointers: [{ name: "str", index: 2, color: "pointer" }],
                hashMap: { "lint": { value: "4#lint" }, "code": { value: "4#code" }, "love": { value: "4#love", isNew: true } },
              },
              delta: { changedIndices: [2], mapAdded: [{ key: "love", value: "4#love" }] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Encode "you" → append "3#you"',
              explanation: "Fourth string is \"you\" with length 3. Append \"3#you\". Final encoded string: \"4#lint4#code4#love3#you\".",
              variables: { currentStr: "you", length: 3, encoded: "4#lint4#code4#love3#you" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "visited", 3: "active" },
                pointers: [{ name: "str", index: 3, color: "pointer" }],
                hashMap: { "lint": { value: "4#lint" }, "code": { value: "4#code" }, "love": { value: "4#love" }, "you": { value: "3#you", isNew: true } },
              },
              delta: { changedIndices: [3], mapAdded: [{ key: "you", value: "3#you" }] },
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [11, 12, 13],
              shortLabel: "Start decoding",
              explanation: "Now we decode \"4#lint4#code4#love3#you\". Set i=0. We'll scan for '#' to find each length prefix, then extract exactly that many characters.",
              variables: { encoded: "4#lint4#code4#love3#you", i: 0, result: "[]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default", 3: "default" },
                pointers: [],
                hashMap: { "lint": { value: "4#lint" }, "code": { value: "4#code" }, "love": { value: "4#love" }, "you": { value: "3#you" } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [14, 15, 18, 19, 20, 21],
              shortLabel: 'Decode: read "4#" → "lint"',
              explanation: "Starting at i=0, scan for '#'. Found at j=1. Length = parseInt(\"4\") = 4. Extract s[2..6) = \"lint\". Add to result. Move i to 6 (j+1+len = 1+1+4).",
              variables: { i: 0, j: 1, length: 4, extracted: "lint", result: '["lint"]', nextI: 6 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "lint": { value: "4#lint", isHighlighted: true }, "code": { value: "4#code" }, "love": { value: "4#love" }, "you": { value: "3#you" } },
              },
              delta: { changedIndices: [0], mapHighlighted: ["lint"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [14, 15, 18, 19, 20, 21],
              shortLabel: 'Decode: read "4#" → "code"',
              explanation: "At i=6, scan for '#'. Found at j=7. Length = 4. Extract s[8..12) = \"code\". Add to result. Move i to 12.",
              variables: { i: 6, j: 7, length: 4, extracted: "code", result: '["lint","code"]', nextI: 12 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "default", 3: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "lint": { value: "4#lint" }, "code": { value: "4#code", isHighlighted: true }, "love": { value: "4#love" }, "you": { value: "3#you" } },
              },
              delta: { changedIndices: [1], mapHighlighted: ["code"] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [14, 15, 18, 19, 20, 21],
              shortLabel: 'Decode: read "4#" → "love"',
              explanation: "At i=12, scan for '#'. Found at j=13. Length = 4. Extract s[14..18) = \"love\". Add to result. Move i to 18.",
              variables: { i: 12, j: 13, length: 4, extracted: "love", result: '["lint","code","love"]', nextI: 18 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "default" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "lint": { value: "4#lint" }, "code": { value: "4#code" }, "love": { value: "4#love", isHighlighted: true }, "you": { value: "3#you" } },
              },
              delta: { changedIndices: [2], mapHighlighted: ["love"] },
              isAnswer: false,
            },
            {
              stepId: 9,
              lineNumbers: [14, 15, 18, 19, 20, 21],
              shortLabel: 'Decode: read "3#" → "you"',
              explanation: "At i=18, scan for '#'. Found at j=19. Length = 3. Extract s[20..23) = \"you\". Add to result. Move i to 23, which equals the encoded string's length.",
              variables: { i: 18, j: 19, length: 3, extracted: "you", result: '["lint","code","love","you"]', nextI: 23 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                pointers: [{ name: "i", index: 3, color: "pointer" }],
                hashMap: { "lint": { value: "4#lint" }, "code": { value: "4#code" }, "love": { value: "4#love" }, "you": { value: "3#you", isHighlighted: true } },
              },
              delta: { changedIndices: [3], mapHighlighted: ["you"] },
              isAnswer: false,
            },
            {
              stepId: 10,
              lineNumbers: [13, 23],
              shortLabel: "Done! All 4 strings decoded",
              explanation: "i=23 equals the encoded string length, so the while loop exits. We've successfully decoded all 4 strings: [\"lint\", \"code\", \"love\", \"you\"]. The length-prefix approach handled every string unambiguously.",
              variables: { result: '["lint","code","love","you"]' },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found", 3: "found" },
                pointers: [],
                hashMap: { "lint": { value: "4#lint" }, "code": { value: "4#code" }, "love": { value: "4#love" }, "you": { value: "3#you" } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase1: {
          id: "edgeCase1",
          label: "Special Characters",
          description: "Strings containing '#' and digits — tests that length prefix is unambiguous",
          input: { strs: ["a#b", "12#", ""] },
          expectedOutput: '["a#b","12#",""]',
          commonMistake: "If you use '#' as a simple delimiter (split on '#'), you'd split \"a#b\" incorrectly. The length prefix avoids this because we know exactly how many characters to read after '#'.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Start encoding",
              explanation: "We have 3 tricky strings: [\"a#b\", \"12#\", \"\"]. The first two contain '#' characters, and the third is empty. This tests whether our encoding is truly unambiguous.",
              variables: { strs: '["a#b","12#",""]', encoded: "" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Encode "a#b" → "3#a#b"',
              explanation: "\"a#b\" has length 3. We prepend \"3#\", giving \"3#a#b\". Notice the '#' inside the string does NOT confuse the decoder — the '3' tells us to read exactly 3 characters after the first '#'.",
              variables: { currentStr: "a#b", length: 3, encoded: "3#a#b" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default" },
                pointers: [{ name: "str", index: 0, color: "pointer" }],
                hashMap: { "a#b": { value: "3#a#b", isNew: true } },
              },
              delta: { changedIndices: [0], mapAdded: [{ key: "a#b", value: "3#a#b" }] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Encode "12#" → append "3#12#"',
              explanation: "\"12#\" has length 3. Append \"3#12#\". Running encoded: \"3#a#b3#12#\". The \"12\" inside the string looks like a length prefix, but the decoder won't be fooled — it reads exactly 3 chars after the '#'.",
              variables: { currentStr: "12#", length: 3, encoded: "3#a#b3#12#" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default" },
                pointers: [{ name: "str", index: 1, color: "pointer" }],
                hashMap: { "a#b": { value: "3#a#b" }, "12#": { value: "3#12#", isNew: true } },
              },
              delta: { changedIndices: [1], mapAdded: [{ key: "12#", value: "3#12#" }] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Encode "" → append "0#"',
              explanation: "Empty string has length 0. Append \"0#\". Final encoded: \"3#a#b3#12#0#\". The \"0#\" means read 0 characters — perfectly valid.",
              variables: { currentStr: "", length: 0, encoded: "3#a#b3#12#0#" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active" },
                pointers: [{ name: "str", index: 2, color: "pointer" }],
                hashMap: { "a#b": { value: "3#a#b" }, "12#": { value: "3#12#" }, "": { value: "0#", isNew: true } },
              },
              delta: { changedIndices: [2], mapAdded: [{ key: "", value: "0#" }] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 12, 13],
              shortLabel: "Start decoding",
              explanation: "Decode \"3#a#b3#12#0#\". This looks confusing with multiple '#' characters, but the length-prefix approach handles it perfectly. Set i=0.",
              variables: { encoded: "3#a#b3#12#0#", i: 0, result: "[]" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: { "a#b": { value: "3#a#b" }, "12#": { value: "3#12#" }, "": { value: "0#" } },
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 5,
              lineNumbers: [14, 15, 18, 19, 20, 21],
              shortLabel: 'Decode: "3#" → read 3 chars → "a#b"',
              explanation: "At i=0, scan for '#'. Found at j=1. Length = 3. Extract s[2..5) = \"a#b\". The '#' at position 3 is part of the string content, not a delimiter. Move i to 5.",
              variables: { i: 0, j: 1, length: 3, extracted: "a#b", result: '["a#b"]', nextI: 5 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "default", 2: "default" },
                pointers: [{ name: "i", index: 0, color: "pointer" }],
                hashMap: { "a#b": { value: "3#a#b", isHighlighted: true }, "12#": { value: "3#12#" }, "": { value: "0#" } },
              },
              delta: { changedIndices: [0], mapHighlighted: ["a#b"] },
              isAnswer: false,
            },
            {
              stepId: 6,
              lineNumbers: [14, 15, 18, 19, 20, 21],
              shortLabel: 'Decode: "3#" → read 3 chars → "12#"',
              explanation: "At i=5, scan for '#'. Found at j=6. Length = 3. Extract s[7..10) = \"12#\". Even though \"12\" looks like a number and '#' looks like our separator, the decoder correctly treats them as string content. Move i to 10.",
              variables: { i: 5, j: 6, length: 3, extracted: "12#", result: '["a#b","12#"]', nextI: 10 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "default" },
                pointers: [{ name: "i", index: 1, color: "pointer" }],
                hashMap: { "a#b": { value: "3#a#b" }, "12#": { value: "3#12#", isHighlighted: true }, "": { value: "0#" } },
              },
              delta: { changedIndices: [1], mapHighlighted: ["12#"] },
              isAnswer: false,
            },
            {
              stepId: 7,
              lineNumbers: [14, 15, 18, 19, 20, 21],
              shortLabel: 'Decode: "0#" → read 0 chars → ""',
              explanation: "At i=10, scan for '#'. Found at j=11. Length = 0. Extract s[12..12) = \"\" (empty string). This is the beauty of length-prefix: even empty strings encode and decode perfectly. Move i to 12.",
              variables: { i: 10, j: 11, length: 0, extracted: "", result: '["a#b","12#",""]', nextI: 12 },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [{ name: "i", index: 2, color: "pointer" }],
                hashMap: { "a#b": { value: "3#a#b" }, "12#": { value: "3#12#" }, "": { value: "0#", isHighlighted: true } },
              },
              delta: { changedIndices: [2], mapHighlighted: [""] },
              isAnswer: false,
            },
            {
              stepId: 8,
              lineNumbers: [13, 23],
              shortLabel: "Done! All decoded correctly",
              explanation: "i=12 equals the encoded string length. Result: [\"a#b\", \"12#\", \"\"]. Despite containing '#' characters and digit sequences that could confuse a naive parser, the length-prefix approach decoded everything perfectly.",
              variables: { result: '["a#b","12#",""]' },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [],
                hashMap: { "a#b": { value: "3#a#b" }, "12#": { value: "3#12#" }, "": { value: "0#" } },
              },
              delta: {},
              isAnswer: true,
            },
          ],
        },

        edgeCase2: {
          id: "edgeCase2",
          label: "All Empty",
          description: "List of empty strings — tests zero-length prefix handling",
          input: { strs: ["", "", ""] },
          expectedOutput: '["","",""]',
          commonMistake: "A delimiter-based approach with empty strings might produce extra empty strings on split, or collapse consecutive delimiters. Length prefix handles this cleanly: each empty string is just '0#'.",
          steps: [
            {
              stepId: 0,
              lineNumbers: [2, 3],
              shortLabel: "Start encoding",
              explanation: "We have 3 empty strings: [\"\", \"\", \"\"]. Each has length 0, so each will be encoded as \"0#\".",
              variables: { strs: '["","",""]', encoded: "" },
              dataStructure: {
                arrayStates: { 0: "default", 1: "default", 2: "default" },
                pointers: [],
                hashMap: {},
              },
              delta: {},
              isAnswer: false,
            },
            {
              stepId: 1,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Encode "" → "0#"',
              explanation: "First empty string has length 0. Append \"0#\". The '0' means the decoder will read 0 characters after '#'.",
              variables: { currentStr: "", length: 0, encoded: "0#" },
              dataStructure: {
                arrayStates: { 0: "active", 1: "default", 2: "default" },
                pointers: [{ name: "str", index: 0, color: "pointer" }],
                hashMap: { "str0": { value: "0#", isNew: true } },
              },
              delta: { changedIndices: [0] },
              isAnswer: false,
            },
            {
              stepId: 2,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Encode "" → append "0#"',
              explanation: "Second empty string. Append another \"0#\". Running encoded: \"0#0#\".",
              variables: { currentStr: "", length: 0, encoded: "0#0#" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "active", 2: "default" },
                pointers: [{ name: "str", index: 1, color: "pointer" }],
                hashMap: { "str0": { value: "0#" }, "str1": { value: "0#", isNew: true } },
              },
              delta: { changedIndices: [1] },
              isAnswer: false,
            },
            {
              stepId: 3,
              lineNumbers: [4, 5, 6],
              shortLabel: 'Encode "" → append "0#"',
              explanation: "Third empty string. Final encoded: \"0#0#0#\". Three \"0#\" segments, one per empty string.",
              variables: { currentStr: "", length: 0, encoded: "0#0#0#" },
              dataStructure: {
                arrayStates: { 0: "visited", 1: "visited", 2: "active" },
                pointers: [{ name: "str", index: 2, color: "pointer" }],
                hashMap: { "str0": { value: "0#" }, "str1": { value: "0#" }, "str2": { value: "0#", isNew: true } },
              },
              delta: { changedIndices: [2] },
              isAnswer: false,
            },
            {
              stepId: 4,
              lineNumbers: [11, 12, 13, 14, 15, 18, 19, 20, 21],
              shortLabel: 'Decode "0#0#0#"',
              explanation: "Decoding \"0#0#0#\": at i=0, '#' at j=1, len=0, extract \"\" (empty), i→2. At i=2, '#' at j=3, len=0, extract \"\", i→4. At i=4, '#' at j=5, len=0, extract \"\", i→6. Done.",
              variables: { encoded: "0#0#0#", result: '["","",""]' },
              dataStructure: {
                arrayStates: { 0: "found", 1: "found", 2: "found" },
                pointers: [],
                hashMap: { "str0": { value: "0#" }, "str1": { value: "0#" }, "str2": { value: "0#" } },
              },
              delta: { changedIndices: [0, 1, 2] },
              isAnswer: true,
            },
          ],
        },
      },

      computeSteps: function({ strs }) {
        const steps = [];
        const n = strs.length;

        // --- ENCODE PHASE ---
        steps.push({
          stepId: 0, lineNumbers: [2, 3],
          shortLabel: "Start encoding",
          explanation: `We have ${n} string${n !== 1 ? "s" : ""} to encode. For each, we prepend its length followed by '#'.`,
          variables: { strs: JSON.stringify(strs), encoded: "" },
          dataStructure: {
            arrayStates: Object.fromEntries(strs.map((_, i) => [i, "default"])),
            pointers: [],
            hashMap: {},
          },
          delta: {}, isAnswer: false,
        });

        let encoded = "";
        const hashMapState = {};
        for (let idx = 0; idx < n; idx++) {
          const s = strs[idx];
          const prefix = s.length + "#" + s;
          encoded += prefix;
          const key = s || `(empty${idx})`;
          hashMapState[key] = { value: s.length + "#" + s, isNew: true };

          steps.push({
            stepId: steps.length, lineNumbers: [4, 5, 6],
            shortLabel: `Encode "${s}" → "${s.length}#${s}"`,
            explanation: `String "${s}" has length ${s.length}. Append "${s.length}#${s}". Encoded so far: "${encoded}".`,
            variables: { currentStr: s, length: s.length, encoded },
            dataStructure: {
              arrayStates: Object.fromEntries(strs.map((_, i) => [i, i < idx ? "visited" : i === idx ? "active" : "default"])),
              pointers: [{ name: "str", index: idx, color: "pointer" }],
              hashMap: Object.fromEntries(Object.entries(hashMapState).map(([k, v]) => [k, { ...v, isNew: k === key }])),
            },
            delta: { changedIndices: [idx] }, isAnswer: false,
          });

          // Reset isNew for next iteration
          hashMapState[key] = { value: s.length + "#" + s };
        }

        // --- DECODE PHASE ---
        steps.push({
          stepId: steps.length, lineNumbers: [11, 12, 13],
          shortLabel: "Start decoding",
          explanation: `Decode "${encoded}". Set i=0. We'll read length prefixes and extract strings.`,
          variables: { encoded, i: 0, result: "[]" },
          dataStructure: {
            arrayStates: Object.fromEntries(strs.map((_, i) => [i, "default"])),
            pointers: [],
            hashMap: Object.fromEntries(Object.entries(hashMapState)),
          },
          delta: {}, isAnswer: false,
        });

        let i = 0;
        const result = [];
        let strIdx = 0;
        while (i < encoded.length) {
          let j = i;
          while (encoded[j] !== "#") j++;
          const len = parseInt(encoded.substring(i, j));
          const extracted = encoded.substring(j + 1, j + 1 + len);
          result.push(extracted);
          const nextI = j + 1 + len;

          const key = extracted || `(empty${strIdx})`;
          steps.push({
            stepId: steps.length, lineNumbers: [14, 15, 18, 19, 20, 21],
            shortLabel: `Decode: "${len}#" → "${extracted}"`,
            explanation: `At i=${i}, scan for '#' at j=${j}. Length=${len}. Extract s[${j + 1}..${j + 1 + len}) = "${extracted}". Move i to ${nextI}.`,
            variables: { i, j, length: len, extracted, result: JSON.stringify(result), nextI },
            dataStructure: {
              arrayStates: Object.fromEntries(strs.map((_, idx) => [idx, idx <= strIdx ? "found" : "default"])),
              pointers: [{ name: "i", index: strIdx, color: "pointer" }],
              hashMap: Object.fromEntries(Object.entries(hashMapState).map(([k, v]) => [k, { ...v, isHighlighted: k === key }])),
            },
            delta: { changedIndices: [strIdx] }, isAnswer: false,
          });

          i = nextI;
          strIdx++;
        }

        // Final step
        steps.push({
          stepId: steps.length, lineNumbers: [13, 23],
          shortLabel: "Done! All decoded",
          explanation: `Decoding complete. Result: ${JSON.stringify(result)}. Every string was recovered perfectly using the length-prefix approach.`,
          variables: { result: JSON.stringify(result) },
          dataStructure: {
            arrayStates: Object.fromEntries(strs.map((_, i) => [i, "found"])),
            pointers: [],
            hashMap: Object.fromEntries(Object.entries(hashMapState)),
          },
          delta: {}, isAnswer: true,
        });

        return steps;
      },
    },
  },

  complexity: {
    brute:   { time: "O(n * k)", space: "O(n * k)", explanation: "Join and split all strings; k is average string length" },
    optimal: { time: "O(n * k)", space: "O(n * k)", explanation: "Single pass encode, single pass decode; k is average string length", tradeoff: "Same time complexity as delimiter approach, but handles ALL possible string contents without ambiguity" },
  },

  interviewTips: [
    "Start by explaining why a simple delimiter doesn't work — show a failing example like [\"a,b\", \"c\"] with comma delimiter.",
    "Mention that escaping (e.g., escape all commas in strings) works but adds complexity and edge cases.",
    "Present the length-prefix idea as the clean solution: 'If I know exactly how many characters to read, I never need to scan for delimiters.'",
    "Walk through a tricky example with '#' inside a string to prove the encoding is unambiguous.",
    "Note that this is the same principle used in HTTP chunked transfer encoding and many network protocols.",
    "Clarify that the '#' separator between length and content is important — without it, '123abc' is ambiguous (is the length 1, 12, or 123?).",
  ],

  relatedProblems: ["group-anagrams", "valid-anagram"],
};

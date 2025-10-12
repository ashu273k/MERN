// DNA Sequence Palindromic Site Detector
// Biologists often analyze DNA to find palindromic sequences—segments that read the same forwards and backwards on the complementary strand. These regions can represent binding sites for restriction enzymes or structural hotspots in genetic material.

// You are tasked with implementing an API that identifies the longest palindromic substring in a given DNA sequence.

// Functional Requirements:
// POST /dna/palindrome
// Accepts a DNA sequence as input: { "sequence": "AAGCTTGAATTCAGCTT" }
// Return the longest palindromic substring: { "longestPalindrome": "GAATTC" }
// Rules & Constraints:
// Use a center expansion or dynamic programming algorithm — brute force (O(n³)) is not acceptable.
// Assume all characters are uppercase and valid DNA bases: A, C, G, T.
// Return the first longest palindrome if multiple exist with the same length.
// Must be implemented in Node.js using Express. No database.
// Write your code in src/api.js file only.
// Real-World Context:
// Palindromic sequences like "GAATTC" are often restriction sites (cutting locations for enzymes like EcoRI). Detecting them computationally is important in genomics.

const express = require("express");
const app = express();
app.use(express.json());

app.post("/dna/palindrome", (req, res) => {
  const s = req.body.sequence;
  if (!s) return res.status(400).json({ message: "Sequence is required" });

  let start = 0, end = 0;

  const expandAroundCenter = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return [left + 1, right - 1];
  };

  for (let i = 0; i < s.length; i++) {
    let [l1, r1] = expandAroundCenter(i, i);     // Odd-length palindrome
    let [l2, r2] = expandAroundCenter(i, i + 1); // Even-length palindrome

    if (r1 - l1 > end - start) {
      start = l1;
      end = r1;
    }
    if (r2 - l2 > end - start) {
      start = l2;
      end = r2;
    }
  }

  res.json({ longestPalindrome: s.slice(start, end + 1) });
});

module.exports = app;

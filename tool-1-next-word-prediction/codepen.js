// ============================================================
// DATA: Pre-computed prediction trees
// ============================================================
const DATA = [
  {
    id: "france",
    label: "The capital of France is",
    prefix: ["The", "capital", "of", "France", "is"],
    candidates: [
      { word: "Paris", probability: 0.89, next: [
        { word: ",", probability: 0.55, next: [
          { word: "which", probability: 0.62, next: [
            { word: "is", probability: 0.78, next: [
              { word: "known", probability: 0.65, next: [
                { word: "for", probability: 0.90, next: null }
              ]},
              { word: "home", probability: 0.18, next: [
                { word: "to", probability: 0.92, next: null }
              ]},
              { word: "one", probability: 0.10, next: null },
              { word: "famous", probability: 0.05, next: null },
              { word: "a", probability: 0.02, next: null }
            ]},
            { word: "has", probability: 0.12, next: null },
            { word: "attracts", probability: 0.06, next: null },
            { word: "was", probability: 0.03, next: null },
            { word: "remains", probability: 0.01, next: null }
          ]},
          { word: "a", probability: 0.20, next: [
            { word: "city", probability: 0.72, next: null },
            { word: "vibrant", probability: 0.14, next: null },
            { word: "beautiful", probability: 0.08, next: null },
            { word: "major", probability: 0.04, next: null },
            { word: "historic", probability: 0.02, next: null }
          ]},
          { word: "one", probability: 0.08, next: null },
          { word: "often", probability: 0.05, next: null },
          { word: "also", probability: 0.05, next: null }
        ]},
        { word: ".", probability: 0.30, next: null },
        { word: "—", probability: 0.08, next: null },
        { word: "and", probability: 0.05, next: null },
        { word: "which", probability: 0.02, next: null }
      ]},
      { word: "a", probability: 0.06, next: [
        { word: "beautiful", probability: 0.40, next: [
          { word: "city", probability: 0.75, next: null },
          { word: "and", probability: 0.12, next: null },
          { word: "place", probability: 0.08, next: null },
          { word: "European", probability: 0.03, next: null },
          { word: "historic", probability: 0.02, next: null }
        ]},
        { word: "city", probability: 0.30, next: null },
        { word: "major", probability: 0.15, next: null },
        { word: "well-known", probability: 0.10, next: null },
        { word: "globally", probability: 0.05, next: null }
      ]},
      { word: "known", probability: 0.03, next: [
        { word: "worldwide", probability: 0.45, next: null },
        { word: "as", probability: 0.35, next: null },
        { word: "to", probability: 0.12, next: null },
        { word: "for", probability: 0.05, next: null },
        { word: "by", probability: 0.03, next: null }
      ]},
      { word: "one", probability: 0.015, next: [
        { word: "of", probability: 0.85, next: null },
        { word: "that", probability: 0.08, next: null },
        { word: "city", probability: 0.04, next: null },
        { word: "word", probability: 0.02, next: null },
        { word: "place", probability: 0.01, next: null }
      ]},
      { word: "the", probability: 0.005, next: [
        { word: "most", probability: 0.50, next: null },
        { word: "city", probability: 0.25, next: null },
        { word: "heart", probability: 0.13, next: null },
        { word: "centre", probability: 0.08, next: null },
        { word: "jewel", probability: 0.04, next: null }
      ]}
    ]
  },
  {
    id: "story",
    label: "Once upon a time there was a",
    prefix: ["Once", "upon", "a", "time", "there", "was", "a"],
    candidates: [
      { word: "young", probability: 0.28, next: [
        { word: "girl", probability: 0.35, next: [
          { word: "who", probability: 0.72, next: null },
          { word: "named", probability: 0.15, next: null },
          { word: "with", probability: 0.08, next: null },
          { word: "living", probability: 0.03, next: null },
          { word: "from", probability: 0.02, next: null }
        ]},
        { word: "boy", probability: 0.30, next: null },
        { word: "prince", probability: 0.18, next: null },
        { word: "woman", probability: 0.10, next: null },
        { word: "man", probability: 0.07, next: null }
      ]},
      { word: "king", probability: 0.22, next: [
        { word: "who", probability: 0.55, next: null },
        { word: "named", probability: 0.18, next: null },
        { word: "with", probability: 0.12, next: null },
        { word: "ruling", probability: 0.08, next: null },
        { word: "in", probability: 0.07, next: null }
      ]},
      { word: "girl", probability: 0.18, next: [
        { word: "who", probability: 0.60, next: null },
        { word: "named", probability: 0.20, next: null },
        { word: "with", probability: 0.10, next: null },
        { word: "living", probability: 0.06, next: null },
        { word: "from", probability: 0.04, next: null }
      ]},
      { word: "little", probability: 0.17, next: [
        { word: "girl", probability: 0.30, next: null },
        { word: "boy", probability: 0.25, next: null },
        { word: "village", probability: 0.20, next: null },
        { word: "rabbit", probability: 0.15, next: null },
        { word: "mouse", probability: 0.10, next: null }
      ]},
      { word: "brave", probability: 0.15, next: [
        { word: "knight", probability: 0.40, next: null },
        { word: "warrior", probability: 0.25, next: null },
        { word: "young", probability: 0.18, next: null },
        { word: "princess", probability: 0.10, next: null },
        { word: "girl", probability: 0.07, next: null }
      ]}
    ]
  },
  {
    id: "learnai",
    label: "The best way to learn AI is",
    prefix: ["The", "best", "way", "to", "learn", "AI", "is"],
    candidates: [
      { word: "by", probability: 0.35, next: [
        { word: "doing", probability: 0.50, next: [
          { word: "—", probability: 0.40, next: null },
          { word: ".", probability: 0.30, next: null },
          { word: "it", probability: 0.15, next: null },
          { word: "projects", probability: 0.10, next: null },
          { word: "hands-on", probability: 0.05, next: null }
        ]},
        { word: "building", probability: 0.22, next: null },
        { word: "using", probability: 0.15, next: null },
        { word: "experimenting", probability: 0.08, next: null },
        { word: "starting", probability: 0.05, next: null }
      ]},
      { word: "to", probability: 0.30, next: [
        { word: "start", probability: 0.42, next: null },
        { word: "use", probability: 0.28, next: null },
        { word: "practice", probability: 0.15, next: null },
        { word: "experiment", probability: 0.10, next: null },
        { word: "build", probability: 0.05, next: null }
      ]},
      { word: "through", probability: 0.18, next: [
        { word: "hands-on", probability: 0.45, next: null },
        { word: "practice", probability: 0.30, next: null },
        { word: "real", probability: 0.13, next: null },
        { word: "projects", probability: 0.08, next: null },
        { word: "experimentation", probability: 0.04, next: null }
      ]},
      { word: "practice", probability: 0.10, next: [
        { word: ".", probability: 0.55, next: null },
        { word: "—", probability: 0.20, next: null },
        { word: ",", probability: 0.15, next: null },
        { word: "and", probability: 0.07, next: null },
        { word: "with", probability: 0.03, next: null }
      ]},
      { word: "a", probability: 0.07, next: [
        { word: "combination", probability: 0.35, next: null },
        { word: "hands-on", probability: 0.28, next: null },
        { word: "structured", probability: 0.20, next: null },
        { word: "practical", probability: 0.12, next: null },
        { word: "mix", probability: 0.05, next: null }
      ]}
    ]
  },
  {
    id: "email",
    label: "In a formal email you should",
    prefix: ["In", "a", "formal", "email", "you", "should"],
    candidates: [
      { word: "always", probability: 0.32, next: [
        { word: "use", probability: 0.40, next: [
          { word: "a", probability: 0.55, next: null },
          { word: "proper", probability: 0.22, next: null },
          { word: "clear", probability: 0.13, next: null },
          { word: "professional", probability: 0.07, next: null },
          { word: "appropriate", probability: 0.03, next: null }
        ]},
        { word: "include", probability: 0.25, next: null },
        { word: "begin", probability: 0.18, next: null },
        { word: "address", probability: 0.10, next: null },
        { word: "maintain", probability: 0.07, next: null }
      ]},
      { word: "use", probability: 0.25, next: [
        { word: "a", probability: 0.45, next: null },
        { word: "professional", probability: 0.25, next: null },
        { word: "clear", probability: 0.15, next: null },
        { word: "proper", probability: 0.10, next: null },
        { word: "polite", probability: 0.05, next: null }
      ]},
      { word: "begin", probability: 0.18, next: [
        { word: "with", probability: 0.70, next: null },
        { word: "by", probability: 0.20, next: null },
        { word: "your", probability: 0.05, next: null },
        { word: "the", probability: 0.03, next: null },
        { word: "using", probability: 0.02, next: null }
      ]},
      { word: "keep", probability: 0.15, next: [
        { word: "the", probability: 0.40, next: null },
        { word: "your", probability: 0.30, next: null },
        { word: "it", probability: 0.20, next: null },
        { word: "a", probability: 0.07, next: null },
        { word: "things", probability: 0.03, next: null }
      ]},
      { word: "avoid", probability: 0.10, next: [
        { word: "using", probability: 0.45, next: null },
        { word: "slang", probability: 0.25, next: null },
        { word: "informal", probability: 0.15, next: null },
        { word: "overly", probability: 0.10, next: null },
        { word: "casual", probability: 0.05, next: null }
      ]}
    ]
  },
  {
    id: "meaning",
    label: "The meaning of life is",
    prefix: ["The", "meaning", "of", "life", "is"],
    candidates: [
      { word: "a", probability: 0.24, next: [
        { word: "question", probability: 0.35, next: [
          { word: "that", probability: 0.65, next: null },
          { word: "philosophers", probability: 0.18, next: null },
          { word: "every", probability: 0.10, next: null },
          { word: "as", probability: 0.05, next: null },
          { word: "worth", probability: 0.02, next: null }
        ]},
        { word: "deeply", probability: 0.25, next: null },
        { word: "personal", probability: 0.20, next: null },
        { word: "topic", probability: 0.12, next: null },
        { word: "matter", probability: 0.08, next: null }
      ]},
      { word: "to", probability: 0.22, next: [
        { word: "find", probability: 0.35, next: null },
        { word: "live", probability: 0.25, next: null },
        { word: "love", probability: 0.18, next: null },
        { word: "create", probability: 0.12, next: null },
        { word: "serve", probability: 0.10, next: null }
      ]},
      { word: "different", probability: 0.18, next: [
        { word: "for", probability: 0.70, next: null },
        { word: "depending", probability: 0.15, next: null },
        { word: "things", probability: 0.08, next: null },
        { word: "across", probability: 0.05, next: null },
        { word: "—", probability: 0.02, next: null }
      ]},
      { word: "something", probability: 0.20, next: [
        { word: "that", probability: 0.40, next: null },
        { word: "each", probability: 0.25, next: null },
        { word: "deeply", probability: 0.18, next: null },
        { word: "personal", probability: 0.12, next: null },
        { word: "we", probability: 0.05, next: null }
      ]},
      { word: "subjective", probability: 0.16, next: [
        { word: "—", probability: 0.35, next: null },
        { word: ".", probability: 0.25, next: null },
        { word: ",", probability: 0.20, next: null },
        { word: "and", probability: 0.12, next: null },
        { word: "but", probability: 0.08, next: null }
      ]}
    ]
  },
  {
    id: "recipe",
    label: "My favourite recipe for",
    prefix: ["My", "favourite", "recipe", "for"],
    candidates: [
      { word: "chocolate", probability: 0.20, next: [
        { word: "cake", probability: 0.45, next: [
          { word: "is", probability: 0.60, next: null },
          { word: "involves", probability: 0.18, next: null },
          { word: "uses", probability: 0.12, next: null },
          { word: "requires", probability: 0.06, next: null },
          { word: "starts", probability: 0.04, next: null }
        ]},
        { word: "chip", probability: 0.30, next: null },
        { word: "brownies", probability: 0.13, next: null },
        { word: "mousse", probability: 0.08, next: null },
        { word: "cookies", probability: 0.04, next: null }
      ]},
      { word: "pasta", probability: 0.19, next: [
        { word: "is", probability: 0.50, next: null },
        { word: "involves", probability: 0.20, next: null },
        { word: "uses", probability: 0.15, next: null },
        { word: "starts", probability: 0.10, next: null },
        { word: "requires", probability: 0.05, next: null }
      ]},
      { word: "chicken", probability: 0.18, next: [
        { word: "is", probability: 0.40, next: null },
        { word: "involves", probability: 0.22, next: null },
        { word: "uses", probability: 0.18, next: null },
        { word: "stir-fry", probability: 0.12, next: null },
        { word: "soup", probability: 0.08, next: null }
      ]},
      { word: "a", probability: 0.22, next: [
        { word: "simple", probability: 0.35, next: null },
        { word: "quick", probability: 0.25, next: null },
        { word: "hearty", probability: 0.18, next: null },
        { word: "classic", probability: 0.14, next: null },
        { word: "homemade", probability: 0.08, next: null }
      ]},
      { word: "banana", probability: 0.21, next: [
        { word: "bread", probability: 0.65, next: null },
        { word: "pancakes", probability: 0.18, next: null },
        { word: "smoothie", probability: 0.10, next: null },
        { word: "cake", probability: 0.05, next: null },
        { word: "pudding", probability: 0.02, next: null }
      ]}
    ]
  }
];

// ============================================================
// STATE
// ============================================================
let currentDataIndex = 0;
let sentenceWords = [];
let currentNode = null;
let selectionCount = 0;
let lowProbSelected = false;
let highProbSelected = false;
let insightShown = { generic: false, creative: false, cumulative: false };

// ============================================================
// DOM REFS
// ============================================================
const sentenceDisplay = document.getElementById('sentenceDisplay');
const candidatesCard = document.getElementById('candidatesCard');
const insightEl = document.getElementById('insight');
const insightText = document.getElementById('insightText');
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const resetBtn = document.getElementById('resetBtn');
const explainer = document.getElementById('explainer');

// ============================================================
// EXPLAINER TOGGLE
// ============================================================
explainer.addEventListener('click', () => {
  explainer.classList.toggle('collapsed');
  explainer.setAttribute('aria-expanded', !explainer.classList.contains('collapsed'));
});
explainer.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); explainer.click(); }
});

// ============================================================
// DROPDOWN
// ============================================================
function buildDropdown() {
  dropdownMenu.innerHTML = '';
  DATA.forEach((d, i) => {
    const item = document.createElement('div');
    item.className = 'dropdown-item' + (i === currentDataIndex ? ' active' : '');
    item.textContent = '"' + d.label + '"';
    item.setAttribute('role', 'menuitem');
    item.tabIndex = 0;
    item.addEventListener('click', () => {
      currentDataIndex = i;
      closeDropdown();
      resetAll();
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); item.click(); }
    });
    dropdownMenu.appendChild(item);
  });
}

function toggleDropdown() {
  const open = dropdownMenu.classList.toggle('open');
  dropdownBtn.setAttribute('aria-expanded', open);
}
function closeDropdown() {
  dropdownMenu.classList.remove('open');
  dropdownBtn.setAttribute('aria-expanded', 'false');
}

dropdownBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleDropdown(); });
document.addEventListener('click', closeDropdown);

// ============================================================
// RENDER
// ============================================================
function renderSentence() {
  sentenceDisplay.innerHTML = '';
  sentenceWords.forEach((w, i) => {
    const span = document.createElement('span');
    span.className = 'sentence-word';
    span.textContent = w + '\u00A0';
    if (i >= DATA[currentDataIndex].prefix.length) {
      if (i === sentenceWords.length - 1) {
        span.classList.add('new');
        setTimeout(() => span.classList.remove('new'), 600);
      }
    }
    sentenceDisplay.appendChild(span);
  });
  const cursor = document.createElement('span');
  cursor.className = 'cursor-blink';
  cursor.setAttribute('aria-hidden', 'true');
  sentenceDisplay.appendChild(cursor);
}

function renderCandidates(candidates) {
  candidatesCard.innerHTML = '';
  if (!candidates || candidates.length === 0) {
    const end = document.createElement('div');
    end.style.cssText = 'padding:16px 24px;color:var(--muted);font-size:0.9rem;';
    end.textContent = 'End of prediction tree reached. Try another sentence or reset.';
    candidatesCard.appendChild(end);
    return;
  }
  candidates.forEach((c, i) => {
    const row = document.createElement('div');
    row.className = 'candidate-row';
    row.setAttribute('role', 'listitem');
    row.tabIndex = 0;
    row.innerHTML = `
      <span class="candidate-word">${escapeHtml(c.word)}</span>
      <div class="candidate-bar-track"><div class="candidate-bar" data-prob="${c.probability}"></div></div>
      <span class="candidate-prob">${(c.probability * 100).toFixed(c.probability < 0.01 ? 1 : 0)}%</span>
      <span class="candidate-arrow" aria-hidden="true">&#8592;</span>
    `;
    row.addEventListener('click', () => selectWord(c));
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectWord(c); }
    });
    candidatesCard.appendChild(row);
    setTimeout(() => {
      row.classList.add('visible');
      row.querySelector('.candidate-bar').style.width = (c.probability * 100) + '%';
    }, 50 + i * 50);
  });
}

function selectWord(candidate) {
  selectionCount++;
  sentenceWords.push(candidate.word);

  if (candidate.probability >= 0.5) highProbSelected = true;
  if (candidate.probability < 0.15) lowProbSelected = true;

  renderSentence();

  if (candidate.next) {
    renderCandidates(candidate.next);
  } else {
    renderCandidates(null);
  }

  showContextualInsight(candidate);
}

function showContextualInsight(candidate) {
  if (selectionCount >= 5 && !insightShown.cumulative) {
    insightShown.cumulative = true;
    showInsight("Every word you see was chosen this way \u2014 one at a time. An entire paragraph, an entire essay, is built through thousands of these tiny predictions.");
  } else if (candidate.probability >= 0.5 && !insightShown.generic && selectionCount <= 3) {
    insightShown.generic = true;
    showInsight("The model picked the most common pattern. This is why AI output can feel generic \u2014 it defaults to what\u2019s statistically safest.");
  } else if (candidate.probability < 0.15 && !insightShown.creative) {
    insightShown.creative = true;
    showInsight("You chose an unusual path. When the model picks less probable words, the output becomes more creative \u2014 but also less predictable. This is what the \u2018temperature\u2019 setting controls.");
  }
}

function showInsight(text) {
  insightText.textContent = text;
  insightEl.classList.remove('visible');
  void insightEl.offsetWidth;
  insightEl.classList.add('visible');
}

function hideInsight() {
  insightEl.classList.remove('visible');
}

function resetAll() {
  const data = DATA[currentDataIndex];
  sentenceWords = [...data.prefix];
  currentNode = data;
  selectionCount = 0;
  lowProbSelected = false;
  highProbSelected = false;
  insightShown = { generic: false, creative: false, cumulative: false };
  hideInsight();
  renderSentence();
  renderCandidates(data.candidates);
  buildDropdown();
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

// ============================================================
// RESET & INIT
// ============================================================
resetBtn.addEventListener('click', resetAll);
buildDropdown();
resetAll();

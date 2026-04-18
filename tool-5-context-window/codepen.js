const SCRIPT = [
  { role: 'user', text: 'My name is Victor and I run a company called AI Tutorium. We teach professionals to use AI.', tokens: 4 },
  { role: 'ai', text: "Nice to meet you, Victor! Tell me more about what you'd like help with.", tokens: 3 },
  { role: 'user', text: 'I need to write a blog post about prompt engineering for non-technical professionals.', tokens: 3 },
  { role: 'ai', text: "Great topic! Here are some angles we could explore: the gap between vague prompts and structured ones, common mistakes, practical frameworks...", tokens: 5 },
  { role: 'user', text: 'I like the frameworks angle. My audience is mainly marketers and educators.', tokens: 3 },
  { role: 'ai', text: "Perfect. For marketers and educators, I'd suggest focusing on workflow-specific examples — things they'd actually do at their desks...", tokens: 5 },
  { role: 'user', text: "This is really helpful. Can you remind me — what did I say my company is called?", tokens: 3 },
  { role: 'ai', text: "I don't have that information in our current conversation. Could you tell me?", tokens: 3 }
];

let windowSize = 20;
let messages = [];
let totalTokens = 0;
let autoPlaying = false;
let autoTimeout = null;
let scriptIndex = 0;
let insightShown = { fade: false, gotcha: false, model: false, tip: false };

const chatArea = document.getElementById('chatArea');
const usageLost = document.getElementById('usageLost');
const usageVisible = document.getElementById('usageVisible');
const usageText = document.getElementById('usageText');
const usageFree = document.getElementById('usageFree');
const windowSizeEl = document.getElementById('windowSize');
const modelSelect = document.getElementById('modelSelect');
const autoBtn = document.getElementById('autoBtn');
const resetBtn = document.getElementById('resetBtn');
const insightEl = document.getElementById('insight');
const insightTextEl = document.getElementById('insightText');
const explainer = document.getElementById('explainer');

function addMessage(role, text, tokens) {
  messages.push({ role, text, tokens });
  totalTokens += tokens;
  renderChat();
  chatArea.scrollTop = chatArea.scrollHeight;
}

function renderChat() {
  const lostTokens = Math.max(0, totalTokens - windowSize);
  let accumulated = 0;

  chatArea.innerHTML = '';
  let windowEdgeInserted = false;

  messages.forEach((m, i) => {
    const msgEnd = accumulated + m.tokens;
    const isLost = msgEnd <= lostTokens;
    const isFading = !isLost && accumulated < lostTokens;

    // Insert window edge
    if (!windowEdgeInserted && !isLost && accumulated >= lostTokens) {
      if (lostTokens > 0) {
        const edge = document.createElement('div');
        edge.className = 'window-edge';
        edge.innerHTML = '<span class="window-edge-label">&#9473; window edge &#9473;</span>';
        chatArea.appendChild(edge);
      }
      windowEdgeInserted = true;
    }

    const div = document.createElement('div');
    div.className = 'msg ' + (m.role === 'user' ? 'user-msg' : 'ai-msg');
    if (isLost) div.classList.add('faded');
    else if (isFading) div.classList.add('fading');

    div.innerHTML = '<div class="msg-avatar ' + m.role + '">' + (m.role === 'user' ? 'V' : 'AI') + '</div>' +
      '<div class="msg-bubble"><div class="msg-sender">' + (m.role === 'user' ? 'You' : 'AI') + '</div>' + escapeHtml(m.text) + '</div>';
    chatArea.appendChild(div);
    accumulated = msgEnd;
  });

  // Usage bar
  const visibleTokens = Math.min(totalTokens, windowSize);
  const freeTokens = Math.max(0, windowSize - totalTokens);
  const lostPct = (lostTokens / windowSize) * 100;
  const visPct = (visibleTokens / windowSize) * 100;

  usageLost.style.width = Math.min(lostPct, 100) + '%';
  usageVisible.style.width = Math.min(visPct - lostPct, 100) + '%';
  usageText.textContent = Math.min(totalTokens, windowSize) + ' / ' + windowSize + ' tokens';
  usageFree.textContent = Math.max(freeTokens, 0) + ' free';

  // Insights
  if (lostTokens > 0 && !insightShown.fade) {
    insightShown.fade = true;
    showInsight("Messages are leaving the AI's memory. Everything above the dotted line is invisible to the model now.");
  }
  if (scriptIndex >= SCRIPT.length && !insightShown.gotcha) {
    insightShown.gotcha = true;
    showInsight("The AI \u2018forgot\u2019 Victor's company name \u2014 not because it made an error, but because that message slid out of the context window. This is why AI sometimes asks you to repeat things in long conversations.");
  }
}

function typeMessage(role, text, tokens, callback) {
  const m = { role, text: '', tokens };
  messages.push(m);
  let i = 0;
  function tick() {
    if (i <= text.length) {
      m.text = text.slice(0, i);
      renderChat();
      chatArea.scrollTop = chatArea.scrollHeight;
      i++;
      setTimeout(tick, 20);
    } else {
      totalTokens += tokens;
      renderChat();
      if (callback) callback();
    }
  }
  tick();
}

function autoPlay() {
  if (scriptIndex >= SCRIPT.length) {
    autoPlaying = false;
    autoBtn.textContent = 'Auto-play conversation \u25B6';
    autoBtn.disabled = true;
    return;
  }
  const s = SCRIPT[scriptIndex];
  scriptIndex++;
  typeMessage(s.role, s.text, s.tokens, () => {
    autoTimeout = setTimeout(autoPlay, 1500);
  });
}

autoBtn.addEventListener('click', () => {
  if (autoPlaying) {
    autoPlaying = false;
    clearTimeout(autoTimeout);
    autoBtn.textContent = 'Auto-play conversation \u25B6';
  } else {
    autoPlaying = true;
    autoBtn.textContent = 'Pause \u23F8';
    autoPlay();
  }
});

modelSelect.addEventListener('change', () => {
  windowSize = parseInt(modelSelect.value);
  windowSizeEl.textContent = windowSize;
  if (!insightShown.model) {
    insightShown.model = true;
    showInsight("A bigger context window means the AI can hold more of your conversation \u2014 but every model has a limit. For long documents, this is why you might need to break them into sections.");
  }
  renderChat();
});

function showInsight(text) {
  insightTextEl.textContent = text;
  insightEl.classList.remove('visible');
  void insightEl.offsetWidth;
  insightEl.classList.add('visible');
}

function escapeHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

explainer.addEventListener('click', () => { explainer.classList.toggle('collapsed'); });

resetBtn.addEventListener('click', () => {
  clearTimeout(autoTimeout);
  autoPlaying = false;
  autoBtn.textContent = 'Auto-play conversation \u25B6';
  autoBtn.disabled = false;
  messages = [];
  totalTokens = 0;
  scriptIndex = 0;
  insightShown = { fade: false, gotcha: false, model: false, tip: false };
  insightEl.classList.remove('visible');
  renderChat();
});

renderChat();

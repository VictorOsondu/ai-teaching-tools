(function() {
  'use strict';

  // ── Tokeniser vocabulary ──────────────────────────────────
  const WHOLE_WORDS = new Set([
    'i','a','the','is','am','are','was','were','be','been','being',
    'have','has','had','do','does','did','will','would','could','should',
    'shall','may','might','can','must','need','dare',
    'and','or','but','if','then','else','when','while','for','to','from',
    'in','on','at','by','with','about','of','up','out','off','over',
    'into','onto','upon','after','before','between','through','during',
    'without','within','along','across','behind','beyond','until',
    'not','no','nor','so','yet','both','each','few','more','most',
    'other','some','such','than','too','very','just','also',
    'it','he','she','we','they','me','him','her','us','them',
    'my','your','his','its','our','their','mine','yours','ours','theirs',
    'this','that','these','those','what','which','who','whom','whose',
    'where','here','there','how','why','all','any','every','no',
    'one','two','three','four','five','six','seven','eight','nine','ten',
    'new','old','good','bad','big','small','great','little','long','short',
    'high','low','right','left','first','last','next','own','same',
    'able','much','many','well','still','back','even','now',
    'get','got','make','made','go','went','come','came','take','took',
    'see','saw','know','knew','think','say','said','tell','told',
    'give','gave','find','found','want','let','put','set','run','ran',
    'keep','kept','help','turn','start','show','hear','heard','play',
    'move','live','believe','happen','work','write','read','learn',
    'try','ask','use','look','feel','felt','leave','left','call',
    'world','hello','day','time','year','way','man','woman','life',
    'hand','part','place','case','week','head','end','side','team',
    'word','fact','eye','water','point','house','page','night',
    'report','data','text','code','file','name','type','line',
    'cost','price','plan','rate','test','note','list','form',
    'write','email','send','open','close','save','load','view',
    'quarterly','monthly','weekly','daily','annual','sustainability',
    'about','people','because','different','between','important',
    'another','company','system','program','question','during',
    'country','school','number','really','almost','around',
    'again','already','always','example','family','government',
    'information','possible','business','together','market',
    'nothing','service','enough','several','against','history',
    'morning','anything','power','human','process','student',
    'however','second','something','continue','research','change',
    'money','follow','problem','social','often','support',
    'young','using','working','interest','order','million',
    'actually','remember','probably','moment','reason','early',
    'morning','table','though','state','level','local',
    'everything','art','experience','per','target','targets',
  ]);

  const SUFFIXES = [
    'ization','isation','fulness','ousness','ibility','ability',
    'ement','ment','ness','tion','sion','ence','ance','ling',
    'ious','eous','ible','able','ical','ful','less','ness',
    'ment','ting','ring','ning','ding','king','ping','sing',
    'ated','ized','ised','ling','ally','ously','ively',
    'ing','ity','ous','ive','ure','ent','ant','ist','ism',
    'ful','dom','ship','ward','wise','like',
    'tion','age','ery','ary','ory','ess',
    'ed','er','en','ly','al','ty','le','ry','ny',
  ];

  const PREFIXES = [
    'trans','super','inter','under','over','multi','counter',
    'auto','anti','semi','micro','macro','mega','ultra',
    'fore','mis','non','self',
    'un','re','pre','dis','out','sub',
  ];

  function tokeniseWord(word) {
    if (!word) return [];
    if (WHOLE_WORDS.has(word.toLowerCase())) return [{ text: word, isWholeWord: true }];

    const lower = word.toLowerCase();
    let bestSplit = null;

    for (const prefix of PREFIXES) {
      if (lower.startsWith(prefix) && lower.length > prefix.length + 1) {
        const rest = word.slice(prefix.length);
        const restTokens = tokeniseRemainder(rest);
        if (restTokens) {
          bestSplit = [{ text: word.slice(0, prefix.length), isWholeWord: false }, ...restTokens];
          break;
        }
      }
    }
    if (bestSplit) return bestSplit;

    for (const suffix of SUFFIXES) {
      if (lower.endsWith(suffix) && lower.length > suffix.length + 1) {
        const stemLen = word.length - suffix.length;
        const stem = word.slice(0, stemLen);
        const suf = word.slice(stemLen);
        if (stem.length >= 2) return [{ text: stem, isWholeWord: false }, { text: suf, isWholeWord: false }];
      }
    }

    if (word.length <= 5) return [{ text: word, isWholeWord: true }];
    return chunkWord(word);
  }

  function tokeniseRemainder(word) {
    if (WHOLE_WORDS.has(word.toLowerCase())) return [{ text: word, isWholeWord: true }];
    const lower = word.toLowerCase();
    for (const suffix of SUFFIXES) {
      if (lower.endsWith(suffix) && lower.length > suffix.length + 1) {
        const stemLen = word.length - suffix.length;
        const stem = word.slice(0, stemLen);
        const suf = word.slice(stemLen);
        if (stem.length >= 2) return [{ text: stem, isWholeWord: false }, { text: suf, isWholeWord: false }];
      }
    }
    if (word.length <= 5) return [{ text: word, isWholeWord: false }];
    return chunkWord(word);
  }

  function chunkWord(word) {
    const tokens = [];
    let i = 0;
    while (i < word.length) {
      const size = Math.min(4, word.length - i);
      tokens.push({ text: word.slice(i, i + size), isWholeWord: false });
      i += size;
    }
    return tokens;
  }

  function tokeniseNonAscii(word) {
    const tokens = [];
    for (const ch of word) {
      const code = ch.codePointAt(0);
      const count = code > 0xFFFF ? 3 : code > 0x7F ? 2 : 1;
      if (count === 1) {
        tokens.push({ text: ch, isWholeWord: true });
      } else {
        tokens.push({ text: ch, isWholeWord: false });
        for (let b = 1; b < count; b++) {
          const byteHex = ((code >> (8 * (count - 1 - b))) & 0xFF).toString(16).padStart(2, '0');
          tokens.push({ text: '0x' + byteHex, isWholeWord: false });
        }
      }
    }
    return tokens;
  }

  function tokenise(text) {
    if (!text.trim()) return [];
    const segments = [];
    let current = '';
    let isNonAscii = false;

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const code = ch.codePointAt(0);
      if (/\s/.test(ch)) {
        if (current) { segments.push({ text: current, nonAscii: isNonAscii }); current = ''; isNonAscii = false; }
        continue;
      }
      if (/[.,!?;:'"()\[\]{}<>@#$%^&*+=\-_/\\|~`]/.test(ch) || ch === '\u00A3') {
        if (current) { segments.push({ text: current, nonAscii: isNonAscii }); current = ''; isNonAscii = false; }
        segments.push({ text: ch, nonAscii: false, isPunct: true });
        continue;
      }
      const isDigit = /\d/.test(ch);
      const prevIsDigit = current.length > 0 && /\d/.test(current[current.length - 1]);
      if (current.length > 0 && isDigit !== prevIsDigit) {
        segments.push({ text: current, nonAscii: isNonAscii }); current = ''; isNonAscii = false;
      }
      if (code > 127) isNonAscii = true;
      current += ch;
    }
    if (current) segments.push({ text: current, nonAscii: isNonAscii });

    const allTokens = [];
    let tokenId = 0;

    for (const seg of segments) {
      if (seg.isPunct) {
        allTokens.push({ id: tokenId++, text: seg.text, isWholeWord: true, wordGroup: null, charCount: seg.text.length });
        continue;
      }
      if (/^\d+$/.test(seg.text)) {
        const chunks = seg.text.match(/.{1,3}/g) || [];
        for (const chunk of chunks) {
          allTokens.push({ id: tokenId++, text: chunk, isWholeWord: chunks.length === 1, wordGroup: chunks.length > 1 ? seg.text : null, charCount: chunk.length });
        }
        continue;
      }
      if (seg.nonAscii) {
        const parts = tokeniseNonAscii(seg.text);
        for (const part of parts) {
          allTokens.push({ id: tokenId++, text: part.text, isWholeWord: part.isWholeWord, wordGroup: parts.length > 1 ? seg.text : null, charCount: part.text.length });
        }
        continue;
      }
      const parts = tokeniseWord(seg.text);
      for (const part of parts) {
        allTokens.push({ id: tokenId++, text: part.text, isWholeWord: part.isWholeWord || parts.length === 1, wordGroup: parts.length > 1 ? seg.text : null, charCount: part.text.length });
      }
    }
    return allTokens;
  }

  // ── DOM ─────────────────────────────────────────────────
  const textInput = document.getElementById('textInput');
  const tokenDisplay = document.getElementById('tokenDisplay');
  const wordCountEl = document.getElementById('wordCount');
  const tokenCountEl = document.getElementById('tokenCount');
  const ratioEl = document.getElementById('ratioValue');
  const contextPctEl = document.getElementById('contextPct');
  const contextFillEl = document.getElementById('contextFill');
  const costEl = document.getElementById('costValue');
  const insightArea = document.getElementById('insightArea');
  const explainer = document.getElementById('explainer');
  const explainerToggle = document.getElementById('explainerToggle');
  const examplesBtn = document.getElementById('examplesBtn');
  const examplesMenu = document.getElementById('examplesMenu');
  const resetBtn = document.getElementById('resetBtn');

  const DEFAULT_TEXT = 'I need to write a quarterly report for my team about our sustainability targets.';
  const CONTEXT_WINDOW = 200000;
  const COST_PER_1K = 0.01;

  const shownInsights = new Set();

  // ── Explainer toggle ───────────────────────────────────
  explainerToggle.addEventListener('click', () => {
    const expanded = !explainer.classList.contains('collapsed');
    explainer.classList.toggle('collapsed');
    explainerToggle.setAttribute('aria-expanded', !expanded);
  });

  // ── Examples dropdown ──────────────────────────────────
  examplesBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = examplesMenu.classList.toggle('open');
    examplesBtn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', () => {
    examplesMenu.classList.remove('open');
    examplesBtn.setAttribute('aria-expanded', 'false');
  });
  examplesMenu.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      textInput.value = btn.dataset.text;
      examplesMenu.classList.remove('open');
      examplesBtn.setAttribute('aria-expanded', 'false');
      update();
    });
  });

  // ── Reset ──────────────────────────────────────────────
  resetBtn.addEventListener('click', () => {
    textInput.value = DEFAULT_TEXT;
    shownInsights.clear();
    update();
    textInput.focus();
  });

  // ── Animated counter ───────────────────────────────────
  function animateCounter(el, target, suffix) {
    const current = parseFloat(el.textContent) || 0;
    if (current === target) { el.textContent = suffix ? target + suffix : target; return; }
    const start = performance.now();
    const duration = 300;
    const diff = target - current;
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const val = current + diff * ease;
      el.textContent = suffix === 'x' ? val.toFixed(1) + 'x' : Math.round(val) + (suffix || '');
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ── Show insight ───────────────────────────────────────
  function showInsight(key, message) {
    if (shownInsights.has(key)) return;
    shownInsights.add(key);
    insightArea.innerHTML = '<div class="insight">' + message + '</div>';
    setTimeout(() => {
      if (shownInsights.has(key) && insightArea.querySelector('.insight')) insightArea.innerHTML = '';
    }, 12000);
  }

  // ── Render tokens ──────────────────────────────────────
  function renderTokens(tokens) {
    tokenDisplay.innerHTML = '';
    let i = 0;
    while (i < tokens.length) {
      const token = tokens[i];
      if (token.wordGroup) {
        const groupWord = token.wordGroup;
        const group = document.createElement('span');
        group.className = 'word-group';
        group.setAttribute('role', 'group');
        group.setAttribute('aria-label', 'Word "' + groupWord + '" split into fragments');
        let j = i;
        let first = true;
        while (j < tokens.length && tokens[j].wordGroup === groupWord) {
          if (!first) {
            const connector = document.createElement('span');
            connector.className = 'split-connector';
            connector.setAttribute('aria-hidden', 'true');
            group.appendChild(connector);
          }
          group.appendChild(createTokenPill(tokens[j], j));
          first = false;
          j++;
        }
        tokenDisplay.appendChild(group);
        i = j;
      } else {
        tokenDisplay.appendChild(createTokenPill(token, i));
        i++;
      }
    }
  }

  function createTokenPill(token, index) {
    const colorIndex = index % 6;
    const pill = document.createElement('span');
    pill.className = 'token-pill token-c' + colorIndex;
    pill.setAttribute('tabindex', '0');
    pill.setAttribute('role', 'button');
    pill.setAttribute('aria-label', 'Token: ' + token.text);
    pill.style.animationDelay = (index * 30) + 'ms';
    pill.textContent = token.text;
    const tooltip = document.createElement('span');
    tooltip.className = 'token-tooltip';
    tooltip.innerHTML = '<div class="tt-row"><span class="tt-label">Token ID</span><span class="tt-value">' + token.id + '</span></div>' +
      '<div class="tt-row"><span class="tt-label">Characters</span><span class="tt-value">' + token.charCount + '</span></div>' +
      '<div class="tt-row"><span class="tt-label">Type</span><span class="tt-value">' + (token.isWholeWord ? 'Complete word' : 'Fragment') + '</span></div>';
    pill.appendChild(tooltip);
    return pill;
  }

  // ── Main update ────────────────────────────────────────
  function update() {
    const text = textInput.value;
    const tokens = tokenise(text);
    renderTokens(tokens);
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const tokenCount = tokens.length;
    const ratio = wordCount > 0 ? tokenCount / wordCount : 0;
    const pct = tokenCount / CONTEXT_WINDOW * 100;
    const cost = tokenCount / 1000 * COST_PER_1K;

    animateCounter(wordCountEl, wordCount, '');
    animateCounter(tokenCountEl, tokenCount, '');
    animateCounter(ratioEl, Math.round(ratio * 10) / 10, 'x');
    contextPctEl.textContent = pct < 0.001 && tokenCount > 0 ? '< 0.001%' : pct.toFixed(3) + '%';
    contextFillEl.style.width = Math.max(pct, tokenCount > 0 ? 0.3 : 0) + '%';
    if (cost < 0.001 && tokenCount > 0) { costEl.innerHTML = '&lt; &pound;0.001'; }
    else { costEl.textContent = '\u00A3' + cost.toFixed(3); }

    const hasSplitWords = tokens.some(t => t.wordGroup);
    const hasNonAscii = /[^\x00-\x7F]/.test(text);

    if (tokenCount > 0 && hasSplitWords) {
      const splitWord = tokens.find(t => t.wordGroup);
      if (splitWord) {
        const group = splitWord.wordGroup;
        const fragments = tokens.filter(t => t.wordGroup === group).map(t => t.text);
        showInsight('split', 'Notice how "' + group + '" becomes ' + fragments.length + ' tokens \u2014 ' + fragments.map(f => '"' + f + '"').join(' and ') + '. The AI processes these as separate pieces.');
      }
    }
    if (hasNonAscii && tokenCount > 0) {
      showInsight('nonascii', 'Non-English text often uses 2\u20134x more tokens for the same meaning. This means it costs more and fills the context window faster.');
    }
    if (tokenCount > 10 && !shownInsights.has('stats')) {
      showInsight('stats', 'A 10-page report is roughly 7,500 tokens. Claude can hold about 26 of those reports in a single conversation.');
    }
    if (tokenCount > 0 && ratio > 1.2 && !shownInsights.has('cost')) {
      showInsight('cost', 'Every token costs money on API-priced tools. Writing a concise prompt isn\'t just clearer \u2014 it\'s cheaper.');
    }
  }

  // ── Debounced input ────────────────────────────────────
  let debounceTimer;
  textInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(update, 150);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      examplesMenu.classList.remove('open');
      examplesBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // ── Init ───────────────────────────────────────────────
  update();
})();

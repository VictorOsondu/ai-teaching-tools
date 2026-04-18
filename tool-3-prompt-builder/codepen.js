const EXAMPLES = [
  { name: "Email drafting", context: "I am a marketing manager at a mid-size tech company.", task: "Draft a 150-word email to my team announcing the project deadline has moved from 15 March to 1 April.", format: "Use bullet points for key information. Keep it under 150 words.", constraints: "Tone: direct but reassuring. Mention that the extra time allows us to finish user testing properly." },
  { name: "Report summarising", context: "I am a senior analyst presenting to the executive board.", task: "Summarise this 20-page quarterly report into a one-page executive brief.", format: "Three sections: Key Results, Challenges, Recommendations. Use bullet points.", constraints: "Focus on numbers and outcomes. Avoid technical jargon. Highlight anything that changed versus last quarter." },
  { name: "Meeting preparation", context: "I am a product manager about to join a stakeholder meeting.", task: "Create a meeting agenda and talking points for a 30-minute product review.", format: "Structured agenda with time allocations. 2-3 talking points per section.", constraints: "Focus on decisions that need to be made, not status updates. Include one slide recommendation per topic." },
  { name: "Social media post", context: "I manage social media for a sustainable fashion brand targeting millennials.", task: "Write a LinkedIn post announcing our new recycled materials collection.", format: "Under 200 words. Include a hook in the first line. End with a call to action.", constraints: "Avoid greenwashing language. Be specific about the materials. Tone: authentic and enthusiastic, not salesy." },
  { name: "Job description review", context: "I am a hiring manager recruiting for a senior engineering role.", task: "Review and improve this job description to attract more diverse candidates.", format: "Return the improved version with changes highlighted. Add a summary of what you changed and why.", constraints: "Remove unnecessarily gendered language. Focus on outcomes over years of experience. Keep technical requirements realistic." }
];

const fields = { fContext: document.getElementById('fContext'), fTask: document.getElementById('fTask'), fFormat: document.getElementById('fFormat'), fConstraints: document.getElementById('fConstraints') };
const preview = document.getElementById('preview');
const cBar = document.getElementById('cBar');
const cMsg = document.getElementById('cMsg');
const checks = document.querySelectorAll('.check-item');
const copyBtn = document.getElementById('copyBtn');
const baGood = document.getElementById('baGood');
const insightEl = document.getElementById('insight');
const insightText = document.getElementById('insightText');
const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const resetBtn = document.getElementById('resetBtn');
const explainer = document.getElementById('explainer');

let insightShown = { first: false, complete: false };

function assemble() {
  const ctx = fields.fContext.value.trim();
  const task = fields.fTask.value.trim();
  const fmt = fields.fFormat.value.trim();
  const con = fields.fConstraints.value.trim();
  const parts = [];
  if (ctx) parts.push(ctx.endsWith('.') ? ctx : ctx + '.');
  if (task) parts.push(task.endsWith('.') ? task : task + '.');
  if (fmt) parts.push(fmt.endsWith('.') ? fmt : fmt + '.');
  if (con) parts.push(con.endsWith('.') ? con : con + '.');
  return parts.join(' ');
}

function update() {
  const assembled = assemble();
  const filled = Object.values(fields).filter(f => f.value.trim().length > 0).length;

  // Preview
  if (assembled) {
    preview.textContent = assembled;
    preview.classList.remove('empty');
  } else {
    preview.textContent = 'Start typing to build your prompt...';
    preview.classList.add('empty');
  }

  // Completeness
  const pct = (filled / 4) * 100;
  cBar.style.width = pct + '%';
  const colors = ['#888', '#ef4444', '#f0a500', '#f0a500', '#00d4aa'];
  cBar.style.background = colors[filled];

  checks.forEach(c => {
    const fId = c.dataset.field;
    const done = fields[fId].value.trim().length > 0;
    c.classList.toggle('done', done);
    c.querySelector('.check-icon').innerHTML = done ? '&#10003;' : '&#9675;';
  });

  const msgs = [
    'Start by telling the AI who you are',
    'Getting better \u2014 add the remaining parts for stronger results',
    'Getting better \u2014 add the remaining parts for stronger results',
    'Almost there \u2014 adding the last part will make this much sharper',
    'This prompt has everything the AI needs. Ready to use.'
  ];
  cMsg.textContent = msgs[filled];

  // Before/After
  baGood.textContent = assembled ? '\u2713 ' + assembled : '\u2713 Your assembled prompt will appear here';
  if (filled === 4) { baGood.classList.add('pulse'); setTimeout(() => baGood.classList.remove('pulse'), 1000); }

  // Copy button
  copyBtn.disabled = !assembled;
  copyBtn.textContent = 'Copy prompt';
  copyBtn.classList.remove('copied');

  // Insights
  if (filled === 1 && !insightShown.first) {
    insightShown.first = true;
    showInsight('Even adding just your role changes the output dramatically. Context shapes everything.');
  }
  if (filled === 4 && !insightShown.complete) {
    insightShown.complete = true;
    showInsight('This took about 30 seconds longer than a vague prompt. It will save you several minutes of editing the output.');
  }
}

function showInsight(text) {
  insightText.textContent = text;
  insightEl.classList.remove('visible');
  void insightEl.offsetWidth;
  insightEl.classList.add('visible');
}

// Events
Object.values(fields).forEach(f => f.addEventListener('input', update));

copyBtn.addEventListener('click', () => {
  const text = assemble();
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => { copyBtn.textContent = 'Copy prompt'; copyBtn.classList.remove('copied'); }, 2000);
  });
});

explainer.addEventListener('click', () => {
  explainer.classList.toggle('collapsed');
  explainer.setAttribute('aria-expanded', !explainer.classList.contains('collapsed'));
});

// Dropdown
EXAMPLES.forEach(ex => {
  const item = document.createElement('div');
  item.className = 'dropdown-item';
  item.textContent = ex.name;
  item.setAttribute('role', 'menuitem');
  item.tabIndex = 0;
  item.addEventListener('click', () => {
    // Typewriter fill
    closeDropdown();
    const pairs = [['fContext', ex.context], ['fTask', ex.task], ['fFormat', ex.format], ['fConstraints', ex.constraints]];
    let delay = 0;
    pairs.forEach(([id, text]) => {
      const el = fields[id];
      el.value = '';
      for (let i = 0; i < text.length; i++) {
        setTimeout(() => { el.value = text.slice(0, i + 1); update(); }, delay + i * 20);
      }
      delay += text.length * 20 + 100;
    });
  });
  dropdownMenu.appendChild(item);
});

dropdownBtn.addEventListener('click', (e) => { e.stopPropagation(); dropdownMenu.classList.toggle('open'); });
document.addEventListener('click', closeDropdown);
function closeDropdown() { dropdownMenu.classList.remove('open'); }

resetBtn.addEventListener('click', () => {
  Object.values(fields).forEach(f => f.value = '');
  insightShown = { first: false, complete: false };
  insightEl.classList.remove('visible');
  update();
});

update();

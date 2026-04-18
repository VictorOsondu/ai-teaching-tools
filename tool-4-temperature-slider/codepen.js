const PROMPTS = [
  {
    text: "Write an opening line for a company blog post about remote work",
    outputs: {
      0: { text: "Remote work has changed how companies operate across the globe.", label: "Deterministic" },
      30: { text: "Remote work is no longer a perk — it's a baseline expectation.", label: "Conservative" },
      50: { text: "The 9-to-5 didn't end — it moved to the spare bedroom.", label: "Balanced" },
      70: { text: "The office didn't disappear — it just learned to follow us home, and not everyone is glad it knows the address.", label: "Creative" },
      100: { text: "Somewhere between pyjama bottoms and a Zoom call, we accidentally reinvented the workplace.", label: "Experimental" }
    }
  },
  {
    text: "Describe what a project manager does in one sentence",
    outputs: {
      0: { text: "A project manager plans, coordinates, and oversees projects to ensure they are completed on time and within budget.", label: "Deterministic" },
      30: { text: "A project manager keeps teams aligned, timelines on track, and stakeholders informed throughout the life of a project.", label: "Conservative" },
      50: { text: "Project managers are professional plate-spinners — they keep everything moving without letting anything crash.", label: "Balanced" },
      70: { text: "A project manager is the person who turns a room full of good intentions into a shipped product with a deadline.", label: "Creative" },
      100: { text: "Imagine a translator who speaks fluent engineer, designer, and executive — then add a stopwatch and a spreadsheet.", label: "Experimental" }
    }
  },
  {
    text: "Suggest a name for a new coffee shop",
    outputs: {
      0: { text: "The Daily Brew", label: "Deterministic" },
      30: { text: "Common Grounds", label: "Conservative" },
      50: { text: "Steep & Stir", label: "Balanced" },
      70: { text: "Pour Decisions", label: "Creative" },
      100: { text: "Café Existential — where every cup is a question and the answer is always 'another one'.", label: "Experimental" }
    }
  },
  {
    text: "Explain why deadlines matter to a colleague",
    outputs: {
      0: { text: "Deadlines ensure that work is completed on schedule and that all team members can plan their tasks accordingly.", label: "Deterministic" },
      30: { text: "Deadlines exist because without them, work expands to fill whatever time is available — Parkinson's Law in action.", label: "Conservative" },
      50: { text: "Deadlines are less about pressure and more about coordination — when you miss one, someone else's plan breaks.", label: "Balanced" },
      70: { text: "A deadline is a promise to your future self and your teammates that this thing will actually ship, not just 'get worked on'.", label: "Creative" },
      100: { text: "Deadlines are the gravity of the working world. Without them, everything just floats around looking busy.", label: "Experimental" }
    }
  },
  {
    text: "Write a subject line for a marketing email about a summer sale",
    outputs: {
      0: { text: "Summer Sale: Up to 30% Off Selected Items", label: "Deterministic" },
      30: { text: "Our biggest summer sale starts today — don't miss it", label: "Conservative" },
      50: { text: "Hot deals, cool prices — summer savings are here", label: "Balanced" },
      70: { text: "Your wardrobe called. It said bring sunscreen and a bigger bag.", label: "Creative" },
      100: { text: "We put the prices in a cold plunge. They came out refreshed.", label: "Experimental" }
    }
  }
];

const TEMP_STOPS = [0, 30, 50, 70, 100];
const BAR_COLORS = ['#3b82f6', '#06b6d4', '#00d4aa', '#f0a500', '#f97316'];

let currentPrompt = 0;
let insightShown = { low: false, high: false, switch: false };

const tempSlider = document.getElementById('tempSlider');
const tempVal = document.getElementById('tempVal');
const modeLabel = document.getElementById('modeLabel');
const mainOutput = document.getElementById('mainOutput');
const compStrip = document.getElementById('compStrip');
const promptText = document.getElementById('promptText');
const promptBtn = document.getElementById('promptBtn');
const promptMenu = document.getElementById('promptMenu');
const insightEl = document.getElementById('insight');
const insightText = document.getElementById('insightText');
const resetBtn = document.getElementById('resetBtn');
const explainer = document.getElementById('explainer');
const guideRows = document.querySelectorAll('.guide-row');

function getMode(v) {
  if (v <= 20) return 'Deterministic';
  if (v <= 40) return 'Conservative';
  if (v <= 60) return 'Balanced';
  if (v <= 80) return 'Creative';
  return 'Experimental';
}

function nearestStop(v) {
  let best = 0, bestDist = 999;
  for (const s of TEMP_STOPS) { const d = Math.abs(v - s); if (d < bestDist) { bestDist = d; best = s; } }
  return best;
}

function render() {
  const v = parseInt(tempSlider.value);
  tempVal.textContent = (v / 100).toFixed(1);
  modeLabel.textContent = getMode(v);
  promptText.textContent = '"' + PROMPTS[currentPrompt].text + '"';

  const stop = nearestStop(v);
  const output = PROMPTS[currentPrompt].outputs[stop];
  mainOutput.style.opacity = 0;
  setTimeout(() => { mainOutput.textContent = '"' + output.text + '"'; mainOutput.style.opacity = 1; }, 150);

  // Comparison strip
  compStrip.innerHTML = '';
  TEMP_STOPS.forEach((s, i) => {
    const o = PROMPTS[currentPrompt].outputs[s];
    const row = document.createElement('div');
    row.className = 'comp-row' + (s === stop ? ' active' : '');
    row.innerHTML = '<span class="comp-temp">' + (s / 100).toFixed(1) + '</span><div class="comp-bar" style="background:' + BAR_COLORS[i] + '"></div><div class="comp-text">"' + o.text + '"</div>';
    row.addEventListener('click', () => { tempSlider.value = s; render(); });
    compStrip.appendChild(row);
  });

  // Guidance highlight
  guideRows.forEach(r => {
    const lo = parseInt(r.dataset.lo), hi = parseInt(r.dataset.hi);
    r.classList.toggle('active', v >= lo && v <= hi);
  });

  // Insights
  if (v <= 10 && !insightShown.low) {
    insightShown.low = true;
    showInsight("At zero temperature, the AI always picks the safest, most probable words. Useful for factual tasks — but the output can feel generic.");
  }
  if (v >= 90 && !insightShown.high) {
    insightShown.high = true;
    showInsight("At high temperature, the AI takes creative risks. Great for brainstorming — but you might need to rein it in for professional writing.");
  }
}

function showInsight(text) {
  insightText.textContent = text;
  insightEl.classList.remove('visible');
  void insightEl.offsetWidth;
  insightEl.classList.add('visible');
}

tempSlider.addEventListener('input', render);

// Prompt dropdown
PROMPTS.forEach((p, i) => {
  const item = document.createElement('div');
  item.className = 'dropdown-item' + (i === currentPrompt ? ' active' : '');
  item.textContent = '"' + p.text + '"';
  item.addEventListener('click', () => {
    currentPrompt = i;
    closePromptMenu();
    if (!insightShown.switch) { insightShown.switch = true; showInsight("Notice how temperature matters more for some tasks than others. A factual description doesn't need creativity. A shop name does."); }
    render();
  });
  promptMenu.appendChild(item);
});
promptBtn.addEventListener('click', (e) => { e.stopPropagation(); promptMenu.classList.toggle('open'); });
document.addEventListener('click', closePromptMenu);
function closePromptMenu() { promptMenu.classList.remove('open'); }

explainer.addEventListener('click', () => { explainer.classList.toggle('collapsed'); });
resetBtn.addEventListener('click', () => { tempSlider.value = 50; currentPrompt = 0; insightShown = { low: false, high: false, switch: false }; insightEl.classList.remove('visible'); render(); });

render();

// rose   = UI (design systems, prototyping, UI design)
// blue   = Research (interviews, user testing, data)
// teal   = Strategy (workshops, journey mapping, concept design)
// amber  = Greenfield / startup
// purple = Mobile design

const TAG_RULES = [
  { color: 'purple', keywords: ['mobile'] },
  { color: 'rose',   keywords: ['ui design', 'design system', 'design systems', 'component', 'prototype', 'prototyping', 'interaction design', 'visual design', 'wireframe', 'data visualisation', 'data visualization'] },
  { color: 'blue',   keywords: ['research', 'interview', 'questionnaire', 'survey', 'user testing', 'usability', 'analytics'] },
  { color: 'teal',   keywords: ['strategy', 'workshop', 'journey mapping', 'concept', 'service design', 'ux design', 'information architecture', 'discovery', 'stakeholder'] },
  { color: 'amber',  keywords: ['greenfield', 'startup', 'mvp', 'fractional', '0 to 1'] },
];

function colorForTag(text) {
  const lower = text.toLowerCase();
  for (const rule of TAG_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.color;
    }
  }
  return 'purple'; // fallback
}

document.querySelectorAll('.home-timeline-pill').forEach((pill) => {
  const color = colorForTag(pill.textContent.trim());
  pill.classList.add(`home-timeline-pill--${color}`);
});

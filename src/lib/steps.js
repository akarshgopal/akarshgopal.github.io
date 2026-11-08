// One figure frame that shows several existing figures as steps (figure audit, Nov 2026). The reader picks a step;
// that figure is built inside the frame and the previous one is removed. Each step keeps its own code and controls.
import { controls, segmented } from './ui.js';

export function steps(list, label = 'Step') {
  return el => {
    const ctl = controls(el, 'fig-steps');
    const host = document.createElement('div');
    host.className = 'fig-step';
    el.appendChild(host);
    const show = i => {
      host.replaceChildren();
      const inner = document.createElement('div');
      inner.className = 'fig-step-in';
      host.appendChild(inner);
      try { list[i][1](inner); } catch (e) { console.error('step failed', list[i][0], e); }
    };
    segmented(ctl, { label, value: 0, options: list.map(([lab], i) => ({ label: `${i + 1} · ${lab}`, value: i, name: `step-${i}` })), onchange: show });
    show(0);
  };
}

// The series: the contents page (index), the essay (the front door), then the deep dives. Order = reading order = pager chain.
// status 'planned' = shown in the nav as "coming soon", never linked.
// updated = the page's last content change (YYYY-MM-DD): the byline's "updated" date, article:modified_time and feed.xml.
export const SERIES_TITLE = 'Can AI outgrow the planet’s power grid?';
export const PAGES = [
  { file: 'index.html',      short: 'Contents',      title: 'Can AI outgrow the planet’s power grid?', status: 'live', updated: '2026-11-07' },
  // The essay: the whole argument in one sitting; the pages after it are its deep dives
  { file: 'essay.html',      short: 'The essay',     title: 'From Switch to Supercluster: Can the Grid Keep Up?', status: 'live', updated: '2026-11-07' },
  { file: 'yardstick.html',  short: 'The yardstick', title: 'The Yardstick: How Big Is the Bar?', status: 'live', updated: '2026-11-07' },
  // Physics stack: what a switch is → what a flip costs → why GPUs won (efficiency lever g0)
  { file: 'rules.html',      short: 'Rules',         title: 'Rules: Switch, Gate, Adder, Program', status: 'live', updated: '2026-11-07' },
  { file: 'flip.html',       short: 'The flip',      title: 'The Price of a Flip', status: 'live', updated: '2026-11-07' },
  { file: 'parallel.html',   short: 'Parallel',      title: 'Parallel: Why GPUs Won', status: 'live', updated: '2026-11-07' },
  // Demand stack: what a model is → tokens → scaling (T) → data (examples) → who asks (U)
  { file: 'model.html',      short: 'A model',       title: 'A Model Is a Function You Can Tune', status: 'live', updated: '2026-11-07' },
  { file: 'language.html',   short: 'Language',      title: 'Language: Tokens to Next Word', status: 'live', updated: '2026-11-07' },
  { file: 'scaling.html',    short: 'Scaling',       title: 'Scaling: The Bet That Loss Is Predictable', status: 'live', updated: '2026-11-07' },
  { file: 'data.html',       short: 'The data',      title: 'The Data: Scale of the Collection', status: 'live', updated: '2026-11-07' },
  { file: 'demand.html',     short: 'The demand',    title: 'The Demand: Who Asks, How Often?', status: 'live', updated: '2026-11-07' },
  // Supply, the near-term constraints, Act 2, and the ledger
  { file: 'factory.html',    short: 'The factory',   title: 'The AI Factory: Chips, Cooling and the Grid', status: 'live', updated: '2026-11-07' },
  { file: 'binds.html',      short: 'What binds',    title: 'What Binds, 2026–30: Chips, Power, Permits or Money?', status: 'live', updated: '2026-11-07' },
  { file: 'orbital.html',    short: 'Orbital',       title: 'Orbital Compute: Is Space the Only Answer?', status: 'live', updated: '2026-11-07' },
  { file: 'verdict.html',    short: 'The verdict',   title: 'The Verdict: What the Ledger Says', status: 'live', updated: '2026-11-07' },
];
// Legacy filenames kept as thin redirects so old links and the electricity series back-links still resolve.
export const REDIRECTS = [
  { from: 'the-switch.html', to: 'flip.html' },
  { from: 'learning.html',   to: 'model.html' },
  { from: 'ai-factory.html', to: 'factory.html' },
];

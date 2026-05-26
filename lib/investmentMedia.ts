/** Unsplash finance & office imagery — used sitewide for investment positioning. */
const u = (path: string, w = 1600) =>
  `https://images.unsplash.com/${path}?auto=format&fit=crop&w=${w}&q=80`;

export const investmentImages = {
  hero: u("photo-1611974789855-9c2a0a7236a3", 1400),
  team1: u("photo-1454165804606-c3d57bc86b40", 1200),
  team2: u("photo-1552664730-d307ca884978", 1200),
  team3: u("photo-1556761175-5973dc0f32e7", 1200),
  a: u("photo-1554224155-6726b3ff858f", 1600),
  b: u("photo-1551434678-e076c223a692", 1600),
  c: u("photo-1522071820081-009f0129c71c", 1600),
  d: u("photo-1460925895917-afdab827c52f", 1600),
  e: u("photo-1551288049-bebda4e38f71", 1600),
  f: u("photo-1507679799987-c73779587ccf", 1600),
} as const;

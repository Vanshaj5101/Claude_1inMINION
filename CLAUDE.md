# CLAUDE.md — 1inMINION: Heist to the Sun

## What this project is

A Next.js 14 (App Router) training website that teaches AI literacy to **non-technical staff**
through a gamified, Despicable Me themed "heist" narrative. Learners name their own Minion,
then work through numbered levels, each teaching one AI capability.

Repo: `Claude_1inMINION` · package name `steal-the-sun` · branch `main`

---

## THE GOAL OF THIS SESSION

**Revamp the entire site from ChatGPT back to Claude, then publish it on LinkedIn.**

The site was originally built around **Claude**, then rebranded to **ChatGPT**. We are now
reversing that and restructuring the curriculum into **four levels**.

### Target progression (what we are building)

| Level | Title | Concept | What the learner does |
|-------|-------|---------|-----------------------|
| 01 | Talk to Your Minion | **Prompt Engineering** | Run a vague prompt, then a structured one. Learn Role / Context / Task / Format / Constraints. |
| 02 | Set Up Base | **Projects in Claude** | Create a Claude Project, load instructions + the mission data CSV, answer the 5 mission questions, produce a mission debrief file. |
| 03 | Train Your Minion | **Skills** | Upload a Skill file to Claude, then run the same prompt with and without it. The Skill builds a **presentation** from their Level 2 findings. |
| 04 | Give Minion the Wheel | **MCPs** | Connect Claude to **Google Calendar**, have the Minion find a slot and send the heist event to all partners. |

### Current progression (what exists today — to be replaced)

| Level | Title | Concept |
|-------|-------|---------|
| 01 | Talk to Your Minion | Prompt Engineering (ChatGPT) |
| 02 | Arm Your Minion | Custom GPTs |
| 03 | The Mission Plan | Custom GPTs (pre-built "1inMINION Project Manager" GPT) |
| 04 | Beyond the Mission | AI Opportunity Finder (survey) — *but the level 4 JSON on disk is actually Agents + MCPs* |
| 05 | Mission Debrief | Padlet share-out |

Note the inconsistency: `content/levels.ts` describes Level 04 as "Beyond the Mission /
AI Opportunity Finder", while `content/levels/level4/*.json` describes "Give Minion the
Wheel / Agents + MCPs". `Level4Page.tsx` is the source of truth for what actually renders.
Resolve this during the revamp. Level 05 (Padlet) is being dropped in the four-level plan.

---

## CLAUDE-ERA CODE STILL AVAILABLE — recover, do not rewrite from scratch

Most of the Claude version is **recoverable from git history**. This is the single biggest
time-saver for this session.

### Live on disk right now (never removed)

| File | What it is |
|------|-----------|
| `public/files/pitch_skill.md` | **A real Claude Skill file** with YAML frontmatter (`name`, `description`). "Presentation Builder" — asks clarifying questions, then builds a deck. This is the Level 03 asset. |
| `public/files/villain_pitch_skill.md` | Second Skill file, Gru-themed slide structure. Contains a deliberate `[ENHANCE THIS SECTION — currently empty]` gap as a learner exercise. |
| `public/level2_project_setup.png` | Claude-era screenshot (Projects) |
| `public/level2_with_data.png` | Claude-era screenshot (Project with data loaded) |
| `DESIGN.md` lines ~331, ~387 | Still say `OPEN CLAUDE.AI` on button labels |

### Recoverable from git

**`24f7405`** (`feat: Level 1 overhaul, minion naming, UI polish, and Level 2 improvements`)
is the **last commit with the complete four-level Claude curriculum**. It matches the target
progression above almost exactly:

- Level 02 = "Set Up Base" / **Projects + Context** (Claude Projects)
- Level 03 = "Train Your Minion" / **Skills** (upload `pitch_skill.md` via Customize Claude → Skills)
- Level 04 = "Give Minion the Wheel" / **Agents + MCPs** (Google Calendar connector)

Useful commands:

```bash
git show 24f7405:content/levels.ts
git show 24f7405:content/levels/level3/level_03_steps.json
git show 24f7405:content/levels/level3/level_03_resources.json
git show 24f7405:content/levels/level2/level_02_briefing.json
git show 24f7405:content/levels/level4/level_04_briefing.json
git show d27b9a8^:components/StickyClaudeButton.tsx
```

### Key commits in the ChatGPT migration (reverse these)

| Commit | What it did |
|--------|-------------|
| `24f7405` | **Last full Claude four-level version.** Best recovery source. |
| `4d582ee` | Level 3: Skills → pre-built Custom GPT |
| `5bcb476` | Level 2: Claude Projects → Custom GPT Data Strategist |
| `d27b9a8` | **The rebrand.** Replaced all "Claude" with "ChatGPT"; renamed `StickyClaudeButton.tsx` → `StickyChatGPTButton.tsx` |
| `1437516` | Added Levels 4 & 5, slide deck overhaul |
| `a8ae559` | Slides, Level 4 prompt, Level 5 Padlet (HEAD) |

---

## File structure

```
app/
  layout.tsx              Root layout, fonts (Bangers/Nunito/JetBrains Mono), Nav, sticky button
  page.tsx                Landing (SplashScreen + Hero)
  globals.css             CSS variables — the design system lives here
  level/[id]/page.tsx     Router: id 1-5 → Level1Page…Level5Page, else redirect home
  onboarding/page.tsx
  submit/page.tsx         Survey/submission page
  not-found.tsx

components/
  levels/Level1Page.tsx … Level5Page.tsx   One component per level (297–562 lines each)
  landing/Hero.tsx, LevelsPreview.tsx, OnboardingCarousel.tsx, StoryOnboarding.tsx
  ui/Button.tsx
  Navigation.tsx, TableOfContents.tsx, LevelProgressCard.tsx, MissionCheck.tsx,
  PromptBlock.tsx, StepCard.tsx, ChallengeCard.tsx, DownloadCard.tsx,
  LevelBriefingModal.tsx, LevelBriefingSection.tsx, LevelCard.tsx,
  SplashScreen.tsx, PixelMinion.tsx, StickyChatGPTButton.tsx

content/
  levels.ts               Level cards shown on the landing page
  landing.ts              All landing page copy — edit here, not in components
  levels/levelN/
    level_0N_briefing.json    level meta, mission_targets, mission_gear, mission_check
    level_0N_steps.json       ordered cards/steps, each with a resource_id
    level_0N_resources.json   prompts, links, downloads referenced by resource_id

lib/content/
  level1.ts               Level 1 copy (partly duplicates the level1 JSON — watch for drift)
  submit.ts

hooks/
  useMinionName.ts        Learner's Minion name, injected into prompts
  useCopyToClipboard.ts
  useScrollAnimation.ts

public/
  files/                  Downloadable assets (CSVs, Skill files, PDF brief)
  *.png                   Screenshots — chatgpt_*, level2_gpt_*, level3_* all need replacing

scripts/generate-pdf.js   pdfkit script
DESIGN.md                 Full design system: palette, type, components, tone of voice
```

### Content architecture

Level pages are **content-driven**: JSON in `content/levels/levelN/` supplies copy, and the
`Level{N}Page.tsx` component renders it. Steps reference resources by `resource_id`, so a
step and its prompt/download/link stay decoupled. Exceptions to know about:

- **Level 5** content is hardcoded inside `Level5Page.tsx` — there is no `level5/` JSON dir.
- **Level 1** copy exists in *both* `lib/content/level1.ts` and `content/levels/level1/*.json`.
- `content/landing.ts` and `content/levels.ts` are the landing-page sources.

---

## Scope of the ChatGPT → Claude change

`grep -ric "chatgpt\|custom gpt\|\bgpt\b"` — the heaviest files:

```
components/levels/Level2Page.tsx                34
content/levels/level2/level_02_steps.json       12
components/levels/Level3Page.tsx                12
content/levels/level2/level_02_resources.json   11
content/levels/level2/level_02_briefing.json    11
content/levels/level4/level_04_briefing.json     8
content/levels/level3/level_03_resources.json    7
```

Also needed beyond text replacement:

1. Rename `StickyChatGPTButton.tsx` → `StickyClaudeButton.tsx`; URL `chatgpt.com` → `claude.ai`.
   Update the import in `app/layout.tsx`.
2. Replace every `chatgpt_*.png`, `level2_gpt_*.png`, and `level3_*.png` screenshot with new
   Claude UI captures. These are the real bottleneck — text is easy, screenshots are not.
3. Remove the hardcoded ChatGPT Custom GPT URL in `content/levels/level3/level_03_resources.json`.
4. Decide the fate of Level 5 (Padlet) and `app/submit/page.tsx` under the four-level plan.
5. `app/layout.tsx` metadata and `DESIGN.md` tone section both mention the wrong product.

---

## Tech stack

Next.js 14.2.5 · React 18 · TypeScript · Tailwind CSS 3.4 · framer-motion 11 · lucide-react

```bash
npm run dev      # local dev
npm run build
npm run lint
```

---

## Conventions

- **Edit copy in `content/`, not in components.** `content/landing.ts` says this explicitly.
- Design tokens live in `app/globals.css` as CSS variables and are documented in `DESIGN.md`.
  Use `var(--yellow)`, `var(--font-mono)`, `var(--shadow-amber)` rather than literals.
- Level accent colors: 01 yellow · 02 purple · 03 blue · 04 orange.
- Tone: direct imperative, mission language, slightly dramatic. Never generic workshop
  phrasing ("Welcome to Module 2"). See `DESIGN.md` section 10.
- Button labels are shouty and action-forward: `START MISSION`, `COPY`, `OPEN CLAUDE.AI`.

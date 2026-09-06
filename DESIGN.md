# 1inMINION — Design System

> **For collaborators:** This document covers everything you need to build new sections of the site consistently — fonts, colors, spacing, components, tone, and interaction patterns.

---

## 1. Brand Identity

**Product name:** 1inMINION  
**Website title:** Heist to the Sun — AI Training Experience  
**Concept:** An AI-prompting course disguised as a villain heist mission. Players are Minions in training. Lessons are "levels." Exercises are "missions." The tone is cinematic and playful but the content is genuinely educational.

**Theme source:** Despicable Me / super-villain aesthetic — mission briefings, classified documents, shrink rays, banana distractions. Never childish; always cinematic.

---

## 2. Typography

Three typefaces. Each has a specific and strict role.

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display | **Bangers** (Google Fonts) | 400 only | Hero titles, level headings, big dramatic moments |
| Body | **Nunito** (Google Fonts) | 400, 500, 600, 700, 800 | All body copy, descriptions, nav labels |
| Mono | **JetBrains Mono** (Google Fonts) | 400, 500, 600, 700 | Badges, eyebrows, code blocks, prompt text, labels, step numbers |

### CSS Variables
```css
--font-display: 'Bangers', cursive
--font-body:    'Nunito', sans-serif
--font-mono:    'JetBrains Mono', monospace
```

### Type Scale
```
Hero title:        Bangers, 108–160px, white on dark
Section heading:   Bangers, 36–48px (text-3xl/text-4xl), --text-primary
Sub-heading:       Nunito 700, 24–30px
Body text:         Nunito 400, 14–18px, line-height 1.7, --text-secondary
Small / labels:    JetBrains Mono 700, 11px, uppercase, letter-spacing 0.14em
Code / prompts:    JetBrains Mono 400–600, 13–14px
```

---

## 3. Color Palette

### Primary Accents
| Name | Token | Hex | Usage |
|------|-------|-----|-------|
| Yellow (Primary) | `--yellow` | `#f29b1c` | Primary CTA, badges, left-border accents, active states |
| Yellow Light | `--yellow-light` | `#fef3dc` | Hover tints, active nav circle fill |
| Yellow Muted | `--yellow-muted` | `#b87010` | Text on white when full yellow is too loud |
| Yellow Text | `--yellow-text` | `#7a3a00` | **Accessible amber text on white** (7.2:1 contrast ratio) |
| Orange | `--orange` | `#F97316` | Hero gradient tail, sun gradient |

### Secondary Accents
| Name | Token | Hex | Usage |
|------|-------|-----|-------|
| Purple | `--purple` | `#8B5CF6` | Advanced techniques sections, advanced prompt blocks |
| Blue | `--blue` | `#3B82F6` | Test / experimental prompt variant |
| Green | `--green` | `#059669` | Completion, success, "mark done" state |
| Red | `--red` | `#DC2626` | Errors, classified stamps, warnings |

### Surfaces
| Name | Token | Hex | Usage |
|------|-------|-----|-------|
| Background Primary | `--bg-primary` | `#FFFFFF` | Page background, nav |
| Background Secondary | `--bg-secondary` | `#F9FAFB` | Card backgrounds |
| Background Tertiary | `--bg-tertiary` | `#F3F4F6` | Nested sections, table rows |
| Background Code | `--bg-code` | `#F4F4F0` | Prompt blocks, code areas |
| Background Warm | `--bg-warm` | `#fff8eb` | Warm-tinted highlight panels |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#1F2937` | Headings, strong body |
| `--text-secondary` | `#374151` | Body text, descriptions |
| `--text-muted` | `#6B7280` | Placeholder text, inactive labels |

### Borders
| Token | Hex |
|-------|-----|
| `--border` | `#E5E7EB` |
| `--border-yellow` | `#f29b1c` |
| `--border-purple` | `#8B5CF6` |

### Semantic Color Map (Which accent = which track)
```
Yellow/Amber  →  Core prompting content, primary actions
Purple        →  Advanced / expert-level content
Blue          →  Test runs, experimental
Green         →  Completion / success state
Red           →  Warnings, "classified" stamps
```

---

## 4. Gradients

```css
/* Hero "SUN" text and primary CTA */
background: linear-gradient(135deg, #f29b1c, #F97316);

/* Hero section overlay (dark-to-darker bottom fade) */
background: linear-gradient(to bottom,
  rgba(0,0,0,0.15) 0%,
  rgba(0,0,0,0.35) 45%,
  rgba(0,0,0,0.60) 75%,
  rgba(0,0,0,0.75) 100%
);

/* Amber glow background blob */
background: rgba(242, 155, 28, 0.07);
```

---

## 5. Shadows

```css
--shadow-xs:    0 1px 2px rgba(0,0,0,0.05)           /* default card */
--shadow-sm:    0 1px 3px rgba(0,0,0,0.07), ...       /* slightly elevated */
--shadow-md:    0 4px 8px rgba(0,0,0,0.07), ...       /* hover lift */
--shadow-hover: 0 8px 18px rgba(0,0,0,0.09), ...      /* card hover state */
--shadow-amber: 0 4px 20px rgba(242,155,28,0.4)       /* yellow glow on CTAs */
```

---

## 6. Spacing & Layout

| Concept | Value |
|---------|-------|
| Nav height | 72px |
| Content max-width | 768px (`max-w-3xl`) |
| Site max-width | 1200px |
| Content padding-top | 80px (clears fixed nav) |
| Section gap | 64px (`space-y-16`) |
| Card inner padding | 24px |
| Card border-radius | 8px (`rounded-lg`) |
| Pill border-radius | 9999px (full) |
| Body line-height | 1.7 |

---

## 7. Components

### Section Eyebrow
The orange badge that labels a section. Always mono, always uppercase.

```css
background: var(--yellow);      /* solid orange */
color: var(--text-primary);     /* dark text */
font-family: var(--font-mono);
font-size: 11px;
font-weight: 700;
letter-spacing: 0.14em;
text-transform: uppercase;
padding: 3px 8px;
border-radius: 4px;
display: inline-block;
```

Example text: `// PART 02 — BUILD IT LAYER BY LAYER`, `// WHAT CHANGED?`

---

### Pill Badge
For metadata — durations, tags, status labels.

```css
background: rgba(242,155,28,0.08);
border: 1px solid rgba(242,155,28,0.25);
color: var(--yellow-text);
font-family: var(--font-mono);
font-size: 11px;
font-weight: 600;
padding: 3px 10px;
border-radius: 100px;
letter-spacing: 0.08em;
```

---

### Cards
Standard content card. Yellow left-border signals "do something here." Green left-border = done.

```
background: var(--bg-secondary)
border: 1px solid var(--border)         ← or var(--green) when complete
border-left: 2px solid var(--yellow)    ← or var(--green) when complete
border-radius: 8px
padding: 24px
transition: border-color, box-shadow
```

Card hover: `translateY(-4px)` + `--shadow-hover`

---

### Prompt Blocks
The copyable prompt display. Left-border color signals which track it belongs to.

```
background: var(--bg-code)       /* #F4F4F0 warm off-white */
border: 1px solid var(--border)
border-left: 3px solid [accent]  /* yellow=core, purple=advanced, blue=test */
border-radius: 6px
font-family: var(--font-mono)
font-size: 14px
```

Header row: label (mono, small, colored by variant) + COPY button (ghost style)  
Body: `$ ` prefix in yellow, prompt text in `--text-primary`  
Cursor: 7×13px yellow blinking block

---

### Concept Label Badge (Inline)
Small inline pill on concept cards. Changes to green when the step is marked done.

```
background: var(--yellow)         /* or var(--green) when done */
color: var(--text-primary)        /* or white when done */
font-family: var(--font-mono)
font-size: 12px
font-weight: 700
padding: 2px 8px
border-radius: 4px
```

---

### Buttons

**Primary (CTA)**
```css
background: var(--yellow);
color: var(--text-primary);
font-family: var(--font-mono);
font-size: 13px;
font-weight: 700;
letter-spacing: 0.08em;
padding: 13px 26px;
border-radius: 8px;
box-shadow: var(--shadow-amber);
```
Hover: `translateY(-1px)` + stronger amber shadow

**Secondary (Ghost)**
```css
background: transparent;
color: var(--yellow-muted);
border: 1px solid var(--yellow);
font-family: var(--font-mono);
font-size: 12px;
font-weight: 600;
padding: 9px 18px;
border-radius: 8px;
```
Hover: `background: rgba(242,155,28,0.08)`

**Hero CTA (Large pill)**
```css
background: linear-gradient(135deg, #f29b1c, #F97316);
color: var(--text-primary);
font-family: var(--font-display);
font-size: 22px;
border-radius: 9999px;
padding: 14px 36px;
box-shadow: 0 4px 20px rgba(242,155,28,0.45);
```
Has a shimmer sweep animation on hover.

---

### Navigation Bar

- Height: 72px, fixed top, `z-index: 50`
- On landing/hero pages: transparent background, no border
- On level pages: `var(--bg-primary)` background, 1px border-bottom, xs shadow
- Logo: left-aligned, image-based (`1inMINION.png`)
- Level progress track: centered, 4 circle nodes connected by lines
  - Current level: yellow border + light fill + minion avatar
  - Completed level: yellow border + flag icon
  - Locked level: gray border + lock icon

---

## 8. Motion & Animation

| Effect | Spec |
|--------|------|
| Page entrance | `opacity: 0 → 1`, `translateY(20px → 0)`, 300ms ease-out |
| Card hover lift | `translateY(-4px)`, 200ms ease |
| Button hover | `translateY(-1px)` or `scale(1.04)`, 150ms ease |
| Cursor blink | 7×13px yellow block, 1s step-end infinite |
| Hero CTA shimmer | Linear gradient sweep on hover, 550ms ease |
| Background blobs | `float-slow`: translateY ±20px, 9–13s infinite, staggered delays |
| Nav circle hover | `box-shadow: 0 0 0 4px rgba(255,215,0,0.25)`, 200ms |

**Reduced motion:** All animations respect `prefers-reduced-motion: reduce`. When set, blobs, cursor blink, and transitions are disabled.

---

## 9. Hero Section Pattern

The hero uses a dark full-screen background image with a gradient overlay to black at the bottom. Text is white. The big title uses Bangers at 108–160px. The final word of the title gets the sun gradient (`#f29b1c → #F97316`).

```
Background: hero_bg3.png, cover, center top
Fallback bg: #060a16
Overlay: linear-gradient to bottom, transparent → rgba(0,0,0,0.75)
Eyebrow: Nunito 800, all-caps, rgba(255,255,255,0.55), letter-spacing 0.2em
Title: Bangers, white, massive
Subtitle: Nunito italic, rgba(255,255,255,0.65), text-xl/2xl
CTA: hero-cta pill button (gradient, large)
```

---

## 10. Tone of Voice

| Context | Tone |
|---------|------|
| Section labels | Tactical, all-caps. `// PART 01 — SEE THE DIFFERENCE` |
| Instructions | Direct imperative. "Open Claude in a new tab. Copy and paste this prompt." |
| Concept intros | Confident and slightly dramatic. "Replace vague words with precise ones. Non-negotiable for any real mission." |
| Notes / tips | Warm, insightful. "Same Minion. Same topic. Completely different output." |
| Button labels | Action-forward. `OPEN CLAUDE.AI`, `COPY`, `ADVANCE TO LEVEL 02` |
| Progress | Mission language. "Mark done", "Mission Check", "Advance to Level" |

**Avoid:** generic workshop language ("Welcome to Module 2"), passive voice, filler phrases ("In this section we will explore...").  
**Use:** verbs, specificity, occasional villain humor that doesn't undercut the learning.

---

## 11. Icon Library

**Lucide React** — used throughout. Key icons:

| Icon | Usage |
|------|-------|
| `Clipboard` / `Check` | Prompt block copy button |
| `CheckSquare` / `Square` | Step completion toggle |
| `ChevronDown` / `ChevronUp` | Accordion expand/collapse |
| `ExternalLink` | Link-out to claude.ai |
| `ArrowRight` | CTA forward navigation |
| `Lock` | Locked nav level node |

Icon size convention: `11–12px` inline, `15–18px` interactive, `22px` hero CTA.

---

## 12. Page Structure (Level Pages)

```
<Navigation />                  ← fixed, 72px
<TableOfContents />             ← fixed right sidebar, xl screens only
<main class="pt-20 pb-32 max-w-3xl mx-auto px-4">
  <section id="overview">       ← eyebrow + h1 + description + pill-badge + briefing
  <section id="...">            ← eyebrow + h2 + description + cards/steps
  ...
  <div id="mission-check">      ← checklist + next-level CTA
</main>
```

Sections are separated by `space-y-16` (64px gap). Each section starts with a `section-eyebrow` badge followed by an `h2` in Bangers.

---

## 13. Quick Reference CSS Snippets

```jsx
// Section opener
<p className="section-eyebrow">// PART 01 — YOUR SECTION TITLE</p>
<h2 style={{ fontFamily: 'var(--font-display)' }}>Big Dramatic Heading.</h2>

// Metadata pill
<span className="pill-badge">⏱ 20 MINUTES</span>

// Primary button
<button className="btn-primary">START MISSION</button>

// Secondary button
<button className="btn-secondary">OPEN CLAUDE.AI</button>

// Highlight panel (tip/note box)
<div style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: 8, padding: 12 }}>
  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>
    <span style={{ color: 'var(--yellow-text)' }}>💡 </span>Your note here.
  </p>
</div>

// Advanced section header (purple track)
<div style={{ border: '1px solid var(--border-purple)' }}>
  <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--purple)', fontWeight: 700, fontSize: 11, letterSpacing: '0.12em' }}>
    // ADVANCED — WHEN YOU WANT TO GO FURTHER
  </p>
</div>
```

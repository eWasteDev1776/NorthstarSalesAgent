# Northstar UI Design Vision

A modern, visually engaging, and easy-to-use interface for the Northstar AI agent.

---

## 🎨 1. Visual Style

| Element                | Style                                                      |
|------------------------|------------------------------------------------------------|
| **Color Palette**      | Soft neutrals + accent color (blue, violet, or lime)       |
| **Primary Font**       | Inter, Satoshi, or Outfit (modern sans-serifs)             |
| **UI Framework**       | shadcn/ui + Material UI combo                              |
| **Corners & Borders**  | Rounded `2xl`, minimal borders, soft shadow overlays       |
| **Spacing**            | Generous padding/margin (`p-4` to `p-6`)                   |
| **Dark Mode Default**  | Enabled, with soft color accents for highlights            |
| **Accent Glow**        | Subtle glow effects for active items/agent identity panel  |

---

## 🌀 2. Animations & Micro-Interactions

| Component              | Animation                                                   |
|------------------------|-------------------------------------------------------------|
| Sidebar nav            | Slide-in from left, active tab highlight pulse              |
| Lead table rows        | Fade-in + slight upward motion on insert                    |
| Agent log feed         | Terminal-style typewriter effect                            |
| Message generation     | Dot loader → typewriter text render                         |
| Button interactions    | Press depth, subtle hover scale (`scale-105`)               |
| Modals/tooltips        | Framer motion fade/scale transition                         |
| Toggle switch          | Smooth slide with glow pulse on active                      |
| Feedback buttons       | Animated emoji flicker + score pulse                        |
| Progress/agent stats   | Animated counters, radial dial fill, animated badges        |

---

## 📐 3. UX Layout Priorities

| Page             | UX Goals                                                         |
|------------------|-------------------------------------------------------------------|
| Lead Search      | Focused input → minimal results view w/ filters                   |
| Leads View       | Sortable table, tagging, preview panel on right                   |
| Agent Log        | Live feed (like terminal), optional filters                       |
| Strategy         | Memory & insight stream + chat/feedback thread                    |
| Templates        | Cards for saved messages with edit/copy/save actions              |
| Profile          | Simple form + agent card preview                                  |

---

## 🧩 4. Interactive Elements Design

| Feature                | Design Direction                                                  |
|------------------------|-------------------------------------------------------------------|
| Natural Language Input | Floating input w/ glowing edge, AI icon hint                      |
| Agent Identity Card    | Avatar, stats, glow border, “sales agent for [Company]” text      |
| Lead Tags              | Rounded pills (`cold`, `warm`, `hot`) with color-coding           |
| Progress Indicators    | Animated bars or milestone dots                                   |
| CTA Buttons            | Full-width, bold, glow-on-hover or shimmer transition             |

---

## Next Steps

- [ ] Generate Figma mockup of lead search + dashboard
- [ ] Build `globals.css` + Tailwind config with theme colors
- [ ] Implement initial layout shell using sidebar + top nav


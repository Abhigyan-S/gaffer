# Gaffer — AI Coaching Platform

**The free, AI-powered coaching platform for football coaches at every level.**

Tactics board · Squad management · Session planner · Match log · Scouting · Player development · AI coach assistant

---

## What is Gaffer?

Gaffer is a free, open-source coaching platform that runs entirely in the browser — no download, no account, no subscription. It was built for grassroots and amateur coaches who deserve professional-grade tools but don't have access to expensive software like Hudl or TacticalPad.

It works on iPad, Android tablet, laptop, and desktop.

---

## File structure

```
gaffer/
├── index.html      — Landing page (host this on GitHub Pages)
├── app.html        — The full coaching application
├── worker.js       — Cloudflare Worker proxy for the AI API
└── README.md       — This file
```

---

## How to deploy on GitHub Pages (step by step)

This takes about 10 minutes and is completely free.

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and sign up if you don't have an account.

### Step 2 — Create a new repository
1. Click the **+** button (top right) → **New repository**
2. Name it `gaffer` (or anything you want)
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload the files
1. In your new repo, click **Add file** → **Upload files**
2. Upload `index.html`, `app.html`, `worker.js`, and `README.md`
3. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to your repo **Settings** tab
2. Scroll to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Select **main** branch, **/ (root)** folder
5. Click **Save**
6. After 1-2 minutes, your site is live at:
   `https://YOUR-USERNAME.github.io/gaffer`

---

## How to set up the AI (Cloudflare Worker)

The AI features need a proxy so your Anthropic API key stays private. This is free on Cloudflare's free tier.

### Step 1 — Get an Anthropic API key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up and go to **API Keys**
3. Click **Create Key** and copy it somewhere safe

### Step 2 — Create a Cloudflare Worker
1. Go to [workers.cloudflare.com](https://workers.cloudflare.com) and sign up free
2. Click **Create Application** → **Create Worker**
3. Name it `gaffer-proxy`
4. Delete the default code and paste everything from `worker.js`
5. Click **Deploy**

### Step 3 — Add your API key as a secret
1. In your Worker, go to **Settings** → **Variables**
2. Under **Secret Variables**, click **Add variable**
3. Name: `ANTHROPIC_API_KEY`
4. Value: paste your Anthropic API key
5. Click **Save and deploy**

### Step 4 — Connect the Worker to Gaffer
1. Copy your Worker URL — it looks like:
   `https://gaffer-proxy.YOUR-NAME.workers.dev`
2. Open `app.html` in a text editor
3. Find the text `GAFFER_API_URL`
4. Replace it with your Worker URL
5. Save the file and re-upload it to GitHub

The AI features will now work for anyone who visits your site.

---

## Features

| Module | What it does |
|---|---|
| Tactics board | Drag-and-drop players, pass arrows, run lines, opponents, phase sequencer |
| AI coach | Formation analysis, drill suggestions, team talks, set piece ideas |
| Squad manager | Player profiles, availability tracking, AI lineup suggestion |
| Session planner | Build training sessions by block, AI-generated sessions |
| Match log | Live event logging, score tracking, AI post-match summary |
| Scouting | Opponent analysis from observation, AI scout report and game plan |
| Player development | Skill ratings, coach notes, AI development plans |
| Share views | Coach, player, and parent views with tailored AI explanations |

---

## How to use the app

### Tactics board
- **Select mode** — drag players to move them. Double-tap to edit shirt number or name. Right-click (or long-press on tablet) for more options.
- **Pass arrow mode** — tap and drag to draw a yellow passing arrow.
- **Run line mode** — tap and drag to draw a blue dashed movement line.
- **Add opponent mode** — tap anywhere on the pitch to place a red opponent marker.
- **Formation dropdown** — instantly loads 8 preset formations.
- **Label toggle** — switches player circles between shirt numbers and position labels.
- **Save phase** — snapshots the current board state. Build multiple phases to walk your team through a full play sequence.
- **Save image** — exports the pitch as a PNG you can WhatsApp or print.

### Squad manager
- Add players with name, number, and position.
- Tap **Availability** to cycle between Fit / Doubt / Out.
- Tap **Note** to add coaching observations.
- Hit **AI suggest lineup** to get a recommended starting 11 based on who is available.

### Session planner
- Fill in session name, focus area, and duration.
- Add drill blocks one at a time using the left panel.
- Or hit **AI generate session** for a complete ready-made plan.

### Match log
- Tap **New match** to set team names and reset the score.
- Enter the current minute and player name before tapping event buttons.
- After the match, tap **Generate summary** for AI post-match analysis.

### Scouting
- Fill in what you observe about the opponent.
- Tap **AI scout report** — no stats data needed, just your observations.
- Add players to the watchlist to track during the game.

### Player development
- Select a player from the tabs at the top.
- Rate them on 10 skills using the star system.
- Add coaching notes, then tap **AI feedback** for a personalised development plan.

---

## Tech stack

- Pure HTML, CSS, and JavaScript — zero frameworks, zero dependencies
- Canvas API for the pitch drawing
- Anthropic Claude API for all AI features (via Cloudflare Worker proxy)
- GitHub Pages for hosting

---

## Contributing

Pull requests are welcome. If you have ideas for new features or find a bug, open an issue.

---

## Licence

MIT — free to use, modify, and distribute.

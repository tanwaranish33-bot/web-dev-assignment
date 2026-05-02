# CodeCraft — Web Development Landing Page

A fully responsive, animated landing page for a web development course.

## Project Structure

```
webdev-landing/
├── index.html       ← Main page (open this in browser)
├── css/
│   └── style.css    ← All styling (CSS custom properties, animations, responsive)
├── js/
│   └── main.js      ← All interactions (cursor, scroll reveal, counters, parallax)
└── README.md
```

## How to Run in VS Code

### Option 1 — Live Server (Recommended)
1. Open the folder in VS Code: `File → Open Folder → webdev-landing`
2. Install the **Live Server** extension (Ritwick Dey) from the Extensions panel
3. Right-click `index.html` → **Open with Live Server**
4. The site opens at `http://127.0.0.1:5500`

### Option 2 — Direct Browser
1. Double-click `index.html` to open it directly in your browser
2. Note: Google Fonts require an internet connection

## Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Custom animated cursor
- ✅ Scroll-triggered reveal animations
- ✅ Animated number counters
- ✅ Horizontal marquee ticker
- ✅ Tech card color glow on hover
- ✅ Parallax hero title
- ✅ Mobile hamburger menu
- ✅ Smooth scroll navigation
- ✅ Active nav link highlighting

## Tech Used

| Layer     | Tech                      |
|-----------|---------------------------|
| Structure | HTML5 (semantic)          |
| Styling   | CSS3 (custom properties, grid, flex, animations) |
| Behaviour | Vanilla JavaScript (ES6+) |
| Fonts     | Google Fonts (Syne, DM Mono, DM Sans) |

No frameworks. No build tools. Pure HTML + CSS + JS — just open and run.

## Customisation Tips

- Colors: Edit CSS custom properties in `:root` inside `css/style.css`
- Content: All text is in `index.html` — search and replace
- Fonts: Change the Google Fonts link in `<head>` and update `--font-head` / `--font-body` vars

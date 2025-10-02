# Gmail Emoji Quick Response Chrome Extension

A Chrome extension that adds emoji quick response buttons next to Gmail's Reply, Reply all, and Forward buttons.

## Features

- 6 emoji quick response buttons (👍, ❤️, 😊, 🎉, 👏, ✅)
- Appears next to Gmail's native reply buttons
- One-click emoji responses
- Automatically opens compose area with selected emoji
- Works with Gmail's interface
- Dark mode support

## Installation

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the `public` folder from this project
5. The extension will be installed and active on Gmail

## Usage

1. Open any email in Gmail
2. Look for the emoji buttons next to the Reply/Reply all/Forward buttons
3. Click any emoji to quickly compose a response with that emoji
4. The compose area will open with the emoji already inserted
5. Add more text if needed or send as-is

## Customization

To add or change emojis, edit the `EMOJIS` array in `public/content.js`:

```javascript
const EMOJIS = [
  { emoji: '👍', label: 'Thumbs up' },
  { emoji: '❤️', label: 'Heart' },
  // Add more emojis here
];
```

## Auto-send Feature

By default, the extension inserts the emoji but doesn't send it automatically. To enable auto-send, uncomment lines 45-48 in `public/content.js`.

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main functionality
- `content.css` - Styling for emoji buttons

## Permissions

- `activeTab` - Required to interact with Gmail tabs

---

## Original Lovable Project

**URL**: https://lovable.dev/projects/f7ff5496-d5e3-4e70-bc5f-d5dd87046ab2

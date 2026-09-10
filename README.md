# 😂 Random Joke Generator

A modern, responsive web app that fetches random jokes from an external API with a clean UI, category filtering, and joke history tracking.

**Live Demo**: [GitHub Pages Link](https://sasisk61.github.io/joke-generator)

## 🎯 Features

- ✅ **Fetch Random Jokes** - Get unlimited jokes from the Official Joke API
- ✅ **Category Filtering** - Filter jokes by: General, Programming, Knock-knock
- ✅ **Copy to Clipboard** - Easily copy jokes with one click
- ✅ **Share Jokes** - Share jokes via Web Share API or clipboard
- ✅ **Joke History** - Track last 10 jokes with timestamps
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ✅ **Loading States** - Smooth loading animations
- ✅ **Error Handling** - Graceful error messages
- ✅ **Keyboard Shortcuts** - Press Space for new joke, Ctrl+C to copy
- ✅ **Local Storage** - Persistent history across sessions

## 📁 File Structure

```
joke-generator/
├── index.html       # HTML structure
├── styles.css       # Modern responsive styles
├── script.js        # JavaScript with API integration
└── README.md        # This file
```

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. Repository is ready to deploy
2. Go to Settings → Pages
3. Select `main` branch as source
4. Site will be live at: `https://sasisk61.github.io/joke-generator`

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/SasiSK61/joke-generator.git
cd joke-generator

# Open in browser (no build tools needed)
open index.html
```

That's it! No installation or server required.

## 🎨 How It Works

### API Integration

Uses the **Official Joke API** (free, no authentication needed):
- Base URL: `https://official-joke-api.appspot.com`
- Endpoints:
  - `/jokes/random` - Get a random joke
  - `/jokes/random?type=general` - Get random general joke
  - `/jokes/random?type=programming` - Get random programming joke
  - `/jokes/random?type=knock-knock` - Get random knock-knock joke

### Features Breakdown

#### 1. **Get Joke**
Click the "Get Joke" button to fetch a new random joke from the API.
- Shows loading spinner while fetching
- Displays setup and punchline
- Shows joke type/category

#### 2. **Filter by Category**
Select a category from the dropdown:
- **Any** - All jokes
- **General** - General humor
- **Programming** - Tech/developer jokes
- **Knock-knock** - Classic knock-knock jokes

#### 3. **Copy Joke**
Click "Copy Joke" to copy the current joke to your clipboard.
- Button shows "✓ Copied!" confirmation
- Uses modern Clipboard API
- Fallback for older browsers

#### 4. **Share Joke**
Click "Share" to share the joke:
- Uses Web Share API on mobile (native share dialog)
- Falls back to clipboard on desktop
- Includes emoji and context

#### 5. **Joke History**
Last 10 jokes are stored and displayed:
- Shows with timestamp
- Automatically updated
- Persists across browser sessions using localStorage
- "Clear History" button to remove all

#### 6. **Keyboard Shortcuts**
- **Space** - Get new joke
- **Ctrl+C** - Copy joke (built-in browser action)

## 🛠️ Customization

### Change Colors

Edit `styles.css` and replace the gradient:

```css
/* Current */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Example: Blue to Cyan */
background: linear-gradient(135deg, #0066ff 0%, #00ddff 100%);
```

### Add More Categories

The Official Joke API supports these joke types:
- `general`
- `programming`
- `knock-knock`

Add more options in `index.html`:

```html
<select id="category-select">
    <option value="any">Any</option>
    <option value="general">General</option>
    <option value="programming">Programming</option>
    <option value="knock-knock">Knock-knock</option>
    <!-- Add new options here -->
</select>
```

### Change History Limit

In `script.js`, modify the history limit (currently 10):

```javascript
// Keep only last 10 jokes
if (jokes.length > 10) {
    jokes.pop();
}

// Change 10 to desired number
```

### Customize API

Replace the API URL in `script.js`:

```javascript
const API_BASE_URL = 'https://official-joke-api.appspot.com';
```

Alternative free joke APIs:
- JokeAPI: `https://v2.jokeapi.dev`
- RapidAPI: Various joke APIs available

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚨 API Limitations

- Official Joke API has no rate limiting for free tier
- ~100 total jokes available
- No authentication required
- CORS-enabled (works from browsers)

## 💡 Future Enhancements

- [ ] Joke rating system (👍👎)
- [ ] Favorites/bookmarks
- [ ] Multiple API sources
- [ ] Search by keyword
- [ ] Dark mode toggle
- [ ] Joke statistics (most copied, most shared, etc)
- [ ] Export history as JSON/PDF
- [ ] Backend API integration
- [ ] User authentication
- [ ] Social media integration

## 🔧 Troubleshooting

### Jokes not loading?
- Check internet connection
- API might be down - try after a few minutes
- Open browser console (F12) for error messages

### Copy not working?
- Ensure site is HTTPS (required for Clipboard API)
- Use fallback button (copy is automatic on localhost)

### History not persisting?
- Check if localStorage is enabled in browser
- Private/Incognito mode doesn't persist data

## 📚 Learning Resources

**APIs Used**:
- [Official Joke API Docs](https://official-joke-api.appspot.com)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## 📄 License

Open source - feel free to use and modify!

## 🤝 Contributing

Want to improve this project? Feel free to fork and submit a PR!

Potential improvements:
- Better error handling
- More API integrations
- Advanced filtering options
- Analytics tracking
- Accessibility enhancements

---

**Built with**: HTML5, CSS3, Vanilla JavaScript

**Created**: September 2026

Happy laughing! 😂🚀

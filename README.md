# Modern New Tab - Firefox Extension

A modern, customizable new tab page extension for Firefox that provides a clean interface with configurable search engines and quick bookmarks.

## Patches
- **Version 1.0.0** --> Complete
- **Version 1.0.1** --> Progressing ("full chrome support + animations, soon"!)
- 
## Features

- **Customizable Search Engine**: Choose from popular search engines (Google, DuckDuckGo, Brave Search, Bing, Ecosia, Startpage) or add your own custom search engine
- **Quick Bookmarks**: Add and manage your favorite websites with easy access
- **Time & Date Display**: Shows current time and date prominently
- **Theme Support**: Dark, light, and auto themes that follow system preferences
- **Background Customization**: Solid colors, gradients, or custom images
- **Responsive Design**: Works on all screen sizes
- **Privacy Focused**: All data stored locally, no external tracking

### Search
- Type your query in the search bar and press Enter or click the search button
- The search will use your selected search engine
- Change search engines in the settings

### Bookmarks
- Click the "+" button to add a new bookmark
- Enter the name and URL for your bookmark
- Click on any bookmark to visit the website
- Hover over a bookmark and click the "×" to delete it

### Settings
- Click the settings gear icon in the top-right corner
- Configure your preferred search engine
- Change themes (dark, light, auto)
- Customize background (color, gradient, or image)
- Save changes to apply immediately

### Making Changes
1. Edit the relevant files (HTML, CSS, JS)
2. Reload the extension in `about:debugging`
3. Refresh any open new tab pages to see changes

### Adding New Search Engines
Edit the `SEARCH_ENGINES` object in `js/newtab.js`:

```javascript
const SEARCH_ENGINES = {
    // ... existing engines
    newsearch: {
        name: 'New Search Engine',
        url: 'https://example.com/search?q=%s'
    }
};
```

Then add the option to the select element in `newtab.html`.

## Browser Compatibility

- **Firefox**: Fully supported (Manifest V2)
- **Chrome/Edge**: Coming in Patch v1.0.1

## Privacy

This extension:
- Stores all data locally using Firefox's storage API
- Does not collect or transmit any personal data
- Does not track user behavior
- Respects user privacy preferences

## Changelog

### Version 1.0.0
- Initial release
- Basic new tab page functionality
- Search engine configuration
- Bookmark management
- Theme support
- Background customization


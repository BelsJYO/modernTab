# Modern New Tab - Firefox Extension

A modern, customizable new tab page extension for Firefox that provides a clean interface with configurable search engines and quick bookmarks.

## Features

- **Customizable Search Engine**: Choose from popular search engines (Google, DuckDuckGo, Brave Search, Bing, Ecosia, Startpage) or add your own custom search engine
- **Quick Bookmarks**: Add and manage your favorite websites with easy access
- **Time & Date Display**: Shows current time and date prominently
- **Theme Support**: Dark, light, and auto themes that follow system preferences
- **Background Customization**: Solid colors, gradients, or custom images
- **Responsive Design**: Works on all screen sizes
- **Privacy Focused**: All data stored locally, no external tracking

## Installation

### For Development/Testing

1. Clone or download this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..."
4. Select the `manifest.json` file from the extension directory
5. The extension will be loaded and your new tab page will be replaced

### For Production Use

1. Package the extension as a `.xpi` file
2. Install through Firefox Add-ons Manager or submit to Mozilla Add-ons store

## Usage

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

## File Structure

```
firefox-newtab-extension/
├── manifest.json          # Extension manifest
├── newtab.html           # Main new tab page
├── background.js         # Background script
├── css/
│   └── styles.css        # Main stylesheet
├── js/
│   └── newtab.js         # Main JavaScript functionality
├── icons/
│   ├── icon-16.png       # 16x16 icon
│   ├── icon-32.png       # 32x32 icon
│   ├── icon-48.png       # 48x48 icon
│   └── icon-128.png      # 128x128 icon
└── assets/               # Additional assets (if any)
```

## Development

### Prerequisites
- Firefox Developer Edition (recommended) or regular Firefox
- Basic knowledge of HTML, CSS, and JavaScript
- Text editor or IDE

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
- **Chrome/Edge**: Compatible with minor modifications to manifest.json

## Privacy

This extension:
- Stores all data locally using Firefox's storage API
- Does not collect or transmit any personal data
- Does not track user behavior
- Respects user privacy preferences

## License

MIT License - feel free to modify and distribute

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues, feature requests, or questions, please create an issue in the repository.

## Changelog

### Version 1.0.0
- Initial release
- Basic new tab page functionality
- Search engine configuration
- Bookmark management
- Theme support
- Background customization


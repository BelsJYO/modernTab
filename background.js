// Background script for Modern New Tab extension

// Initialize extension on install
browser.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Modern New Tab extension installed');
        
        // Set default settings if they don't exist
        browser.storage.local.get('newTabSettings').then((result) => {
            if (!result.newTabSettings) {
                const defaultSettings = {
                    searchEngine: 'google',
                    customSearchEngine: null,
                    theme: 'dark',
                    backgroundType: 'color',
                    backgroundColor: '#1a1a2e',
                    gradientColor1: '#1a1a2e',
                    gradientColor2: '#16213e',
                    backgroundImage: null,
                    bookmarks: [
                        { name: 'YouTube', url: 'https://youtube.com', icon: '📺' },
                        { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
                        { name: 'Reddit', url: 'https://reddit.com', icon: '🔴' },
                        { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' }
                    ]
                };
                
                browser.storage.local.set({ newTabSettings: defaultSettings });
            }
        });
    } else if (details.reason === 'update') {
        console.log('Modern New Tab extension updated');
    }
});

// Handle extension startup
browser.runtime.onStartup.addListener(() => {
    console.log('Modern New Tab extension started');
});

// Listen for storage changes (for potential future sync features)
browser.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.newTabSettings) {
        console.log('Settings updated:', changes.newTabSettings.newValue);
    }
});

// Handle any runtime messages (for potential future features)
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case 'getSettings':
            browser.storage.local.get('newTabSettings').then((result) => {
                sendResponse(result.newTabSettings || {});
            });
            return true; // Will respond asynchronously
            
        case 'saveSettings':
            browser.storage.local.set({ newTabSettings: request.settings }).then(() => {
                sendResponse({ success: true });
            }).catch((error) => {
                sendResponse({ success: false, error: error.message });
            });
            return true; // Will respond asynchronously
            
        default:
            sendResponse({ error: 'Unknown action' });
    }
});

// Optional: Add context menu items (can be enabled in future versions)
/*
browser.contextMenus.create({
    id: 'add-bookmark',
    title: 'Add to New Tab Bookmarks',
    contexts: ['page']
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'add-bookmark') {
        // Add current page to bookmarks
        browser.storage.local.get('newTabSettings').then((result) => {
            const settings = result.newTabSettings || {};
            const bookmarks = settings.bookmarks || [];
            
            bookmarks.push({
                name: tab.title,
                url: tab.url,
                icon: tab.title.charAt(0).toUpperCase()
            });
            
            settings.bookmarks = bookmarks;
            browser.storage.local.set({ newTabSettings: settings });
        });
    }
});
*/


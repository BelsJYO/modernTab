// Background script for Modern New Tab extension

// Use both chrome and browser APIs for compatibility
const storageAPI = typeof browser !== 'undefined' ? browser : chrome;
const runtimeAPI = typeof browser !== 'undefined' ? browser : chrome;

// Initialize extension on install
if (runtimeAPI && runtimeAPI.runtime && runtimeAPI.runtime.onInstalled) {
    runtimeAPI.runtime.onInstalled.addListener(async (details) => {
        console.log('Modern New Tab extension event:', details.reason);
        
        if (details.reason === 'install') {
            console.log('Modern New Tab extension installed');
            await initializeDefaultSettings();
        } else if (details.reason === 'update') {
            console.log('Modern New Tab extension updated');
            await migrateSettings();
        }
    });
}

// Handle extension startup
if (runtimeAPI && runtimeAPI.runtime && runtimeAPI.runtime.onStartup) {
    runtimeAPI.runtime.onStartup.addListener(() => {
        console.log('Modern New Tab extension started');
    });
}

// Initialize default settings
async function initializeDefaultSettings() {
    try {
        if (!storageAPI || !storageAPI.storage) {
            console.error('Storage API not available');
            return;
        }

        const result = await storageAPI.storage.local.get('newTabSettings');
        
        if (!result.newTabSettings) {
            const defaultSettings = {
                searchEngine: 'google',
                customSearchEngine: null,
                theme: 'dark',
                backgroundType: 'color',
                backgroundColor: '#1a1a2e',
                gradientColor1: '#1a1a2e',
                gradientColor2: '#16213e',
                gradientDirection: '135deg',
                presetGradient: null,
                backgroundImage: null,
                presetWallpaper: null,
                bookmarkIconType: 'emoji',
                bookmarkStyle: 'rounded',
                bookmarks: [
                    { name: 'YouTube', url: 'https://youtube.com', icon: '📺' },
                    { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
                    { name: 'Reddit', url: 'https://reddit.com', icon: '🔴' },
                    { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' }
                ]
            };
            
            await storageAPI.storage.local.set({ newTabSettings: defaultSettings });
            console.log('Default settings initialized');
        } else {
            console.log('Settings already exist, skipping initialization');
        }
    } catch (error) {
        console.error('Error initializing default settings:', error);
    }
}

// Migrate settings for updates
async function migrateSettings() {
    try {
        if (!storageAPI || !storageAPI.storage) {
            console.error('Storage API not available');
            return;
        }

        const result = await storageAPI.storage.local.get('newTabSettings');
        
        if (result.newTabSettings) {
            // Add any new default properties that might be missing
            const defaultSettings = {
                searchEngine: 'google',
                customSearchEngine: null,
                theme: 'dark',
                backgroundType: 'color',
                backgroundColor: '#1a1a2e',
                gradientColor1: '#1a1a2e',
                gradientColor2: '#16213e',
                gradientDirection: '135deg',
                presetGradient: null,
                backgroundImage: null,
                presetWallpaper: null,
                bookmarkIconType: 'emoji',
                bookmarkStyle: 'rounded',
                bookmarks: [
                    { name: 'YouTube', url: 'https://youtube.com', icon: '📺' },
                    { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
                    { name: 'Reddit', url: 'https://reddit.com', icon: '🔴' },
                    { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' }
                ]
            };

            // Merge existing settings with defaults to add any missing properties
            const migratedSettings = { ...defaultSettings, ...result.newTabSettings };
            
            await storageAPI.storage.local.set({ newTabSettings: migratedSettings });
            console.log('Settings migrated successfully');
        }
    } catch (error) {
        console.error('Error migrating settings:', error);
    }
}

// Listen for storage changes
if (storageAPI && storageAPI.storage && storageAPI.storage.onChanged) {
    storageAPI.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local' && changes.newTabSettings) {
            console.log('Settings updated:', changes.newTabSettings.newValue);
        }
    });
}

// Handle runtime messages
if (runtimeAPI && runtimeAPI.runtime && runtimeAPI.runtime.onMessage) {
    runtimeAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
        switch (request.action) {
            case 'getSettings':
                handleGetSettings(sendResponse);
                return true; // Will respond asynchronously
                
            case 'saveSettings':
                handleSaveSettings(request.settings, sendResponse);
                return true; // Will respond asynchronously
                
            case 'resetSettings':
                handleResetSettings(sendResponse);
                return true; // Will respond asynchronously
                
            default:
                sendResponse({ error: 'Unknown action' });
        }
    });
}

// Handle get settings request
async function handleGetSettings(sendResponse) {
    try {
        if (!storageAPI || !storageAPI.storage) {
            sendResponse({ error: 'Storage API not available' });
            return;
        }

        const result = await storageAPI.storage.local.get('newTabSettings');
        sendResponse({ settings: result.newTabSettings || {} });
    } catch (error) {
        console.error('Error getting settings:', error);
        sendResponse({ error: error.message });
    }
}

// Handle save settings request
async function handleSaveSettings(settings, sendResponse) {
    try {
        if (!storageAPI || !storageAPI.storage) {
            sendResponse({ error: 'Storage API not available' });
            return;
        }

        await storageAPI.storage.local.set({ newTabSettings: settings });
        sendResponse({ success: true });
    } catch (error) {
        console.error('Error saving settings:', error);
        sendResponse({ success: false, error: error.message });
    }
}

// Handle reset settings request
async function handleResetSettings(sendResponse) {
    try {
        if (!storageAPI || !storageAPI.storage) {
            sendResponse({ error: 'Storage API not available' });
            return;
        }

        await storageAPI.storage.local.remove('newTabSettings');
        await initializeDefaultSettings();
        sendResponse({ success: true });
    } catch (error) {
        console.error('Error resetting settings:', error);
        sendResponse({ success: false, error: error.message });
    }
}

// Optional: Add context menu items (can be enabled in future versions)
/*
if (runtimeAPI && runtimeAPI.contextMenus) {
    runtimeAPI.contextMenus.create({
        id: 'add-bookmark',
        title: 'Add to New Tab Bookmarks',
        contexts: ['page']
    });

    runtimeAPI.contextMenus.onClicked.addListener(async (info, tab) => {
        if (info.menuItemId === 'add-bookmark') {
            try {
                const result = await storageAPI.storage.local.get('newTabSettings');
                const settings = result.newTabSettings || {};
                const bookmarks = settings.bookmarks || [];
                
                bookmarks.push({
                    name: tab.title,
                    url: tab.url,
                    icon: tab.title.charAt(0).toUpperCase()
                });
                
                settings.bookmarks = bookmarks;
                await storageAPI.storage.local.set({ newTabSettings: settings });
                
                console.log('Bookmark added from context menu');
            } catch (error) {
                console.error('Error adding bookmark from context menu:', error);
            }
        }
    });
}
*/

console.log('Modern New Tab background script loaded');


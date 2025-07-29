// Default search engines configuration
const SEARCH_ENGINES = {
    google: {
        name: 'Google',
        url: 'https://www.google.com/search?q=%s'
    },
    duckduckgo: {
        name: 'DuckDuckGo',
        url: 'https://duckduckgo.com/?q=%s'
    },
    brave: {
        name: 'Brave Search',
        url: 'https://search.brave.com/search?q=%s'
    },
    bing: {
        name: 'Bing',
        url: 'https://www.bing.com/search?q=%s'
    },
    ecosia: {
        name: 'Ecosia',
        url: 'https://www.ecosia.org/search?q=%s'
    },
    startpage: {
        name: 'Startpage',
        url: 'https://www.startpage.com/sp/search?query=%s'
    }
};

// Default settings
const DEFAULT_SETTINGS = {
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

class NewTabPage {
    constructor() {
        this.settings = { ...DEFAULT_SETTINGS };
        this.isInitialized = false;
        this.init();
    }

    async init() {
        try {
            // Load settings first, then initialize UI
            await this.loadSettings();
            this.setupEventListeners();
            this.updateTime();
            this.updateSearchEngine();
            this.renderBookmarks();
            this.applyTheme();
            this.applyBackground();
            
            // Mark as initialized
            this.isInitialized = true;
            
            // Update time every second
            setInterval(() => this.updateTime(), 1000);
            
            console.log('Modern New Tab initialized successfully');
        } catch (error) {
            console.error('Error initializing Modern New Tab:', error);
        }
    }

    async loadSettings() {
        try {
            // Use both chrome and browser APIs for compatibility
            const storageAPI = typeof browser !== 'undefined' ? browser : chrome;
            
            if (!storageAPI || !storageAPI.storage) {
                console.warn('Storage API not available, using default settings');
                return;
            }

            const result = await storageAPI.storage.local.get('newTabSettings');
            
            if (result && result.newTabSettings) {
                // Deep merge with defaults to ensure all properties exist
                this.settings = this.deepMerge(DEFAULT_SETTINGS, result.newTabSettings);
                console.log('Settings loaded successfully:', this.settings);
            } else {
                console.log('No saved settings found, using defaults');
                // Save default settings for first time users
                await this.saveSettings();
            }
        } catch (error) {
            console.error('Error loading settings:', error);
            // Fallback to defaults if loading fails
            this.settings = { ...DEFAULT_SETTINGS };
        }
    }

    async saveSettings() {
        try {
            // Use both chrome and browser APIs for compatibility
            const storageAPI = typeof browser !== 'undefined' ? browser : chrome;
            
            if (!storageAPI || !storageAPI.storage) {
                console.error('Storage API not available');
                return false;
            }

            await storageAPI.storage.local.set({ newTabSettings: this.settings });
            console.log('Settings saved successfully:', this.settings);
            return true;
        } catch (error) {
            console.error('Error saving settings:', error);
            return false;
        }
    }

    // Deep merge utility function
    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    result[key] = this.deepMerge(target[key] || {}, source[key]);
                } else {
                    result[key] = source[key];
                }
            }
        }
        
        return result;
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
        
        if (searchButton) {
            searchButton.addEventListener('click', () => {
                this.performSearch();
            });
        }

        // Settings modal
        const settingsBtn = document.getElementById('settings-btn');
        const settingsModal = document.getElementById('settings-modal');
        const closeSettings = document.getElementById('close-settings');
        const saveSettings = document.getElementById('save-settings');
        const resetSettings = document.getElementById('reset-settings');

        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.openSettingsModal();
            });
        }

        if (closeSettings) {
            closeSettings.addEventListener('click', () => {
                settingsModal?.classList.remove('active');
            });
        }

        if (saveSettings) {
            saveSettings.addEventListener('click', async () => {
                await this.saveSettingsFromModal();
            });
        }

        if (resetSettings) {
            resetSettings.addEventListener('click', async () => {
                await this.resetToDefaults();
            });
        }

        // Bookmark modal
        const addBookmarkBtn = document.getElementById('add-bookmark-btn');
        const bookmarkModal = document.getElementById('bookmark-modal');
        const closeBookmark = document.getElementById('close-bookmark');
        const saveBookmark = document.getElementById('save-bookmark');

        if (addBookmarkBtn) {
            addBookmarkBtn.addEventListener('click', () => {
                bookmarkModal?.classList.add('active');
            });
        }

        if (closeBookmark) {
            closeBookmark.addEventListener('click', () => {
                bookmarkModal?.classList.remove('active');
            });
        }

        if (saveBookmark) {
            saveBookmark.addEventListener('click', async () => {
                await this.addBookmark();
            });
        }

        // Search engine selection
        const searchEngineSelect = document.getElementById('search-engine-select');
        const customSearchEngine = document.getElementById('custom-search-engine');

        if (searchEngineSelect) {
            searchEngineSelect.addEventListener('change', (e) => {
                if (e.target.value === 'custom') {
                    if (customSearchEngine) customSearchEngine.style.display = 'block';
                } else {
                    if (customSearchEngine) customSearchEngine.style.display = 'none';
                }
            });
        }

        // Background type selection
        const backgroundTypeInputs = document.querySelectorAll('input[name="background-type"]');
        const colorPickerContainer = document.querySelector('.color-picker-container');
        const gradientPickerContainer = document.querySelector('.gradient-picker-container');
        const presetGradientContainer = document.querySelector('.preset-gradient-container');
        const imageUploadContainer = document.querySelector('.image-upload-container');
        const presetWallpaperContainer = document.querySelector('.preset-wallpaper-container');

        backgroundTypeInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                // Hide all containers
                if (colorPickerContainer) colorPickerContainer.style.display = 'none';
                if (gradientPickerContainer) gradientPickerContainer.style.display = 'none';
                if (presetGradientContainer) presetGradientContainer.style.display = 'none';
                if (imageUploadContainer) imageUploadContainer.style.display = 'none';
                if (presetWallpaperContainer) presetWallpaperContainer.style.display = 'none';

                // Show appropriate container
                switch (e.target.value) {
                    case 'color':
                        if (colorPickerContainer) colorPickerContainer.style.display = 'block';
                        break;
                    case 'gradient':
                        if (gradientPickerContainer) gradientPickerContainer.style.display = 'block';
                        break;
                    case 'preset-gradient':
                        if (presetGradientContainer) presetGradientContainer.style.display = 'block';
                        break;
                    case 'image':
                        if (imageUploadContainer) imageUploadContainer.style.display = 'block';
                        break;
                    case 'preset-wallpaper':
                        if (presetWallpaperContainer) presetWallpaperContainer.style.display = 'block';
                        break;
                }
            });
        });

        // Preset gradient selection
        const presetGradients = document.querySelectorAll('.preset-gradient');
        presetGradients.forEach(gradient => {
            gradient.addEventListener('click', async () => {
                presetGradients.forEach(g => g.classList.remove('selected'));
                gradient.classList.add('selected');
                this.settings.presetGradient = gradient.dataset.gradient;
                this.applyBackground();
                await this.saveSettings();
            });
        });

        // Preset wallpaper selection
        const presetWallpapers = document.querySelectorAll('.preset-wallpaper');
        presetWallpapers.forEach(wallpaper => {
            wallpaper.addEventListener('click', async () => {
                presetWallpapers.forEach(w => w.classList.remove('selected'));
                wallpaper.classList.add('selected');
                this.settings.presetWallpaper = wallpaper.dataset.wallpaper;
                this.applyBackground();
                await this.saveSettings();
            });
        });

        // Background image upload
        const backgroundImageInput = document.getElementById('background-image');
        const imagePreview = document.getElementById('image-preview');
        const previewImg = document.getElementById('preview-img');
        const removeImageBtn = document.getElementById('remove-image');

        if (backgroundImageInput) {
            backgroundImageInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = async (e) => {
                        this.settings.backgroundImage = e.target.result;
                        if (previewImg) previewImg.src = e.target.result;
                        if (imagePreview) imagePreview.style.display = 'block';
                        this.applyBackground();
                        await this.saveSettings();
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        if (removeImageBtn) {
            removeImageBtn.addEventListener('click', async () => {
                this.settings.backgroundImage = null;
                if (imagePreview) imagePreview.style.display = 'none';
                if (backgroundImageInput) backgroundImageInput.value = '';
                this.applyBackground();
                await this.saveSettings();
            });
        }

        // Gradient direction change
        const gradientDirection = document.getElementById('gradient-direction');
        if (gradientDirection) {
            gradientDirection.addEventListener('change', async (e) => {
                this.settings.gradientDirection = e.target.value;
                this.applyBackground();
                await this.saveSettings();
            });
        }

        // Bookmark icon type selection
        const bookmarkIconTypeInputs = document.querySelectorAll('input[name="bookmark-icon-type"]');
        bookmarkIconTypeInputs.forEach(input => {
            input.addEventListener('change', async (e) => {
                this.settings.bookmarkIconType = e.target.value;
                this.renderBookmarks();
                await this.saveSettings();
            });
        });

        // Bookmark style selection
        const bookmarkStyleSelect = document.getElementById('bookmark-style-select');
        if (bookmarkStyleSelect) {
            bookmarkStyleSelect.addEventListener('change', async (e) => {
                this.settings.bookmarkStyle = e.target.value;
                this.renderBookmarks();
                await this.saveSettings();
            });
        }

        // Close modals when clicking outside
        if (settingsModal) {
            settingsModal.addEventListener('click', (e) => {
                if (e.target === settingsModal) {
                    settingsModal.classList.remove('active');
                }
            });
        }

        if (bookmarkModal) {
            bookmarkModal.addEventListener('click', (e) => {
                if (e.target === bookmarkModal) {
                    bookmarkModal.classList.remove('active');
                }
            });
        }
    }

    updateTime() {
        const now = new Date();
        const timeElement = document.getElementById('current-time');
        const dateElement = document.getElementById('current-date');

        if (timeElement) {
            const timeString = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
            });
            timeElement.textContent = timeString;
        }

        if (dateElement) {
            const dateString = now.toLocaleDateString([], { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
            });
            dateElement.textContent = dateString;
        }
    }

    updateSearchEngine() {
        const indicator = document.getElementById('current-search-engine');
        if (!indicator) return;

        let engineName;

        if (this.settings.searchEngine === 'custom' && this.settings.customSearchEngine) {
            engineName = this.settings.customSearchEngine.name;
        } else {
            engineName = SEARCH_ENGINES[this.settings.searchEngine]?.name || 'Google';
        }

        indicator.textContent = engineName;
    }

    performSearch() {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;

        const query = searchInput.value.trim();
        if (!query) return;

        let searchUrl;

        if (this.settings.searchEngine === 'custom' && this.settings.customSearchEngine) {
            searchUrl = this.settings.customSearchEngine.url.replace('%s', encodeURIComponent(query));
        } else {
            const engine = SEARCH_ENGINES[this.settings.searchEngine] || SEARCH_ENGINES.google;
            searchUrl = engine.url.replace('%s', encodeURIComponent(query));
        }

        window.location.href = searchUrl;
    }

    renderBookmarks() {
        const bookmarksGrid = document.getElementById('bookmarks-grid');
        if (!bookmarksGrid) return;

        bookmarksGrid.innerHTML = '';

        this.settings.bookmarks.forEach((bookmark, index) => {
            const bookmarkElement = document.createElement('a');
            bookmarkElement.className = `bookmark-item style-${this.settings.bookmarkStyle}`;
            bookmarkElement.href = bookmark.url;
            bookmarkElement.target = '_blank';

            let iconContent = '';
            let iconClass = 'bookmark-icon';

            switch (this.settings.bookmarkIconType) {
                case 'emoji':
                    iconContent = bookmark.icon || '🌐';
                    break;
                case 'letter':
                    iconContent = bookmark.name.charAt(0).toUpperCase();
                    iconClass += ' letter';
                    break;
                case 'favicon':
                    const domain = new URL(bookmark.url).hostname;
                    iconContent = '';
                    iconClass += ' favicon';
                    break;
            }

            if (this.settings.bookmarkIconType === 'favicon') {
                const domain = new URL(bookmark.url).hostname;
                const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
                bookmarkElement.innerHTML = `
                    <div class="${iconClass}" style="background-image: url('${faviconUrl}')"></div>
                    <div class="bookmark-name">${bookmark.name}</div>
                    <button class="bookmark-delete" data-index="${index}">×</button>
                `;
            } else {
                bookmarkElement.innerHTML = `
                    <div class="${iconClass}">${iconContent}</div>
                    <div class="bookmark-name">${bookmark.name}</div>
                    <button class="bookmark-delete" data-index="${index}">×</button>
                `;
            }

            const deleteBtn = bookmarkElement.querySelector('.bookmark-delete');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await this.deleteBookmark(index);
                });
            }

            bookmarksGrid.appendChild(bookmarkElement);
        });
    }

    openSettingsModal() {
        const modal = document.getElementById('settings-modal');
        if (!modal) return;
        
        // Populate current settings
        const searchEngineSelect = document.getElementById('search-engine-select');
        const themeSelect = document.getElementById('theme-select');
        const backgroundColorInput = document.getElementById('background-color');
        const gradientColor1Input = document.getElementById('gradient-color1');
        const gradientColor2Input = document.getElementById('gradient-color2');
        const gradientDirectionSelect = document.getElementById('gradient-direction');
        const bookmarkStyleSelect = document.getElementById('bookmark-style-select');

        if (searchEngineSelect) searchEngineSelect.value = this.settings.searchEngine;
        if (themeSelect) themeSelect.value = this.settings.theme;
        if (backgroundColorInput) backgroundColorInput.value = this.settings.backgroundColor;
        if (gradientColor1Input) gradientColor1Input.value = this.settings.gradientColor1;
        if (gradientColor2Input) gradientColor2Input.value = this.settings.gradientColor2;
        if (gradientDirectionSelect) gradientDirectionSelect.value = this.settings.gradientDirection;
        if (bookmarkStyleSelect) bookmarkStyleSelect.value = this.settings.bookmarkStyle;

        // Set background type
        const backgroundTypeInput = document.querySelector(`input[name="background-type"][value="${this.settings.backgroundType}"]`);
        if (backgroundTypeInput) backgroundTypeInput.checked = true;
        
        // Set bookmark icon type
        const bookmarkIconTypeInput = document.querySelector(`input[name="bookmark-icon-type"][value="${this.settings.bookmarkIconType}"]`);
        if (bookmarkIconTypeInput) bookmarkIconTypeInput.checked = true;

        // Trigger background type change to show appropriate controls
        if (backgroundTypeInput) {
            backgroundTypeInput.dispatchEvent(new Event('change'));
        }

        // Handle custom search engine
        if (this.settings.searchEngine === 'custom' && this.settings.customSearchEngine) {
            const customSearchEngine = document.getElementById('custom-search-engine');
            const customSearchName = document.getElementById('custom-search-name');
            const customSearchUrl = document.getElementById('custom-search-url');
            
            if (customSearchEngine) customSearchEngine.style.display = 'block';
            if (customSearchName) customSearchName.value = this.settings.customSearchEngine.name;
            if (customSearchUrl) customSearchUrl.value = this.settings.customSearchEngine.url;
        }

        // Handle preset gradient selection
        if (this.settings.backgroundType === 'preset-gradient' && this.settings.presetGradient) {
            const presetGradients = document.querySelectorAll('.preset-gradient');
            presetGradients.forEach(gradient => {
                if (gradient.dataset.gradient === this.settings.presetGradient) {
                    gradient.classList.add('selected');
                }
            });
        }

        // Handle preset wallpaper selection
        if (this.settings.backgroundType === 'preset-wallpaper' && this.settings.presetWallpaper) {
            const presetWallpapers = document.querySelectorAll('.preset-wallpaper');
            presetWallpapers.forEach(wallpaper => {
                if (wallpaper.dataset.wallpaper === this.settings.presetWallpaper) {
                    wallpaper.classList.add('selected');
                }
            });
        }

        // Handle custom image preview
        if (this.settings.backgroundImage) {
            const imagePreview = document.getElementById('image-preview');
            const previewImg = document.getElementById('preview-img');
            if (previewImg) previewImg.src = this.settings.backgroundImage;
            if (imagePreview) imagePreview.style.display = 'block';
        }

        modal.classList.add('active');
    }

    async saveSettingsFromModal() {
        const searchEngine = document.getElementById('search-engine-select')?.value;
        const theme = document.getElementById('theme-select')?.value;
        const backgroundType = document.querySelector('input[name="background-type"]:checked')?.value;
        const backgroundColor = document.getElementById('background-color')?.value;
        const gradientColor1 = document.getElementById('gradient-color1')?.value;
        const gradientColor2 = document.getElementById('gradient-color2')?.value;
        const gradientDirection = document.getElementById('gradient-direction')?.value;
        const bookmarkIconType = document.querySelector('input[name="bookmark-icon-type"]:checked')?.value;
        const bookmarkStyle = document.getElementById('bookmark-style-select')?.value;

        if (searchEngine) this.settings.searchEngine = searchEngine;
        if (theme) this.settings.theme = theme;
        if (backgroundType) this.settings.backgroundType = backgroundType;
        if (backgroundColor) this.settings.backgroundColor = backgroundColor;
        if (gradientColor1) this.settings.gradientColor1 = gradientColor1;
        if (gradientColor2) this.settings.gradientColor2 = gradientColor2;
        if (gradientDirection) this.settings.gradientDirection = gradientDirection;
        if (bookmarkIconType) this.settings.bookmarkIconType = bookmarkIconType;
        if (bookmarkStyle) this.settings.bookmarkStyle = bookmarkStyle;

        // Handle custom search engine
        if (searchEngine === 'custom') {
            const customName = document.getElementById('custom-search-name')?.value.trim();
            const customUrl = document.getElementById('custom-search-url')?.value.trim();

            if (customName && customUrl && customUrl.includes('%s')) {
                this.settings.customSearchEngine = {
                    name: customName,
                    url: customUrl
                };
            } else {
                alert('Please provide a valid custom search engine name and URL (URL must contain %s)');
                return;
            }
        }

        // Clear preset selections if not using them
        if (backgroundType !== 'preset-gradient') {
            this.settings.presetGradient = null;
        }
        if (backgroundType !== 'preset-wallpaper') {
            this.settings.presetWallpaper = null;
        }
        if (backgroundType !== 'image') {
            this.settings.backgroundImage = null;
        }

        const saved = await this.saveSettings();
        if (saved) {
            this.updateSearchEngine();
            this.renderBookmarks();
            this.applyTheme();
            this.applyBackground();

            const settingsModal = document.getElementById('settings-modal');
            if (settingsModal) settingsModal.classList.remove('active');
        } else {
            alert('Failed to save settings. Please try again.');
        }
    }

    async resetToDefaults() {
        if (confirm('Are you sure you want to reset all settings to default?')) {
            this.settings = { ...DEFAULT_SETTINGS };
            const saved = await this.saveSettings();
            
            if (saved) {
                this.updateSearchEngine();
                this.renderBookmarks();
                this.applyTheme();
                this.applyBackground();
                
                const settingsModal = document.getElementById('settings-modal');
                if (settingsModal) settingsModal.classList.remove('active');
            } else {
                alert('Failed to reset settings. Please try again.');
            }
        }
    }

    async addBookmark() {
        const nameInput = document.getElementById('bookmark-name');
        const urlInput = document.getElementById('bookmark-url');
        
        if (!nameInput || !urlInput) return;

        const name = nameInput.value.trim();
        const url = urlInput.value.trim();

        if (!name || !url) {
            alert('Please provide both name and URL for the bookmark');
            return;
        }

        // Simple URL validation
        try {
            new URL(url);
        } catch {
            alert('Please provide a valid URL');
            return;
        }

        // Generate a simple icon based on the first letter of the name
        const icon = name.charAt(0).toUpperCase();

        this.settings.bookmarks.push({ name, url, icon });
        const saved = await this.saveSettings();
        
        if (saved) {
            this.renderBookmarks();

            // Clear form and close modal
            nameInput.value = '';
            urlInput.value = '';
            const bookmarkModal = document.getElementById('bookmark-modal');
            if (bookmarkModal) bookmarkModal.classList.remove('active');
        } else {
            alert('Failed to save bookmark. Please try again.');
        }
    }

    async deleteBookmark(index) {
        if (confirm('Are you sure you want to delete this bookmark?')) {
            this.settings.bookmarks.splice(index, 1);
            const saved = await this.saveSettings();
            
            if (saved) {
                this.renderBookmarks();
            } else {
                alert('Failed to delete bookmark. Please try again.');
            }
        }
    }

    applyTheme() {
        const body = document.body;
        if (!body) return;

        body.classList.remove('light-theme', 'dark-theme');

        if (this.settings.theme === 'light') {
            body.classList.add('light-theme');
        } else if (this.settings.theme === 'dark') {
            body.classList.add('dark-theme');
        } else {
            // Auto theme - detect system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            body.classList.add(prefersDark ? 'dark-theme' : 'light-theme');
        }
    }

    applyBackground() {
        const body = document.body;
        if (!body) return;

        switch (this.settings.backgroundType) {
            case 'color':
                body.style.background = this.settings.backgroundColor;
                break;
            case 'gradient':
                body.style.background = `linear-gradient(${this.settings.gradientDirection}, ${this.settings.gradientColor1} 0%, ${this.settings.gradientColor2} 100%)`;
                break;
            case 'preset-gradient':
                if (this.settings.presetGradient) {
                    body.style.background = this.settings.presetGradient;
                }
                break;
            case 'image':
                if (this.settings.backgroundImage) {
                    body.style.background = `url(${this.settings.backgroundImage}) center/cover no-repeat`;
                }
                break;
            case 'preset-wallpaper':
                if (this.settings.presetWallpaper) {
                    body.style.background = `url(${this.settings.presetWallpaper}) center/cover no-repeat`;
                }
                break;
        }
    }
}

// Global reference for debugging
let newTabPageInstance;

// Initialize the new tab page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    newTabPageInstance = new NewTabPage();
    window.newTabPage = newTabPageInstance; // For debugging
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (newTabPageInstance && newTabPageInstance.settings.theme === 'auto') {
        newTabPageInstance.applyTheme();
    }
});

// Handle page visibility changes to ensure settings persist
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && newTabPageInstance) {
        // Save settings when page becomes hidden (user switching tabs/closing)
        newTabPageInstance.saveSettings();
    }
});

// Handle beforeunload to save settings
window.addEventListener('beforeunload', () => {
    if (newTabPageInstance) {
        newTabPageInstance.saveSettings();
    }
});


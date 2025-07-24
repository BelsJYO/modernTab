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
        this.settings = DEFAULT_SETTINGS;
        this.init();
    }

    async init() {
        await this.loadSettings();
        this.setupEventListeners();
        this.updateTime();
        this.updateSearchEngine();
        this.renderBookmarks();
        this.applyTheme();
        this.applyBackground();
        
        // Update time every second
        setInterval(() => this.updateTime(), 1000);
    }

    async loadSettings() {
        try {
            const result = await browser.storage.local.get('newTabSettings');
            if (result.newTabSettings) {
                this.settings = { ...DEFAULT_SETTINGS, ...result.newTabSettings };
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    async saveSettings() {
        try {
            await browser.storage.local.set({ newTabSettings: this.settings });
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
        
        searchButton.addEventListener('click', () => {
            this.performSearch();
        });

        // Settings modal
        const settingsBtn = document.getElementById('settings-btn');
        const settingsModal = document.getElementById('settings-modal');
        const closeSettings = document.getElementById('close-settings');
        const saveSettings = document.getElementById('save-settings');
        const resetSettings = document.getElementById('reset-settings');

        settingsBtn.addEventListener('click', () => {
            this.openSettingsModal();
        });

        closeSettings.addEventListener('click', () => {
            settingsModal.classList.remove('active');
        });

        saveSettings.addEventListener('click', () => {
            this.saveSettingsFromModal();
        });

        resetSettings.addEventListener('click', () => {
            this.resetToDefaults();
        });

        // Bookmark modal
        const addBookmarkBtn = document.getElementById('add-bookmark-btn');
        const bookmarkModal = document.getElementById('bookmark-modal');
        const closeBookmark = document.getElementById('close-bookmark');
        const saveBookmark = document.getElementById('save-bookmark');

        addBookmarkBtn.addEventListener('click', () => {
            bookmarkModal.classList.add('active');
        });

        closeBookmark.addEventListener('click', () => {
            bookmarkModal.classList.remove('active');
        });

        saveBookmark.addEventListener('click', () => {
            this.addBookmark();
        });

        // Search engine selection
        const searchEngineSelect = document.getElementById('search-engine-select');
        const customSearchEngine = document.getElementById('custom-search-engine');

        searchEngineSelect.addEventListener('change', (e) => {
            if (e.target.value === 'custom') {
                customSearchEngine.style.display = 'block';
            } else {
                customSearchEngine.style.display = 'none';
            }
        });

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
                colorPickerContainer.style.display = 'none';
                gradientPickerContainer.style.display = 'none';
                presetGradientContainer.style.display = 'none';
                imageUploadContainer.style.display = 'none';
                presetWallpaperContainer.style.display = 'none';

                // Show appropriate container
                switch (e.target.value) {
                    case 'color':
                        colorPickerContainer.style.display = 'block';
                        break;
                    case 'gradient':
                        gradientPickerContainer.style.display = 'block';
                        break;
                    case 'preset-gradient':
                        presetGradientContainer.style.display = 'block';
                        break;
                    case 'image':
                        imageUploadContainer.style.display = 'block';
                        break;
                    case 'preset-wallpaper':
                        presetWallpaperContainer.style.display = 'block';
                        break;
                }
            });
        });

        // Preset gradient selection
        const presetGradients = document.querySelectorAll('.preset-gradient');
        presetGradients.forEach(gradient => {
            gradient.addEventListener('click', () => {
                presetGradients.forEach(g => g.classList.remove('selected'));
                gradient.classList.add('selected');
                this.settings.presetGradient = gradient.dataset.gradient;
                this.applyBackground();
            });
        });

        // Preset wallpaper selection
        const presetWallpapers = document.querySelectorAll('.preset-wallpaper');
        presetWallpapers.forEach(wallpaper => {
            wallpaper.addEventListener('click', () => {
                presetWallpapers.forEach(w => w.classList.remove('selected'));
                wallpaper.classList.add('selected');
                this.settings.presetWallpaper = wallpaper.dataset.wallpaper;
                this.applyBackground();
            });
        });

        // Background image upload
        const backgroundImageInput = document.getElementById('background-image');
        const imagePreview = document.getElementById('image-preview');
        const previewImg = document.getElementById('preview-img');
        const removeImageBtn = document.getElementById('remove-image');

        backgroundImageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.settings.backgroundImage = e.target.result;
                    previewImg.src = e.target.result;
                    imagePreview.style.display = 'block';
                    this.applyBackground();
                };
                reader.readAsDataURL(file);
            }
        });

        removeImageBtn.addEventListener('click', () => {
            this.settings.backgroundImage = null;
            imagePreview.style.display = 'none';
            backgroundImageInput.value = '';
            this.applyBackground();
        });

        // Gradient direction change
        const gradientDirection = document.getElementById('gradient-direction');
        gradientDirection.addEventListener('change', (e) => {
            this.settings.gradientDirection = e.target.value;
            this.applyBackground();
        });

        // Bookmark icon type selection
        const bookmarkIconTypeInputs = document.querySelectorAll('input[name="bookmark-icon-type"]');
        bookmarkIconTypeInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.settings.bookmarkIconType = e.target.value;
                this.renderBookmarks();
            });
        });

        // Bookmark style selection
        const bookmarkStyleSelect = document.getElementById('bookmark-style-select');
        bookmarkStyleSelect.addEventListener('change', (e) => {
            this.settings.bookmarkStyle = e.target.value;
            this.renderBookmarks();
        });

        // Close modals when clicking outside
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                settingsModal.classList.remove('active');
            }
        });

        bookmarkModal.addEventListener('click', (e) => {
            if (e.target === bookmarkModal) {
                bookmarkModal.classList.remove('active');
            }
        });
    }

    updateTime() {
        const now = new Date();
        const timeElement = document.getElementById('current-time');
        const dateElement = document.getElementById('current-date');

        const timeString = now.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });

        const dateString = now.toLocaleDateString([], { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
        });

        timeElement.textContent = timeString;
        dateElement.textContent = dateString;
    }

    updateSearchEngine() {
        const indicator = document.getElementById('current-search-engine');
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
                    // Use Google's favicon service as fallback
                    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
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
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.deleteBookmark(index);
            });

            bookmarksGrid.appendChild(bookmarkElement);
        });
    }

    openSettingsModal() {
        const modal = document.getElementById('settings-modal');
        
        // Populate current settings
        document.getElementById('search-engine-select').value = this.settings.searchEngine;
        document.getElementById('theme-select').value = this.settings.theme;
        document.getElementById('background-color').value = this.settings.backgroundColor;
        document.getElementById('gradient-color1').value = this.settings.gradientColor1;
        document.getElementById('gradient-color2').value = this.settings.gradientColor2;
        document.getElementById('gradient-direction').value = this.settings.gradientDirection;
        document.getElementById('bookmark-style-select').value = this.settings.bookmarkStyle;

        // Set background type
        document.querySelector(`input[name="background-type"][value="${this.settings.backgroundType}"]`).checked = true;
        
        // Set bookmark icon type
        document.querySelector(`input[name="bookmark-icon-type"][value="${this.settings.bookmarkIconType}"]`).checked = true;

        // Show/hide appropriate background controls
        const backgroundEvent = { target: { value: this.settings.backgroundType } };
        document.querySelector(`input[name="background-type"][value="${this.settings.backgroundType}"]`).dispatchEvent(new Event('change'));

        // Handle custom search engine
        if (this.settings.searchEngine === 'custom' && this.settings.customSearchEngine) {
            document.getElementById('custom-search-engine').style.display = 'block';
            document.getElementById('custom-search-name').value = this.settings.customSearchEngine.name;
            document.getElementById('custom-search-url').value = this.settings.customSearchEngine.url;
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
            previewImg.src = this.settings.backgroundImage;
            imagePreview.style.display = 'block';
        }

        modal.classList.add('active');
    }

    async saveSettingsFromModal() {
        const searchEngine = document.getElementById('search-engine-select').value;
        const theme = document.getElementById('theme-select').value;
        const backgroundType = document.querySelector('input[name="background-type"]:checked').value;
        const backgroundColor = document.getElementById('background-color').value;
        const gradientColor1 = document.getElementById('gradient-color1').value;
        const gradientColor2 = document.getElementById('gradient-color2').value;
        const gradientDirection = document.getElementById('gradient-direction').value;
        const bookmarkIconType = document.querySelector('input[name="bookmark-icon-type"]:checked').value;
        const bookmarkStyle = document.getElementById('bookmark-style-select').value;

        this.settings.searchEngine = searchEngine;
        this.settings.theme = theme;
        this.settings.backgroundType = backgroundType;
        this.settings.backgroundColor = backgroundColor;
        this.settings.gradientColor1 = gradientColor1;
        this.settings.gradientColor2 = gradientColor2;
        this.settings.gradientDirection = gradientDirection;
        this.settings.bookmarkIconType = bookmarkIconType;
        this.settings.bookmarkStyle = bookmarkStyle;

        // Handle custom search engine
        if (searchEngine === 'custom') {
            const customName = document.getElementById('custom-search-name').value.trim();
            const customUrl = document.getElementById('custom-search-url').value.trim();

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

        await this.saveSettings();
        this.updateSearchEngine();
        this.renderBookmarks();
        this.applyTheme();
        this.applyBackground();

        document.getElementById('settings-modal').classList.remove('active');
    }

    async resetToDefaults() {
        if (confirm('Are you sure you want to reset all settings to default?')) {
            this.settings = { ...DEFAULT_SETTINGS };
            await this.saveSettings();
            this.updateSearchEngine();
            this.renderBookmarks();
            this.applyTheme();
            this.applyBackground();
            document.getElementById('settings-modal').classList.remove('active');
        }
    }

    addBookmark() {
        const name = document.getElementById('bookmark-name').value.trim();
        const url = document.getElementById('bookmark-url').value.trim();

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
        this.saveSettings();
        this.renderBookmarks();

        // Clear form and close modal
        document.getElementById('bookmark-name').value = '';
        document.getElementById('bookmark-url').value = '';
        document.getElementById('bookmark-modal').classList.remove('active');
    }

    deleteBookmark(index) {
        if (confirm('Are you sure you want to delete this bookmark?')) {
            this.settings.bookmarks.splice(index, 1);
            this.saveSettings();
            this.renderBookmarks();
        }
    }

    applyTheme() {
        const body = document.body;
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

// Initialize the new tab page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NewTabPage();
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (window.newTabPage && window.newTabPage.settings.theme === 'auto') {
        window.newTabPage.applyTheme();
    }
});


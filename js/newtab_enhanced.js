// Enhanced Modern New Tab - With dynamic greetings and smooth animations

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

// Dynamic greetings based on time
const GREETINGS = {
    morning: ['Good morning', 'Rise and shine', 'Morning sunshine', 'Hello there'],
    afternoon: ['Good afternoon', 'Hope your day is going well', 'Afternoon', 'Hello'],
    evening: ['Good evening', 'Evening', 'Hope you had a great day', 'Hello'],
    night: ['Good night', 'Working late?', 'Night owl', 'Hello night owl']
};

// Default settings with enhanced options
const DEFAULT_SETTINGS = {
    searchEngine: 'google',
    customSearchEngine: null,
    theme: 'dark',
    backgroundType: 'gradient',
    backgroundColor: '#1a1a2e',
    gradientColor1: '#667eea',
    gradientColor2: '#764ba2',
    gradientDirection: '135deg',
    presetGradient: null,
    backgroundImage: null,
    presetWallpaper: null,
    bookmarkIconType: 'emoji',
    bookmarkStyle: 'rounded',
    showGreeting: true,
    userName: '',
    animationsEnabled: true,
    bookmarks: [
        { name: 'YouTube', url: 'https://youtube.com', icon: '📺' },
        { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
        { name: 'Reddit', url: 'https://reddit.com', icon: '🔴' },
        { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' }
    ]
};

class EnhancedNewTabPage {
    constructor() {
        this.settings = { ...DEFAULT_SETTINGS };
        this.isInitialized = false;
        this.animationQueue = [];
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
            this.updateGreeting();
            
            // Mark as initialized
            this.isInitialized = true;
            
            // Update time every second
            setInterval(() => this.updateTime(), 1000);
            
            // Update greeting every minute
            setInterval(() => this.updateGreeting(), 60000);
            
            console.log('Enhanced Modern New Tab initialized successfully');
        } catch (error) {
            console.error('Error initializing Enhanced Modern New Tab:', error);
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

    // Get dynamic greeting based on time
    getGreeting() {
        const hour = new Date().getHours();
        let timeOfDay;
        
        if (hour >= 5 && hour < 12) {
            timeOfDay = 'morning';
        } else if (hour >= 12 && hour < 17) {
            timeOfDay = 'afternoon';
        } else if (hour >= 17 && hour < 22) {
            timeOfDay = 'evening';
        } else {
            timeOfDay = 'night';
        }
        
        const greetings = GREETINGS[timeOfDay];
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        
        if (this.settings.userName) {
            return `${randomGreeting}, ${this.settings.userName}`;
        }
        
        return randomGreeting;
    }

    updateGreeting() {
        if (!this.settings.showGreeting) return;
        
        const greetingElement = document.getElementById('greeting-text');
        if (greetingElement) {
            const newGreeting = this.getGreeting();
            if (greetingElement.textContent !== newGreeting) {
                // Animate greeting change
                greetingElement.style.opacity = '0';
                greetingElement.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    greetingElement.textContent = newGreeting;
                    greetingElement.style.opacity = '1';
                    greetingElement.style.transform = 'translateY(0)';
                }, 300);
            }
        }
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

            // Add smooth focus animations
            searchInput.addEventListener('focus', () => {
                if (this.settings.animationsEnabled) {
                    searchInput.style.transform = 'translateY(-2px) scale(1.02)';
                }
            });

            searchInput.addEventListener('blur', () => {
                if (this.settings.animationsEnabled) {
                    searchInput.style.transform = 'translateY(0) scale(1)';
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
                this.closeModal(settingsModal);
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
                this.openModal(bookmarkModal);
            });
        }

        if (closeBookmark) {
            closeBookmark.addEventListener('click', () => {
                this.closeModal(bookmarkModal);
            });
        }

        if (saveBookmark) {
            saveBookmark.addEventListener('click', async () => {
                await this.addBookmark();
            });
        }

        // Enhanced modal interactions
        if (settingsModal) {
            settingsModal.addEventListener('click', (e) => {
                if (e.target === settingsModal) {
                    this.closeModal(settingsModal);
                }
            });
        }

        if (bookmarkModal) {
            bookmarkModal.addEventListener('click', (e) => {
                if (e.target === bookmarkModal) {
                    this.closeModal(bookmarkModal);
                }
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal(settingsModal);
                this.closeModal(bookmarkModal);
            }
            
            if (e.ctrlKey || e.metaKey) {
                if (e.key === ',') {
                    e.preventDefault();
                    this.openSettingsModal();
                }
                if (e.key === 'b') {
                    e.preventDefault();
                    this.openModal(bookmarkModal);
                }
            }
        });

        // Rest of the event listeners (same as before but with enhanced animations)
        this.setupFormEventListeners();
    }

    setupFormEventListeners() {
        // Search engine selection
        const searchEngineSelect = document.getElementById('search-engine-select');
        const customSearchEngine = document.getElementById('custom-search-engine');

        if (searchEngineSelect) {
            searchEngineSelect.addEventListener('change', (e) => {
                if (e.target.value === 'custom') {
                    if (customSearchEngine) {
                        customSearchEngine.style.display = 'block';
                        this.animateIn(customSearchEngine);
                    }
                } else {
                    if (customSearchEngine) {
                        this.animateOut(customSearchEngine, () => {
                            customSearchEngine.style.display = 'none';
                        });
                    }
                }
            });
        }

        // Background type selection with animations
        const backgroundTypeInputs = document.querySelectorAll('input[name="background-type"]');
        const containers = {
            color: document.querySelector('.color-picker-container'),
            gradient: document.querySelector('.gradient-picker-container'),
            'preset-gradient': document.querySelector('.preset-gradient-container'),
            image: document.querySelector('.image-upload-container'),
            'preset-wallpaper': document.querySelector('.preset-wallpaper-container')
        };

        backgroundTypeInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                // Hide all containers with animation
                Object.values(containers).forEach(container => {
                    if (container && container.style.display !== 'none') {
                        this.animateOut(container, () => {
                            container.style.display = 'none';
                        });
                    }
                });

                // Show appropriate container with animation
                const targetContainer = containers[e.target.value];
                if (targetContainer) {
                    setTimeout(() => {
                        targetContainer.style.display = 'block';
                        this.animateIn(targetContainer);
                    }, 200);
                }
            });
        });

        // Enhanced preset interactions
        this.setupPresetInteractions();
        this.setupImageUpload();
        this.setupColorInputs();
    }

    setupPresetInteractions() {
        // Preset gradient selection with enhanced animations
        const presetGradients = document.querySelectorAll('.preset-gradient');
        presetGradients.forEach((gradient, index) => {
            gradient.addEventListener('click', async () => {
                // Remove selection from others with animation
                presetGradients.forEach(g => {
                    if (g !== gradient) {
                        g.classList.remove('selected');
                        g.style.transform = 'scale(1)';
                    }
                });
                
                // Add selection with bounce animation
                gradient.classList.add('selected');
                if (this.settings.animationsEnabled) {
                    gradient.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        gradient.style.transform = 'scale(1.05)';
                    }, 150);
                }
                
                this.settings.presetGradient = gradient.dataset.gradient;
                this.applyBackground();
                await this.saveSettings();
            });

            // Add hover animations
            gradient.addEventListener('mouseenter', () => {
                if (this.settings.animationsEnabled && !gradient.classList.contains('selected')) {
                    gradient.style.transform = 'scale(1.05)';
                }
            });

            gradient.addEventListener('mouseleave', () => {
                if (this.settings.animationsEnabled && !gradient.classList.contains('selected')) {
                    gradient.style.transform = 'scale(1)';
                }
            });
        });

        // Similar setup for preset wallpapers
        const presetWallpapers = document.querySelectorAll('.preset-wallpaper');
        presetWallpapers.forEach(wallpaper => {
            wallpaper.addEventListener('click', async () => {
                presetWallpapers.forEach(w => {
                    if (w !== wallpaper) {
                        w.classList.remove('selected');
                        w.style.transform = 'scale(1)';
                    }
                });
                
                wallpaper.classList.add('selected');
                if (this.settings.animationsEnabled) {
                    wallpaper.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        wallpaper.style.transform = 'scale(1.05)';
                    }, 150);
                }
                
                this.settings.presetWallpaper = wallpaper.dataset.wallpaper;
                this.applyBackground();
                await this.saveSettings();
            });
        });
    }

    setupImageUpload() {
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
                        if (imagePreview) {
                            imagePreview.style.display = 'block';
                            this.animateIn(imagePreview);
                        }
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
                if (imagePreview) {
                    this.animateOut(imagePreview, () => {
                        imagePreview.style.display = 'none';
                    });
                }
                if (backgroundImageInput) backgroundImageInput.value = '';
                this.applyBackground();
                await this.saveSettings();
            });
        }
    }

    setupColorInputs() {
        // Real-time color updates with smooth transitions
        const colorInputs = ['background-color', 'gradient-color1', 'gradient-color2'];
        
        colorInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', async (e) => {
                    const property = inputId.replace('-', '');
                    this.settings[property] = e.target.value;
                    this.applyBackground();
                    // Debounced save
                    clearTimeout(this.colorSaveTimeout);
                    this.colorSaveTimeout = setTimeout(() => {
                        this.saveSettings();
                    }, 500);
                });
            }
        });

        // Gradient direction with real-time updates
        const gradientDirection = document.getElementById('gradient-direction');
        if (gradientDirection) {
            gradientDirection.addEventListener('change', async (e) => {
                this.settings.gradientDirection = e.target.value;
                this.applyBackground();
                await this.saveSettings();
            });
        }
    }

    // Animation utilities
    animateIn(element) {
        if (!this.settings.animationsEnabled) return;
        
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px) scale(0.95)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        });
    }

    animateOut(element, callback) {
        if (!this.settings.animationsEnabled) {
            if (callback) callback();
            return;
        }
        
        element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        element.style.opacity = '0';
        element.style.transform = 'translateY(-20px) scale(0.95)';
        
        setTimeout(() => {
            if (callback) callback();
        }, 300);
    }

    openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
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

        // Add search animation
        if (this.settings.animationsEnabled) {
            searchInput.style.transform = 'scale(0.98)';
            setTimeout(() => {
                searchInput.style.transform = 'scale(1)';
            }, 100);
        }

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

            // Enhanced bookmark interactions
            bookmarkElement.addEventListener('mouseenter', () => {
                if (this.settings.animationsEnabled) {
                    bookmarkElement.style.transform = 'translateY(-8px) scale(1.02)';
                }
            });

            bookmarkElement.addEventListener('mouseleave', () => {
                if (this.settings.animationsEnabled) {
                    bookmarkElement.style.transform = 'translateY(0) scale(1)';
                }
            });

            const deleteBtn = bookmarkElement.querySelector('.bookmark-delete');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await this.deleteBookmark(index);
                });
            }

            bookmarksGrid.appendChild(bookmarkElement);

            // Staggered animation for bookmarks
            if (this.settings.animationsEnabled) {
                bookmarkElement.style.opacity = '0';
                bookmarkElement.style.transform = 'translateY(20px) scale(0.9)';
                
                setTimeout(() => {
                    bookmarkElement.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    bookmarkElement.style.opacity = '1';
                    bookmarkElement.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }

    openSettingsModal() {
        const modal = document.getElementById('settings-modal');
        if (!modal) return;
        
        // Populate current settings
        this.populateSettingsForm();
        this.openModal(modal);
    }

    populateSettingsForm() {
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
        if (backgroundTypeInput) {
            backgroundTypeInput.checked = true;
            backgroundTypeInput.dispatchEvent(new Event('change'));
        }
        
        // Set bookmark icon type
        const bookmarkIconTypeInput = document.querySelector(`input[name="bookmark-icon-type"][value="${this.settings.bookmarkIconType}"]`);
        if (bookmarkIconTypeInput) bookmarkIconTypeInput.checked = true;

        // Handle custom search engine
        if (this.settings.searchEngine === 'custom' && this.settings.customSearchEngine) {
            const customSearchEngine = document.getElementById('custom-search-engine');
            const customSearchName = document.getElementById('custom-search-name');
            const customSearchUrl = document.getElementById('custom-search-url');
            
            if (customSearchEngine) customSearchEngine.style.display = 'block';
            if (customSearchName) customSearchName.value = this.settings.customSearchEngine.name;
            if (customSearchUrl) customSearchUrl.value = this.settings.customSearchEngine.url;
        }

        // Handle preset selections
        this.updatePresetSelections();

        // Handle custom image preview
        if (this.settings.backgroundImage) {
            const imagePreview = document.getElementById('image-preview');
            const previewImg = document.getElementById('preview-img');
            if (previewImg) previewImg.src = this.settings.backgroundImage;
            if (imagePreview) imagePreview.style.display = 'block';
        }
    }

    updatePresetSelections() {
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
            this.closeModal(settingsModal);
            
            // Show success animation
            this.showNotification('Settings saved successfully!', 'success');
        } else {
            this.showNotification('Failed to save settings. Please try again.', 'error');
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
                this.closeModal(settingsModal);
                
                this.showNotification('Settings reset to defaults!', 'success');
            } else {
                this.showNotification('Failed to reset settings. Please try again.', 'error');
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
            this.showNotification('Please provide both name and URL for the bookmark', 'error');
            return;
        }

        // Simple URL validation
        try {
            new URL(url);
        } catch {
            this.showNotification('Please provide a valid URL', 'error');
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
            this.closeModal(bookmarkModal);
            
            this.showNotification('Bookmark added successfully!', 'success');
        } else {
            this.showNotification('Failed to save bookmark. Please try again.', 'error');
        }
    }

    async deleteBookmark(index) {
        if (confirm('Are you sure you want to delete this bookmark?')) {
            const bookmarkElement = document.querySelector(`[data-index="${index}"]`)?.closest('.bookmark-item');
            
            // Animate out the bookmark
            if (bookmarkElement && this.settings.animationsEnabled) {
                bookmarkElement.style.transform = 'scale(0.8) translateY(-20px)';
                bookmarkElement.style.opacity = '0';
                
                setTimeout(async () => {
                    this.settings.bookmarks.splice(index, 1);
                    const saved = await this.saveSettings();
                    
                    if (saved) {
                        this.renderBookmarks();
                        this.showNotification('Bookmark deleted', 'success');
                    } else {
                        this.showNotification('Failed to delete bookmark. Please try again.', 'error');
                    }
                }, 300);
            } else {
                this.settings.bookmarks.splice(index, 1);
                const saved = await this.saveSettings();
                
                if (saved) {
                    this.renderBookmarks();
                    this.showNotification('Bookmark deleted', 'success');
                } else {
                    this.showNotification('Failed to delete bookmark. Please try again.', 'error');
                }
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

        // Add smooth transition for background changes
        body.style.transition = 'background 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

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

        // Remove transition after background change
        setTimeout(() => {
            body.style.transition = '';
        }, 600);
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: var(--border-radius);
            padding: 1rem 1.5rem;
            color: var(--primary-text);
            backdrop-filter: var(--backdrop-blur);
            box-shadow: var(--shadow-soft);
            z-index: 10000;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;

        if (type === 'success') {
            notification.style.borderColor = 'var(--success-color)';
        } else if (type === 'error') {
            notification.style.borderColor = 'var(--danger-color)';
        }

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
        });

        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-100px)';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }, 3000);
    }
}

// Global reference for debugging
let enhancedNewTabPageInstance;

// Initialize the enhanced new tab page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    enhancedNewTabPageInstance = new EnhancedNewTabPage();
    window.newTabPage = enhancedNewTabPageInstance; // For debugging
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (enhancedNewTabPageInstance && enhancedNewTabPageInstance.settings.theme === 'auto') {
        enhancedNewTabPageInstance.applyTheme();
    }
});

// Handle page visibility changes to ensure settings persist
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && enhancedNewTabPageInstance) {
        // Save settings when page becomes hidden (user switching tabs/closing)
        enhancedNewTabPageInstance.saveSettings();
    }
});

// Handle beforeunload to save settings
window.addEventListener('beforeunload', () => {
    if (enhancedNewTabPageInstance) {
        enhancedNewTabPageInstance.saveSettings();
    }
});

// Add some easter eggs and fun interactions
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        // Developer mode toggle
        document.body.classList.toggle('debug-mode');
    }
});

// Konami code easter egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
        konamiCode = [];
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);


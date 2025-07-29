// mtab-Inspired Modern New Tab - Better icon handling and horizontal layout

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
    evening: ['Good evening', 'Hope you had a great day', 'Evening', 'Hello'],
    night: ['Good night', 'Working late?', 'Night owl', 'Hello night owl']
};

// High-quality icon mappings for popular sites
const SITE_ICONS = {
    'youtube.com': {
        icon: '🎥',
        color: '#FF0000',
        svg: `<svg viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
    },
    'github.com': {
        icon: '🐙',
        color: '#333',
        svg: `<svg viewBox="0 0 24 24" fill="#333"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
    },
    'reddit.com': {
        icon: '🔴',
        color: '#FF4500',
        svg: `<svg viewBox="0 0 24 24" fill="#FF4500"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>`
    },
    'twitter.com': {
        icon: '🐦',
        color: '#1DA1F2',
        svg: `<svg viewBox="0 0 24 24" fill="#1DA1F2"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`
    },
    'twitch.tv': {
        icon: '📺',
        color: '#9146FF',
        svg: `<svg viewBox="0 0 24 24" fill="#9146FF"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>`
    },
    'discord.com': {
        icon: '💬',
        color: '#5865F2',
        svg: `<svg viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/></svg>`
    },
    'instagram.com': {
        icon: '📷',
        color: '#E4405F',
        svg: `<svg viewBox="0 0 24 24" fill="#E4405F"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
    }
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
    bookmarkIconType: 'favicon',
    bookmarkStyle: 'rounded',
    showGreeting: true,
    userName: '',
    animationsEnabled: true,
    bookmarks: [
        { name: 'YouTube', url: 'https://youtube.com', icon: '🎥' },
        { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
        { name: 'Reddit', url: 'https://reddit.com', icon: '🔴' },
        { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' }
    ]
};

class MtabInspiredNewTabPage {
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
            this.updateGreeting();
            
            // Mark as initialized
            this.isInitialized = true;
            
            // Update time every second
            setInterval(() => this.updateTime(), 1000);
            
            // Update greeting every minute
            setInterval(() => this.updateGreeting(), 60000);
            
            console.log('mtab-Inspired Modern New Tab initialized successfully');
        } catch (error) {
            console.error('Error initializing mtab-Inspired Modern New Tab:', error);
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

    // Get high-quality icon for a bookmark
    getBookmarkIcon(bookmark) {
        try {
            const url = new URL(bookmark.url);
            const domain = url.hostname.replace('www.', '');
            
            // Check if we have a custom icon mapping
            if (SITE_ICONS[domain]) {
                const siteIcon = SITE_ICONS[domain];
                return {
                    type: 'svg',
                    content: siteIcon.svg,
                    fallback: siteIcon.icon
                };
            }
            
            // Use high-quality favicon service
            const faviconUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
            return {
                type: 'favicon',
                content: faviconUrl,
                fallback: bookmark.icon || bookmark.name.charAt(0).toUpperCase()
            };
        } catch (error) {
            // Fallback to emoji or letter
            return {
                type: 'fallback',
                content: bookmark.icon || bookmark.name.charAt(0).toUpperCase(),
                fallback: bookmark.name.charAt(0).toUpperCase()
            };
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
                    searchInput.style.transform = 'translateY(-1px) scale(1.01)';
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
        const cancelBookmark = document.getElementById('cancel-bookmark');

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

        if (cancelBookmark) {
            cancelBookmark.addEventListener('click', () => {
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

        // Rest of the event listeners
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
            element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        });
    }

    animateOut(element, callback) {
        if (!this.settings.animationsEnabled) {
            if (callback) callback();
            return;
        }
        
        element.style.transition = 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        element.style.opacity = '0';
        element.style.transform = 'translateY(-20px) scale(0.95)';
        
        setTimeout(() => {
            if (callback) callback();
        }, 200);
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
                day: 'numeric',
                month: 'long'
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

            const iconInfo = this.getBookmarkIcon(bookmark);
            let iconHTML = '';

            switch (this.settings.bookmarkIconType) {
                case 'emoji':
                    iconHTML = `<div class="bookmark-icon">${bookmark.icon || '🌐'}</div>`;
                    break;
                case 'letter':
                    iconHTML = `<div class="bookmark-icon letter">${bookmark.name.charAt(0).toUpperCase()}</div>`;
                    break;
                case 'favicon':
                    if (iconInfo.type === 'svg') {
                        iconHTML = `<div class="bookmark-icon">${iconInfo.content}</div>`;
                    } else if (iconInfo.type === 'favicon') {
                        iconHTML = `<div class="bookmark-icon favicon" style="background-image: url('${iconInfo.content}')"></div>`;
                    } else {
                        iconHTML = `<div class="bookmark-icon">${iconInfo.fallback}</div>`;
                    }
                    break;
            }

            bookmarkElement.innerHTML = `
                ${iconHTML}
                <div class="bookmark-name">${bookmark.name}</div>
                <button class="bookmark-delete" data-index="${index}">×</button>
            `;

            // Enhanced bookmark interactions
            bookmarkElement.addEventListener('mouseenter', () => {
                if (this.settings.animationsEnabled) {
                    bookmarkElement.style.transform = 'translateY(-4px) scale(1.05)';
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
                    bookmarkElement.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    bookmarkElement.style.opacity = '1';
                    bookmarkElement.style.transform = 'translateY(0) scale(1)';
                }, index * 50);
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
        const userNameInput = document.getElementById('user-name');
        const showGreetingInput = document.getElementById('show-greeting');
        const animationsEnabledInput = document.getElementById('animations-enabled');

        if (searchEngineSelect) searchEngineSelect.value = this.settings.searchEngine;
        if (themeSelect) themeSelect.value = this.settings.theme;
        if (backgroundColorInput) backgroundColorInput.value = this.settings.backgroundColor;
        if (gradientColor1Input) gradientColor1Input.value = this.settings.gradientColor1;
        if (gradientColor2Input) gradientColor2Input.value = this.settings.gradientColor2;
        if (gradientDirectionSelect) gradientDirectionSelect.value = this.settings.gradientDirection;
        if (bookmarkStyleSelect) bookmarkStyleSelect.value = this.settings.bookmarkStyle;
        if (userNameInput) userNameInput.value = this.settings.userName || '';
        if (showGreetingInput) showGreetingInput.checked = this.settings.showGreeting;
        if (animationsEnabledInput) animationsEnabledInput.checked = this.settings.animationsEnabled;

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
        const userName = document.getElementById('user-name')?.value.trim();
        const showGreeting = document.getElementById('show-greeting')?.checked;
        const animationsEnabled = document.getElementById('animations-enabled')?.checked;

        if (searchEngine) this.settings.searchEngine = searchEngine;
        if (theme) this.settings.theme = theme;
        if (backgroundType) this.settings.backgroundType = backgroundType;
        if (backgroundColor) this.settings.backgroundColor = backgroundColor;
        if (gradientColor1) this.settings.gradientColor1 = gradientColor1;
        if (gradientColor2) this.settings.gradientColor2 = gradientColor2;
        if (gradientDirection) this.settings.gradientDirection = gradientDirection;
        if (bookmarkIconType) this.settings.bookmarkIconType = bookmarkIconType;
        if (bookmarkStyle) this.settings.bookmarkStyle = bookmarkStyle;
        this.settings.userName = userName;
        this.settings.showGreeting = showGreeting;
        this.settings.animationsEnabled = animationsEnabled;

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
            this.updateGreeting();

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
                this.updateGreeting();
                
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
        body.style.transition = 'background 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

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
        }, 400);
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
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
            }, 300);
        }, 3000);
    }
}

// Global reference for debugging
let mtabInspiredNewTabPageInstance;

// Initialize the mtab-inspired new tab page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    mtabInspiredNewTabPageInstance = new MtabInspiredNewTabPage();
    window.newTabPage = mtabInspiredNewTabPageInstance; // For debugging
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (mtabInspiredNewTabPageInstance && mtabInspiredNewTabPageInstance.settings.theme === 'auto') {
        mtabInspiredNewTabPageInstance.applyTheme();
    }
});

// Handle page visibility changes to ensure settings persist
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && mtabInspiredNewTabPageInstance) {
        // Save settings when page becomes hidden (user switching tabs/closing)
        mtabInspiredNewTabPageInstance.saveSettings();
    }
});

// Handle beforeunload to save settings
window.addEventListener('beforeunload', () => {
    if (mtabInspiredNewTabPageInstance) {
        mtabInspiredNewTabPageInstance.saveSettings();
    }
});


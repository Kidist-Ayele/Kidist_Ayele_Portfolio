// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        console.log('ThemeManager: Initializing...');
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        if (!this.themeToggle) {
            console.error('ThemeManager: Theme toggle button not found!');
            return;
        }
        
        console.log('ThemeManager: Theme toggle button found, current theme:', this.currentTheme);
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener
        this.themeToggle.addEventListener('click', (e) => {
            console.log('ThemeManager: Theme toggle clicked!');
            e.preventDefault();
            this.toggleTheme();
        });

        // Add smooth transition class after page load
        setTimeout(() => {
            document.body.classList.add('theme-transition');
        }, 100);
        
        console.log('ThemeManager: Initialization complete');
    }

    setTheme(theme) {
        console.log('ThemeManager: Setting theme to:', theme);
        
        // Apply theme immediately
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        
        // Update theme text
        this.updateThemeText(theme);
        
        // Update particles background for light theme (with error handling)
        this.updateParticles(theme);
        
        // Verify theme was applied
        const appliedTheme = document.documentElement.getAttribute('data-theme');
        console.log('ThemeManager: Theme applied successfully. Current theme:', appliedTheme);
        
        // Debug: Log CSS variables
        const computedStyle = getComputedStyle(document.documentElement);
        const bgColor = computedStyle.getPropertyValue('--background-color');
        const textColor = computedStyle.getPropertyValue('--text-color');
        console.log('ThemeManager: CSS Variables - Background:', bgColor, 'Text:', textColor);
    }

    updateThemeText(theme) {
        const themeText = document.getElementById('themeText');
        if (themeText) {
            // Show what the user will get when they click
            themeText.textContent = theme === 'light' ? 'Dark' : 'Light';
        }
    }

    updateParticles(theme) {
        try {
            // Check if particles.js is loaded and available
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                const particles = window.pJSDom[0].pJS;
                
                if (particles && particles.pJS && particles.pJS.particles) {
                    if (theme === 'light') {
                        particles.pJS.particles.color.value = '#8e44ad';
                        if (particles.pJS.particles.line_linked) {
                            particles.pJS.particles.line_linked.color = '#8e44ad';
                        }
                    } else {
                        particles.pJS.particles.color.value = '#ffffff';
                        if (particles.pJS.particles.line_linked) {
                            particles.pJS.particles.line_linked.color = '#ffffff';
                        }
                    }
                    
                    // Only refresh if the function exists
                    if (particles.fn && particles.fn.particlesRefresh) {
                        particles.fn.particlesRefresh();
                    }
                }
            }
        } catch (error) {
            console.log('ThemeManager: Particles.js not available or error updating particles:', error.message);
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        console.log('ThemeManager: Toggling from', this.currentTheme, 'to', newTheme);
        this.setTheme(newTheme);
        
        // Add animation effect
        this.themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'scale(1)';
        }, 150);
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing ThemeManager...');
    new ThemeManager();
});

// Also try to initialize if DOM is already loaded
if (document.readyState === 'loading') {
    console.log('DOM still loading...');
} else {
    console.log('DOM already loaded, initializing ThemeManager immediately...');
    new ThemeManager();
}

// Fallback initialization for edge cases
window.addEventListener('load', () => {
    if (!window.themeManager) {
        console.log('Fallback theme initialization...');
        window.themeManager = new ThemeManager();
    }
});

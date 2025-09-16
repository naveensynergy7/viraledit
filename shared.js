// Shared Header and Footer JavaScript

class SiteNavigation {
    constructor() {
        this.init();
    }

    init() {
        this.createHeader();
        this.createFooter();
        this.setupMobileMenu();
        this.setActivePage();
        this.addAnimations();
    }

    createHeader() {
        const header = document.createElement('header');
        header.className = 'site-header';
        header.innerHTML = `
            <div class="header-container">
                <a href="index.html" class="logo">
                    <div class="logo-icon">🚀</div>
                    <div class="logo-text">Viral Edit Pro</div>
                </a>
                
                <nav class="nav-menu" id="navMenu">
                    <div class="nav-item">
                        <a href="index.html" class="nav-link" data-page="home">
                            <span class="nav-icon">🏠</span>
                            <span>Home</span>
                        </a>
                    </div>
                    <div class="nav-item">
                        <a href="text-green-screen.html" class="nav-link" data-page="text-green-screen">
                            <span class="nav-icon">📝</span>
                            <span>Text Green Screen</span>
                        </a>
                    </div>
                    <div class="nav-item">
                        <a href="paper-animation.html" class="nav-link" data-page="paper-animation">
                            <span class="nav-icon">📄</span>
                            <span>Paper Animation</span>
                        </a>
                    </div>
                </nav>
                
                <button class="mobile-menu-toggle" id="mobileMenuToggle">
                    ☰
                </button>
            </div>
        `;
        
        document.body.insertBefore(header, document.body.firstChild);
    }

    createFooter() {
        const footer = document.createElement('footer');
        footer.className = 'site-footer';
        footer.innerHTML = `
            <div class="footer-container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>🚀 Viral Edit Pro</h3>
                        <p>Professional animation tools for content creators. Create viral-worthy text animations, paper effects, and more with our easy-to-use tools.</p>
                    </div>
                    
                    <div class="footer-section">
                        <h3>🛠️ Tools</h3>
                        <ul class="footer-links">
                            <li><a href="index.html">🏠 Home</a></li>
                            <li><a href="text-green-screen.html">📝 Text Green Screen</a></li>
                            <li><a href="paper-animation.html">📄 Paper Animation</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section">
                        <h3>✨ Features</h3>
                        <ul class="footer-links">
                            <li><span>🎨 High-quality rendering</span></li>
                            <li><span>🎯 Per-line controls</span></li>
                            <li><span>🎬 4K video export</span></li>
                            <li><span>🎭 Modern fonts</span></li>
                            <li><span>⚡ Real-time preview</span></li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; 2024 Viral Edit Pro. All rights reserved. Built with ❤️ for content creators.</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(footer);
    }

    setupMobileMenu() {
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                const isActive = navMenu.classList.contains('active');
                mobileToggle.innerHTML = isActive ? '✕' : '☰';
            });

            // Close mobile menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    mobileToggle.innerHTML = '☰';
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    mobileToggle.innerHTML = '☰';
                }
            });
        }
    }

    setActivePage() {
        const currentPage = this.getCurrentPage();
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const pageData = link.getAttribute('data-page');
            if (pageData === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (filename === 'index.html' || filename === '' || filename === '/') {
            return 'home';
        } else if (filename === 'text-green-screen.html') {
            return 'text-green-screen';
        } else if (filename === 'paper-animation.html') {
            return 'paper-animation';
        }
        
        return 'home';
    }

    addAnimations() {
        // Add fade-in animations to main content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.classList.add('fade-in');
        }

        // Add staggered animations to container children
        const container = document.querySelector('.container');
        if (container) {
            const children = container.children;
            for (let i = 0; i < children.length; i++) {
                children[i].classList.add('fade-in');
                if (i > 0) {
                    children[i].classList.add(`fade-in-delay-${Math.min(i, 3)}`);
                }
            }
        }
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SiteNavigation();
});

// Utility function to wrap existing content in main-content div
function wrapContentInMain() {
    const body = document.body;
    const existingContent = Array.from(body.children);
    
    // Create main content wrapper
    const mainContent = document.createElement('main');
    mainContent.className = 'main-content';
    
    // Move existing content into main wrapper
    existingContent.forEach(child => {
        if (!child.classList.contains('site-header') && !child.classList.contains('site-footer')) {
            mainContent.appendChild(child);
        }
    });
    
    // Insert main content after header
    const header = document.querySelector('.site-header');
    if (header) {
        header.insertAdjacentElement('afterend', mainContent);
    } else {
        body.insertBefore(mainContent, body.firstChild);
    }
}

// Auto-wrap content when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wrapContentInMain);
} else {
    wrapContentInMain();
}

// Role animation
const roles = [
    "a Web Developer",
    "an IT Assistant Manager",
    "an Automation Developer",
    "a System Administrator",
    "a Photographer",
    "a Graphic Designer",
    "a Videographer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let roleElement = document.getElementById("role-text");

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Wait before starting to delete
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500); // Wait before typing next role
    } else {
        setTimeout(typeEffect, isDeleting ? 100 : 200);
    }
}

function initSocialIcons() {
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.color = '#072566';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            // Check if in dark mode
            const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
            // Set appropriate color based on theme
            this.style.color = isDarkMode ? '#fff' : 'var(--text-color)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
    });
}

// Animated Stats Counter Function
function animateProfileStats() {
    console.log("Starting profile stats animation");
    const statValues = document.querySelectorAll('.stat-value');
    
    if (statValues.length === 0) {
        console.log("No stat values found");
        return; // Exit if no stat values found
    }
    
    console.log(`Found ${statValues.length} stat values`);
    
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (isNaN(target)) {
            console.log("Invalid target value");
            return; // Skip if target is not a number
        }
        
        console.log(`Animating stat to target: ${target}`);
        
        const duration = 2000; // Animation duration in milliseconds
        const step = target / (duration / 50); // Calculate step based on target and framerate
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 50); // Update every 50ms
    });
}
// Mobile Menu Toggle Function
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) {
        console.log("Mobile menu elements not found");
        return;
    }
    
    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent this click from triggering the document click handler
        navLinks.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = ''; // Restore scrolling when menu is closed
        }
    });
    
    // Handle clicks inside the menu
    navLinks.addEventListener('click', function(e) {
        // Check if the clicked element is a navigation link
        if (e.target.classList.contains('nav-link') || e.target.closest('.nav-link')) {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        }
        
        // Don't close the menu for other elements inside (like the dark mode toggle)
        e.stopPropagation();
    });
    
    // Also handle the dark mode toggle specifically to prevent menu from closing when toggling
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent this click from closing the menu
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.mobile-menu-btn')) {
            closeMenu();
        }
    });
    
    // Add resize handler to reset menu state on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Function to close the menu
    function closeMenu() {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = ''; // Restore scrolling
    }
}
// Function to check if element is in viewport
function isInViewport(element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Animate skill bars when they come into view
function initSkillAnimations() {
    console.log("Initializing skill animations");
    // Get all skill bars and set initial width to 0
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    console.log(`Found ${skillBars.length} skill bars`);
    
    skillBars.forEach(bar => {
        // Store the target width as a data attribute
        const targetWidth = bar.style.width;
        bar.setAttribute('data-width', targetWidth);
        bar.style.width = '0';
        console.log(`Set skill bar target width: ${targetWidth}`);
    });
    
    // Get all learning bars and set initial width to 0
    const learningBars = document.querySelectorAll('.learning-completed');
    console.log(`Found ${learningBars.length} learning bars`);
    
    learningBars.forEach(bar => {
        // Store the target width as a data attribute
        const targetWidth = bar.style.width;
        bar.setAttribute('data-width', targetWidth);
        bar.style.width = '0';
        console.log(`Set learning bar target width: ${targetWidth}`);
    });
}

// Function to handle animation of skill bars when scrolling
function handleSkillAnimation() {
    console.log("Checking for skills in viewport");
    const skillsSection = document.getElementById('skills');
    const educationSection = document.getElementById('education');
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    const learningBars = document.querySelectorAll('.learning-completed');
    
    // Check if skills section is visible
    if (skillsSection && isInViewport(skillsSection)) {
        console.log("Skills section is in viewport, animating bars");
        skillBars.forEach(bar => {
            setTimeout(() => {
                bar.style.width = bar.getAttribute('data-width');
            }, 200);
        });
    }
    
    // Check if education/learning section is visible
    if (educationSection && isInViewport(educationSection)) {
        console.log("Education section is in viewport, animating bars");
        learningBars.forEach(bar => {
            setTimeout(() => {
                bar.style.width = bar.getAttribute('data-width');
            }, 200);
        });
    }
}

// Toggle Experience Function
function setupExperienceToggle() {
    console.log("Setting up experience toggle");
    const toggleButton = document.getElementById('toggleExperience');
    const hiddenExperience = document.querySelector('.hidden-experience');
    
    if (!toggleButton || !hiddenExperience) {
        console.log("Toggle button or hidden experience not found");
        return;
    }
    
    toggleButton.addEventListener('click', function() {
        const isHidden = hiddenExperience.style.display === 'none' || 
                        hiddenExperience.style.display === '';
        
        if (isHidden) {
            hiddenExperience.style.display = 'block';
            toggleButton.innerHTML = '<span class="toggle-text">View Less Experience</span><i class="fas fa-chevron-up"></i>';
        } else {
            hiddenExperience.style.display = 'none';
            toggleButton.innerHTML = '<span class="toggle-text">View More Experience</span><i class="fas fa-chevron-down"></i>';
        }
    });
}

// About page animations
function animateAboutPage() {
    console.log("Animating about page elements");
    
    // Initialize stats counter
    animateProfileStats();
    
    // Initialize skill bars animation
    initSkillAnimations();
    
    // Check if they're in view immediately
    handleSkillAnimation();
    
    // Set up experience toggle
    setupExperienceToggle();
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    console.log(`Found ${timelineItems.length} timeline items`);
    
    if (timelineItems.length > 0) {
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 300 + (index * 100)); // Staggered animation
        });
    }
    
    // Animate highlight cards
    const highlightCards = document.querySelectorAll('.highlight-card');
    console.log(`Found ${highlightCards.length} highlight cards`);
    
    if (highlightCards.length > 0) {
        highlightCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300 + (index * 100)); // Staggered animation
        });
    }
}


// Add this to your existing script.js file after the animateAboutPage() function
// and before the DOMContentLoaded event listener

// Service Categories Filtering Function
function initServiceCategoryFiltering() {
    console.log("Initializing service category filtering");
    
    const categoryButtons = document.querySelectorAll('.category-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (categoryButtons.length === 0 || serviceCards.length === 0) {
        console.log("Category buttons or service cards not found");
        return;
    }
    
    console.log(`Found ${categoryButtons.length} category buttons and ${serviceCards.length} service cards`);
    
    // Set up category button click handlers
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected category
            const selectedCategory = this.getAttribute('data-category');
            console.log(`Selected category: ${selectedCategory}`);
            
            // Filter cards
            serviceCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Handle visibility based on selection
                if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                    card.style.display = 'flex';
                    
                    // Add animation when card appears
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Process Section Animation
function animateProcessSteps() {
    console.log("Animating process steps");
    
    const processSteps = document.querySelectorAll('.process-step');
    const processConnectors = document.querySelectorAll('.process-connector');
    
    if (processSteps.length === 0) {
        console.log("Process steps not found");
        return;
    }
    
    console.log(`Found ${processSteps.length} process steps`);
    
    // Animate process steps
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
    });
    
    // Animate connectors if they exist
    if (processConnectors.length > 0) {
        console.log(`Found ${processConnectors.length} process connectors`);
        
        processConnectors.forEach((connector, index) => {
            connector.style.width = '0';
            connector.style.transition = 'width 0.5s ease';
            
            setTimeout(() => {
                connector.style.width = '100%';
            }, 800 + (index * 150));
        });
    }
}

// Start the typing animation
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM content loaded");
    roleElement = document.getElementById("role-text");
    if (roleElement) {
        typeEffect();
    }
    // Initialize mobile menu
    initMobileMenu();
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
        (prefersDarkScheme.matches ? 'dark' : 'light');

    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
    
    // Get the modal
  const modal = document.getElementById('qrModal');
  
  // Get the button that opens the modal
  const btn = document.getElementById('viberQrLink');
  
  // Get the <span> element that closes the modal
  const span = document.querySelector('.close-modal');
  
  // Function to open modal with animation
  function openModal() {
    modal.style.display = 'block';
    // Trigger reflow
    void modal.offsetWidth;
    // Add active class for animation
    modal.classList.add('active');
  }
  
  // Function to close modal with animation
  function closeModal() {
    modal.classList.remove('active');
    // Wait for animation to finish before hiding
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
  
  // When the user clicks on the button, open the modal
  if (btn) {
    btn.onclick = function(e) {
      e.preventDefault();
      openModal();
    }
  }
  
  // When the user clicks on <span> (x), close the modal
  if (span) {
    span.onclick = function() {
      closeModal();
    }
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      closeModal();
    }
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });

    const initialHash = window.location.hash.substring(1) || 'home';
    toggleBodyOverflow(initialHash);

    // Store the default home section content
    const homeSection = document.getElementById('home');
    const contentDiv = document.getElementById('content');
    
    // Cache for loaded content
    const contentCache = {};
    
    // Function to load content
    async function loadContent(page) {
        console.log(`Loading content for page: ${page}`);
        try {
            // Toggle body overflow based on current page
            toggleBodyOverflow(page);
            
            // Hide home section when navigating to other pages
            if (homeSection && page !== 'home') {
                homeSection.style.display = 'none';
            }
            
            // If it's the home page, show the home section
            if (page === 'home') {
                if (homeSection) {
                    homeSection.style.display = 'flex';
                }
                if (contentDiv) {
                    contentDiv.innerHTML = '';
                }
                return;
            }
            
            // If content is already in cache, use it
            if (contentCache[page]) {
                contentDiv.style.opacity = '0';
                setTimeout(() => {
                    contentDiv.innerHTML = contentCache[page];
                    contentDiv.style.opacity = '1';
                    initPageSpecificScripts(page);
                }, 300);
                return;
            }
            
            // Load from content directory for other pages
            const pagePath = `content/${page}.html`;
            console.log(`Fetching content from: ${pagePath}`);
            
            // Update the content area with animation
            contentDiv.style.opacity = '0';
            
            // Load page content
            const response = await fetch(pagePath);
            
            if (!response.ok) {
                throw new Error(`Failed to load content for ${page}`);
            }
            
            const content = await response.text();
            console.log(`Content loaded successfully for: ${page}`);
            
            setTimeout(() => {
                contentDiv.innerHTML = content;
                contentDiv.style.opacity = '1';
                
                // Cache the content
                contentCache[page] = content;
                
                // Initialize page-specific scripts
                initPageSpecificScripts(page);
            }, 300);
            
        } catch (error) {
            console.error('Error loading content:', error);
            contentDiv.innerHTML = `
                <main class="error-content">
                <h1>Page Not Found</h1>
                <p>Sorry, the page you're looking for doesn't exist.</p>
                <a href="#home" class="cta-btn">Go Home</a>
                </main>
            `;
            contentDiv.style.opacity = '1';
        }
    }
    
    // Handle navigation link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the page to load
            const page = this.getAttribute('data-page');
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            // Update URL hash
            window.location.hash = page;
            
            // Load the content
            loadContent(page);
        });
    });
    
    // Also add event listeners to CTA buttons that point to sections
    document.querySelectorAll('.cta-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal section links (starting with '#')
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const page = href.substring(1);
                
                // Update active link in nav
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('data-page') === page) {
                        navLink.classList.add('active');
                    }
                });
                
                // Update URL hash
                window.location.hash = page;
                
                // Load the content
                loadContent(page);
            }
            // else: allow normal behavior (like file downloads)
        });
    });
    
    // Handle initial page load and browser navigation
    function handleHashChange() {
        const hash = window.location.hash.substring(1) || 'home';
        console.log(`Hash changed to: ${hash}`);
        
        // Update active link
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
            if (navLink.getAttribute('data-page') === hash) {
                navLink.classList.add('active');
            }
        });
        
        // Toggle body overflow based on current page
        toggleBodyOverflow(hash);
        
        // Load the content
        loadContent(hash);
    }
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Handle initial page load
    handleHashChange();
    
    // Page-specific initialization
    function initPageSpecificScripts(page) {
        console.log(`Initializing scripts for page: ${page}`);
        switch (page) {
            case 'home':
                initHomeAnimations();
                break;
            case 'about':
                // Run the updated about page animation function
                animateAboutPage();
                break;
            case 'services':
                initServicesAnimations();
                break;
            case 'projects':
                initProjectsAnimations();
                break;
            case 'contact':
                initContactForm();
                break;
        }
        
        // Always init the social icons
        initSocialIcons();
    }
    
    // Home page animations
    function initHomeAnimations() {
        console.log("Initializing home animations");
        const heroText = document.querySelector('.hero-content');
        if (heroText) {
            heroText.style.opacity = '0';
            heroText.style.transform = 'translateY(20px)';
            heroText.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateY(0)';
            }, 200);
        }
    }
    
    // Services page animations
// Replace your existing initServicesAnimations() function with this updated version
function initServicesAnimations() {
    console.log("Initializing services animations");
    
    // Initialize existing service card animations
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        serviceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 + (index * 100)); // Staggered animation
        });
    }
    
    // Initialize service category filtering
    initServiceCategoryFiltering();
    
    // Initialize process steps animation
    animateProcessSteps();
}
    
    // Projects page animations
    function initProjectsAnimations() {
        console.log("Initializing projects animations");
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length > 0) {
            projectCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 200 + (index * 100)); // Staggered animation
            });
        }
    }
    
    function initCharacterCounter() {
        const messageField = document.getElementById('message');
        if (!messageField) {
            console.log("Message field not found");
            return;
        }
        
        const maxLength = 250; // Set your preferred character limit

        // Add maxlength attribute to textarea
        messageField.setAttribute('maxlength', maxLength);
        
        // Create counter element inside the textarea
        const counterElement = document.createElement('div');
        counterElement.className = 'character-count';
        counterElement.style.display = 'none'; // Initially hidden
        
        // Insert counter inside the message field container
        messageField.parentNode.appendChild(counterElement);
        
        // Update counter on input
        function updateCounter() {
            const remaining = maxLength - messageField.value.length;
            counterElement.textContent = `${remaining}/250`;
            
            // Only show counter if user has started typing
            if (messageField.value.length > 0) {
                counterElement.style.display = 'block';
            } else {
                counterElement.style.display = 'none';
            }
            
            // Change color based on remaining characters
            if (remaining < 50) {
                counterElement.style.color = '#e11d48'; // Red for warning
            } else if (remaining < 100) {
                counterElement.style.color = '#f59e0b'; // Orange/amber for caution
            } else {
                counterElement.style.color = 'inherit'; // Default color
            }
        }
        
        // Initial counter update
        updateCounter();
        
        // Add event listener for input changes
        messageField.addEventListener('input', updateCounter);
    }

    // Contact form initialization
function initContactForm() {
    console.log("Initializing contact form");
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Initialize character counter
        initCharacterCounter();
        
        // Cache the original form HTML to use for reset
        const originalFormHTML = contactForm.innerHTML;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create FormData from the form element directly
            const formData = new FormData(this);
            
            // Log the data being sent (for debugging)
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            
            // Show loading spinner
            contactForm.innerHTML = `
                <div class="loading-message">
                    <div class="spinner"></div>
                    <p>Sending your message...</p>
                </div>
            `;
            
            // Submit form data to Formspree with a delay to show the spinner
            setTimeout(() => {
                fetch("https://formspree.io/f/mvgakgny", {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    // Log the actual error response for debugging
                    return response.json().then(data => {
                        console.log("Formspree error details:", data);
                        throw new Error('Submission failed: ' + (data.error || 'Network response was not ok'));
                    });
                })
                .then(data => {
                    // Show success message with reset button
                    contactForm.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 20px;"></i>
                            <h3>Thank you for your message!</h3>
                            <p>I'll get back to you as soon as possible.</p>
                            <button class="submit-btn reset-form" style="margin-top: 20px;" id="resetFormButton">Send Another Message</button>
                        </div>
                    `;
                    
                    // Add event listener to the reset button
                    document.getElementById('resetFormButton').addEventListener('click', function() {
                        // Reset the form to its original state
                        contactForm.innerHTML = originalFormHTML;
                        
                        // Re-initialize the form to attach all necessary event listeners
                        initCharacterCounter();
                        
                        // Re-attach the submit event listener
                        initContactForm();
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Show error message with reset button
                    contactForm.innerHTML = `
                        <div class="error-message">
                            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 20px;"></i>
                            <h3>Oops! Something went wrong.</h3>
                            <p>There was a problem sending your message. Please try again later.</p>
                            <button class="submit-btn reset-form" style="margin-top: 20px;" id="resetFormButton">Try Again</button>
                        </div>
                    `;
                    
                    // Add event listener to the reset button
                    document.getElementById('resetFormButton').addEventListener('click', function() {
                        // Reset the form to its original state
                        contactForm.innerHTML = originalFormHTML;
                        
                        // Re-initialize the form to attach all necessary event listeners
                        initCharacterCounter();
                        
                        // Re-attach the submit event listener
                        initContactForm();
                    });
                });
            }, 2000); // 2 second delay to show loading spinner
        });
    }
}
    
    // Add style for page transitions
    const style = document.createElement('style');
    style.textContent = `
        #content {
            min-height: calc(100vh - 100px);
            padding-top: 100px;
            transition: opacity 0.3s ease;
        }
        .error-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: calc(100vh - 200px);
            text-align: center;
        }
        .error-content h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        .error-content p {
            margin-bottom: 2rem;
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize animations for the home page on load
    if (window.location.hash === '' || window.location.hash === '#home') {
        initHomeAnimations();
    }
    
    // Initialize social icons on page load
    initSocialIcons();
    
    // Add scroll event listener for skill animations
    window.addEventListener('scroll', handleSkillAnimation);
});

// Function to toggle body overflow based on current page
function toggleBodyOverflow(page) {
    console.log(`Toggling body overflow for page: ${page}`);
    if (page === 'home') {
        document.body.classList.add('home-active');
    } else if (page === 'contact') {
        // Only add this condition to prevent scrolling on the contact page
        document.body.classList.add('contact-active');
    } else {
        document.body.classList.remove('home-active');
        document.body.classList.remove('contact-active');
    }
}
/**
 * Simple fix for loading CSS issues on Netlify
 */
(function() {
    // Add loading class to body initially
    document.body.classList.add('js-loading');
    
    // Function to show content when CSS is loaded
    function showContent() {
        document.body.classList.remove('js-loading');
        document.body.classList.add('loaded');
    }
    
    // Show content when page is loaded
    if (document.readyState === 'complete') {
        showContent();
    } else {
        window.addEventListener('load', showContent);
    }
    
    // Fallback - if something goes wrong, show content after 1 second
    setTimeout(showContent, 1000);
})();

// Fade in content sections when they're loaded
document.addEventListener('DOMContentLoaded', function() {
    // Apply to any content section
    const sections = document.querySelectorAll('.about-content, .services-content, .projects-content, .contact-content');
    
    sections.forEach(function(section) {
        if (section) {
            // Start with opacity 0
            section.style.opacity = '0';
            section.style.transition = 'opacity 0.3s ease';
            
            // Fade in after a short delay
            setTimeout(function() {
                section.style.opacity = '1';
            }, 100);
        }
    });
});
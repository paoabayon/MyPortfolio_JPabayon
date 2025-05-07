/**
 * This script fixes content loading issues without modifying your HTML content files
 */
document.addEventListener('DOMContentLoaded', function() {
    // Find any content section that might be present
    const contentSections = [
        document.querySelector('.about-content'),
        document.querySelector('.services-content'), 
        document.querySelector('.projects-content'),
        document.querySelector('.contact-content')
    ].filter(Boolean); // Remove nulls
    
    // Add opacity transition to any found sections
    contentSections.forEach(function(section) {
        // First set the transition
        section.style.transition = 'opacity 0.3s ease';
        
        // Initially set opacity to 0
        section.style.opacity = '0';
        
        // Force a reflow
        void section.offsetHeight;
        
        // Then fade in
        setTimeout(function() {
            section.style.opacity = '1';
        }, 100);
    });
});
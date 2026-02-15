// Toggle float outlines for visualization
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleOutlines');
    const body = document.body;
    
    // Add float class to all floated elements
    const floatedElements = document.querySelectorAll('.sidebar, .column, .article-container img');
    floatedElements.forEach(el => {
        el.classList.add('float');
    });
    
    // Toggle button functionality
    toggleBtn.addEventListener('click', function() {
        body.classList.toggle('show-float-outlines');
        this.textContent = body.classList.contains('show-float-outlines') 
            ? 'Hide Float Outlines' 
            : 'Toggle Float Outlines';
    });
});
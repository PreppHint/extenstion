/**
 * PreppHint - Main Application JavaScript
 * Handles loading and displaying browser extensions
 */

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = (rating - fullStars) >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let html = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        html += '★';
    }
    
    // Half star
    if (halfStar) {
        html += '☆';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        html += '☆';
    }
    
    return html;
}

// Generate extension card HTML
function generateExtensionCard(extension) {
    const title = escapeHtml(extension.title);
    const description = escapeHtml(extension.description);
    const rating = parseFloat(extension.rating);
    const downloads = escapeHtml(extension.downloads);
    const icon = escapeHtml(extension.icon);
    
    const chromeLink = extension.chrome_url || '#';
    const edgeLink = extension.edge_url || '#';
    
    const stars = generateStarRating(rating);
    
    let html = `
    <div class="tool-card rounded-4">
        <div class="tool-header">
            <div class="tool-icon rounded-3" style="background-image: url('${icon}');"></div>
            <div>
                <div class="tool-title">${title}</div>
                <div class="tool-rating">
                    <span class="stars">${stars}</span>
                    <span>${rating}</span>
                </div>
            </div>
        </div>
        <div class="tool-description">
            ${description}
        </div>
        <div class="tool-footer">
            <span class="downloads">${downloads} Downloads</span>
            <div class="browser-links">`;
    
    if (chromeLink !== '#') {
        html += `<a href="${chromeLink}" target="_blank" class="browser-link chrome-icon rounded-2" title="Chrome" rel="noopener"></a>`;
    }
    
    if (edgeLink !== '#') {
        html += `<a href="${edgeLink}" target="_blank" class="browser-link edge-icon rounded-2" title="Edge" rel="noopener"></a>`;
    }
    
    html += `
            </div>
        </div>
    </div>`;
    
    return html;
}

// Load extensions from CDN
async function loadExtensions() {
    const container = document.getElementById('extensions-container');
    
    try {
        console.log('Loading extensions from CDN');
        const response = await fetch('https://cdn.jsdelivr.net/gh/PreppHint/extenstion@main/data/extensions.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.extensions || data.extensions.length === 0) {
            container.innerHTML = '<div class="alert alert-info">No extensions available at the moment.</div>';
            return;
        }
        
        // Generate HTML for all extensions
        let html = '';
        data.extensions.forEach(extension => {
            html += generateExtensionCard(extension);
        });
        
        container.innerHTML = html;
        
        // Add structured data for SEO
        addStructuredData(data.extensions);
        
        console.log(`Successfully loaded ${data.extensions.length} extensions from CDN`);
        
    } catch (error) {
        console.error('Error loading extensions:', error);
        container.innerHTML = '<div class="alert alert-danger">Failed to load extensions. Please try again later.</div>';
    }
}

// Add structured data for SEO
function addStructuredData(extensions) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Browser Extensions",
        "description": "Collection of useful browser extensions",
        "itemListElement": []
    };
    
    extensions.forEach((extension, index) => {
        structuredData.itemListElement.push({
            "@type": "SoftwareApplication",
            "position": index + 1,
            "name": extension.title,
            "description": extension.description,
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": extension.rating,
                "ratingCount": extension.downloads.replace(/[+,]/g, '')
            },
            "applicationCategory": "BrowserExtension",
            "operatingSystem": "Chrome, Edge"
        });
    });
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadExtensions();
    
    // Log that extensions are loaded
    console.log('Extension cards loaded - use individual browser buttons to download');
});

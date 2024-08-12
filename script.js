const ACCESS_KEY = 'CSSClBI_pLjfiMn0hx3UwIDnIuf3Q-5ke0oXpw0VwEk'; // Unsplash API key
const BASE_URL_UNSPLASH = 'https://api.unsplash.com/search/photos';
const BASE_URL_WIKIPEDIA = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

document.addEventListener('DOMContentLoaded', () => {
    const searchField = document.getElementById('searchField');
    const searchButton = document.getElementById('searchButton');
    const statusLabel = document.getElementById('statusLabel');
    const imageView = document.getElementById('imageView');
    const summaryLabel = document.getElementById('summaryLabel');

    searchButton.addEventListener('click', () => fetchData());

    let currentSummary = '';

    async function fetchData() {
        const query = searchField.value.trim();
        if (query === '') {
            statusLabel.textContent = 'Please enter a search term.';
            return;
        }

        statusLabel.textContent = 'Status: Loading...';

        try {
            // Fetch image data
            const imageResponse = await fetch(`${BASE_URL_UNSPLASH}?query=${query}&client_id=${ACCESS_KEY}`);
            const imageData = await imageResponse.json();
            const firstResult = imageData.results[0];
            const imageUrl = firstResult.urls.regular;

            // Fetch Wikipedia summary
            const wikiResponse = await fetch(`${BASE_URL_WIKIPEDIA}${query.replace(' ', '_')}`);
            const wikiData = await wikiResponse.json();
            const summary = wikiData.extract || 'No summary available';
            currentSummary = summary;

            // Update UI
            imageView.src = imageUrl;
            imageView.style.display = 'block';
            summaryLabel.textContent = 'Summary: ' + summary;
            statusLabel.textContent = 'Status: Loaded';
        } catch (error) {
            console.error('Error fetching data:', error);
            statusLabel.textContent = 'Status: Error';
        }
    }
});

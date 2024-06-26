const accessKey = "SIABLMb1Ap4MvCWoQaFkHWzz0u_6Z6SClUtax2LzLDo"

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let keyword = '';
let page = 1;

async function searchImages() {
    // Clear previous search result
    searchResult.innerHTML = '';
    showMoreBtn.style.display = 'none';
    
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
    results.map(result => {
        const img = document.createElement('img');
        img.src = result.urls.small;
        const imgLink = document.createElement('a');
        imgLink.href = result.links.html;
        imgLink.target = '_blank';
        imgLink.appendChild(img);
        searchResult.appendChild(img);
    });

    showMoreBtn.style.display = 'block';

}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener('click', () => {
    page++;
    searchImages();
});
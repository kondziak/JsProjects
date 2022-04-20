const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b94ae85b5e8f1c830b103b53ea5b6de2&page=1";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=b94ae85b5e8f1c830b103b53ea5b6de2&query="';

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

getMovies(API_URL);

async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  showMovies(data.results);
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((element) => {
    const { title, poster_path, vote_average, overview } = element;

    const movie = document.createElement("div");
    movie.classList.add("movie");
    movie.innerHTML = `
      <img
        src="${IMAGE_PATH + poster_path}"
        alt="${title}"
      />
      <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>

      <div class="overview">
          <h3>Overview</h3>
          ${overview}
      </div>
      `;
    main.appendChild(movie);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_URL + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

function getClassByRate(rate) {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  }
  return red;
}

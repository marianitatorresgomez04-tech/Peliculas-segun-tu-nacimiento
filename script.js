const API_KEY = "322320eae4931c17ab6b3972e72bca52";

document
  .getElementById("searchBtn")
  .addEventListener("click", buscarPeliculas);

async function buscarPeliculas() {

  const fecha = document.getElementById("birthDate").value;

  if(!fecha){
    alert("Selecciona una fecha");
    return;
  }

  const year = new Date(fecha).getFullYear();

  const url =
    `https://api.themoviedb.org/3/discover/movie?` +
    `api_key=${API_KEY}` +
    `&primary_release_year=${year}` +
    `&sort_by=popularity.desc`;

  try {

    const response = await fetch(url);
    const data = await response.json();

    mostrarPeliculas(data.results.slice(0,12), year);

  } catch(error) {
    console.error(error);
  }
}

function mostrarPeliculas(peliculas, year){

  const moviesContainer =
    document.getElementById("movies");

  moviesContainer.innerHTML =
    `<h2 style="grid-column:1/-1">
      Películas populares de ${year}
    </h2>`;

  peliculas.forEach(movie => {

    moviesContainer.innerHTML += `
      <div class="card">
        <img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          alt="${movie.title}"
        >
        <h3>${movie.title}</h3>
      </div>
    `;
  });
}

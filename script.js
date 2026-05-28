const API_KEY = "322320eae4931c17ab6b3972e72bca52";

document
  .getElementById("searchBtn")
  .addEventListener("click", buscarPeliculas);

async function buscarPeliculas() {
  const fecha = document.getElementById("birthDate").value;

  if (!fecha) {
    alert("Selecciona una fecha");
    return;
  }

  const moviesContainer = document.getElementById("movies");

  moviesContainer.innerHTML = `
    <h2>Buscando películas estrenadas el ${fecha}...</h2>
  `;

  try {
    // Buscar películas estrenadas exactamente ese día
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${fecha}&primary_release_date.lte=${fecha}&sort_by=popularity.desc`;

    let response = await fetch(url);
    let data = await response.json();

    // Si no encuentra suficientes películas, ampliar búsqueda ±7 días
    if (!data.results || data.results.length < 3) {
      const fechaNacimiento = new Date(fecha);

      const fechaInicio = new Date(fechaNacimiento);
      fechaInicio.setDate(fechaInicio.getDate() - 7);

      const fechaFin = new Date(fechaNacimiento);
      fechaFin.setDate(fechaFin.getDate() + 7);

      const inicio = fechaInicio.toISOString().split("T")[0];
      const fin = fechaFin.toISOString().split("T")[0];

      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}&sort_by=popularity.desc`;

      response = await fetch(url);
      data = await response.json();

      mostrarPeliculas(
        data.results.slice(0, 12),
        fecha,
        true
      );
    } else {
      mostrarPeliculas(
        data.results.slice(0, 12),
        fecha,
        false
      );
    }
  } catch (error) {
    console.error(error);

    moviesContainer.innerHTML = `
      <h2>Ocurrió un error al consultar TMDB.</h2>
    `;
  }
}

function mostrarPeliculas(peliculas, fecha, rangoAmpliado) {
  const moviesContainer =
    document.getElementById("movies");

  if (!peliculas || peliculas.length === 0) {
    moviesContainer.innerHTML = `
      <h2>No encontramos películas para esa fecha.</h2>
    `;
    return;
  }

  moviesContainer.innerHTML = `
    <h2>
      ${
        rangoAmpliado
          ? `🎬 Películas estrenadas cerca del ${fecha}`
          : `🎬 Películas estrenadas el ${fecha}`
      }
    </h2>
  `;

  peliculas.forEach(movie => {
    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=Sin+Imagen";

    moviesContainer.innerHTML += `
      <div class="card">
        <img
          src="${poster}"
          alt="${movie.title}"
          loading="lazy"
        />

        <h3>${movie.title}</h3>

        <p>
          📅 ${movie.release_date || "Sin fecha"}
        </p>

        <p>
          ⭐ ${movie.vote_average.toFixed(1)}
        </p>
      </div>
    `;
  });
}

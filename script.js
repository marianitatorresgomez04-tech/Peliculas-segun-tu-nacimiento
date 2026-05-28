const peliculasPorAno = {
    1990: [
        "Home Alone",
        "Ghost",
        "Pretty Woman"
    ],
    1995: [
        "Toy Story",
        "Seven",
        "Braveheart"
    ],
    2000: [
        "Gladiator",
        "Memento",
        "X-Men"
    ],
    2005: [
        "Batman Begins",
        "King Kong",
        "Harry Potter y el Cáliz de Fuego"
    ],
    2010: [
        "Inception",
        "Toy Story 3",
        "Shutter Island"
    ]
};

function buscarPeliculas() {
    const fecha = document.getElementById("birthDate").value;

    if (!fecha) {
        alert("Selecciona una fecha");
        return;
    }

    const ano = new Date(fecha).getFullYear();

    const resultado = document.getElementById("resultado");

    if (peliculasPorAno[ano]) {
        resultado.innerHTML = `
            <h2>Películas populares de ${ano}</h2>
            ${peliculasPorAno[ano]
                .map(pelicula => `<div class="movie">${pelicula}</div>`)
                .join("")}
        `;
    } else {
        resultado.innerHTML = `
            <h2>No tengo películas registradas para ${ano}</h2>
        `;
    }
}

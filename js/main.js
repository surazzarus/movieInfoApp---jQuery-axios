$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    e.preventDefault();
    let searchText = $('#searchText').val();

    getMovies(searchText);

    // hide the body content after search is submitted
    $('#homePage').hide();

    // show if the body content if the field is empty
    if(searchText === "") {
      $('#homePage').show();
    }
  });
});

function getMovies(searchText) {
  axios.get('http://www.omdbapi.com/?s='+ searchText)
    .then((response) => {
      let movies = response.data.Search;
      let output = '';

      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((error) => {
      console.log(error);
    });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com/?i='+movieId)
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
              <li class="list-group-item"><strong>imdbRating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Year:</strong> ${movie.Year}</li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="well">
            <h3>Movie Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back to Search</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((error) => {
      console.log(error);
    });
}

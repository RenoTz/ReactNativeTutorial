const API_TOKEN = "45e74c1bdf70f07c98d80d3bfeb07ca8";

export function getFilmsFromApiWithSearchedText (text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
}

export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetailFromApi (id) {
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
      .then((response) => response.json())
      .catch((error) => console.error(error));
}

export function getGenres (genres) {
    return getNamesConcat(genres);
}

export function getCompagnies (companies) {
    return getNamesConcat(companies);
}

function getNamesConcat(array){
  var namesConcat = '';
  array.map((c) => {
    namesConcat += c.name
     if(array.indexOf(c) < array.length - 1){
      namesConcat += ' / '
     }
   })
   return namesConcat;
}
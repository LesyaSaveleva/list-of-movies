const moviesInputNode = document.querySelector('.moviesCheck-input-js');
const addMoviesBtnNode = document.querySelector('.moviesCheck-btn-js');
const listofmoviesNode = document.querySelector('.listofmovies-js');
const movieStatusBtnNode = document.querySelectorAll('.movie_title-btn-js');
const movieDeleteBtnNode = document.querySelectorAll('.delete_movie-btn-js');
const movieTitle = document.querySelector('.movie_title');
const movieTitleList = document.querySelector('.movie_title_list');

let movies = [];
const MOVIE_STORAGE = 'movie'

// Загружаем список фильмов из Local Storage при открытии страницы
document.addEventListener('DOMContentLoaded', ()=> {
    loadMovies(); // Сразу загружаем фильмы из storage при старте страницы
    renderMovie(movies); // Рендерим страницу с теми фильмами, которые были найдены
    loadStyle();
})

// Функция загрузки фильмов из Local Storage
function loadMovies() {
const movieListFromStorageString = localStorage.getItem(MOVIE_STORAGE); // Получаем строку с фильмами
if (movieListFromStorageString !== null && movieListFromStorageString.trim().length > 0) {
    movies = JSON.parse(movieListFromStorageString); // Преобразовываем строковое представление обратно в массив объектов
    renderMovie();
}
}

// Добавление фильма в список принажатии Enter
moviesInputNode.addEventListener('keyup', function(event){
    if (event.key === 'Enter') {
        if (!moviesInputNode.value) {
            confirm('Введите название фильма')
        } else{
            submitText();
            saveMovieList();
        }
        
    }
    loadStyle();
})
// Добавление фильма в список по кнопке
addMoviesBtnNode.addEventListener('click', function(){
    if (!moviesInputNode.value) {
        confirm('Введите название фильма')
    } else{
        submitText();
        saveMovieList();
    }
    loadStyle();
})

// Удаление фильма из списка с помощью делегирования событий на родительский элемент
listofmoviesNode.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete_movie-btn-js')) {
        const index = event.target.dataset.index;
        if (confirm(`Вы действительно хотите удалить фильм "${movies[index].movie}?"`)) {
            removeMovie(index);
            saveMovieList();
        }
    }
    loadStyle();
});

// Отметка фильма как просмотренного
listofmoviesNode.addEventListener('click', function(event) {
    if (event.target.classList.contains('movie_title-btn-js')) {
        const btnClicked = event.target; // получаем элемент, который нажали
        const index = event.target.dataset.index;
        const currentMovie = movies[index];
        if (btnClicked.classList.contains('changeOfStyle-btn')) {
            btnClicked.classList.remove('changeOfStyle-btn');
            const title = btnClicked.nextElementSibling; // выбор следующего элемента в родителе (это название фильма)
            title.classList.remove('changeOfStyle-title');
            const parentDiv = btnClicked.parentElement; // выбор родительского элемента див
            parentDiv.classList.remove('changeOfStyle-fon');
            currentMovie.watched = !currentMovie.watched; // Меняем состояние просмотра
            saveMovieList();
        } else {
            btnClicked.classList.add('changeOfStyle-btn');      // Добавляем стили кнопке
            const titleEl = btnClicked.nextElementSibling;     // Следующий элемент (заголовок фильма)
            titleEl.classList.add('changeOfStyle-title');      // Добавляем стили заголовку
            const parentDiv = btnClicked.parentElement;       // Родительский div
            parentDiv.classList.add('changeOfStyle-fon');     // Добавляем стили фону родителя
            currentMovie.watched = !currentMovie.watched; // Меняем состояние просмотра
            saveMovieList();
        }}})

// Загрузка стилей
function loadStyle() {
    movies.forEach((movie, index) => {
        const itemLi = listofmoviesNode.children[index]; // Найти элемент фильма по его позиции
        if (itemLi) {
            const watchButton = itemLi.querySelector('.movie_title-btn-js');
            const titleSpan = itemLi.querySelector('.movie_title');
            const parentDiv = itemLi;
            
            if (movie.watched === true) {
                watchButton.classList.add('changeOfStyle-btn');
                titleSpan.classList.add('changeOfStyle-title');
                parentDiv.classList.add('changeOfStyle-fon');
            } else {
                watchButton.classList.remove('changeOfStyle-btn');
                titleSpan.classList.remove('changeOfStyle-title');
                parentDiv.classList.remove('changeOfStyle-fon');
            }
        }
    });
}

// Функция для удаления фильма
function removeMovie(index) {
    movies.splice(index, 1);
    renderMovie();
}

// Вывод филма на странице   
function submitText(){
// Получить данные из поля ввода
const movieTitle = getMovieTitleFromUser();
// сохранить фильм
addMovie(movieTitle);
// отобразить название фильма в браузере
renderMovie();
// Очищаем поле ввода
clearInput()
};

// Очистить поле инпута поссле ввода
function clearInput() {
    document.querySelector('.moviesCheck-input-js').value = '';
}

// Получаем введенное пользователем название фильма
function getMovieTitleFromUser() {
const movie = moviesInputNode.value;
return movie;
}

// Добавляем название фильма в массив
function addMovie(movie) {
    movies.push({movie, watched: false});// Изначально добавляем фильмы как непросмотренные
}


function getMovies() {
    return movies;
}

function renderMovie() {
    const movies = getMovies();
    let listMoviesHtml = '';
    movies.forEach((movie, index) => {

        listMoviesHtml += `
            <div class="movie_title_list">
                <button class = "movie_title-btn-js movie_title-btn" data-index="${index}"></button>
                <p class="movie_title">${movie.movie}</p>
                <button class = "delete_movie-btn-js delete_movie-btn" data-index="${index}"></button>
            </div>
         ` });
         listofmoviesNode.innerHTML = listMoviesHtml;
}

// Сохраняем список в браузере
function saveMovieList() {
    const movieString = JSON.stringify(movies);
    localStorage.setItem(MOVIE_STORAGE, movieString);
}

// Проверка ввода текста пользователем



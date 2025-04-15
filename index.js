const moviesInputNode = document.querySelector('.moviesCheck-input-js');
const addMoviesBtnNode = document.querySelector('.moviesCheck-btn-js');
const listofmoviesNode = document.querySelector('.listofmovies-js');
const movieStatusBtnNode = document.querySelectorAll('.movie_title-btn-js');
const movieDeleteBtnNode = document.querySelectorAll('.delete_movie-btn-js');
const movieTitle = document.querySelector('.movie_title');
const movieTitleList = document.querySelector('.movie_title_list');

const movies = [];

// Добавление фильма в список принажатии Enter
moviesInputNode.addEventListener('keyup', function(event){
    if (event.key === 'Enter') {
        submitText();
    }
})
// Добавление фильма в список по кнопке
addMoviesBtnNode.addEventListener('click', function(){
    submitText();
})

// Удаление фильма из списка с помощью делегирования событий на родительский элемент
listofmoviesNode.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete_movie-btn-js')) {
        const index = event.target.dataset.index;
        if (confirm(`Вы действительно хотите удалить фильм "${movies[index]}?"`)) {
            removeMovie(index);
        }
    }
});

// Отметка фильма как просмотренного
listofmoviesNode.addEventListener('click', function(event) {
    if (event.target.classList.contains('movie_title-btn-js')) {
        const btnClicked = event.target; // получаем элемент, который нажали
        if (btnClicked.classList.contains('changeOfStyle-btn')) {
            btnClicked.classList.remove('changeOfStyle-btn');
            const title = btnClicked.nextElementSibling; // выбор следующего элемента в родителе (это название фильма)
            title.classList.remove('changeOfStyle-title');
            const parentDiv = btnClicked.parentElement; // выбор родительского элемента див
            parentDiv.classList.remove('changeOfStyle-fon');
        } else {
            btnClicked.classList.add('changeOfStyle-btn');      // Добавляем стили кнопке
            const titleEl = btnClicked.nextElementSibling;     // Следующий элемент (заголовок фильма)
            titleEl.classList.add('changeOfStyle-title');      // Добавляем стили заголовку
            const parentDiv = btnClicked.parentElement;       // Родительский div
            parentDiv.classList.add('changeOfStyle-fon');      // Добавляем стили фону родителя
        }}})


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
    movies.push(movie);
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
                <p class="movie_title">${movie}</p>
                <button class = "delete_movie-btn-js delete_movie-btn" data-index="${index}"></button>
            </div>
         ` });
         listofmoviesNode.innerHTML = listMoviesHtml;
}
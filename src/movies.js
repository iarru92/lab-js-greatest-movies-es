// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const directorsArray = moviesArray.map((movie) => movie.director);

  const uniqueDirectors = new Set(directorsArray);

  const directors = Array.from(uniqueDirectors);
  return directors;
}

const directors = getAllDirectors(movies);
console.log(directors);

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const spielbergDramas = moviesArray.filter(
    (movie) =>
      movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
  );
  return spielbergDramas.length;
}

const dramaMoviesBySpielberg = howManyMovies(movies);
console.log(
  'Steven Spielberg ha dirigido ' +
    dramaMoviesBySpielberg +
    ' películas de drama.'
);

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }

  const totalScore = moviesArray.reduce((accumulator, movie) => {
    if (typeof movie.score === 'number' && !isNaN(movie.score)) {
      return accumulator + movie.score;
    } else {
      return accumulator;
    }
  }, 0);

  const averageScore = totalScore / moviesArray.length;

  return parseFloat(averageScore.toFixed(2));
}

const average = scoresAverage(movies);
console.log('Puntuación media de todas las películas: ' + average);

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter((movie) =>
    movie.genre.includes('Drama')
  );
  if (dramaMovies.length === 0) {
    return 0;
  }
  const totalScoreDrama = dramaMovies.reduce((accumulator, movie) => {
    if (typeof movie.score === 'number' && !isNaN(movie.score)) {
      return accumulator + movie.score;
    } else {
      return accumulator;
    }
  }, 0);
  const averageScoreDrama = totalScoreDrama / dramaMovies.length;

  return parseFloat(averageScoreDrama.toFixed(2));
}

const averageDramaScore = dramaMoviesScore(movies);
console.log('Puntuación media de películas de drama: ' + averageDramaScore);

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const sortedMovies = moviesArray.slice();
  sortedMovies.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    } else {
      return a.title.localeCompare(b.title);
    }
  });
  return sortedMovies;
}

const sortedMovies = orderByYear(movies);
console.log(sortedMovies);

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const sortedMovies = moviesArray.slice();

  sortedMovies.sort((a, b) => a.title.localeCompare(b.title));

  console.log(
    'Títulos de las 20 primeras películas ordenadas alfabéticamente:'
  );
  for (let i = 0; i < 20 && i < sortedMovies.length; i++) {
    console.log(sortedMovies[i].title);
  }
}

orderAlphabetically(movies);

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const updatedMovies = moviesArray.map((movie) => {
    const timeComponents = movie.duration.split(' ');

    let totalMinutes = 0;

    timeComponents.forEach((component) => {
      if (component.includes('h')) {
        const hours = parseInt(component, 10);
        totalMinutes += hours * 60;
      } else if (component.includes('min')) {
        const minutes = parseInt(component, 10);
        totalMinutes += minutes;
      }
    });

    return {
      ...movie,
      duration: totalMinutes
    };
  });

  return updatedMovies;
}

const moviesWithMinutes = turnHoursToMinutes(movies);
console.log(moviesWithMinutes);

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  const yearStats = {};

  moviesArray.forEach((movie) => {
    const year = movie.year;
    const score = movie.score;

    if (yearStats[year]) {
      yearStats[year].totalScore += score;
      yearStats[year].movieCount++;
    } else {
      yearStats[year] = {
        totalScore: score,
        movieCount: 1
      };
    }
  });

  const averageScores = {};
  for (const year in yearStats) {
    averageScores[year] =
      yearStats[year].totalScore / yearStats[year].movieCount;
  }

  let bestYear = null;
  let maxAverage = -Infinity;
  for (const year in averageScores) {
    if (averageScores[year] > maxAverage) {
      maxAverage = averageScores[year];
      bestYear = year;
    }
  }

  return {
    year: parseInt(bestYear),
    average: maxAverage
  };
}

const bestYear = bestYearAvg(movies);
console.log(
  'El mejor año para el cine fue ' +
    bestYear.year +
    ' con una puntuación media de ' +
    bestYear.average
);

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg
  };
}

import { configureStore } from '@reduxjs/toolkit';
import Popular from './reducer/getPopular';
import Details from './reducer/getDetails';
import Genres from './reducer/getGenres'
import Courses from './reducer/getCourses';

export default configureStore({
  reducer: {
    popular: Popular,
    details: Details,
    genres: Genres,
    courses: Courses,
  },
});

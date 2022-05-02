import {configureStore} from '@reduxjs/toolkit';
import repoReducer from '../slices/githubSlices';

const store = configureStore({
    reducer:{
        repos: repoReducer
    }
});

export default store;
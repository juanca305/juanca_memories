import { CREATE, UPDATE, DELETE, LIKE, FETCH_ALL, FETCH_BY_SEARCH } from '../constants/actionTypes';
import * as api  from '../api';


//Action Creators
export const getPosts = () => async(dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        //console.log('DATA', data);

        await dispatch({ type: FETCH_ALL, payload: data }) ;
    } catch (error) {
        console.log(error.message);
    }    
};

export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    try {
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        //console.log('DATA from search', data)
        dispatch({ type: FETCH_BY_SEARCH, payload: data }) ;
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
   
    try {
        const { data } = await api.createPost(post);
        await dispatch({ type: CREATE, payload: data }) ;
        
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        await dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        await dispatch({ type: DELETE, payload: id })

    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        await dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error);
    }
}
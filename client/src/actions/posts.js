import { CREATE, UPDATE, DELETE, LIKE, FETCH_ALL } from '../constants/actionTypes';
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
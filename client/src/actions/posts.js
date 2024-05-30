import { CREATE, UPDATE, DELETE, LIKE, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST, COMMENT } from '../constants/actionTypes';
import * as api  from '../api';


//Action Creators

export const getPost = (id) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        //console.log('DATA from getPosts', data);

        await dispatch({ type: FETCH_POST, payload: data }) ;
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }    
};


export const getPosts = (page) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        console.log('DATA from getPosts', data);

        await dispatch({ type: FETCH_ALL, payload: data }) ;
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }    
};

export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        //console.log('DATA from search', data)
        dispatch({ type: FETCH_BY_SEARCH, payload: data }) ;
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, history) => async (dispatch) => {
   
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);

        history.push(`/posts/${data._id}`)
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

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        await dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);
        //console.log('COMMENT DATA', data);
        dispatch({ type: 'COMMENT', payload: data });

        return data.comments;
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


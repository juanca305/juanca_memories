import axios from "axios";

const API = axios.create({ baseURL: "https://juanca-memories.onrender.com" });
//const API = axios.create({ baseURL: "http://localhost:3000" });

//Something specific to each one of our requests.
//Send the token to the backend. The backend can verify that the user is logged in.
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    //The token needs to start with the word 'Bearer'.
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

//const url = 'http://localhost:5000/posts';
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  //const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const classes = useStyles();

  //This is going to read the url to see if it has a page parameter in there.
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  //State variables.
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  // useEffect(() => {
  //    dispatch(getPosts());
  // }, [dispatch, currentId]);

  const searchPost = () => {
    if (search.trim() || tags) {
      // dispatch -> fetch search post
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    //The Enter key
    if (e.keyCode === 13) {
      //search for the posts
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={`dark_boxes ${classes.appBarSearch}`}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                placeholder="Please search for a memory"
                onChange={(e) => setSearch(e.target.value)}
                
              />
              <ChipInput
                style={{ margin: "10px 0 " }}
                value={tags}
                onAdd={(tag) => handleAdd(tag)}
                onDelete={(tag) => handleDelete(tag)}
                label="Search Tags"
                variant="outlined"
                placeholder="Please type a tag and press Enter"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>

            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper
                elevation={6}
                className={`.dark_paginate ${classes.pagination}`}
              >
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;

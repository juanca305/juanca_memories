import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  ThemeProvider,
  createTheme,
  Grid,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";

import useStyles from "./styles";
import { green } from "@material-ui/core/colors";
import { Link } from "react-router-dom/cjs/react-router-dom";

const PostDetails = () => {
  //console.log('Post Details')
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  // const theme1 = createTheme();

  // theme1.typography.h3 = {
  //   fontSize: '2rem',
  //   [theme1.breakpoints.down('sm')]: {
  //     fontSize: '1.4rem',
  //   },
  // };

  // theme1.typography.h6 = {
  //   fontSize: '1rem',
  //   [theme1.breakpoints.down('sm')]: {
  //     fontSize: '0.9rem',
  //   },
  // };

  // theme1.typography.body1 = {
  //   fontSize: '1.4rem',
  //   [theme1.breakpoints.down('sm')]: {
  //     fontSize: '0.85rem',
  //   },
  // };

  // theme1.typography.body2 = {
  //   fontSize: '0.85rem',
  //   [theme1.breakpoints.down('sm')]: {
  //     fontSize: '0.75rem',
  //   },
  // };

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(
    ({ _id }, index) => _id !== post._id && index < 10
  );

  const openPost = (_id) => history.push(`/posts/${_id}`);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h5" component="h2">
            {post.title}
          </Typography>
          <Divider style={{ margin: "14px 0" }} />
          <Typography
            gutterBottom
            variant="body1"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>

          {/* <Typography gutterBottom variant="body1" color="textSecondary" component="h2">{post.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography> */}

          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="body1">
            <b>Created by:</b> {post.name}
          </Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>

      {/* Recommended Posts */}
      {recommendedPosts.length && (
        <div className={classes.section} style={{ marginTop: "30px" }}>
          <Typography gutterBottom variant="h6">
            You might also like{" "}
          </Typography>
          <Divider />
          <Grid
            className={classes.recommendedPosts}
            container
            alignItems="stretch"
            spacing={3}
          >
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <Grid
                  item
                  xs={12}
                  sm={2}
                  md={2}
                  lg={1}
                  style={{
                    margin: "20px",
                    cursor: "pointer",
                    paddingTop: "20px",
                    width: "340px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="body1">
                    <strong>
                      {title.split(" ").splice(0, 2).join(" ")}...
                    </strong>
                  </Typography>
                  <Divider />
                  <div style={{ marginTop: "20px" }}>
                    <Typography gutterBottom variant="body1">
                      {name?.split(" ").splice(0, 2).join(" ")}
                    </Typography>
                    <Divider />
                    <Typography gutterBottom variant="subtitle2">
                      {message.split(" ").splice(0, 5).join(" ")}...
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      likes: {likes.length}
                    </Typography>
                    <img src={selectedFile} width="200px" />
                  </div>
                </Grid>
              )
            )}
          </Grid>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;

import { StepLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({

  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '480px',

  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column-reverse',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
    //border: '1px solid #ccc',
    //padding: '20px',
    [theme.breakpoints.down('sm')]: {
     width: '90%', 
     //fontSize: 12
    },
  },

  // sectionTitle: {
  //   fontSize: '80px',
  //   backgroundColor: 'red',
  //   border: '1px solid #000',
  // },

  imageSection: {
    marginLeft: '20px',
    maxWidth: '720px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginBottom: '10px'
    },
  },
  recommendedPosts: {
    display: 'flex',
    
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '20px', 
    borderRadius: '15px', 
    height: '39vh',
  },

  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  commentsInnerContainer: {
   height: '200px',
   overflowY: 'auto',
   marginRight: '30px',
   [theme.breakpoints.down('sm')]: {
    width: '90%',
    height: 'auto',
    marginBottom: '20px',
   },
  },

  writeAComment: {
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
     },
  },
}));
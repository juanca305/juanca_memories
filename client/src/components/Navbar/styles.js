import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
    textDecoration: "none",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  heading: {
    //color: theme.palette.primary.main,
    textDecoration: "none",
    fontSize: "2em",
    fontWeight: 300,
    backgroundColor: "transparent",
  },
  image: {
    marginLeft: "10px",
    marginTop: "5px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "auto",
    alignItems: "center",
    //border: "1px solid #000",
    //padding: "0 12px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      margin: "20px 0 20px 0",
    },
  },
  logout: {
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
      fontWeight: "bold",
      padding: "10px 20px",
    },
  },
  userName: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    marginLeft: "14px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      margin: "10px",
    },
  },

  brandContainer: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },

  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },


}));

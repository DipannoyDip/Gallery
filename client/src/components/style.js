const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: theme.spacing.unit,
    position: "fixed",
    //bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  input: {
    display: "none"
  }
});

export default styles;

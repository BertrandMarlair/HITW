const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        margin: "auto",
        marginTop: "20px",
        marginBottom: "20px"
    },
    paperSecond: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        margin: "auto",
        marginBottom: "20px"
    },
    flex: {
        transition: "0.2s",
        marginTop: "-10px",
        marginLeft: theme.spacing(0),
        [theme.breakpoints.down('md')]: {
            marginLeft: theme.spacing(0),
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(9),
        },
        minHeight: "95vh",
    },
    flexOpen: {
        transition: "0.4s",
        marginTop: "-10px",
        marginLeft: theme.spacing(30),
        minHeight: "95vh",
    },
    title:{
        color: theme.palette.text.primary,
    },
    card:{
        backgroundColor: theme.palette.background.default,
    },
    icon:{
        color: theme.palette.primary.light,
    },
    button: {
        float: "right",
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginLeft: theme.spacing(1),
    },
    gridContainer: {
        maxWidth: 1400,
        margin: 'auto',
    }
});

export default styles
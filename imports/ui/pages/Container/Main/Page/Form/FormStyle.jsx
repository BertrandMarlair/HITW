const styles = theme => ({
    root: {
        flexGrow: 1,
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
    formControl: {
        margin: theme.spacing(3),
    },
    group: {
        margin: theme.spacing(1, 0),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    locationField: {
        fontWeight: 300,
        padding: 15,
        borderBottom: '1px solid lightgray',
    }
});

export default styles
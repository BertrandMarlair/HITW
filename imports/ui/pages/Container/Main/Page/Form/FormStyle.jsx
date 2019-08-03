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
    container: {
        maxWidth: 400,
        margin: 'auto',
    },
    textField: {
        width: '94%',
        marginLeft: 8,
        marginRight: 8,
        border: '1px solid #848484',
    },
    locationField: {
        fontWeight: 300,
        padding: 15,
        borderBottom: '1px solid lightgray',
    }, 
    button: {
        margin: 'auto',
        display: 'block',
    },
    title: {
        marginTop: 30,
        marginLeft: 10,
        color: '#4e4e4e',
        marginBottom: '-5px',
    },
    formControl: {
        width: '100%',
        marginLeft: 10,
    },
    tabContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        minHeight: 'calc(80vh - 120px)',
    },
    fieldContainer: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    fieldContainerBis: {
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    icon: {
        color: 'grey',
        fontSize: 80,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    endTitle: {
        fontSize: '2rem',
        color: '#646464',
        marginBottom: 20,
        textAlign: 'center',
    },
    endText: {
        color: '#646464',
        textAlign: 'center',
    },
    endPage: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 'calc(80vh - 210px)',
    },
    bigtitle: {
        fontSize: '2rem',
        color: '#5c5c5c',
        marginLeft: 20,
        marginBottom: 20,
    }
});

export default styles
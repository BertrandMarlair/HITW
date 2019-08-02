const Styles = () => ({
    gridLayoutItem: {
        boxShadow: '0px 4px 16px 0 rgba(0, 0, 0, 0.16)',
        padding: 2,
        height: '100%',
    },
    gridLayoutItemContainer: {
        padding: 8,
        height: '95%',
    },
    linkListLayout: {
        background: 'lightblue',
        height: '80%',
    },
    linkListItems: {
        display: 'flex',
        flexDirection: 'column',
    },
    girdLayoutItem: {
        boxShadow: '0px 4px 16px 0 rgba(0, 0, 0, 0.16)',
        padding: 10,
        height: '100%',
    },
    headerContainer: {
        height: 42,
        marginTop: -6,
        marginBottom: 6,
    },
    titleWidget: {
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        marginTop: 12,
        marginLeft: '-10px',
    },
    leftIcon: {
        float: 'left',
        display: 'flex' 
    },
    rightIcon: {
        float: 'right',
        display: 'flex'
    },
    headerItem: {
        display: 'flex',
        animationName: '$fadeIn',
        animationDuration: '0.3s',
    },
    '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 }
    },
    dragIcon: {
        cursor: 'all-scroll',
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
    },
    gridContent: {
        height: 'calc(100% - 42px)',
        overflowY: 'scroll',
    }
})

export default Styles
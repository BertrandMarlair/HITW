// ##############################
// // // Menu styles
// #############################

const MenuStyle = {
  menu: {
    padding: 4,
    minWidth: 200,
    boxShadow: '0 4px 17px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    backgroundColor: '#ffffff',
    borderLeft: '4px solid #A1D078',
  },
  menuItem: {
      color: '#767676',
      cursor: 'pointer',
      display: 'flex',
      padding: 8,
      fontSize: 14,
      alignItems: 'center',
      fontWeight: 400,
      whiteSpace: 'nowrap',
      letterSpacing: 0,
      textDecoration: 'none',
      margin: 5,
      textAlign: 'center',
      textTransform: 'uppercase',
      justifyContent: 'center',
      background: '#efefef',
      '&:hover': {
        background: '#E9E9E9',
      }
  }
}

export default MenuStyle
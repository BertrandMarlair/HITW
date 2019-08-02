// ##############################
// // // Icon styles
// #############################

const buttonStyle = {
  Icon: {
    margin: 3,
    color: '#727171',
    minWidth: 35,
  },
  shadowed: {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.16)',
  },
  white: {
      color: '#FFF',
      background: 'transparent',
  },
  sm: {
    padding: 6,
  },
  lg: {
    padding: 15,
  },
  header: {
    background: 'white',
    '&:hover': {
      background: '#eee',
      boxShadow:
        '0 14px 26px -12px rgba(153, 153, 153, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(153, 153, 153, 0.2)',
    },
  },
  noPadding: {
    padding: 'unset',
  }
}

export default buttonStyle
import React, { Component }                         from 'react';
import ResponsiveDrawer                             from './Main/ResponsiveDrawer';
//______________________________________STATUS____________________________________________
import { UserStatus }                               from 'meteor/ostrio:user-status';
UserStatus.status.get();
//______________________________________THEME____________________________________________
import { MuiThemeProvider, createMuiTheme }         from '@material-ui/core/styles';

let colorEditingMain   = localStorage.getItem("colorEditingMain") ? localStorage.getItem("colorEditingMain") : "#2196f3";
let colorEditingSecond = localStorage.getItem("colorEditingSecond") ? localStorage.getItem("colorEditingSecond") : "#c51162";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state={
            theme: createMuiTheme({
                palette: {
                    type: localStorage.getItem("themeLight") == "dark" ? 'dark' : 'light',
                    primary: {
                        main: colorEditingMain,
                    },
                    secondary: {
                        main: colorEditingSecond,
                    },
                },
                primary: {
                    main: colorEditingMain,
                },
                secondary: {
                    main: colorEditingSecond,
                },
                typography: {
                    useNextVariants: true,
                },
                overrides: {
                    MuiButton: {
                        root: {
                            borderRadius: 30,
                            border: 0,
                            padding: '0 30px',
                        },
                    },
                    MuiPaper: {
                        elevation2: {
                            boxShadow: "0 4px 111px rgba(0,0,0,.2)",
                            borderRadius: 10,
                            border: '1px solid rgba(0,0,0,.1)'
                        }
                    },
                    MuiTypography: {
                        root: {
                            padding: '0 !important',
                            overflow: 'hidden',
                        }
                    }
                },
            }),
            light: localStorage.getItem("themeLight") == "dark" ? 'dark' : 'light',
        }
    }

    componentDidMount(){
        document.body.style.backgroundColor = this.state.theme.palette.background.default;
    }

    componentDidUpdate(){
        document.body.style.backgroundColor = this.state.theme.palette.background.default;
    }

    editingTheme = (lightTheme, colorMain, colorSecond) => {
        if(lightTheme){
            this.setState({light: this.state.light == 'light' ? 'dark' : 'light'});
            localStorage.setItem("themeLight", this.state.light == 'light' ? 'dark' : 'light');
        }
        this.setState({
            theme: createMuiTheme({
                palette: {
                    type: localStorage.getItem("themeLight") == "dark" ? 'dark' : 'light',
                    primary: {
                        main: colorMain ? colorMain : colorEditingMain,
                    },
                    secondary: {
                        main: colorSecond ? colorSecond : colorEditingSecond,
                    },
                },
                primary: {
                    main: colorMain ? colorMain : colorEditingMain,
                },
                secondary: {
                    main: colorSecond ? colorSecond : colorEditingSecond,
                },
                typography: {
                    useNextVariants: true,
                },
                overrides: {
                    MuiButton: {
                        root: {
                            borderRadius: 30,
                            border: 0,
                            padding: '0 30px',
                        },
                    },
                    MuiPaper: {
                        elevation2: {
                            boxShadow: "0 4px 111px rgba(0,0,0,.2)",
                            borderRadius: 10,
                            border: '1px solid rgba(0,0,0,.1)'
                        }
                    }
                },
            }),
        });
    }

    colorEditing(colorMain, colorSecond){
        colorEditingMain   = colorMain;
        colorEditingSecond = colorSecond;
        localStorage.setItem("colorEditingMain", colorMain);
        localStorage.setItem("colorEditingSecond", colorSecond);
        this.editingTheme(false, colorEditingMain, colorEditingSecond);
    }

    render() {
        return( 
        
            <MuiThemeProvider theme={this.state.theme}>
                <ResponsiveDrawer 
                    themeConfig={this.editingTheme.bind(this, true, false, false)}
                    colorEditing={this.colorEditing.bind(this)}
                />
            </MuiThemeProvider>
        )
    }
}
 
export default Container;

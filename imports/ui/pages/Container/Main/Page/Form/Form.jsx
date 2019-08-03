import React, { useState, useEffect } from 'react'
import styles from './FormStyle'
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import PerformChart from './components/performChart';
import Button from '@material-ui/core/Button';
import { Meteor } from 'meteor/meteor';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Icon } from '@material-ui/core';

const Form = ({ classes, menuOpen }) => {
    const [value, setValue] = useState(0);
    const [address, setAddress] = useState('');
    const [performValue, setPerformValue] = useState(0);
    const [Latlng, setLatLng] = useState({});
    const [test, setTest] = useState(0);
    const [name, setName] = useState('');
    const [sexe, setSexe] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [usage, setUsage] = useState('');
    const [state, setState] = useState('');

    const maxPerformValue = 1000;

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [value])

    const theme = useTheme();

    const handleChangeUsage = (event) => {
        setUsage(event.target.value);
    }

    const handleChangeState = (event) => {
        setState(event.target.value);
    }

    const handleChangeSexe = (event) => {
        setSexe(event.target.value);
    }

    function handleChangeIndex(index) {
        setValue(index);
    }

    const performTest = () => {
        let total = 0
        for(let j = 0; j < 10; j++){
            for(let i = 0; i < 1000000; i++ ){
                total =+ Math.random() * i * Math.sqrt(i)
            }   
        }
        console.log(total)
    }
    
    const perform = () => {
        let t0 = performance.now();
        performTest();   // <---- The function you're measuring time for 
        let t1 = performance.now();
        setPerformValue(Math.round((maxPerformValue - (t1 - t0))/maxPerformValue * 100))
        setTest(t1 - t0)
        console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    }

    const handleSelect = address => {
        console.log(address)
        setAddress(address)
        geocodeByAddress(address)
            .then(results => {
                console.log(results)
                return getLatLng(results[0])
            })
            .then(latLng => {setLatLng(latLng); console.log('Success', latLng)})
            .catch(error => console.error('Error', error));
    }

    const handlesubmit = () => {
        const computer = {
            map: {
                name: address,
                coordinates: [
                    Latlng.lng,
                    Latlng.lat,
                ]
            },
            name,
            lastname,
            age,
            sexe,
            usage,
            state,
            performance: performValue
        }
        console.log(computer)
        Meteor.call('computer.add', computer, (err) => {
            if(err){
                console.log(err)
            } else {
                setValue(5)
            }
        })
    }

    return (
        <div className={!menuOpen ? classes.flex : classes.flexOpen}>
            <div className={classes.container}>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <div className={classes.tabContainer}>
                            <div className={classes.fieldContainerBis}>
                                <div className={classes.bigtitle}>Location state</div>
                                <Icon className={classes.icon}>location_on</Icon>
                                <PlacesAutocomplete
                                    value={address}
                                    onChange={(e) => setAddress(e)}
                                    onSelect={handleSelect}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <div className={classes.title}>Location</div>
                                            <TextField
                                                {...getInputProps({
                                                    placeholder: 'Search Places ...',
                                                    className: 'location-search-input',
                                                })}
                                                className={classes.textField}
                                                margin="normal"
                                                placeholder="Location"
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                            />
                                            <div className="autocomplete-dropdown-container">
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map(suggestion => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                            className={classes.locationField}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </div>
                            <div className={classes.buttonContainer}>
                                <div></div>
                                <Button variant="contained" color="primary" className={classes.button} onClick={() => setValue(1)}>next</Button>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <div className={classes.tabContainer}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.bigtitle}>User Informations</div>
                                <div className={classes.title}>Name</div>
                                <TextField
                                    placeholder="Name"
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={(e) => setName(e.target.value)}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                                <div className={classes.title}>Lastname</div>
                                <TextField
                                    placeholder="Lastname"
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={(e) => setLastname(e.target.value)}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                                <div className={classes.title}>Age</div>
                                <TextField
                                    placeholder="Age"
                                    className={classes.textField}
                                    margin="normal"
                                    onChange={(e) => setAge(e.target.value)}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                />
                                <div className={classes.title}>Sexe</div>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <RadioGroup
                                        aria-label="gender"
                                        name="gender1"
                                        className={classes.group}
                                        value={sexe}
                                        onChange={handleChangeSexe}
                                    >
                                        <FormControlLabel value="female" control={<Radio color="primary"/>} label="Female" />
                                        <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male" />
                                        <FormControlLabel value="orther" control={<Radio color="primary"/>} label="Orther" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button variant="contained" color="primary" className={classes.button} onClick={() => setValue(0)}>prev</Button>
                                <Button variant="contained" color="primary" className={classes.button} onClick={() => setValue(2)}>next</Button>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <div className={classes.tabContainer}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.bigtitle}>Utilisation status</div>
                                <div className={classes.title}>Activity type</div>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <RadioGroup
                                        aria-label="usage"
                                        name="usage1"
                                        className={classes.group}
                                        value={usage}
                                        onChange={handleChangeUsage}
                                    >
                                        <FormControlLabel value="gender" control={<Radio color="primary"/>} label="Gender" />
                                        <FormControlLabel value="education" control={<Radio color="primary"/>} label="Education" />
                                        <FormControlLabel value="innovation" control={<Radio color="primary"/>} label="Innovation" />
                                        <FormControlLabel value="digital skills" control={<Radio color="primary"/>} label="Digital Skills" />
                                        <FormControlLabel value="social" control={<Radio color="primary"/>} label="Social" />
                                        <FormControlLabel value="migration" control={<Radio color="primary"/>} label="Migration" />
                                        <FormControlLabel value="healthcare" control={<Radio color="primary"/>} label="Healthcare" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button variant="contained" color="primary" className={classes.button}  onClick={() => setValue(1)}>prev</Button>
                                <Button variant="contained" color="primary" className={classes.button} onClick={() => setValue(3)}>Finish</Button>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <div className={classes.tabContainer}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.bigtitle}>Utilisation state</div>
                                <div className={classes.title}>State</div>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <RadioGroup
                                        aria-label="state"
                                        name="state1"
                                        className={classes.group}
                                        value={state}
                                        onChange={handleChangeState}
                                    >
                                        <FormControlLabel value="fulltime" control={<Radio color="primary" />} label="FullTime" />
                                        <FormControlLabel value="occasionnel" control={<Radio color="primary" />} label="Occasionnel" />
                                        <FormControlLabel value="disponible" control={<Radio color="primary" />} label="Disponible" />
                                        <FormControlLabel value="broken to fix" control={<Radio color="primary" />} label="Broken to fix" />
                                        <FormControlLabel value="broken to recycle" control={<Radio color="primary" />} label="Broken to reclyce" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button variant="contained" color="primary" className={classes.button} onClick={() => setValue(2)}>prev</Button>
                                <Button variant="contained" color="primary" className={classes.button} onClick={() => setValue(4)}>Finish</Button>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={4} dir={theme.direction}>
                        <div className={classes.tabContainer}>
                            <div className={classes.fieldContainer}>
                                <div>
                                    <PerformChart value={performValue} />
                                    <Button onClick={() => perform()} variant="contained" color="primary" className={classes.button} disabled={test !== 0}>
                                        Run perf test
                                    </Button>
                                </div>
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button variant="contained" color="primary" className={classes.button} onClick={() => setValue(3)}>prev</Button>
                                <Button variant="contained" color="primary" className={classes.button} onClick={() => handlesubmit()}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={5} dir={theme.direction}>
                        <div className={classes.tabContainer}>
                            <div className={classes.fieldContainer}>
                                <div className={classes.endPage}>
                                    <div className={classes.endTitle}>Thank you!</div>
                                    <div className={classes.endText}>The PC no.234-543-736</div>
                                    <div className={classes.endText}>in DB included</div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </SwipeableViews>         
            </div>
        </div>
    )
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
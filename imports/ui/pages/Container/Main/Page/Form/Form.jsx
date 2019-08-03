import React, { useState } from 'react'
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

const Form = ({ classes, menuOpen }) => {
    const [value, setValue] = useState('1');
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

    const handleChangeUsage = (event) => {
        setUsage(event.target.value);
    }
    const handleChangeState = (event) => {
        setState(event.target.value);
    }

    const handleChangeSexe = (event) => {
        setSexe(event.target.value);
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
            console.log(err)
        })
    }

    return (
        <div className={!menuOpen ? classes.flex : classes.flexOpen}>
            <div className={classes.container}>
                maps
                <PlacesAutocomplete
                    value={address}
                    onChange={(e) => setAddress(e)}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <TextField
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                                className={classes.textField}
                                margin="normal"
                                label="location"
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
                <TextField
                    label="name"
                    className={classes.textField}
                    margin="normal"
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="lastname"
                    className={classes.textField}
                    margin="normal"
                    onChange={(e) => setLastname(e.target.value)}
                />
                <TextField
                    label="age"
                    className={classes.textField}
                    margin="normal"
                    onChange={(e) => setAge(e.target.value)}
                />
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Sexe</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        className={classes.group}
                        value={sexe}
                        onChange={handleChangeSexe}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="orther" control={<Radio />} label="Orther" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Usage</FormLabel>
                    <RadioGroup
                        aria-label="usage"
                        name="usage1"
                        className={classes.group}
                        value={usage}
                        onChange={handleChangeUsage}
                    >
                        <FormControlLabel value="developement" control={<Radio />} label="Developement" />
                        <FormControlLabel value="info" control={<Radio />} label="Info" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">State</FormLabel>
                    <RadioGroup
                        aria-label="state"
                        name="state1"
                        className={classes.group}
                        value={state}
                        onChange={handleChangeState}
                    >
                        <FormControlLabel value="fulltime" control={<Radio />} label="FullTime" />
                        <FormControlLabel value="occasionnel" control={<Radio />} label="Occasionnel" />
                        <FormControlLabel value="disponible" control={<Radio />} label="Disponible" />
                        <FormControlLabel value="broken to fix" control={<Radio />} label="Broken to fix" />
                        <FormControlLabel value="broken to recycle" control={<Radio />} label="Broken to reclyce" />
                    </RadioGroup>
                </FormControl>
                <div>
                    <PerformChart value={performValue} />
                    <Button onClick={() => perform()} variant="contained" color="primary" className={classes.button} disabled={test !== 0}>
                        Run perf test
                    </Button>
                </div>
                <Button onClick={() => handlesubmit()} variant="contained" color="primary" className={classes.button}>
                    Submit
                </Button>
            </div>
        </div>
    )
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
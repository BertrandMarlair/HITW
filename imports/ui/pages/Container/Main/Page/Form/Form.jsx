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

const Form = ({ classes, menuOpen }) => {
    const [value, setValue] = useState('1');
    const [address, setAddress] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSelect = address => {
        console.log(address)
        setAddress(address)
        geocodeByAddress(address)
            .then(results => {
                console.log(results)
                return getLatLng(results[0])
            })
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    }

    return (
        <div className={!menuOpen ? classes.flex : classes.flexOpen}>
            <div className={classes.container}>
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
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Type</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        className={classes.group}
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="1" control={<Radio />} label="1" />
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    )
}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
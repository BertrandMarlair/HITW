import React, { Component } from 'react';
import { Promo }                from '../../../../api/PromoCollection';
import Input                    from '@material-ui/core/Input';
import InputLabel               from '@material-ui/core/InputLabel';
import MenuItem                 from '@material-ui/core/MenuItem';
import FormControl              from '@material-ui/core/FormControl';
import Select                   from '@material-ui/core/Select';
import compose                  from 'recompose/compose';
import PropTypes                from 'prop-types';
import { withTracker }          from 'meteor/react-meteor-data';
import { withStyles }           from '@material-ui/core/styles';

const styles = theme => ({
    formControl:{
        margin: "auto",
        display: 'block',
        maxWidth: "300px",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});

class PromoForm extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className="col s12">
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="age-label-placeholder">
                        Select Promotion
                    </InputLabel>
                    <Select
                        value={this.props.promotionSelected}
                        onChange={this.props.selectPromo.bind(this)}
                        input={<Input name="promo" id="age-label-placeholder" />}
                        displayEmpty
                        fullWidth
                        name="promo"
                        className={classes.selectEmpty}
                    >
                        <MenuItem value=""><em>All Promo</em></MenuItem>
                        {this.props.promo.map((ville) => {
                            return(
                                ville.promo && ville.promo.length > 0 ? ville.promo.map((promo, index) => {
                                    if(promo.promo_type === "Ongoing"){
                                        return(
                                            <MenuItem key={"promo/" + index} value={promo.promo_name}>{promo.promo_name}</MenuItem>
                                        )
                                    }
                                }) : ""
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

PromoForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withTracker(props => {
        Meteor.subscribe('promo');
        return {
            promo: Promo.find({}).fetch(),
        };
    }
),
    withStyles(styles, { withTheme: true })
)(PromoForm);
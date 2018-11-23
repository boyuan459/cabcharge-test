import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
    },
});

class EmailInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: props.error || false
        };
    }
    

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
            error: false
        })
        const { handleEmailInput } = this.props;
        if (handleEmailInput != null) {
            handleEmailInput(name, value);
        }
    }

    handleEnter = e => {
        if (e.key === 'Enter') {
            const valid = this.validate(this.state.email);
            if (valid) {
                const { onPressEnter } = this.props;
                if (!onPressEnter) {
                    return;
                }
                onPressEnter(this.state.email);
                //save to lists
                this.setState({
                    email: ''
                });
            } else {
                this.setState({
                    error: true
                })
            }
        }
    }

    validate = (email) => {
        if (email.trim().length === 0) {
            return false;
        }
        let valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        return valid;
    }

    render() {
        const { classes } = this.props;
        const { email, error } = this.state;

        return (
            <FormControl className={classes.formControl} error={error} aria-describedby="component-error-text">
                <Input
                    name="email"
                    placeholder="Enter email here"
                    onChange={this.handleUserInput}
                    onKeyPress={this.handleEnter}
                    value={email}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                />
                {
                    error ? 
                    <FormHelperText id="component-error-text">Invalid email !</FormHelperText>
                    : null
                }
            </FormControl>
        );
    }
}

export default withStyles(styles)(EmailInput);
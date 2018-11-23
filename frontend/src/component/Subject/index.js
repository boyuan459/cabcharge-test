import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    
});

class Subject extends Component {

    state = {
        valid: false,
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const { onChange } = this.props;
        this.setState({
            [name]: value,
            valid: !!value.trim().length
        }, () => onChange(name, value));

    }

    render() {
        const { classes, error, name } = this.props;
        const { valid } = this.state;

        return (
            <div className="row">
                <TextField
                        error={error && !valid}
                        name={name}
                        placeholder="Subject"
                        fullWidth
                        margin="normal"
                        onChange={this.handleUserInput}
                        />
                {
                    error && !valid ? 
                    <FormHelperText error>Please enter subject!</FormHelperText>
                    : null
                }
            </div>
        );
    }
}

export default withStyles(styles)(Subject);
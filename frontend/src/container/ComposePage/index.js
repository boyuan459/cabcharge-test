import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EmailList from '../../component/EmailList';
import Subject from '../../component/Subject';
import './style.css';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class ComposePage extends Component {

    state = {
        to: [],
        cc: false,
        bcc: false,
        subject: '',
        toError: false,
        subjecError: false,
    };

    handleDelete = (list, email) => {
        const items = this.state[list].filter(item => email != item);
        this.setState({
            [list]: items
        });
    }

    handleToDelete = (email) => {
        this.handleDelete('to', email);
    }

    handleCcDelete = (email) => {
        this.handleDelete('cc', email)
    }

    handleBccDelete = (email) => {
        this.handleDelete('bcc', email);
    }

    handleEmailInputEnter = (list, email) => {
        this.state[list].push(email);
        this.setState({
            [list]: this.state[list]
        });
    }

    handleToEmailEnter = (email) => {
        this.handleEmailInputEnter('to', email);
        this.setState({
            toError: false
        })
    }

    handleCcEmailEnter = (email) => {
        this.handleEmailInputEnter('cc', email);
    }

    handleBccEmailEnter = (email) => {
        this.handleEmailInputEnter('bcc', email);
    }

    handleCC = () => {
        this.setState({
            cc: []
        })
    }

    handleBcc = () => {
        this.setState({
            bcc: []
        })
    }

    handleSubjectChange = (name, value) => {
        this.setState({
            [name]: value,
            subjecError: false
        })
    }

    handleEmailInput = (name, value) => {
        this.setState({
            toError: false
        })
    }

    validate = () => {
        var valid = true;
        if (this.state.to.length === 0) {
            valid = false;
            this.setState({
                toError: true
            })
        }
        if (this.state.subject.trim().length === 0) {
            valid = false;
            this.setState({
                subjecError: true
            })
        }
        return valid;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const valid = this.validate();
        if (valid) {
            //send email
            console.log('Send email');
        }
    }

    render() {
        const { classes } = this.props;
        const { to, toEmail, cc, bcc, toError, subjecError } = this.state;

        return (
            <div className="container">
                <EmailList
                    items={to}
                    handleDelete={this.handleToDelete}
                    handleEmailEnter={this.handleToEmailEnter}
                    handleEmailInput={this.handleEmailInput}
                    to={true}
                    handleCC={this.handleCC}
                    handleBcc={this.handleBcc} />
                {
                    toError ? 
                    <div className="row error">Please ener emails !</div>
                    : null
                }
                {
                    cc !== false ?
                        <EmailList
                            title="CC"
                            items={cc}
                            handleDelete={this.handleCcDelete}
                            handleEmailEnter={this.handleCcEmailEnter}
                        />
                        : null
                }
                {
                    bcc !== false ?
                        <EmailList
                            title="BCC"
                            items={bcc}
                            handleDelete={this.handleBccDelete}
                            handleEmailEnter={this.handleBccEmailEnter}
                        />
                        : null
                }

                <Subject name="subject" onChange={this.handleSubjectChange} error={subjecError} />
                <div className="row">
                    <TextField
                        label="Content"
                        placeholder="Please enter content here"
                        fullWidth
                        multiline
                        rows="10"
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="row">
                    <Button onClick={this.handleSubmit} variant="contained" color="primary" className={classes.button}>
                        Send
                    </Button>
                </div>
            </div>

        );
    }
}


export default withStyles(styles)(ComposePage);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EmailList from '../../component/EmailList';
import Subject from '../../component/Subject';
import * as Actions from '../../redux/email/actions';
import { getEmailSent, getEmailLoading, getEmailError } from '../../selectors';
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
        text: '',
        toError: false,
        subjecError: false,
        success: false,
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
            const { to, cc, bcc, subject, text } = this.state;
            console.log({to, cc, bcc, subject, text});
            const { sendEmail } = this.props;
            sendEmail({to, cc, bcc, subject, text});
        }
    }

    handleUserInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
        this.setState({
            [name]: value
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.sent.length !== prevProps.sent.length) {
            console.log("new email sent");
            this.setState({
                success: true
            }, () => setTimeout(() => {this.setState({success: false})}, 3000));
        }
    }

    render() {
        const { classes, error, loading } = this.props;
        const { to, toEmail, cc, bcc, toError, subjecError, success } = this.state;

        return (
            <div className="container">
                {
                    success ? 
                    <div className="alert alert-primary" role="alert">
                        Wow, email has been sent !!
                    </div>
                    : null
                }
                {
                    error ? 
                    <div className="alert alert-danger" role="alert">
                        Ooops! Something wrong !!
                    </div>
                    : null
                }
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
                        name="text"
                        onChange={this.handleUserInput}
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
                    <Button onClick={this.handleSubmit} variant="contained" color="primary" disabled={loading} className={classes.button}>
                        { loading ? 'Sending' : 'Send'}
                    </Button>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        loading: getEmailLoading(state),
        error: getEmailError(state),
        sent: getEmailSent(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendEmail(data) {
            dispatch(Actions.sendEmail(data));
        }
    };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ComposePage));
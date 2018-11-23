import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import EmailInput from '../EmailInput';
import './style.css';

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit
    },
});

class EmailList extends Component {
    handleCcClick = (e) => {
        e.preventDefault();
        const { handleCC } = this.props;
        handleCC();
    }

    handleBccClick = (e) => {
        e.preventDefault();
        const { handleBcc } = this.props;
        handleBcc();
    }
    render() {
        const { classes, items, handleDelete, handleEmailEnter, handleEmailInput, to = false, title = 'To' } = this.props;

        return (
            <div className="row">
                    <div className="email-label">
                        <span>{title}:</span>
                    </div>
                    <div className="emails-list">
                            {
                                items.map((item, i) => <Chip
                                    key={i}
                                    label={item}
                                    onDelete={() => handleDelete(item)}
                                    className={classes.chip}
                                    color="primary"
                                />)
                            }
                            <EmailInput onPressEnter={handleEmailEnter} handleEmailInput={handleEmailInput}/>
                    </div>
                    {
                        to ? 
                        <div className="emails-cc">
                            <a href="#" onClick={this.handleCcClick}>CC</a>
                            <a href="#" onClick={this.handleBccClick}>BCC</a>
                        </div>
                        : null
                    }
                </div>
        );
    }
}

export default withStyles(styles)(EmailList);
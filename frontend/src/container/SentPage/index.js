import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
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

class SentPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            checkAll: false,
            sent: props.sent
        }
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    checkAll = (e, value) => {
        console.log(value);
        const { sent } = this.state;
        const newSent = sent.map(item => {
            item.checked = value;
            return item;
        });
        this.setState({
            sent: newSent
        });
    }

    handleItemCheck = (e, value, item) => {
        console.log(value, item);
        const { sent } = this.state;
        const newSent = sent.map(i => {
            if (i.id === item.id) {
                i.checked = value;
            }
            return i;
        });
        this.setState({
            sent: newSent
        });
    }

    render() {
        const { anchorEl, checkAll, sent } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div className="container">
                <div className="row">
                    <Checkbox
                        onChange={this.checkAll}
                        value="all"
                        color="primary"
                    />
                    <div>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>All mark as read</MenuItem>
                            <MenuItem onClick={this.handleClose}>Delete</MenuItem>
                        </Menu>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">To</th>
                            <th scope="col">Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sent.map(item =>
                                (<tr key={item.id}>
                                    <th scope="col">
                                        <Checkbox
                                            onChange={(e, value) => this.handleItemCheck(e, value, item)}
                                            checked={!!item.checked}
                                            value={item.id}
                                            color="primary"
                                        />
                                    </th>
                                    <td>{item.to.join(",")}</td>
                                    <td>{item.subject}</td>
                                </tr>))
                        }
                    </tbody>
                </table>
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
    };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SentPage));
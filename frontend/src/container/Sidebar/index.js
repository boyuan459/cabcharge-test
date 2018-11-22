import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '../../component/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const styles = theme => ({
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    subMenuItem: {
        '&:focus': {
            backgroundColor: 'transparent',
        },
    },
    menuText: {
        padding: 0
    },
    primary: {},
    icon: {
        width: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    }
});

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: '',
            menuHover: '',
            subMenuOpen: false,
            open: this.props.open
        }
    }

    handleMenuClick = menu => {
        const {handleMouseLeave, open} = this.props;
        this.setState({
            menu
        }, () => {
            !this.state.open && handleMouseLeave();
        });
    }

    handleSubmenuClick = () => {
        this.setState({
            subMenuOpen: !this.state.subMenuOpen
        })
    }

    componentWillReceiveProps(props) {
        //previously 
        if (this.state.open !== props.open && props.toggle) {
            this.setState({
                open: props.open
            })
        }
    }

    handleMouseEnter = (event) => {
        console.log('Enter', event.target);
        const {handleMouseEnter, open} = this.props;
        if (open) {
            return;
        }
        this.setState({
            open: false
        }, () => handleMouseEnter());
        //this will open the drawer, when mouse leave, no thing will do
        //it's wrong
    }

    handleMouseLeave = (event) => {
        // console.log("Leave", event.target);
        console.log("Leave");
        const {handleMouseLeave, open} = this.props;
        !this.state.open && handleMouseLeave();
    }

    handlePopoverClose = () => {
        console.log('Clolse')
    }

    render() {
        const { classes, open } = this.props;
        const { menu, anchorEl, positionTop, positionLeft, menuHover, popoverHover } = this.state;
        const popover = {
            pointerEvents: 'auto'
        };
        return (
            <div onMouseLeave={this.handleMouseLeave}>
                <MenuList>
                    <MenuItem key="dashboard" onMouseEnter={this.handleMouseEnter} onClick={() => this.handleMenuClick('dashboard')} selected={menu === 'dashboard' ? true : false} className={classes.menuItem} component={props => <Link to="/dashboard" {...props} />}>
                        <ListItemIcon className={classes.icon}>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.menuText} classes={{ primary: classes.primary }} primary="Dashboard" />
                    </MenuItem>
                    <MenuItem key="blank" onMouseEnter={this.handleMouseEnter}
                        onClick={() => this.handleMenuClick('blank')} 
                        selected={menu === 'blank' ? true : false} 
                        className={classes.menuItem} 
                        component={props => <Link to="/dashboard/blank" {...props} />}>
                        <ListItemIcon className={classes.icon}>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.menuText} classes={{ primary: classes.primary }} inset primary="Compose" />
                    </MenuItem>
                    <MenuItem key="sent" onMouseEnter={this.handleMouseEnter}
                        onClick={() => this.handleMenuClick('sent')} 
                        selected={menu === 'sent' ? true : false} 
                        className={classes.menuItem} 
                        component={props => <Link to="/dashboard/blank" {...props} />}>
                        <ListItemIcon className={classes.icon}>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.menuText} classes={{ primary: classes.primary }} inset primary="Sent" />
                    </MenuItem>
                    {/* <MenuItem key="test" selected={false} button onMouseEnter={this.handleMouseEnter} className={classes.subMenuItem} onClick={this.handleSubmenuClick}>
                        <ListItemIcon className={classes.icon}>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.menuText} inset primary="Inbox" />
                        {this.state.subMenuOpen ? <ExpandLess /> : <ExpandMore />}
                    </MenuItem>
                    <Collapse in={this.state.subMenuOpen} timeout="auto" unmountOnExit>
                        <MenuList>
                            <MenuItem button onMouseEnter={this.handleMouseEnter}
                                key="test-blank"
                                onClick={() => this.handleMenuClick('test-blank')} 
                                selected={menu === 'test-blank' ? true : false} 
                                className={classes.menuItem} 
                                component={props => <Link to="/dashboard/blank" {...props} />}>
                                <ListItemIcon className={classes.icon}>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText className={classes.menuText} inset primary="Starred" />
                            </MenuItem>
                        </MenuList>
                    </Collapse> */}
                </MenuList>
            </div>
        );
    }

}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(Sidebar));

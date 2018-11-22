import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuIconClose from '@material-ui/icons/WrapText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Sidebar from '../Sidebar';
import AppRouter from './AppRouter';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    height: '100vh',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class App extends Component {
    state = {
        open: false,
        toggle: false
      };
    
      handleDrawerOpen = () => {
        this.setState({ open: true, toggle: false });
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      };

      handleDrawerToggle = () => {
        this.setState({ open: !this.state.open, toggle: true });
      }
    
      render() {
        const { classes, theme } = this.props;
        const { open, toggle } = this.state;

        return (
          <div className={classes.root}>
            <AppBar
              position="absolute"
              className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
            >
              <Toolbar disableGutters>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classNames(classes.menuButton)}
                >
                  {
                    open ? 
                    <MenuIconClose />
                    :<MenuIcon />
                  }
                </IconButton>
                <Typography variant="title" color="inherit" noWrap>
                  
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
              }}
              open={this.state.open}
            >
              <div className={classes.toolbar}>
                <Typography>Cabcharge</Typography>
              </div>
              <Divider />
              <List>
                  <Sidebar toggle={toggle} open={open} handleMouseEnter={this.handleDrawerOpen} handleMouseLeave={this.handleDrawerClose} />
              </List>
            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <AppRouter />
            </main>
          </div>
        );
      }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
export default withStyles(styles, { withTheme: true })(connect()(App));
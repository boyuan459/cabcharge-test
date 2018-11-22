import React, { Component, Fragment } from 'react';
import ListItemText from '@material-ui/core/ListItemText';

class ListItemTextWrapper extends Component {
    render() {
        return (
            <Fragment>
                <ListItemText {...this.props} />
            </Fragment>
        );
    }
}

export default ListItemTextWrapper;
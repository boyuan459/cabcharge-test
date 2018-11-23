import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

export default class AppRouter extends Component {
    render() {
        return (
            <Switch>
                <Route 
                    exact
                    path="/dashboard"
                    component={asyncComponent(() => import('../Dashboard'))}/>
                <Route 
                    exact
                    path="/dashboard/blank"
                    component={asyncComponent(() => import('../BlankPage'))}/>
                <Route 
                    exact
                    path="/dashboard/sent"
                    component={asyncComponent(() => import('../SentPage'))}/>
                <Route 
                    exact
                    path="/dashboard/compose"
                    component={asyncComponent(() => import('../ComposePage'))} />
            </Switch>
        );
    }
}
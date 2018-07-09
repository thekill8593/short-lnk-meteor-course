import { Meteor } from 'meteor/meteor';
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Router from "react-router-dom/Router";

import Signup from "../ui/Signup";
import Link from "../ui/Link";
import NotFound from "../ui/NotFound";
import Signin from "../ui/Signin";

const history = createBrowserHistory()

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onRenderPublicPage = (component) =>
{
    return Meteor.userId() ? (
        <Redirect to="/links"/>
    ): (
        component
    );
};

const onRenderPrivatePage = (component) =>
{
    return !Meteor.userId() ? (
        <Redirect to="/"/>
    ): (
        component
    );
};

export const onAuthChange = (isAuthenticated) => {
    const pathname = history.location.pathname;
    const IsUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const IsAuthenticatedPage = authenticatedPages.includes(pathname);

    if (IsUnauthenticatedPage && isAuthenticated) {
        history.replace('/links');
    } else if (IsAuthenticatedPage && !isAuthenticated) {
        history.replace('/');
    }
};

export const routes = (
    <Router history={history}>
        <Switch>
            <Route exact path="/" render={() => { return onRenderPublicPage(<Signin/>)}}/>
            <Route exact path="/signup" render={() => { return onRenderPublicPage(<Signup/>)}}/>
            <Route exact path="/links" render={() => { return onRenderPrivatePage(<Link/>)}}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
);
import React from "react";
import { Session } from 'meteor/session';
import {Tracker} from "meteor/tracker";
import {Links} from "../api/links";
import {Meteor} from "meteor/meteor";

export default class LinksListFilters extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showVisible: true
        }
    }

    componentDidMount() {
        this.visibilityTracker = Tracker.autorun(() => {
           this.setState({
               showVisible: Session.get('showVisible')
           })
        });
    }

    componentWillUnmount() {
        this.visibilityTracker .stop();
    }

    render() {
        return (
            <div>
                <label className={'checkbox'}>
                    <input className={'checkbox__box'} type={'checkbox'} onChange={
                        (e) => {
                            Session.set('showVisible', e.target.checked);
                        }
                    } checked={this.state.showVisible}/>
                    Show hidden links
                </label>
            </div>
        );
    }
};
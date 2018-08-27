/**
 * Created by RCC on 2018/6/25.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import './index.less';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>this is main page</div>
        )
    }
}

export default connect(state => state.main, null)(Main);

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { initAxiosInterceptors } from './helpers/auth-helpers';

import { Login } from './user/login'; 
import { CreateGame , UnirGame} from './game/game';
import { WaitJoining } from './game/waitJoining';
import { Board } from './game/board/board';


initAxiosInterceptors();

export default class App extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route exact path='/registration' component={Login} />
                <Route exact path='/game'>
                    <CreateGame />
                    <UnirGame />
                </Route>
                <Route exact path='/game/waiting' component={WaitJoining} />
                <Route exact path='/game/board/'>
                    <Board />
                </Route>
            </Switch>
        );
    }
}
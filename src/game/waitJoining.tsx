import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import { IGame, getGame } from './gameApi';


const recargaCada: number = 3000;


function WaitJoining() {
    // HOOKS
    const history = useHistory();
    const { gameInit } : any = history.location.state;

    useEffect(() => {

        async function isJoined() {
            const resGame :IGame = await getGame(gameInit.id);      // Actualiza el game 
    
            if (resGame.user2) {    // verfica si se ah conectado un segundo jugador
                history.push(`/game/board/` , {gameInit: resGame});       // Te redirige al juego inicial
            }
        }

        let timerID = setInterval(
            () => isJoined(),
            recargaCada
        );

        return (() => {
            clearInterval(timerID);
        })
    }, [gameInit, history]);



    return (
        <div>

            <h2> Pasale a tu amigo el codigo: {gameInit.id}</h2>

            <h3> Esperando ...</h3>

        </div>
    );
}


export { WaitJoining };
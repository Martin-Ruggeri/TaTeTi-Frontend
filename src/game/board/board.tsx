import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import './boardStyle.css';

import { IGame, getGame } from '../gameApi';
import { IBoard, IUpDateBoard, newBoard, editBoard, getBoard } from './boardApi';
import { IUser } from '../../user/userApi';

const recargaCada: number = 1000;
const boardInit: IBoard = { id: 0, turno: '', casillas: ['0', '0', '0', '0', '0', '0', '0', '0', '0'] }

function Board() {
    // HOOKS
    const history = useHistory();
    const { gameInit }: any = history.location.state;
    const [game, setGame] = useState(gameInit);
    const [board, setBoard] = useState(boardInit);
    const [validation, setValidation] = useState('');



    async function handleSelecCasilla(casilla: number) {
        setValidation(``);
        if (board.win) {
            setValidation(`Game over`);
            return;
        }       // Si ya hay ganador, no hacer nada

        try {
            const body: IUpDateBoard = { casilla: casilla }     // Actualiza el Board
            setBoard(await editBoard(game.id, board.id, body));
        } catch (error) {
            setValidation(`${error}`);
        }
    }


    async function handleRevencha() {
        setValidation(``);
        if (!board.win) {
            setValidation(`Para jugar revancha se debe terminar el juego`);
            return;
        } // Si el juego todavia no termina, no hacer nada

        await newBoard(game.id, {});    // Crea un nuevo tablero
    }


    function marcar(i: number) {
        if (!board.casillas) return;
        if (!game) return;


        if (board.casillas[i] === game.user1.token) return 'X';
        if (board.casillas[i] === game.user2.token) return 'O';

        return;
    }


    useEffect(() => {

        async function buscarJuego() {
            const restGame = await getGame(game.id);    // Al hacer setGame, en las lineas siguientes no se puede usar game, por eso se guarda resGame en una constante
            setGame(restGame);
            setBoard(await getBoard(game.id, restGame.ultBoard ? restGame.ultBoard : 0));
        }

        let interval = setInterval(
            () => buscarJuego(),        // Esta funcion actualiza el game y el board
            recargaCada
        );

        return (() => {
            clearInterval(interval);
        })
    }, [game.id]);


    return (
        <div className="grid-container">

            <Users board={board} game={game} />

            <table id="tablero">
                <tbody>
                    <tr>
                        <td className="f1 c1" onClick={() => handleSelecCasilla(0)} >{marcar(0)}</td>
                        <td className="f1 c2" onClick={() => handleSelecCasilla(1)} >{marcar(1)}</td>
                        <td className="f1 c3" onClick={() => handleSelecCasilla(2)} >{marcar(2)}</td>
                    </tr>
                    <tr>
                        <td className="f2 c1" onClick={() => handleSelecCasilla(3)} >{marcar(3)}</td>
                        <td className="f2 c2" onClick={() => handleSelecCasilla(4)} >{marcar(4)}</td>
                        <td className="f2 c3" onClick={() => handleSelecCasilla(5)} >{marcar(5)}</td>
                    </tr>
                    <tr>
                        <td className="f3 c1" onClick={() => handleSelecCasilla(6)} >{marcar(6)}</td>
                        <td className="f3 c2" onClick={() => handleSelecCasilla(7)} >{marcar(7)}</td>
                        <td className="f3 c3" onClick={() => handleSelecCasilla(8)} >{marcar(8)}</td>
                    </tr>
                </tbody>
            </table>

            {/* Validaciones */}
            <div className="w3-pale-red w3-border w3-text-red w3-display-topmiddle">
                <label>{validation}</label>
            </div>

            <button className="w3-button w3-black w3-round-xlarge w3-small revancha" onClick={() => handleRevencha()} >Revancha</button>
        </div>
    );
}

interface IpropsUsers {
    board: IBoard,
    game: IGame,
}

function Users(props: IpropsUsers) {


    function footer(board:IBoard , user:IUser){
        if(board.win){
            if(board.win == user.name) return `GANADOR!!`;
            else return ``;
        }

        if(board.turno == user.token) return `Tu turno`;
    }

    return (
        <div className="container-user">
            {/* User 1 */}
            <div className="w3-card-4 w3-col l3 w3-margin">
                <div className="partidasGanadas">
                    <label>Partidas ganadas: {props.game.winUser1}</label>
                </div>
                <header className="w3-container w3-blue">
                    <h2>{props.game.user1.name}</h2>
                </header>

                <div className="w3-container">
                    <p> Tienes las 'X'</p>
                </div>

                <footer className="w3-container w3-blue">
                    <h5>{footer(props.board, props.game.user1)}</h5>
                </footer>
            </div>


            {/* User 2 */}
            <div className="w3-card-4 w3-col l3 w3-margin w3-right">
                <div className="partidasGanadas">
                    <label>Partidas ganadas: {props.game.winUser2}</label>
                </div>
                <header className="w3-container w3-blue">
                    <h2>{props.game.user2.name}</h2>
                </header>

                <div className="w3-container">
                    <p> Tienes los 'O'</p>
                </div>

                <footer className="w3-container w3-blue">
                    <h5>{footer(props.board, props.game.user2)}</h5>
                </footer>
            </div>

        </div>
    );
}


export { Board, Users };


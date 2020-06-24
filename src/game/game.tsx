import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { newGame, joinGame, IGame } from './gameApi';
import { newBoard } from './board/boardApi';

function CreateGame() {
    // Opciones que se pueden seleccionar
    const options = ['Jugar contra la maquina', 'Jugar contra un amigo'];

    // HOOKS
    const [radio, setRadio] = useState(options[1]);
    const history = useHistory();

    // Al accionar boton Crear partida
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();   // consume el evento

        try {
            switch (radio) {
                case options[0]: {
                    const game: IGame = await newGame({ vsMaquina: true });
                    await newBoard(game.id, {});     // Crea el board inicial
                    history.push(`/game/board`, { gameInit: game });          // Cambiar al component Board
                    break;
                }

                case options[1]: {
                    const game: IGame = await newGame({ vsMaquina: false });
                    history.push(`/game/waiting`, { gameInit: game });          // Cambiar al component WaitJoined
                    break;
                }
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <form className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin w3-col l3" onSubmit={(event) => handleSubmit(event)}>
            <h2 className="w3-center">Crear Juego</h2>

            {/* Radios */}
            {
                options.map(option =>
                    <div className="radio" key={option.toString()}>
                        <label>
                            <input className="w3-margin-right" type="radio" value={option} checked={radio === option} onChange={(event) => { setRadio(event.target.value) }} />
                            <b>{option}</b>
                        </label>

                        <br />
                    </div>
                )
            }

            {/* Botonera */}
            <input className="w3-button w3-block w3-section w3-black w3-round-xxlarge " type="submit" value="Crear" />

        </form>
    );
}


function UnirGame() {

    // HOOKS
    const [codigo, setValueInput] = useState(Number);
    const [validation, setValidation] = useState('');
    const history = useHistory();

    // Al accionar boton Crear partida
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();   // consume el evento
        setValidation('');

        if (!codigo) {
            setValidation(`El Codigo no puede estar vacio`);
            return;
        }  // Si el input esta vacio retorna nada

        try {
            const game: IGame = await joinGame(codigo, {});         // Une el user2 a la partida.

            await newBoard(game.id, {});     // Crea el board inicial

            history.push(`/game/board/`, { gameInit: game });          // Cambiar al component Board
        } catch (error) {
            setValidation(`Codigo '${codigo}' invalido`);
        }
    }


    return (
        <form className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin w3-col l3" onSubmit={(event) => handleSubmit(event)}>
            <h2 className="w3-center">Unirte Juego</h2>

            {/* Input */}
            <div className="w3-row w3-section">
                <label className="w3-text-blue" htmlFor="unirPartida"><b>Codigo</b></label>
                <div className="w3-rest">
                    <input className="w3-input" type="number" id="unirPartida" placeholder="Ingrese Código Partida" onChange={(event) => setValueInput(parseInt(event.target.value))} />
                </div>
            </div>

            {/* Validaciones */}
            <div className="w3-pale-red w3-border w3-text-red">
                <label>{validation}</label>
            </div>
            
            {/* Botonera */}
            <input className="w3-button w3-block w3-section w3-black w3-round-xxlarge " type="submit" value="Unir" />

        </form>
    );
}


export { CreateGame, UnirGame };
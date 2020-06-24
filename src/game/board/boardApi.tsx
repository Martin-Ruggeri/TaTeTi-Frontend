import axios from 'axios';

// VARIABLES
const URLBase = 'http://127.0.0.1:3000/game/';


// INTERFACES
export interface IBoard {
    id: number,
    casillas: string[],
    turno: string,
    win?: string
}

interface IUpBoard {
}

export interface IUpDateBoard {
    casilla: number,        // el numero de la casilla a modificar [0,1,2,3,4,5,6,7,8]
}

// POST BOARD
async function newBoard(idGame: number, body: IUpBoard): Promise<IBoard> {
    try {
        const res = (await axios.post(URLBase + idGame + '/board/', body)).data;         // Crea el board en la API 

        if (res.status === "ERROR") return Promise.reject(res.response.err);  // Si hubo un error responde el error

        return Promise.resolve(res.response.result as IBoard);    // Devuelve el board creado

    } catch (error) {
        return Promise.reject(error);
    }
}

// PUT BOARD
async function editBoard(idGame: number, id: number, body: IUpDateBoard): Promise<IBoard> {
    try {
        const res = (await axios.put(URLBase + idGame + '/board/' + id, body)).data;         // Modifica el board en la API 

        if (res.status === "ERROR") return Promise.reject(res.response.err);  // Si hubo un error responde el error

        return Promise.resolve(res.response.result as IBoard);    // Devuelve el board creado

    } catch (error) {
        return Promise.reject(error);
    }
}

// GET BOARD
async function getBoard(idGame: number, id: number): Promise<IBoard> {
    try {
        const res = (await axios.get(URLBase + idGame + '/board/' + id)).data;         // Busca el board en la API 

        if (res.status === "ERROR") return Promise.reject(res.response.err);  // Si hubo un error responde el error

        return Promise.resolve(res.response.result as IBoard);    // Devuelve el board creado

    } catch (error) {
        return Promise.reject(error);
    }
}



export { newBoard, editBoard, getBoard };
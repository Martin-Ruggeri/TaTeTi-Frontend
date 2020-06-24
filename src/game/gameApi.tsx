import axios from 'axios';
import { IUser, findByIdUser} from '../user/userApi';

// VARIABLES
const URLBase = 'http://127.0.0.1:3000/game/';


// INTERFACES
export interface IGame {
    id: number,
    user1: IUser,
    user2: IUser,
    winUser1: number,
    winUser2: number,
    vsMaquina: boolean,
    ultBoard?: number,
}

interface IUpGame {
    vsMaquina: boolean,
}

interface IUpDateGame {
}

// POST GAME
async function newGame(body: IUpGame): Promise<IGame> {
    try {
        const res = (await axios.post (URLBase,body)).data;         // Crea el game en la API 
        
        if(res.status === "ERROR") return Promise.reject(res.response.err);  // Si hubo un error responde el error

        return Promise.resolve(res.response.result);    // Devuelve el id del game creado

    } catch (error) {
        return Promise.reject(error);
    } 
}

// PUT GAME
async function joinGame(id:number ,body: IUpDateGame): Promise<IGame> {
    try {
        const res = (await axios.put (URLBase + id, body)).data;         // Crea el game en la API 
        
        if(res.status === "ERROR") return Promise.reject(res.response.err);  // Si hubo un error responde el error

        return Promise.resolve(res.response.result);  

    } catch (error) {
        return Promise.reject(error);
    } 
}

// GET GAME
async function getGame(id:number): Promise<IGame> {
    try {
        const res = (await axios.get (URLBase + id)).data;         // Obtiene el game en la API 
        
        if(res.status === "ERROR") return Promise.reject(res.response.err);  // Si hubo un error responde el error

        return Promise.resolve(res.response.result);  

    } catch (error) {
        return Promise.reject(error);
    } 
}


export { newGame , joinGame, getGame};
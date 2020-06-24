import axios from 'axios';

// VARIABLES
const URLBase = 'http://127.0.0.1:3000/user/';


// INTERFACES
export interface IUser {
    id: number,
    name: string,
    token: string,
}

interface IUpUser {
    name: string,
}


// GET USER (busca por el token guardado en el headers )
async function findUser(): Promise<IUser>  {
    try {
        const res= (await axios.get(URLBase + 'whoami')).data;

        if(res.status === "ERROR") return Promise.reject(res.response.err);  // Si hubo un error responde el error

        return Promise.resolve(res.response.result);
    } catch (error) {
        return Promise.reject(error);
    }
}


// GET USER
async function findByIdUser(id:number): Promise<IUser>  {
    try {
        const res= (await axios.get(URLBase + id)).data;

        if(res.status === "ERROR") return Promise.reject(res.response.err);  // Si hubo un error responde el error

        return Promise.resolve(res.response.result);
    } catch (error) {
        return Promise.reject(error);
    }
}


// POST USER
async function postUser(body: IUpUser): Promise<string> {
    try {
        const res = (await axios.post (URLBase,body)).data;         // Crea el usuario en la API 
        
        if(res.status === "ERROR") return Promise.reject(res.response.err);  // Si hubo un error responde el error

        return Promise.resolve(res.response.result.token as string);    // Devuelve el token del user creado

    } catch (error) {
        return Promise.reject(error);
    } 
}

export {findByIdUser , findUser , postUser};
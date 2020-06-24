import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import { setToken, getToken } from '../helpers/auth-helpers';

import { postUser } from './userApi';



function Login() {
  const [valueInput, setValueInput] = useState('');
  const [validation, setValidation] = useState('');
  const history = useHistory();


  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();   // consume el evento
    setValidation('');

    if (!valueInput) {
      setValidation(`El nombre no puede estar vacio`);
      return;
    } 

    try {
      const token: string = await postUser({ name: valueInput });

      setToken(token);    // Setea el token al localStorage

      history.push('/game');
    } catch (error) {
      setValidation(error);
    }
  }


  useEffect(() => {
    // Si hay un token guardado en el storage salta a game
    if (getToken()) {
      history.push('/game');
    }
  }, [history]);


  return (
    <div>
      {/* Titulo */}
      <div className="w3-container w3-teal">
        <h1 className="w3-center" >Ta Te Ti</h1>
      </div>
          
      {/* Formulario */}
      <form className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin w3-col l3 w3-display-middle" onSubmit={(event) => handleSubmit(event)}>
        <h2 className="w3-center">Jugador</h2>
        
        {/* Input */}
        <div className="w3-row w3-section">
          <div className="w3-col" style={{ width: "50px" }}><i className="w3-xxlarge fa fa-user"></i></div>
          <div className="w3-rest">
            <input className="w3-input w3-border" type="text" value={valueInput} placeholder="Ingrese Nombre" onChange={(event) => setValueInput(event.target.value)} />
          </div>
        </div>

        {/* Validaciones */}
        <div className="w3-pale-red w3-border w3-text-red">
          <label>{validation}</label>
        </div>

        {/* Botonera */}
        <input className="w3-button w3-block w3-section w3-blue w3-ripple w3-padding" type="submit" value="Ingresar" />
      </form>
    </div>
  );
}

export { Login };
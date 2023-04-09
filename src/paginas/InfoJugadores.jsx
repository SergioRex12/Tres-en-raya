import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useJuego from "../hooks/useJuego";
import "./infoJugadores.css"

const InfoJugadores = () => {
    const navigate = useNavigate();
    
    const {juego} = useJuego();
    const [jugador1, setJugador1] = useState("");
    const [jugador2, setJugador2] = useState("");
    const [modo, setModo] = useState("amigo");

    const subitFormulario = (e) => {
        e.preventDefault();
        if (jugador1.length > 1) juego.jugador1 = jugador1;
        if (jugador2.length > 1) juego.jugador2 = jugador2;
        juego.tipo = modo;

        navigate("/jugar");
    }

    return ( 
        <section className="formulario-iniciar">
            <div className="titulo">
                <p>Modo</p>
                <select name="dificultad" id="dificultad" onChange={e => setModo(e.target.value)} defaultValue={"amigo"}>
                    <option value="facil">Fácil</option>
                    <option value="medio"disabled >Medio (Proximamente)</option>
                    <option value="imposible" disabled>Imposible (Proximamente)</option>
                    <option value="amigo">Partida contra un amigo</option>
                </select>
            </div>

            <form onSubmit={subitFormulario}>
                <div>
                    <label htmlFor="jugador1">Jugador 1</label>
                    <input type="text" id="jugador1" placeholder="Nombre" value={jugador1} onChange={e => setJugador1(e.target.value)} name="jugador1"/>
                </div>

                <div>
                    <label htmlFor="jugador2">Jugador 2</label>
                    <input type="text" id="jugador2" placeholder="Nombre" value={jugador2} onChange={e => setJugador2(e.target.value)} name="jugador2"/>
                </div>


                <button type="submit"> Jugar </button>
            </form>
        </section>
     );
}
 
export default InfoJugadores;
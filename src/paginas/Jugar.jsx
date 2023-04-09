import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useJuego from "../hooks/useJuego";
import "./Jugar.css"

const Jugar = () => {
    const [jugador1, setJugador1] = useState();
    const [jugador2, setJugador2] = useState();
    const {juego, seleccionarPos, reiniciarPartida, reiniciarObjetoJuego, seleccionarPosIa} = useJuego();
    const navigate  = useNavigate();

    useEffect(() => {
        setJugador1(juego.jugador1);
        setJugador2(juego.jugador2);

        if (juego.tipo != "amigo" && juego.turno === 1) seleccionarPosIa();
    }, [])

    const volver = () => {
        reiniciarObjetoJuego();
        navigate("/", true);
    }

    return ( 
        <>
            <section id="tablero">
                <div>
                    <img id="p0" className="tablero" onClick={seleccionarPos}/>
                    <img id="p1" className="tablero" onClick={seleccionarPos}/>
                    <img id="p2" className="tablero" onClick={seleccionarPos}/>
                </div>

                <div>
                    <img id="p3" className="tablero" onClick={seleccionarPos}/>
                    <img id="p4" className="tablero" onClick={seleccionarPos}/>
                    <img id="p5" className="tablero" onClick={seleccionarPos}/>
                </div>

                <div>
                    <img id="p6" className="tablero" onClick={seleccionarPos}/>
                    <img id="p7" className="tablero" onClick={seleccionarPos}/>
                    <img id="p8" className="tablero" onClick={seleccionarPos}/>
                </div>
            </section>
            
            <section className="info-partida">
                
                <div>
                    <img id="jugador" src="img/0.png" />
                    <h2 id = 'player1'>{jugador1}</h2> 
                </div>

                <div className="botones">
                    <input type="button" value="Reiniciar Partida" onClick={reiniciarPartida} id="reset" />
                    <input type="button" value="Volver" onClick={volver} id="reset" />
                </div>

                <div>
                    <img id="jugador" src="img/1.png" />
                    <h2 id = 'player2'>{jugador2}</h2> 
                </div>

            </section>
        </>
     );
}
 
export default Jugar;
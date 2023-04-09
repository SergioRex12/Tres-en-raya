import { useState, useEffect, createContext } from "react";

const JuegoContext = createContext();

const JuegoProvider = ({children}) => {
    
    const [juego, setJuego] = useState({
        turno: Math.floor(Math.random() * 2),
        tablero: [
            //DEMO: [ocupado = false, jugador = null, id = index Id],
            [false, null, 0],
            [false, null, 1],
            [false, null, 2],
            [false, null, 3],
            [false, null, 4],
            [false, null, 5],
            [false, null, 6],
            [false, null, 7],
            [false, null, 8],
        ],
        jugador1: "Jugador 1",
        jugador2: "Jugador 2",
        tipo: "amigo",
        final: false,
    });

    const seleccionarPosIa = () => {
        setTimeout(() => {
            turnoIA();
        }, 500)
    }

    const seleccionarPos = (pos) => {
        const {tablero, turno, final, tipo} = juego;
        const id = +pos.target.id.split("p")[1];

        if (final) {
            alert("La partida ya tiene ganador...");
            return;
        }

        //Si es el turno de la IA no hago nada
        if (turno === 1 && tipo != "amigo") return;

        ////Revisamos si la pos esta ocupada
        if (tablero[id][0]) {console.log("Posición ocupada"); return}

        const posTab = document.querySelector(`#p${id}`);
        posTab.style.backgroundImage = `url('../img/${turno}.jpg')`;
        posTab.style.backgroundSize = "contain";
        
        tablero[id][0] = true;

        //Ponemos el jugador
        tablero[id][1] = turno;

        //Comprobamos si hay ganador
        const estado = comprobarRaya(turno);
        if (estado) return;

        ////Cambiamos el turno
        juego.turno == 0 ? juego.turno++ : juego.turno--;
        setJuego(juego);
        console.log("Cambio turno player");

        //Selecciona la IA si esta activa
        if (juego.turno === 1 && tipo != "amigo") seleccionarPosIa();
    }

    const turnoIA = () => {
        const {tablero, turno} = juego;

        console.log("Coloca la IA");

        const posicionesLibres = tablero.filter(pos => !pos[0]);
        const idRandom = Math.floor(Math.random() * posicionesLibres.length);
        const item = posicionesLibres[idRandom];

        const id = item[2];
        
        const posTab = document.querySelector(`#p${id}`);
        posTab.style.backgroundImage = `url('../img/${turno}.jpg')`;
        posTab.style.backgroundSize = "contain";
        
        tablero[id][0] = true;

        //Ponemos el jugador
        tablero[id][1] = turno;

        //Comprobamos si hay ganador
        const estado = comprobarRaya(turno);
        if (estado) return;

        //Cambiamos el turno
        console.log("Cambio turno");

        juego.turno == 0 ? juego.turno++ : juego.turno--;
        setJuego(juego);
        console.log("cambio turno ia");

    }

    //Comprueba si hay tres en raya
    const comprobarRaya = (turno) => {
        const {tablero} = juego;

        //Definimos las poses
        let posis = [];

        for (let i = 0; i < 9; i++) {
            posis = [...posis, document.querySelector(`#p${i}`)];
        }

        if (tablero[2][1] === turno && tablero[5][1] === turno && tablero[8][1] === turno) return ganadorFinal();
        if (tablero[6][1] === turno && tablero[7][1] === turno && tablero[8][1] === turno) return ganadorFinal();
        if (tablero[6][1] === turno && tablero[3][1] === turno && tablero[0][1] === turno) return ganadorFinal();
        if (tablero[6][1] === turno && tablero[4][1] === turno && tablero[2][1] === turno) return ganadorFinal();
        if (tablero[8][1] === turno && tablero[4][1] === turno && tablero[0][1] === turno) return ganadorFinal();
        if (tablero[7][1] === turno && tablero[4][1] === turno && tablero[1][1] === turno) return ganadorFinal();
        if (tablero[5][1] === turno && tablero[4][1] === turno && tablero[3][1] === turno) return ganadorFinal();
        if (tablero[0][1] === turno && tablero[1][1] === turno && tablero[2][1] === turno) return ganadorFinal();

        const posisOcupadas = juego.tablero.filter(pos => pos[0] == true)
        
        if (posisOcupadas.length === 9) {juego.final = true; return alert("Hubo un empate!")};
        
    }

    //Acabamos el juego con un ganador
    const ganadorFinal = () => {
        let ganador; 
        juego.turno === 0 ? ganador = juego.jugador1 : ganador = juego.jugador2;

        alert("Gana " + ganador)
        juego.final = true;

        return true;
    }

    //Reinicia la partida
    const reiniciarPartida = () => {
        console.clear();
        console.log("partida reiniciada")
        
        for (let i = 0; i < 9; i++) {
            const posTab = document.querySelector(`#p${i}`);

            posTab.style.backgroundImage = `url('../img/fondo.png')`;
            posTab.style.backgroundSize = "auto"
        }
       
        reiniciarObjetoJuego();

        if (juego.turno === 1 && juego.tipo != "amigo") seleccionarPosIa();
            
    }

    const reiniciarObjetoJuego = () => {

        juego.turno = Math.floor(Math.random() * 2)
        juego.tablero = [
            //DEMO: [ocupado = false, jugador = null, id = index Id],
            [false, null, 0],
            [false, null, 1],
            [false, null, 2],
            [false, null, 3],
            [false, null, 4],
            [false, null, 5],
            [false, null, 6],
            [false, null, 7],
            [false, null, 8],
        ]
        juego.final = false;

    }

    return (
        <JuegoContext.Provider
            value={{
                juego,
                seleccionarPos,
                reiniciarPartida,
                reiniciarObjetoJuego,
                seleccionarPosIa
            }}
        >
            {children}
        </JuegoContext.Provider> 
    );
}

export {
    JuegoProvider
}

export default JuegoContext;

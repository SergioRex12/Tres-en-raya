
let tablero;
//Quien tiene el turno
let turno;
let final = false;


export class Game {

    constructor(){}

    ///Crea el objeto del tablero y decide quien comienza
    crearObjeto() {
        turno = Math.floor(Math.random() * 2);
        
        tablero = {
            0: {ocupado: false, jugador: null},
            1: {ocupado: false, jugador: null},
            2: {ocupado: false, jugador: null},
            3: {ocupado: false, jugador: null},
            4: {ocupado: false, jugador: null},
            5: {ocupado: false, jugador: null},
            6: {ocupado: false, jugador: null},
            7: {ocupado: false, jugador: null},
            8: {ocupado: false, jugador: null}
        }
    }

    //Sirve para colocar tu turno en el tablero
    seleccionarPos(pos) {
        console.log(tablero[pos])
        if (final) {
            alert("La partida ya tiene ganador...");
            return;
        }

        //Comprobamos si hay ganador
        const estado = this.comprobarRaya(turno);
        if (estado) return;

        //Revisamos si la pos esta ocupada
        if (tablero[pos].ocupado) {console.log("Posición ocupada"); return}

        const posTab = document.querySelector(`#p${pos}`);
        posTab.style.backgroundImage = `url('../img/${turno}.jpg')`;
        posTab.style.backgroundSize = "contain"
        
        tablero[pos].ocupado = true;

        //Ponemos el jugador
        tablero[pos].jugador = turno;

        //Cambiamos el turno
        turno == 0 ? turno++ : turno--;

    }

    //Comprueba si hay tres en raya
    comprobarRaya(turno) {
        //Definimos las poses
        let pos0,pos1,pos2,pos3,pos4,pos5,pos6,pos7,pos8;
        const posis = [pos0,pos1,pos2,pos3,pos4,pos5,pos6,pos7,pos8];

        for (let i = 0; i < 9; i++) {
            posis[i] = document.querySelector(`#p${i}`);
        }

        if (tablero[2].jugador === turno && tablero[5].jugador === turno && tablero[8].jugador === turno) return this.ganadorFinal();
        if (tablero[6].jugador === turno && tablero[7].jugador === turno && tablero[8].jugador === turno) return this.ganadorFinal();
        if (tablero[6].jugador === turno && tablero[3].jugador === turno && tablero[0].jugador === turno) return this.ganadorFinal();
        if (tablero[6].jugador === turno && tablero[4].jugador === turno && tablero[2].jugador === turno) return this.ganadorFinal();
        if (tablero[8].jugador === turno && tablero[4].jugador === turno && tablero[0].jugador === turno) return this.ganadorFinal();
        if (tablero[7].jugador === turno && tablero[4].jugador === turno && tablero[1].jugador === turno) return this.ganadorFinal();
        if (tablero[5].jugador === turno && tablero[4].jugador === turno && tablero[3].jugador === turno) return this.ganadorFinal();
        if (tablero[0].jugador === turno && tablero[1].jugador === turno && tablero[2].jugador === turno) return this.ganadorFinal();
        

    }

    //Acabamos el juego con un ganador
    ganadorFinal() {
        let ganador; 
        turno === 0 ? ganador = document.querySelector('#player1').textContent : ganador = document.querySelector('#player2').textContent  

        alert("Gana " + ganador)
        final = true;

        return true;
    }
    
    //Reinicia la partida
    reiniciarPartida() {
        console.log("partida reiniciada")

        for (let i = 0; i < 9; i++) {
            const posTab = document.querySelector(`#p${i}`);
            console.log(posTab);
            posTab.style.backgroundImage = `url('../img/fondo.png')`;
            posTab.style.backgroundSize = "auto"
        }

        final = false;
       
        this.crearObjeto();

    }

} 
import { Game } from "./game.js";

class App {

    constructor(){}

    cargarApp() {
        const game = new Game();

        //Preguntamos los nombres
        let player1 = prompt("Nombre del jugador 1");
        let player2 = prompt("Nombre del jugador 2");
        
        if (player1 === null || player1 === "") player1 = "Jugador 1"; 
        if (player2 === null || player2 === "") player2 = "Jugador 2";


        document.querySelector('#player1').textContent = player1;
        document.querySelector('#player2').textContent = player2;

        //Generamos el juego
        game.crearObjeto();
        
        //Botones tabla
        for (let i = 0; i < 9; i++) {
            document.querySelector(`#p${i}`).addEventListener('click',game.seleccionarPos.bind(game,i));
        }

        document.querySelector('#reset').addEventListener('click',game.reiniciarPartida.bind(game))

    }
}

document.addEventListener('DOMContentLoaded',new App().cargarApp());
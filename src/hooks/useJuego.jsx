import { useContext } from "react";
import juegoContext from "../context/JuegoProvider";

const useJuego = () => {
    return useContext(juegoContext);
}

export default useJuego;
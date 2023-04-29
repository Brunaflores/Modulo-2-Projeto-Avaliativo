import React from "react";
import InfoReceitas from "../InfoReceitas/InfoReceitas";
import styles from "./ListaReceitas.module.css";
import { GiCookingPot } from "react-icons/gi";

export const ListaReceitas = ({ receitasFiltradas, setReceitas, receitas }) => {
  return (
    <div className={styles.container_lista_receitas}>
      <h1>Lista de Receitas</h1>
      <ul>
        {receitasFiltradas.map((receita, index) => (
          <li key={receita.id}>
            <GiCookingPot className={styles.iconReceita}/>
            <h2>{receita.nomeReceita}</h2>
            <InfoReceitas
              receitas={receita}
              setReceitas={setReceitas}
              receita={receitas}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

import React from "react";
import './Receitas.css';

export const Receitas = ({ header, cadastrar, lista, filtro }) => {
    return (
        <div className="container-fluid">
            <div className="container-header">{header}</div>
            <div className="container-card">
                <div className="container-filter">
                    {filtro}
                </div>
                <div className="container-receitas">
                    {lista}
                </div>
            </div>
            <div className="cadastrar-receita">
                {cadastrar}
            </div>
        </div>
    );
};

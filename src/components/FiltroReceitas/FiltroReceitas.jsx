import React, { useState, useEffect } from "react";
import "./FiltroReceitas.css";

export const FiltroReceitas = ({
  receita,
  excluidas,
  setExcluidas,
  setReceitasFiltradas,
}) => {
  const [filters, setFilters] = useState({ lactose: false, gluten: false, todos: true });

  useEffect(() => {
    handleFilter();
  }, [receita, excluidas, filters]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    
    let newFilters = { lactose: false, gluten: false, todos: filters.todos };
    
    if (name === "lactose") {
      newFilters.lactose = checked;
    } else if (name === "gluten") {
      newFilters.gluten = checked;
    } else {
      newFilters = { lactose: false, gluten: false, todos: checked };
    }
    
    setFilters(newFilters);
  };
  

  const handleFilter = () => {
    let filteredRecipes = receita.filter(
      (recipe) => !excluidas.includes(recipe.id)
    );
  
    if (filters.lactose) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.restricoes && recipe.restricoes.includes("lactose")
      );
    }
  
    if (filters.gluten) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.restricoes && recipe.restricoes.includes("gluten")
      );
    }
  
    if (filters.todos) {
      filteredRecipes = receita.filter(
        (recipe) => !excluidas.includes(recipe.id)
      );
    }
  
    setReceitasFiltradas(filteredRecipes);
  };
  
  

  return (
    <div className="container_filtrar">
      <h2>Filtros</h2>
      <div className="container_fitros">
          <div className="filtros">
            <label>
              <input
                type="checkbox"
                name="lactose"
                checked={filters.lactose}
                onChange={handleCheckboxChange}
              />
              Sem lactose
            </label>
          </div>
          <div className="filtros">
            <label>
              <input
                type="checkbox"
                name="gluten"
                checked={filters.gluten}
                onChange={handleCheckboxChange}
              />
              Sem glúten
            </label>
          </div>
          <div className="filtros">
            <label>
              <input
                type="checkbox"
                name="todos"
                checked={filters.todos}
                onChange={handleCheckboxChange}
              />
              Todas as receitas
            </label>
          </div>
      </div>

    </div>
  );
};

import { useEffect, useState } from 'react'
import './App.css'
import { CadastrarReceita } from './components/CadastroReceitas/CadastroReceitas'
import { ListaReceitas } from './components/ListaReceitas/ListaReceitas'
import { Header } from './components/Header/Header';
import { FiltroReceitas } from './components/FiltroReceitas/FiltroReceitas';
import { Receitas } from './components/Receitas/Receitas';

function App() {
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    const lista = JSON.parse(localStorage.getItem('receitas'));
    if (lista) {
      setReceitas(lista);
    } else {
      fetch('/receitas.json')
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('receitas', JSON.stringify(data));
          setReceitas(data);
        })
        .catch(error => console.error(error));
    }
  }, []);
  

  const [excluidas, setExcluidas] = useState([]);
  const [receitasFiltradas, setReceitasFiltradas] = useState([...receitas]);

  const header = <Header />;
  const cadastrar = <CadastrarReceita setReceitas={setReceitas} />;

const lista = (
  <ListaReceitas
    setReceitas={setReceitas}
    receitas={receitas}
    receitasFiltradas={receitasFiltradas}
  />
);

  
  const filtro = <FiltroReceitas 
  receita={receitas} 
  excluidas={excluidas} 
  setExcluidas={setExcluidas} 
  setReceitasFiltradas={setReceitasFiltradas} />;

  return (
    <div className="App">
      <Receitas header={header} cadastrar={cadastrar} lista={lista} filtro={filtro} />
    </div>
  )
}

export default App;

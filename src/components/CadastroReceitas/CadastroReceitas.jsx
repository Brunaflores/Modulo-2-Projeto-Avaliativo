import { useState, useEffect } from "react";
import React from 'react';
import { Container, Form, FormGroup, FormControl, FormLabel, FormCheck, Button, Modal } from 'react-bootstrap';
import { CgClose } from 'react-icons/cg';
import './CadastroReceitas.css'


export const CadastrarReceita = ({ setReceitas }) => {

  // Retorna o ID da última receita cadastrada ou 0 se não houver nenhuma
  const pegarId = () => {
    const receitasSalvas = JSON.parse(localStorage.getItem("receitas")) || [];
    const id = receitasSalvas.length > 0 ? receitasSalvas[receitasSalvas.length - 1].id : 0;
    return id;
  };

  // Armazena o ID da próxima receita a ser cadastrada
  const [idReceita, setIdReceita] = useState(pegarId() + 1);

  // Armazena os dados da receita sendo cadastrada
  const [dadosReceita, setDadosReceita] = useState({
    id: idReceita,
    nomeReceita: "",
    ingredientes: "",
    modoPreparo: "",
    restricoes: [],
  });

  // Armazena o estado de exibição do modal
  const [showModal, setShowModal] = useState(false);

  // Atualiza o ID da receita no estado quando o ID da próxima receita é alterado
  useEffect(() => {
    setDadosReceita((prevState) => ({ ...prevState, id: idReceita }));
  }, [idReceita]);

  // Salva a receita atual no local storage e incrementa o ID da próxima receita a ser cadastrada
  const salvarReceita = () => {
    const receitasSalvas = JSON.parse(localStorage.getItem("receitas")) || [];
    receitasSalvas.push(dadosReceita);
    localStorage.setItem("receitas", JSON.stringify(receitasSalvas));
    setIdReceita(idReceita + 1);
    setReceitas(receitasSalvas);
  };

  // Lida com o envio do formulário, chamando a função salvarReceita
  const handleSubmit = (event) => {
    event.preventDefault();
    salvarReceita();
    setShowModal(false); // fecha o modal após o envio do formulário
  };

  // Lida com as alterações nos campos do formulário, atualizando o estado dos dados da receita
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      if (checked) {
        setDadosReceita((prevState) => ({
          ...prevState,
          restricoes: name,
        }));
      } else {
        setDadosReceita((prevState) => ({
          ...prevState,
          restricoes: "",
        }));
      }
    } else {
      setDadosReceita({
        ...dadosReceita,
        [name]: value,
      });
    }
  };


  return (
    <Container>

      <div className="btnAdicioar"><CgClose onClick={() => setShowModal(true)} /></div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar nova Receita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Nome da Receita</FormLabel>
              <FormControl type="text" name="nomeReceita" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Ingredientes</FormLabel>
              <FormControl as="textarea" name="ingredientes" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Modo de Preparo</FormLabel>
              <FormControl as="textarea" name="modoPreparo" onChange={handleChange} />
            </FormGroup>
            <h2>Receita com restrição</h2>
            <FormGroup>
              <FormGroup>
                <FormCheck
                  label="Lactose"
                  type="checkbox"
                  name="lactose"
                  value="lactose"
                  onChange={handleChange}
                />
                <FormCheck
                  label="Glúten"
                  type="checkbox"
                  name="gluten"
                  value="gluten"
                  onChange={handleChange}
                />
              </FormGroup>

            </FormGroup>
            <Button className="btnCadastrar" type="submit">Cadastrar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};  
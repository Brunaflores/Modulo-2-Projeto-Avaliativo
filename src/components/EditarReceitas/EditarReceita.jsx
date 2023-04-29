import React, { useState} from "react";
import { Modal, Button, Form, FormGroup, FormControl, FormLabel, FormCheck } from "react-bootstrap";
import { FiEdit3 } from "react-icons/fi";
import "./EditarReceita.css"
import {CiSaveDown2} from "react-icons/ci"
import {MdOutlineDeleteForever} from "react-icons/md"
import { IoCloseOutline } from "react-icons/io5";

export const EditarReceita = ({ receita, setReceitas, receitas }) => {
  

  const [showModal, setShowModal] = useState(false);
  const [editedReceita, setEditedReceita] = useState(receita);

 

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setEditedReceita(receitas);
    setShowModal(true);
  };

// atualiza a receita
  const handleReceitaEditada = (updatedReceita) => {
    
    // percorre o array de receitas e atualiza a receita que foi editada
    // com base no id da receita editada
      const updatedReceitas = receita.map((receita) =>
        receita.id === updatedReceita.id ? updatedReceita : receita
      );

      setReceitas(updatedReceitas);
   
  };

  const handleReceitaExcluida = (receita) => {
    setReceitas((prevReceita) => prevReceita.filter(r => r.id !== receita.id));
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      if (checked) {
        setEditedReceita((prevState) => ({
          ...prevState,
          restricoes: [...prevState.restricoes, value],
        }));
      } else {
        setEditedReceita((prevState) => ({
          ...prevState,
          restricoes: prevState.restricoes.filter((restricao) => restricao !== value),
        }));
      }
    } else {
      setEditedReceita({
        ...editedReceita,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(editedReceita);
    handleReceitaEditada(editedReceita); 
    handleCloseModal();
  };
  const handleExcluir = () => {
    handleReceitaExcluida(receitas);
    console.log(receitas); 
    handleCloseModal();
  };


  return (
    <div>
      <div onClick={handleShowModal} className="btnEditar">
        <FiEdit3 />
        <span>Editar</span>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Receita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Nome da Receita</FormLabel>
              <FormControl
                type="text"
                name="nomeReceita"
                value={editedReceita.nomeReceita}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Ingredientes</FormLabel>
              <FormControl
                as="textarea"
                name="ingredientes"
                value={editedReceita.ingredientes}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Modo de Preparo</FormLabel>
              <FormControl
                as="textarea"
                name="modoPreparo"
                value={editedReceita.modoPreparo}
                onChange={handleChange}
              />
            </FormGroup>
            <h2>Receita com restrição</h2>
            <FormGroup>
              <FormCheck
                label="Com lactose"
                type="checkbox"
                name="restricao"
                value="lactose"
                checked={editedReceita.restricoes && editedReceita.restricoes.includes("lactose")}
                onChange={handleChange}
              />
              <FormCheck
                label="Com glúten"
                type="checkbox"
                name="restricao"
                value="gluten"
                checked={editedReceita.restricoes && editedReceita.restricoes.includes("gluten")}
                onChange={handleChange}
              />

            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="btnExcluir" onClick={handleExcluir}>
            <MdOutlineDeleteForever />
              Excluir
          </div >
                   
          <div onClick={handleSubmit} className="btnSave">
            <CiSaveDown2  />
              Salvar
          </div>
          
        </Modal.Footer>
      </Modal>
    </div>
  );

};

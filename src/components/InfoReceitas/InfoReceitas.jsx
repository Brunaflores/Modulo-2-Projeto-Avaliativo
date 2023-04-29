import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./InfoReceitas.css";
import { EditarReceita } from ".././EditarReceitas/EditarReceita";
import { IoCloseOutline } from "react-icons/io5";

const InfoReceitas = ({ receita, setReceitas, receitas }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="btnInfo">
        <AiOutlineInfoCircle onClick={handleShow} />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{receitas.nomeReceita}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Ingredientes</h4>
          <p>{receitas.ingredientes}</p>
          <h4>Modo de preparo</h4>
          <p>{receitas.modoPreparo}</p>
        </Modal.Body>
        <Modal.Footer>
          <div className="btnClose" onClick={handleClose}>
            <IoCloseOutline />
            Fechar
          </div>

          <EditarReceita
            receita={receita}
            setReceitas={setReceitas}
            receitas={receitas}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InfoReceitas;

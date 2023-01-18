import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Example from "./table";
import { interpolateAnswers } from "./InterploateAnswers";
import { PagareDoc } from "./PagareDoc";
import { saveAs } from "file-saver";
import { Packer } from "docx";

function App() {
  const generate = async (doc: any) => {
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "tes.docx");
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p
          onClick={() =>
            generate(
              interpolateAnswers(PagareDoc, {
                currentDocument: "Autorización de Venta",
                codeName: "Test6",
                section1: {
                  1: {
                    question:
                      "¿En qué oficina de GRUPO SOLDATI se firma la Autorización de Venta?",
                    answer:
                      "Av. Libertador 742 - Piso 5 (B1638ET), Vicente López (Sucursal Libertador)",
                  },
                  3: {
                    question: "¿En qué fecha se celebra la Autorización?",
                    answer: "11 de enero del 2023",
                  },
                  4: {
                    question:
                      "Detallar Nombre y Apellido/Razón Social del Autorizante",
                    answer: "asd",
                  },
                  32: {
                    question: "Indicar la cantidad de Autorizantes",
                    answer: "1",
                  },
                },
              })
            )
          }
        >
          Felipe perarnau
        </p>
        <Example />
      </header>
    </div>
  );
}

export default App;

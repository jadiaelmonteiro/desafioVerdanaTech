import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { Table, Titulo } from './styles';

export const Home = () => {

  const [data, setData] = useState([]);

  const getChamados = async () => {
    fetch("http://localhost/desafio-verdanatech/index.php")
      .then((response) => response.json())
      .then((responsejson) => (
        setData(responsejson.records)
      ));
  }

  useEffect(() => {
    getChamados();
  }, [])

  return (
    <div>
      <Titulo>Lista de chamados</Titulo>
      <Table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Solicitante</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map(chamado => (
            <tr key={chamado.id}>
              <td>{chamado.titulo}</td>
              <td>{chamado.descricao}</td>
              <td>{chamado.solicitante}</td>
              <td>{chamado.situacao}</td>
              <td>Editar Apagar</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
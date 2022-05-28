import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { Container, ConteudoTitulo, BotaoAcao, ButtonSuccess, Table, Titulo } from './styles';
import { Link } from 'react-router-dom';

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
    <Container>
      <ConteudoTitulo>
        <Titulo>Lista de chamados</Titulo>
        <BotaoAcao>
          <Link to="/cadastrar">
          <ButtonSuccess>Abrir chamado</ButtonSuccess>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>
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
    </Container>
  );
}
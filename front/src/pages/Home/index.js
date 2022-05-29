import React, { useEffect, useState } from 'react';
import {
  Container, ConteudoTitulo, BotaoAcao, ButtonSuccess, ButtonEdit, Table, Titulo,
  AlertDanger, AlertSuccess, Cabeçalho, ButtonCenter
} from './styles';
import { Link } from 'react-router-dom';
import { ReactComponent as PencilIcon } from '../../assets/pencil.svg';

export const Home = () => {

  const [data, setData] = useState([]);

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

  const getChamados = async () => {
    fetch("http://localhost/desafio-verdanatech/index.php")
      .then((response) => response.json())
      .then((responsejson) => (
        setData(responsejson.records)
      ));
  }

  const apagarChamado = async (idChamado) => {
    await fetch("http://localhost/desafio-verdanatech/delete.php?id=" + idChamado)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.erro) {
          setStatus({
            type: 'erro',
            mensagem: responseJson.mensagem
          });
        } else {
          setStatus({
            type: 'success',
            mensagem: responseJson.mensagem
          });
          getChamados();
        }
      }).catch(() => {
        setStatus({
          type: 'erro',
          mensagem: "Erro: Chamado não apagado, tente mais tarde."
        });
      });
  };
  useEffect(() => {
    getChamados();
  }, [])

  return (
    <div>
      <Cabeçalho>
        <Titulo>VD</Titulo>
        <Titulo>Lista de chamados</Titulo>
        <div></div>
      </Cabeçalho>
      <div>{<br />}</div>
      <div>{<br />}</div>
      <Container>
        <ConteudoTitulo>
          <Titulo></Titulo>
          <BotaoAcao>
            <Link to="/cadastrar">
              <ButtonSuccess>Abrir chamado</ButtonSuccess>
            </Link>
          </BotaoAcao>
        </ConteudoTitulo>
        {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
        {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
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
                <ButtonCenter>
                  <Link to={"/editar/" + chamado.id}>
                    <ButtonEdit>
                      <PencilIcon height={14} width={14} />
                    </ButtonEdit>
                  </Link>{" "}
                  <ButtonEdit onClick={() => apagarChamado(chamado.id)}>
                    X
                  </ButtonEdit>
                </ButtonCenter>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
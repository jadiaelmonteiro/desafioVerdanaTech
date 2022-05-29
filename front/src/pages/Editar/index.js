import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Container, Titulo, AlertSuccess, AlertDanger, ConteudoForm, Form,
  Label, Input, ButtonSuccess, ConteudoTitulo, BotaoAcao, ButtonInfo
} from './styles';

export const Editar = () => {

  //const [id] = useState(props.match.params.id);
  const { id } = useParams();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [solicitante, setSolicitante] = useState('');
  const [situacao, setSituacao] = useState('');

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })

  const editChamdo = async e => {
    e.preventDefault();

    await fetch("http://localhost/desafio-verdanatech/editar.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ titulo, descricao, situacao, solicitante, id })
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.erro) {
          setStatus({
            type: 'error',
            mensagem: responseJson.mensagem
          });
        } else {
          setStatus({
            type: 'success',
            mensagem: responseJson.mensagem
          });
        }
      }).catch(() => {
        setStatus({
          type: 'error',
          mensagem: "Chamado não editado, tente mais tarde!"
        });
      });
  }

  useEffect(() => {
    const getChamado = async () => {
      await fetch("http://localhost/desafio-verdanatech/visualizar.php?id=" + id)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          setTitulo(responseJson.chamado.titulo);
          setDescricao(responseJson.chamado.descricao);
          setSituacao(responseJson.chamado.situacao);
          setSolicitante(responseJson.chamado.solicitante);
        })
    }
    getChamado();
  }, [id]);

  return (
    <Container>
      <ConteudoForm>
        <ConteudoTitulo>
          <Titulo>Editar</Titulo>
          <BotaoAcao>
            <Link to="/">
              <ButtonInfo>Listar de chamados</ButtonInfo>
            </Link>
          </BotaoAcao>
        </ConteudoTitulo>

        {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
        {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

        <Form onSubmit={editChamdo}>
          <Label>Título </Label>
          <Input type="text" name="titulo" placeholder=" " value={titulo} onChange={e => setTitulo(e.target.value)} />

          <Label>Descrição </Label>
          <Input type="text" name="descricao" placeholder=" " value={descricao} onChange={e => setDescricao(e.target.value)} />

          <Label>Status </Label>
          <Input type="text" name="situacao" placeholder=" Aberto / Fechado " value={situacao} onChange={e => setSituacao(e.target.value)} />

          <Label>Solicitante </Label>
          <Input type="text" name="solicitante" placeholder=" Fulano de Tal " value={solicitante} onChange={e => setSolicitante(e.target.value)} />

          <ButtonSuccess type='submit'>Salvar</ButtonSuccess>
        </Form>


      </ConteudoForm>
    </Container>
  )
}
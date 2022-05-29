import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Titulo, AlertSuccess, AlertDanger, ConteudoForm, Form, Label, Input, 
  ButtonSuccess, ConteudoTitulo, BotaoAcao, ButtonInfo, Cabeçalho, TextArea } from './styles';


export const Cadastrar = () => {
  const [chamado, setChamado] = useState({
    titulo: '',
    descricao: '',
    data: '',
    situacao: '',
    solicitante: '',
  });

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })

  const valueInput = e => setChamado({ ...chamado, [e.target.name]: e.target.value });

  const cadChamado = async e => {
    e.preventDefault();
    console.log(chamado.titulo);

    await fetch("http://localhost/desafio-verdanatech/cadastrar.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ chamado })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.erro) {
          setStatus({
            type: 'erro',
            mensagem: responseJson.mensagem
          })
        } else {
          setStatus({
            type: 'success',
            mensagem: responseJson.mensagem
          })
        }
      }).catch(() => {
        setStatus({
          type: 'erro',
          mensagem: 'Chamando não cadastrado com sucesso, tente mais tarde!'
        })
      })
  }

  return (
    <div>
      <Cabeçalho>
        <Titulo>VD</Titulo>
        <Titulo>Abrir chamado</Titulo>
        <div></div>
      </Cabeçalho>
      <div>{<br />}</div>
      <div>{<br />}</div>
      <Container>
        <ConteudoForm>
          <ConteudoTitulo>
            <Titulo>Abrir chamado</Titulo>
            <BotaoAcao>
              <Link to="/">
                <ButtonInfo>
                  Lista de chamados
                </ButtonInfo>
              </Link>
            </BotaoAcao>
          </ConteudoTitulo>

          {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
          {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

          <Form onSubmit={cadChamado}>
            <Label>Título </Label>
            <Input type="text" name="titulo" placeholder=" " onChange={valueInput} />

            <Label>Descrição </Label>
            <TextArea cols="70" rows="10" type="text" name="descricao" onChange={valueInput} ></TextArea>

            <Label>Status </Label>
            <Input type="text" name="situacao" placeholder=" Aberto / Fechado " onChange={valueInput} />

            <Label>Data de Abertura </Label>
            <Input type="text" placeholder=" 28/05/2022 12:00 " onChange={valueInput} />

            <Label>Solicitante </Label>
            <Input type="text" name="solicitante" placeholder=" Fulano de Tal " onChange={valueInput} />

            <ButtonSuccess type='submit'>Salvar</ButtonSuccess>
          </Form>
        </ConteudoForm>
      </Container>
    </div>
  );
}
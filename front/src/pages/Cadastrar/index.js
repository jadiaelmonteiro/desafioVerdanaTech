import React, { useState } from 'react';
import { Container, Titulo, AlertSuccess, AlertDanger, ConteudoForm, Form, Label, Input, ButtonSuccess } from './styles';

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
      <Titulo>Abrir chamado</Titulo>
      {status.type === 'erro' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
      {status.type === 'success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
      <Container>
        <ConteudoForm>
          <Form onSubmit={cadChamado}>
            <Label>Título </Label>
            <Input type="text" name="titulo" placeholder=" " onChange={valueInput} /><br /><br />

            <Label>Descrição </Label>
            <Input type="text" name="descricao" placeholder=" " onChange={valueInput} /><br /><br />

            <Label>Status </Label>
            <Input type="text" name="situacao" placeholder=" Aberto / Fechado " onChange={valueInput} /><br /><br />

            <Label>Data de Abertura </Label>
            <Input type="text" placeholder=" 28/05/2022 12:00 " onChange={valueInput} /><br /><br />

            <Label>Solicitante </Label>
            <Input type="text" name="solicitante" placeholder=" Fulano de Tal " onChange={valueInput} /><br /><br />

            <ButtonSuccess type='submit'>Salvar</ButtonSuccess>
          </Form>
        </ConteudoForm>
      </Container>
    </div>
  );
}
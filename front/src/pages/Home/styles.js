import styled from 'styled-components';

export const Titulo = styled.h1`
    color: #FFFFFF;
    font-size: 17px;
`;

export const Table = styled.table`
    width: 100%;
    th{
        background-color: #DCDCDC;
        color: black;
        padding: 5px;
        font-family: Arial;
        font-size: 14px;
    }
    td{
        background-color: #f6f6f6;
        color: #3e3e3e;
        padding: 4px;
        font-family: Arial;
        font-size: 14px;
    }
`;

export const Container = styled.section`
    max-width: 960px;
    margin: 20px auto;
    box-shadow: 0 0 1em #DCDCDC;
    padding: 0px 20px 20px;
`;

export const ConteudoTitulo = styled.section`
    display: flex;
    justify-content: space-between;
`;

export const BotaoAcao = styled.section`
    margin: 25px 0px;
`;

export const ButtonSuccess = styled.button`
    background-color: #16082f;
    color: #FFFFFF;
    padding: 8px 12px;
    border: 1px solid #16082f;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
`;

export const ButtonEdit = styled.button`
    background-color: #FFFFFF;
    color: #000000;
    padding: 8px 12px;
    border: 1px solid #FFFFFF;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
`;

export const ButtonCenter = styled.td`
    text-align: center;
`;

export const AlertSuccess = styled.p`
    background-color: #d1e7dd;
    color: #0f5132;
    margin: 20px 0;
    border: 1px solid #badbcc;
    border-radius: 4px;
    padding: 7px;
`;

export const AlertDanger = styled.p`
    background-color: #f8d7da;
    color: #842029;
    margin: 20px 0;
    border: 1px solid #f5c2c7;
    border-radius: 4px;
    padding: 7px;
`;

export const Cabeçalho = styled.section`
    background-color: #16082f;
    font-family: Arial;
    justify-content: space-around;
    display: flex;
`;
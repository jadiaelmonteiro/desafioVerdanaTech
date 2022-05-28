<?php

//Cabecalhos obrigatorios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//Incluir a conexao
include_once 'conexao.php';

$query_chamados = "SELECT id, titulo, descricao, solicitante, situacao FROM chamados ORDER BY id DESC";
$result_chamados = $conn->prepare($query_chamados);
$result_chamados->execute();

if(($result_chamados) AND ($result_chamados->rowCount() != 0)){
    while($row_chamado = $result_chamados->fetch(PDO::FETCH_ASSOC)){
        extract($row_chamado);

        $lista_chamados["records"][$id] = [
            'id' => $id,
            'titulo' => $titulo,
            'descricao' => $descricao,
            'solicitante' => $solicitante,
            'situacao' => $situacao
        ];
    }

    //Resposta com status 200
    http_response_code(200);

    //Retornar os chamados em formato json
    echo json_encode($lista_chamados);
}
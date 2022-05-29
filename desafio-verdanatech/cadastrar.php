<?php

//Cabecalhos obrigatorios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");

//Incluir a conexao
include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if($dados){

    $query_chamado = "INSERT INTO chamados (titulo, descricao, situacao, solicitante) VALUES (:titulo, :descricao, :situacao, :solicitante)";
    $cad_chamado = $conn->prepare($query_chamado);

    $cad_chamado->bindParam(':titulo', $dados['chamado']['titulo']);
    $cad_chamado->bindParam(':descricao', $dados['chamado']['descricao']);
    $cad_chamado->bindParam(':situacao', $dados['chamado']['situacao']);
    $cad_chamado->bindParam(':solicitante', $dados['chamado']['solicitante']);

    $cad_chamado->execute();

    if($cad_chamado->rowCount()){
        $response = [
            "erro" => false,
            "mensagem" => "Chamado cadastrado com sucesso!"
            ];
    }else{
        $response = [
            "erro" => true,
            "mensagem" => "Não foi possível cadastrar o chamado!"
    ];
    }
}else{
    $response = [
        "erro" => true,
        "mensagem" => "Não foi possível cadastrar o chamado!"
    ];
}

http_response_code(200);
echo json_encode($response);
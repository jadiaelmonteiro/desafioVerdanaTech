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
    $query_chamado = "UPDATE chamados SET titulo=:titulo, descricao=:descricao, situacao=:situacao, solicitante=:solicitante WHERE id=:id";
    $edit_chamado = $conn->prepare($query_chamado);

    $edit_chamado->bindParam(':titulo', $dados['titulo']);
    $edit_chamado->bindParam(':descricao', $dados['descricao']);
    $edit_chamado->bindParam(':situacao', $dados['situacao']);
    $edit_chamado->bindParam(':solicitante', $dados['solicitante']);
    $edit_chamado->bindParam(':id', $dados['id']);

    $edit_chamado->execute();

    if($edit_chamado->rowCount()){
        $response = [
            "erro" => false,
            "mensagem" => "Chamado editado com sucesso!"
        ];
    }else{
        $response = [
            "erro" => false,
            "mensagem" => "Chamado não editado!"
        ];
    }
}else{
    $response = [
        "erro" => false,
        "mensagem" => "Chamado não editado!"
    ];
}

http_response_code(200);
echo json_encode($response);
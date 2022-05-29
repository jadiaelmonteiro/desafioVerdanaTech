<?php

//Cabecalhos obrigatorios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//Incluir a conexao
include_once 'conexao.php';

$id = filter_input(INPUT_GET, "id", FILTER_SANITIZE_NUMBER_INT);

$response = "";

$query_chamado = "DELETE FROM chamados WHERE id=:id LIMIT 1";
$delete_chamado = $conn->prepare($query_chamado);
$delete_chamado->bindParam(':id', $id, PDO::PARAM_INT);

if($delete_chamado->execute()){
    $response = [
        "erro" => false,
        "mensagem" => "Chamado apagado com sucesso!"
    ];
}else{
    $response = [
        "erro" => true,
        "mensagem" => "Erro: Chamado não apagado!"
    ];
}

http_response_code(200);
echo json_encode($response);

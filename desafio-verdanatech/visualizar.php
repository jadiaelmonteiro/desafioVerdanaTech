<?php

//Cabecalhos obrigatorios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//Incluir a conexao
include_once 'conexao.php';

//$id = 3;
$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
$response = "";

$query_chamado = "SELECT id, titulo, descricao, situacao, solicitante FROM chamados WHERE id=:id LIMIT 1";
$result_chamado = $conn->prepare($query_chamado);
$result_chamado->bindParam(':id', $id, PDO::PARAM_INT);
$result_chamado->execute();

if(($result_chamado) AND ($result_chamado->rowCount() != 0)){
    $row_chamado = $result_chamado->fetch(PDO::FETCH_ASSOC);
    extract($row_chamado);

    $chamado = [
        'id' => $id,  
        'titulo' => $titulo,
        'descricao' => $descricao,
        'situacao' => $situacao,
        'solicitante' => $solicitante
    ];

    $response = [
        "erro"=> false,
        "chamado" => $chamado
    ];
}else{
    $response = [
        "erro"=> true,
        "messagem" => "Chamado não encontrado!"
    ];
}
http_response_code(200);
echo json_encode($response);

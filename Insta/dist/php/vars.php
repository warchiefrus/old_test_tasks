<?php
  $db_host = 'localhost';
  $db_name = 'someproject';

  $serverName = 'Test server';
  $db_userName = 'root';
  $db_pass = '';

  $JWT_key = 'agzMPxK+QhtYt9DxAiYC0ztw7de8ITwv2vtN2Hyh32cPakgs1rtIy0cEobLwDsOtxd2LOx4ag+A==';

  try {
    $db = new PDO(
      'mysql:host='.$db_host.';
      dbname='.$db_name.';
      charset=utf8',
      $db_userName,
      $db_pass
      );
    } catch (PDOException $e) {
      die('Не удалось подключится к БД');
  }


  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

  if ($contentType === "application/json") { 
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content);
    if (isset($decoded->request->action)) {
      $action = $decoded->request->action;
      $data = $decoded->request->data; 
    } else {
      exit('error1');
    }
  } else {
    exit('error2');
  }

  $response = [];
  $response['action'] = $action;
  $response['user'] = '';
  $response['userToken'] = '';
  $response['error'] = '';
  $response['result'] = [];
?>
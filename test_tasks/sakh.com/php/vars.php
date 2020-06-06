<?php
  $db_host = 'localhost';
  $db_name = 'testapp';
  $db_userName = 'root';
  $db_pass = '';

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
?>
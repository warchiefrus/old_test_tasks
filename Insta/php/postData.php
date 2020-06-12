<?php
  header("Content-Type: application/json; charset=UTF-8"); 
  require "./vendor/autoload.php";
  use \Firebase\JWT\JWT;
  require('vars.php');

  //Здесь когда-нибудь будет проверка и рефреш токена ;-)
  
  switch ($action) {

    case 'get_contacts': {
      $query = $db->prepare("SELECT * FROM users ORDER BY `name`");
      $query->execute();
      while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
          array_push($response['result'], $row);
      }
      break;
    }

    case 'bookmark_contact': {
      $query = $db->prepare("SELECT * FROM users WHERE `id` = ?");
      
      $query->execute([$data->userId]); 
      $row = $query->fetch(PDO::FETCH_ASSOC);
      $bookmarks = json_decode($row['bookmarks']);
      if (array_search($data->contactId, $bookmarks) === false) {
        array_push($bookmarks, $data->contactId);
        $query = $db->prepare("UPDATE users SET `bookmarks` = ? WHERE `id` = ?");
        $query->execute([json_encode($bookmarks), $data->userId]);
      }

      break;
    }
  }

  echo json_encode($response);
?>
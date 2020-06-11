<?php
  $db_host = 'localhost';
  $db_name = 'test';
  $db_userName = 'root';
  $db_pass = '';

  $respose = [];
  $respose['error'] = '';
  $respose['action'] = $_POST['action'];
  $respose['data'] = [];

  if ($_POST['action'] == '') {
    $respose['error'] = 'Что нужно?';
    echo json_encode($respose);
    exit();
  }
  
  $data = json_decode($_POST['data']);

  try {
    $db = new PDO(
          'mysql:host='.$db_host.';
          dbname='.$db_name.';
          charset=utf8',
          $db_userName,
          $db_pass
          );
    } catch (PDOException $e) {
      $respose['error'] = 'Не удалочь подключится к БД';
      echo json_encode($respose);
      die();
  }

  switch ($_POST['action']) {
    case 'getRows': {
      $query = $db->prepare("SELECT * FROM phones");
      $result = $query->execute();
      if ($result) {
        while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
          array_push($respose['data'], $row);
        }
      } else {
        $respose['error'] = 'Что то пошло не так';
      }
      break;
    }
    case 'addRow': {
      $query = $db->prepare("INSERT INTO phones (`name`, `phone`) VALUES (?,?)");
      $result = $query->execute([substr($data->name, 0, 45), substr($data->phone, 0, 45)]);
      if ($result) {
        $query2 = $db->prepare("SELECT MAX(id) FROM phones WHERE `name` LIKE ? AND `phone` LIKE ?");
        $query2->execute([$data->name, $data->phone]);
        $row = $query2->fetch(PDO::FETCH_ASSOC);
        $respose['id'] = $row['MAX(id)'];
      } else {
        $respose['error'] = 'Что то пошло не так';
      }
      break;
    }
    case 'updateRow': {
      $query = $db->prepare("UPDATE phones SET `name` = ?, `phone` = ? WHERE `id` = ?");
      $query->execute([substr($data->name, 0, 45), substr($data->phone, 0, 45), $data->id]);
      break;
    }
    case 'delRow': {
      $query = $db->prepare("DELETE FROM phones WHERE `id` = ?");
      $query->execute([$data->id]);
      break;
    }
    default:
      break; 
  }

  echo json_encode($respose);
?>
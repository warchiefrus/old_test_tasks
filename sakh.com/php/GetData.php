<?php
	require('vars.php');

	$headers = apache_request_headers();
	$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

	$now = new DateTime();

	if ($contentType === "application/json") { 
		$content = trim(file_get_contents("php://input"));
		$decoded = json_decode($content);
		if (isset($decoded->request->action)) {
			$action = $decoded->request->action;
			$data = $decoded->request->data; 
		} else {
			exit('action?');
		}
	} else {
		exit('contentType?');
	}

	$respose = [];
	$respose['action'] = $action;
	$respose['error'] = '';
	$respose['result'] = [];

	header("Content-Type: application/json; charset=UTF-8");

	switch ($action) {
		case 'getNews': {
			$query = $db->prepare("SELECT * FROM news ORDER BY `addedDateTime` DESC");
			$query->execute();
			while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
				array_push($respose['result'], $row);
			}
			break;
		}
			
		case 'addNews': {
			$data->id = uniqid();
			$query = $db->prepare("INSERT INTO news (`id`, `imgLink`, `header`, `shortText`, 
				`category`,  `text`, `addedDateTime`, `likes`)	VALUES (?,?,?,?,?,?,?,?)");
				 
			$result = $query->execute([$data->id, strval($data->imgLink), strval($data->header), strval($data->shortText), 
				strval($data->category), strval($data->text), $now->format('Y-m-d H:i:s'), 0]);
				//echo($query->debugDumpParams());
			
			if ($result) {
				$respose['id'] = $data->id;
				$respose['dateTime'] = $now->format('Y-m-d H:i:s');
			} else {
				$respose['error'] = 'Ошибка записи в базу данных';
			}
			break;
		}
			
		case 'updateNews': {
			$query = $db->prepare("UPDATE news  SET `imgLink` = ?, `header` = ?, `shortText` = ?,  `category` = ?, `text` = ?	WHERE `id` = ?");
			$result = $query->execute([strval($data->imgLink), strval($data->header), strval($data->shortText), strval($data->category), strval($data->text), $data->id]);
			//echo($query->debugDumpParams());
			if (!$result) {
				$respose['error'] = 'Ошибка записи в базу данных';
			}
			break;  
		}

		case 'delNews': {
			$query = $db->prepare("DELETE FROM news WHERE `id` = ?");
			$result = $query->execute([$data->id]);
			if (!$result) {
				$respose['error'] = 'Ошибка записи в базу данных';
			}
			break;   
		}  

		case 'addLike': {
			$query = $db->prepare("SELECT * FROM news WHERE `id` = ?");
			$result = $query->execute([$data->id]);
			
			if (!$result) {
				$respose['error'] = 'Новость не найдена';
			} else {
				$row = $query->fetch(PDO::FETCH_ASSOC);
				$curLikes = $row['likes'] + 1;
				
				$query = $db->prepare("UPDATE news  SET `likes` = ? WHERE `id` = ?");
				$result2 = $query->execute([$curLikes, $data->id]);
				
				if (!$result) {
					$respose['error'] = 'Ошибка записи в базу данных';
				} 
			}
			break;   
		}  

	}

	echo json_encode($respose);
?>	


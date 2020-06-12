<?php
	header("Content-Type: application/json; charset=UTF-8"); 
	require "./vendor/autoload.php";
	use \Firebase\JWT\JWT;
	require('vars.php');
	

	switch ($action) {

		case 'register_user': {
			$response['error'] = 'fail';
			$password = password_hash($data->password, PASSWORD_DEFAULT);
			$query = $db->prepare("INSERT INTO users (`name`, `password`, `company`, `email`) VALUES (?,?,?,?)");
			$result = $query->execute([$data->name, $password, $data->company, $data->email]);
			if ($result) {
				$response['error'] = '';
			}
		}

		case 'login_user': {
			$response['error'] = 'fail';
			$query = $db->prepare("SELECT * FROM users WHERE `email` = ?");
			$query->execute([$data->email]);
			
			if ($query->rowCount() == 1) {
				$row = $query->fetch(PDO::FETCH_ASSOC);
				if (password_verify($data->password, $row['password'])) {

					$now = new DateTime();
					$secretKey = base64_decode($JWT_key);
					$issuedAt   = time();
					$notBefore  = $issuedAt + 1;             
					$expire     = $notBefore + 60*60*4;            
					
					$jwtData = [
						'iat'  => $issuedAt,
						'iss'  => $serverName,
						'nbf'  => $notBefore,
						'exp'  => $expire,
						'data' => [
							'userId'   => $row['id'], 
							'userName' => $row['email'], 
						]
					];                
					$jwt = JWT::encode(
						$jwtData,      
						$secretKey, 
						'HS512'    
					);
					$response['user'] = $row['name']; 
					$response['userId'] = $row['id'];
					$response['userBookmarks'] = $row['bookmarks']; 
					$response['error'] = '';
					$response['userToken'] =  $jwt;
				}
			} 
			break;
		}
	}
	echo json_encode($response);
?>
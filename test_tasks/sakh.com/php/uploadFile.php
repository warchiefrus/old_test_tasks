<?php
	require 'vars.php';

	$headers = getallheaders();
	$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

	$now = new DateTime();

	$respose = [];
	$respose['filename'] = '';
	$respose['error'] = '';

	$tempFile = $_FILES['img']['tmp_name'];
	$fileName = $_FILES['img']['name'];
	$fileSize = $_FILES['img']['size'];

	if ($fileSize > 51200000) {
		exit('cheater!');
	}

	if ($fileSize != 0) {
		$id = uniqid();
		if (substr($fileName, -4, 1) == '.') {
			$newFileName = substr($fileName, 0, -4)."(".$id.").".substr($fileName, -3, 3);
		} elseif(substr($fileName, -5, 1) == '.') {
			$newFileName = substr($fileName, 0, -5)."(".$id.").".substr($fileName, -5, 5);
		} else {
			$newFileName = $fileName."(".$id.").";
		}
		
		move_uploaded_file($tempFile, "./img/".$newFileName);
		$respose['filename'] = $newFileName;
	} else {
		$respose['error'] = 'fail';
	}
	echo json_encode($respose);
?>
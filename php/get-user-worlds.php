<?php

$username = $_GET['username'];
$dir_users = $_SERVER['DOCUMENT_ROOT'] . '/users';
$file_users = $dir_users . '/users.json';

if (!is_dir($dir_users)) {
	mkdir($dir_users);
	$text = '{"user_new_index":0,"users":[]}' . "\n";
	file_put_contents($file_users, $text);
}
$json_users = json_decode(file_get_contents($file_users));
$user_id = '';
foreach ($json_users->users as $user) {
	if ($user->name === $username) {
		$user_id = $user->id;
		break;
	}
}
unset($user);
if (!$user_id) {
	$user_id = 'u' . $json_users->user_new_index;
	$new_user = new stdClass();
	$new_user->id = $user_id;
	$new_user->name = $username;
	$json_users->users[$json_users->user_new_index] = $new_user;
	$json_users->user_new_index = $json_users->user_new_index + 1;
	$dir_user = $dir_users . '/' . $user_id;
	mkdir($dir_user);
	$text = '{"id":"' . $user_id . '","name":"' . $username . '","world_new_index":0,"worlds":[]}' . "\n";
	file_put_contents($dir_user . '/worlds.json', $text);
	file_put_contents($file_users, json_encode($json_users));
}
$file_worlds = $dir_users . '/' . $user_id . '/worlds.json';
echo file_get_contents($file_worlds);

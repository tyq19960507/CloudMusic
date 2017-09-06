<?php
		$url=$_POST['url'];
		$res = file_get_contents($urlString);
		echo $res;
	?>
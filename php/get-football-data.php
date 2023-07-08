<?php
$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] )[0];
require_once( $parse_uri . 'wp-load.php' );
$arg = $_POST['arg'];

$url = ['https://api.football-data.org/v2/competitions/WC/matches',//0
	   'https://api.football-data.org/v4/competitions/WC/standings?standingType=TOTAL',//1
       'https://api.football-data.org/v4/competitions/SA/standings?standingType=TOTAL',//2
       'https://api.football-data.org/v2/competitions/SA/matches',//3
       'https://api.football-data.org/v4/competitions/PL/standings?standingType=TOTAL',//4
       'https://api.football-data.org/v2/competitions/PL/matches',//5
	   'https://api.football-data.org/v4/competitions/PD/standings?standingType=TOTAL',//6
	   'https://api.football-data.org/v2/competitions/PD/matches',//7
	   'https://api.football-data.org/v4/competitions/FL1/standings?standingType=TOTAL',//8
	   'https://api.football-data.org/v2/competitions/FL1/matches',//9
	   'https://api.football-data.org/v4/competitions/CL/standings?standingType=TOTAL',//10
	   'https://api.football-data.org/v2/competitions/CL/matches',//11
	   'https://api.football-data.org/v4/competitions/BL1/standings?standingType=TOTAL',//12
	   'https://api.football-data.org/v2/competitions/BL1/matches',//13
	   'https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED',//14
	   'https://api.football-data.org/v2/competitions/BL1/matches?status=SCHEDULED',//15
	   'https://api.football-data.org/v2/competitions/PD/matches?status=SCHEDULED',//16
	   'https://api.football-data.org/v2/competitions/SA/matches?status=SCHEDULED',//17
	   'https://api.football-data.org/v2/competitions/FL1/matches?status=SCHEDULED',//18
	   'https://api.football-data.org/v2/competitions/CL/matches?status=SCHEDULED',//19
	   'https://api.football-data.org/v4/competitions/PL/standings?standingType=TOTAL',//20
	   'https://api.football-data.org/v4/competitions/BL1/standings?standingType=TOTAL',//21
	   'https://api.football-data.org/v4/competitions/PD/standings?standingType=TOTAL',//22
	   'https://api.football-data.org/v4/competitions/SA/standings?standingType=TOTAL',//23
	   'https://api.football-data.org/v4/competitions/FL1/standings?standingType=TOTAL'//24
    ];
$headers = array(array("X-Auth-Token" => "988f0be1f26f481fae9b8b19d0327312"),//0
                array("X-Auth-Token" => "ed51211801874c0d89f1d7269f7ee702"),//1
                array("X-Auth-Token" => "416acc23dedc47be95d55f1ecea4bd22"),//2
                array("X-Auth-Token" => "ffa3eafb266c4274ab4491428e516b49"),//3
                array("X-Auth-Token" => "8d515051437f466083d82551328ba830"),//4
                array("X-Auth-Token" => "988f0be1f26f481fae9b8b19d0327312"),//5
                array("X-Auth-Token" => "760144d65e294cd684729a43922dfd70"),//6
                array("X-Auth-Token" => "fd95bddd3dd14ef2ab44cc282c062666"),//7
                array("X-Auth-Token" => "a058bef742ce4fc181380da80398a9b8"),//8
                array("X-Auth-Token" => "eef183d61edc4fa8b63108971f91fabf"),//9
                array("X-Auth-Token" => "87623518926c49a6aaed4d2f79bfd1a1"),//10
                array("X-Auth-Token" => "988f0be1f26f481fae9b8b19d0327312"),//11
                array("X-Auth-Token" => "1abff80c306f4f21addbe7bd1268eb3f"),//12
                array("X-Auth-Token" => "8fb8468fc6e64570b668b0b8e629c620"),//13
                array("X-Auth-Token" => "28fcc697165249959737b7f980aeefd2"),//14
                array("X-Auth-Token" => "f70cd1be97664d618660f91a5d736505"),//15
                array("X-Auth-Token" => "d7027a3a37224b918d5af11421c478a9"),//16
                array("X-Auth-Token" => "061bce2b0738476f94d97e516179852d"),//17
                array("X-Auth-Token" => "3752f505d947465d8b1c5b03430890eb"),//18
                array("X-Auth-Token" => "28d539fc326e418e930ef4221a051b1d"),//19
                array("X-Auth-Token" => "28fcc697165249959737b7f980aeefd2"),//20
                array("X-Auth-Token" => "f70cd1be97664d618660f91a5d736505"),//21
                array("X-Auth-Token" => "d7027a3a37224b918d5af11421c478a9"),//22
                array("X-Auth-Token" => "061bce2b0738476f94d97e516179852d"),//23
                array("X-Auth-Token" => "3752f505d947465d8b1c5b03430890eb")//24
            );
function get_football_data($url, $headers) {
	$response = wp_remote_get($url, array('headers' => $headers));
	return $response['body'];
}
$data = get_football_data($url[$arg],$headers[$arg]);
echo $data;
exit;
    
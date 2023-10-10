<?php 

function sanitizeURL($url){
    $link=preg_replace('/^(http(s)?)?:?\/*/u','http$2://',trim($url));
    $link= htmlspecialchars($link, 11,'UTF-8',true);
    return $link;
}

function sanitizeImageURL($url){
    $link=preg_replace('/^(http(s)?)?:?\/*/u','http$2://',trim($url));
    $link=str_replace(array('=','&',':','+','*','\\','(',')'),'',$link);
    $link= htmlspecialchars($link, 11,'UTF-8',true);
    return $link;
}
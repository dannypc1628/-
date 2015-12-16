var serverUrlGetMyBox = "http://andy-lin.info:20003/api/getBox" ;
var serverUrlSetLeader = "http://andy-lin.info:20003/api/setCapital" ;

var serverUrlReleaseMonster = "http://andy-lin.info:20003/api/releaseMonster";
var serverUrlEatMonster="http://andy-lin.info:20003/api/eatMonster";
var serverUrlBattleWinGetNewMonster = "http://andy-lin.info:20003/api/addMonsterInBox";
var serverUrlBattlePVPWin ;

var serverUrlBattlePVPSovcket = "http://andy-lin.info:20004" ;

var serverUrlMapSocket = "http://andy-lin.info:20004";

var serverUrlGetFriendList = "http://andy-lin.info:20003/api/getFriendList";
var serverUrlAddNewFriend = "http://andy-lin.info:20003/api/addFriend";

var serverUrlFirstLoginAddNewUser = "http://andy-lin.info:20003/user/add";
var serverUrlLogin = "http://andy-lin.info:20003/user/login"; 
var monsterList = [
	{monsterID:0, monsterName:"莫來管" , monsterHP:1,monsterAttack:0,HPCoe:0,AttackCoe:0},
	{monsterID:1, monsterName:"小白喵" , monsterHP:200,monsterAttack:40,HPCoe:20,AttackCoe:4},
	{monsterID:2, monsterName:"小狐狸" , monsterHP:300,monsterAttack:40,HPCoe:60,AttackCoe:2},
	{monsterID:3, monsterName:"狗"     , monsterHP:200,monsterAttack:60,HPCoe:10,AttackCoe:10},
	{monsterID:4, monsterName:"小水喵" , monsterHP:280,monsterAttack:48,HPCoe:30,AttackCoe:4},
	{monsterID:5, monsterName:"木手喵" , monsterHP:270,monsterAttack:54,HPCoe:10,AttackCoe:8},
	{monsterID:6, monsterName:"火苗喵" , monsterHP:240,monsterAttack:56,HPCoe:20,AttackCoe:6},
	{monsterID:7, monsterName:"皮卡喵" , monsterHP:300,monsterAttack:52,HPCoe:40,AttackCoe:8}
];
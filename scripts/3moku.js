// Description:
//   三目並べします.
//   〜例〜
//   hubot > start 3moku - 三目並べ開始
//   hubot > 3moku 1 2 - 1行2列目に石を置く
//
// Commands:
//   start 3moku - 三目並べ開始します.
//   magical \d \d - n行m列に石を置きます.


// robot.brainのkey
var BRAIN_KEY = "3moku";


(function() {
    module.exports = function(robot) {
	// magical start
	robot.hear(/start(\s*)3moku/i, function(msg) {
	    var checkenv = robot.brain.get(BRAIN_KEY);
	    if (checkenv !== null) {
		var ans = "前回の続き！";
		var field = checkenv.printField();
		return msg.send(ans + "\n" + field);
	    }
	    
		var env = new sanmokuField();
		
		robot.brain.set(BRAIN_KEY, env);
		robot.brain.save();
		
		//最初のターンはランダム
		var firstTurn = getRandomInt(0,1);
		
		ans = "三目並べ開始！";
		field = env.printField();

		if(firstTurn == 1){ //CPUのターン
			if(env.getStone(1,1).turn == -1){ //真ん中が空いていたら、そこに置く
				env.setStone(1, 1, 1);
			}else{ //それ以外はランダムに置く
				var check2 = -1;
				while(check2 != 0){
					var x1 = getRandomInt(0,2);
					var y1 = getRandomInt(0,2);
					check2 = env.setStone(x1, y1, 1);
				}
			}
		}
		
		// 出力
		return msg.send(ans + "\n" + field);
	});


	// 3moku choice
	    robot.hear(/3moku (\d) (\d)/i, function(msg) {
		    var line = msg.match[1];
		    var raw = msg.match[2];
		    var env = robot.brain.get(BRAIN_KEY);
		    if (env === null){
			    return msg.send("Please \"start 3moku\".");
		    }
		    if (line < 1 || line > 3 || raw < 1 || raw > 3) {
			    return msg.send("Please \"3moku [1-3]  [1-3]\".");
		    }

		    //石を置く
		    var check1 = env.setStone(line - 1, raw - 1, 0);
		    if(check1 == -1){
			    var ans = "そこには置けません.";
			    var field = env.printField();
			    return msg.send(ans + "\n" + field);
		    }
		    
		    //勝利判定
		    if(env.isWin()){
			    ans = "あなたの勝ちです！";
			    field = env.printField();
			    robot.brain.set(BRAIN_KEY, null);
			    return msg.send(ans + "\n" + field);
		    }else if(env.count >= 9){
			    ans = "引き分けです.";
			    field = env.printField();
			    robot.brain.set(BRAIN_KEY, null);
			    return msg.send(ans + "\n" + field);
		    }

		    
		    //CPUのターン
		    if(env.getStone(1,1).turn == -1){ //真ん中が空いていたら、そこに置く
			    env.setStone(1, 1, 1);
		    }else{ //それ以外はランダムに置く
			    var check2 = -1;
			    while(check2 != 0){
				    var x1 = getRandomInt(0,2);
				    var y1 = getRandomInt(0,2);
				    check2 = env.setStone(x1, y1, 1);
			    }
		    }
		    
		    //勝利判定
		    if(env.isWin()){
			    ans = "あなたの負けです...";
			    field = env.printField();
			    robot.brain.set(BRAIN_KEY, null);
			    return msg.send(ans + "\n" + field);
		    }else if(env.count >= 9){
			    ans = "引き分けです.";
			    field = env.printField();
			    robot.brain.set(BRAIN_KEY, null);
			    return msg.send(ans + "\n" + field);
		    }else{
			    ans = "あなたのターンです";
			    field = env.printField();
			    return msg.send(ans + "\n" + field);
		    }
		   
	});
	 
    };
}).call(this);


//石の構造体
function Stone(turn){
    if(turn == 0){
	    this.stone = "●";
	    this.color = "black";
	    this.turn = 0;
    }else if(turn == 1){
	    this.stone = "○";
	    this.color = "white";
	    this.turn = 1;
    }else if(turn == -1){
	    this.stone = " ";
	    this.color = "none";
	    this.turn = -1;
    }
}

// 盤の構造体
function sanmokuField() {
	this.field = [[new Stone(-1), new Stone(-1), new Stone(-1)],
		      [new Stone(-1), new Stone(-1), new Stone(-1)],
		      [new Stone(-1), new Stone(-1), new Stone(-1)]];

	this.count = 0;
	
	//盤上の石を取得するメソッド
	this.getStone = function(x, y){
		return this.field[x][y];
	};
	
	//盤上に石を置くメソッド
	this.setStone = function(x,y,turn){
		var stone = new Stone(turn);
		if(this.getStone(x,y).turn == -1){
			this.field[x][y] = stone;
			this.count++;
			return 0;
		}else{
			return -1;
		}
	};
	
	// 盤表示の生成メソッド
	this.printField = function(){
		var result  = this.getStone(0,0).stone + " | " + this.getStone(0,1).stone + " | " + this.getStone(0,2).stone + "\n" +
			    "-----------" + "\n" +
			    this.getStone(1,0).stone + " | " + this.getStone(1,1).stone + " | " + this.getStone(1,2).stone + "\n" +
			    "-----------" + "\n" +
			    this.getStone(2,0).stone + " | " + this.getStone(2,1).stone + " | " + this.getStone(2,2).stone + "\n";	
		return result;
	};

	this.isWin = function(){
		for(var j = 0; j < 3; j++){ //縦の計算
			if(this.getStone(0,j).turn != -1 && this.getStone(0,j).turn == this.getStone(1,j).turn  && this.getStone(1,j).turn == this.getStone(2,j).turn)
				return true;
		}
		for(var i = 0; i < 3; i++){ //横の計算
			if(this.getStone(i,0).turn != -1 && this.getStone(i,0).turn == this.getStone(i,1).turn  && this.getStone(i,1).turn == this.getStone(i,2).turn)
				return true;
		}
		
		//斜め1の計算
		var naname1 = (this.getStone(0,0).turn != -1 && this.getStone(0,0).turn == this.getStone(1,1).turn  && this.getStone(1,1).turn == this.getStone(2,2).turn);
		//斜め2の計算
		var naname2 = (this.getStone(0,2).turn != -1 && this.getStone(0,2).turn == this.getStone(1,1).turn  && this.getStone(1,1).turn == this.getStone(2,0).turn);

		return (naname1 || naname2);
	};
}

// 乱数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

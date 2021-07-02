class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("lightGreen");
    //write code to show a heading for showing the result of Quiz
    text("RESULT OF THE QUIZ",340,50);
    //call getContestantInfo( ) here
    Contestant.getContestInfo();

    //write condition to check if contestantInfor is not undefined
    if (allContestent !== undefined){
      fill("blue");
      textSize(20);
      text("*NOTE:contestant who answered correct are highlighted in green colour!",130,230);
    }
    //write code to add a note here

    //write code to highlight contest who answered correctly
    for(var plr in allContestent){
      var correctAns = "2";
      if (correctAns === allContestent[plr].answer)
            fill("Green");
     else
     fill("red");
      display_Answers+=30;
      text(allContestent[plr].name +":"+ allContestent[plr].answer,250,display_Answers)
    }
  }

}

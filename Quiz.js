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
  // escreva aqui o código para ocultar os elementos da questão
    question.hide();
    // escreva o código aqui para mudar a cor de fundo
    background("yellow");
    // escreva o código para exibir um cabeçalho indicando o resultado do Quiz
    textSize(30);
    text("Resultado da sua resposta: ",width/3,height/6);
    // chame getContestantInfo () aqui
    Contestant.getPlayerInfo();

    // escreva a condição para verificar se contestantInfor não é indefinido
    if (allContestants != undefined) {
      fill("blue");
      textSize(20);
      text("Jogador que respondeu a pergunta correta é destacado na cor verde",150,220);

      var y = 220;

      for (var player in allContestants) {
        var correctAnswer = "2";
        y = y + 50;
  
        if (correctAnswer == allContestants[player].answer) {
          fill("green");
        }
        else {
          fill("red");
        }
  
        textSize(20);
        text(allContestants[player].name + ": " + allContestants[player].answer,150,y);
      }
    }
    // escreva aqui o código para adicionar uma nota

    // escreva o código para destacar o competidor que respondeu corretamente
   
  }

}

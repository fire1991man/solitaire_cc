# solitaire_cc
This project use for learning Cocos Creator. I will briefly describe it below


<img width="367" alt="Screen Shot 2022-04-05 at 21 43 35 copy" src="https://user-images.githubusercontent.com/6134645/161783152-c43a838f-4baf-4c61-a4fe-457d7ba70906.png">

This structure of project split 2 part: <i>SolitaireLogic</i> & <i>MainGameController</i>

  - <i>SolitaireLogic</i> is responsible for handling all game logic( check win game, allow transfer card between pile, undo,..) . It contains <i>StockPile</i>, <i>WastePile</i>, <i>FoundationPile</i>, <i>TableauPile</i> that extend <i>Pile</i>. Each pile have set of <i>CardData</i>
  
  - <i>MainGameController</i> is responsible for show what the <i>SolitaireLogic</i> does. It contains <i>StockPileView</i>, <i>WastePileView</i>, <i>FoundationPileView</i>, <i>TableauPileView</i> that extend <i>Pile</i>. Each pile have set of <i>CardView</i>

When player interact in screen, <i>MainGameController</i> will give <i>SolitaireLogic</i> input action ( touch card in stock, touch card in tableau, new game, replay,...). At that time, <i>SolitaireLogic</i> process input then return 1 Command or set of Command and Data for <i>MainGameController</i>. <i>MainGameController</i> perform step by step

<img width="254" alt="Screen Shot 2022-04-05 at 22 22 54" src="https://user-images.githubusercontent.com/6134645/161789081-a2076219-4173-4f0b-af74-fb22b38a6100.png">

For example, after player click "new game", <i>SolitaireLogic</i> perform calculation and return 3 Command (<b>SHUFFLE</b> -> <b>DEAL_CARDS</b>-> <b>OPEN_LAST_CARD_ALL_TABLEAU</b>). At <i>MainGameController</i>, we can be easily controll time action or animation like we want 
  - <b>SHUFFLE</b> : Play sound in 1s 
  - <b>DEAL_CARDS</b> : after wait 1s, it play animation "deal cards" for tableau in 3s
  - <b>OPEN_LAST_CARD_ALL_TABLEAU</b>: after wait 3s, it open last card in each tableau

<img width="765" alt="Screen Shot 2022-04-05 at 22 23 08" src="https://user-images.githubusercontent.com/6134645/161789145-d4db6c46-73f4-42c4-9185-8a1df2cfcdd0.png">

At last, we can adjust difficulty of game by writing new shuffle algorithm (implements <i>IShuffle</i>). In this project, I use 2 shuffle algorithm:
  - <i>SimpleShuffle</i> : just random and swap CardDara, use for demo
  - <i>SureWinTemplateShuffle</i> : pre-arranged cards, use for testing

If someone want to have new shuffle algorithm with 70% win and 30% lose, it just only implements <i>IShuffle</i>

-------------------------------
Testing APK : https://github.com/fire1991man/solitaire_cc/blob/main/solitaire/deploy/solitaire-release.apk

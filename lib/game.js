import BattleTetris from './battle_tetris';
import ComputerPlayer from './computer_player';
import modal from 'modal';

document.addEventListener("DOMContentLoaded", function() {
  const rightGame = new BattleTetris("Player 2", $('#right-board'));
  const leftGame = new BattleTetris("Player 1", $('#left-board'), {
    UP: 87,
    LEFT: 65,
    RIGHT: 68,
    DOWN: 83,
    DROP: 81
  });

  leftGame.addOpponent(rightGame);
  rightGame.addOpponent(leftGame);

  leftGame.registerListener(
    leftGame.opponent.addLines.bind(leftGame.opponent)
  );
  rightGame.registerListener(
    rightGame.opponent.addLines.bind(rightGame.opponent)
  );

  leftGame.board.render();
  rightGame.board.render();

  let computer = false;

  const play = () => {
    rightGame.play();
    leftGame.play();
  };

  const playComputer = () => {
    const computerPlayer = new ComputerPlayer(rightGame);
    computerPlayer.destroyAllEnemies();
  };

  modal(
    { title: 'Battle Tetris!'
    , content: 'Defeat your opponent by clearing lines on your board.'
    , buttons:
      [
        { text: 'Play Against Human', event: 'playHuman', keyCodes: [ 13 ] },
        { text: 'Play Against Computer', event: 'playComputer', keyCodes: [  ] }
      ]
    })
  .on('playComputer', playComputer);

  $('.js-button').click(play);
});

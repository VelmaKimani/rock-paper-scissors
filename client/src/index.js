let counter_rounds = 0;
  let player_wins = 0;
  let computer_wins = 0;
  let draws = 0;
  const ROUNDS_PER_GAME = 3;
  const choices = ["ROCK", "PAPER", "SCISSORS"];
  const score_human = document.querySelector(".score-human");
  const score_computer = document.querySelector(".score-computer");
  const result_round = document.querySelector(".result-round");
  const result_human = document.querySelector(".result-human");
  const final_result = document.querySelector(".final-result");
  const result_computer = document.querySelector(".result-computer");
  const image_container_player = document.querySelector(".player-choose .image-container");
  const image_container_computer = document.querySelector(".computer-choose .image-container");
  const buttons = document.querySelector(".buttons-container");
  const new_game_button = document.querySelector(".new-game-button");
  buttons.addEventListener("click", play);
  new_game_button.addEventListener("click", reset_game);

  function play(event) {
    counter_rounds++;
    let player, computer;

    if (
      event.target.classList.contains("btn") ||
      event.target.closest(".button-container") &&
      counter_rounds < 3
    ) {
      const button_value = event.target
        .closest(".button-container")
        .getAttribute("data-value");
      player = choices.indexOf(button_value);
      computer = Math.floor(Math.random() * 3);
      check_winner_round(player, computer);
    }

    if (counter_rounds === ROUNDS_PER_GAME) {
      disable_buttons();
      check_winner_game();
      new_game_button.style.display = "block";
    }
  }

  function check_winner_round(player, computer) {
    if (player === computer) {
      result_round.textContent = "It's a draw.";
      result_human.textContent = `You chose ${choices[player]}.`;
      result_computer.textContent = `Computer choose ${choices[computer]}.`;
      draws++;
    } else if ((player-computer+3) % 3 === 1) {
      score_human.textContent = Number(score_human.textContent) + 1;
      result_round.textContent = "You won.";
      result_human.textContent = `You chose ${choices[player]}.`;
      result_computer.textContent = `Computer chose ${choices[computer]}.`;
      player_wins++;
    } else {
      score_computer.textContent = Number(score_computer.textContent) + 1;
      result_round.textContent = "You lost.";
      result_human.textContent = `You chose ${choices[player]}.`;
      result_computer.textContent = `Computer chose ${choices[computer]}.`;
      computer_wins++;
    }
    update_image_containers(player, computer);
  }

  function check_winner_game() {
    if (player_wins === computer_wins) 
      final_result.textContent = "It's a draw.";
    else if (player_wins > computer_wins)
      final_result.textContent = "You won the set.";
    else 
      final_result.textContent = "Computer wins the set.";
  }

  function update_image_containers(player, computer) {
    const image_player = `img/${choices[player].toLowerCase()}.png`;
    const image_computer = `img/${choices[computer].toLowerCase()}.png`;
    image_container_player.style.backgroundImage = `url(${image_player})`;
    image_container_computer.style.backgroundImage = `url(${image_computer})`;
    image_container_player.classList.remove("empty");
    image_container_computer.classList.remove("empty");
  }

  function reset_image_containers() {
    image_container_player.classList.add("empty");
    image_container_computer.classList.add("empty");
    image_container_player.style.backgroundImage = "";
    image_container_computer.style.backgroundImage = "";
  }

  function set_buttons_state(disabled) {
    const buttonContainer = document.querySelector(".buttons-container");
    buttonContainer.classList.toggle("disabled", disabled);
  }
  
  function disable_buttons() {
    set_buttons_state(true);
  }
    
  function enable_buttons() {
    set_buttons_state(false);
  }
  
  function reset_game() {
    score_human.textContent = 0;
    score_computer.textContent = 0;
    result_round.textContent = "";
    result_human.textContent = "";
    result_computer.textContent = "";
    final_result.textContent = "";
    player_wins = 0;
    computer_wins = 0;
    draws = 0;
    counter_rounds = 0;
    reset_image_containers();
    enable_buttons();
    new_game_button.style.display = "none";
  }

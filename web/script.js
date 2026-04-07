const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const QUESTIONS_FOLDER_PATH = "../../questions/";

function getNextPlayer(player) {
  return player === "X" ? "O" : "X";
}

function createGameState() {
  return {
    board: Array(9).fill(""),
    currentPlayer: "X",
    winner: null,
    winningPattern: [],
    isDraw: false
  };
}

function evaluateBoard(board) {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winningPattern: pattern,
        isDraw: false
      };
    }
  }

  const isDraw = board.every((cell) => cell !== "");

  return {
    winner: null,
    winningPattern: [],
    isDraw
  };
}

function applyMove(state, index, player = state.currentPlayer) {
  if (state.winner || state.isDraw || state.board[index]) {
    return state;
  }

  const nextBoard = [...state.board];
  nextBoard[index] = player;
  const result = evaluateBoard(nextBoard);

  return {
    board: nextBoard,
    currentPlayer: result.winner || result.isDraw ? player : getNextPlayer(player),
    winner: result.winner,
    winningPattern: result.winningPattern,
    isDraw: result.isDraw
  };
}

function createCategoryState() {
  return {
    items: [],
    loading: true,
    error: ""
  };
}

function getStatusMessage(state, challenge) {
  if (challenge?.phase === "loading") {
    return `Loading a ${challenge.categoryName || "subject"} question for Player ${challenge.player}.`;
  }

  if (challenge?.phase === "question") {
    return `Player ${challenge.player} is answering a ${challenge.categoryName} question.`;
  }

  if (challenge?.phase === "subject") {
    return `Player ${challenge.player} is choosing a subject for a tile.`;
  }

  if (state.winner) {
    return `Player ${state.winner} wins!`;
  }

  if (state.isDraw) {
    return "It's a draw!";
  }

  return `Player ${state.currentPlayer}'s turn`;
}

function updateTurnBadge(state, badge, challenge) {
  if (challenge?.phase === "loading") {
    badge.textContent = `Loading: Player ${challenge.player}`;
    return;
  }

  if (challenge?.phase === "question") {
    badge.textContent = `Question: Player ${challenge.player}`;
    return;
  }

  if (challenge?.phase === "subject") {
    badge.textContent = `Subject: Player ${challenge.player}`;
    return;
  }

  badge.textContent = state.winner || state.isDraw
    ? "Round Complete"
    : `Player ${state.currentPlayer}`;
}

function updateBodyState(state, challenge) {
  if (typeof document === "undefined") {
    return;
  }

  document.body.dataset.turn = challenge ? challenge.player : state.currentPlayer;
  document.body.dataset.outcome = state.winner
    ? "win"
    : state.isDraw
      ? "draw"
      : "active";
}

function formatTileLabel(index) {
  const row = Math.floor(index / 3) + 1;
  const column = (index % 3) + 1;
  return `Row ${row}, Column ${column}`;
}

function shuffle(items) {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[swapIndex]] = [nextItems[swapIndex], nextItems[index]];
  }

  return nextItems;
}

function createChallenge(tileIndex, player, categoryId = "", categoryName = "") {
  return {
    tileIndex,
    player,
    phase: "subject",
    categoryId,
    categoryName,
    question: null
  };
}

function getQuestionsAssetUrl(fileName) {
  return new URL(`${QUESTIONS_FOLDER_PATH}${fileName}`, window.location.href).toString();
}

async function fetchJsonAsset(fileName, errorMessage) {
  const response = await fetch(getQuestionsAssetUrl(fileName));

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
}

async function fetchQuestionSubjects() {
  const payload = await fetchJsonAsset("subjects.json", "Unable to load subjects.");
  return Array.isArray(payload.subjects) ? payload.subjects : [];
}

async function fetchSubjectQuestions(subject) {
  const payload = await fetchJsonAsset(subject.file, `Unable to load ${subject.name} questions.`);
  return Array.isArray(payload.questions) ? payload.questions : [];
}

function renderSubjectOptions(subjectSelect, categories, selectedId, isDisabled, hasChallenge) {
  subjectSelect.replaceChildren();

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = hasChallenge ? "Choose a subject" : "Pick a tile first";
  subjectSelect.append(defaultOption);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = String(category.id);
    option.textContent = category.name;
    option.selected = String(category.id) === String(selectedId);
    subjectSelect.append(option);
  });

  if (!selectedId) {
    subjectSelect.value = "";
  }

  subjectSelect.disabled = isDisabled;
}

function renderChallenge(challenge, categoryState, ui) {
  const {
    choiceList,
    questionPrompt,
    questionMeta,
    questionResult,
    subjectSelect,
    loadQuestionButton
  } = ui;

  choiceList.replaceChildren();

  const waitingOnCategories = categoryState.loading;
  const challengePhase = challenge?.phase || "idle";

  renderSubjectOptions(
    subjectSelect,
    categoryState.items,
    challenge?.categoryId || "",
    waitingOnCategories || !challenge || challengePhase === "loading" || challengePhase === "question",
    Boolean(challenge)
  );

  loadQuestionButton.disabled = waitingOnCategories
    || !challenge
    || challengePhase === "loading"
    || challengePhase === "question"
    || !challenge.categoryId;

  if (waitingOnCategories) {
    questionPrompt.textContent = "Loading question subjects...";
    questionMeta.textContent = "The game is loading local subjects so players can choose a topic before each move.";
    questionResult.textContent = ui.note;
    return;
  }

  if (categoryState.error) {
    questionPrompt.textContent = "We couldn't load subjects yet.";
    questionMeta.textContent = "Check that the local question files exist, then refresh the page to try again.";
    questionResult.textContent = categoryState.error;
    return;
  }

  if (!challenge) {
    questionPrompt.textContent = "Choose a subject to unlock a move.";
    questionMeta.textContent = "Tap an open tile first. Then the active player can choose a subject and get a random question from the local question folder.";
    questionResult.textContent = ui.note;
    return;
  }

  if (challengePhase === "subject") {
    questionPrompt.textContent = `Choose a subject for ${formatTileLabel(challenge.tileIndex)}.`;
    questionMeta.textContent = `Player ${challenge.player}, pick the topic for your question. A wrong answer passes this same tile to Player ${getNextPlayer(challenge.player)}.`;
    questionResult.textContent = ui.note;
    return;
  }

  if (challengePhase === "loading") {
    questionPrompt.textContent = `Finding a ${challenge.categoryName} question...`;
    questionMeta.textContent = `Player ${challenge.player} is getting a random ${challenge.categoryName} question for ${formatTileLabel(challenge.tileIndex)}.`;
    questionResult.textContent = ui.note;
    return;
  }

  questionPrompt.textContent = challenge.question.prompt;
  questionMeta.textContent = `Player ${challenge.player}, answer this ${challenge.categoryName} question to claim ${formatTileLabel(challenge.tileIndex)}.`;
  questionResult.textContent = ui.note;

  challenge.question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.dataset.choiceIndex = String(index);
    button.textContent = choice;
    choiceList.append(button);
  });
}

function render(state, challenge, categoryState, ui) {
  const { cells, statusMessage, turnBadge } = ui;

  cells.forEach((cell, index) => {
    const value = state.board[index];
    cell.textContent = value;
    cell.dataset.player = value;
    cell.disabled = Boolean(value) || Boolean(state.winner) || state.isDraw || Boolean(challenge);
    cell.classList.toggle("winning", state.winningPattern.includes(index));
  });

  statusMessage.textContent = getStatusMessage(state, challenge);
  updateTurnBadge(state, turnBadge, challenge);
  updateBodyState(state, challenge);
  renderChallenge(challenge, categoryState, ui);
}

function setupGame() {
  const boardElement = document.getElementById("board");
  const statusMessage = document.getElementById("statusMessage");
  const turnBadge = document.getElementById("turnBadge");
  const resetButton = document.getElementById("resetButton");
  const choiceList = document.getElementById("choiceList");
  const questionPrompt = document.getElementById("questionPrompt");
  const questionMeta = document.getElementById("questionMeta");
  const questionResult = document.getElementById("questionResult");
  const subjectSelect = document.getElementById("subjectSelect");
  const loadQuestionButton = document.getElementById("loadQuestionButton");
  const cells = Array.from(boardElement.querySelectorAll(".cell"));

  let state = createGameState();
  let categoryState = createCategoryState();
  let challenge = null;
  let note = "Tap a tile when you're ready to start.";
  const playerSubjects = {
    X: "",
    O: ""
  };
  const questionSets = new Map();
  const questionPools = new Map();

  const ui = {
    cells,
    statusMessage,
    turnBadge,
    choiceList,
    questionPrompt,
    questionMeta,
    questionResult,
    subjectSelect,
    loadQuestionButton,
    get note() {
      return note;
    }
  };

  function getSubjectById(subjectId) {
    return categoryState.items.find((item) => String(item.id) === String(subjectId)) || null;
  }

  function getCategoryName(categoryId) {
    const category = getSubjectById(categoryId);
    return category ? category.name : "Selected Subject";
  }

  function setChallengeForPlayer(tileIndex, player) {
    const savedCategoryId = playerSubjects[player];
    challenge = createChallenge(tileIndex, player, savedCategoryId, savedCategoryId ? getCategoryName(savedCategoryId) : "");
    note = `Player ${player}, choose a subject for ${formatTileLabel(tileIndex)}.`;
    render(state, challenge, categoryState, ui);
  }

  async function getQuestionSet(subject) {
    if (!questionSets.has(subject.id)) {
      const questions = await fetchSubjectQuestions(subject);
      questionSets.set(subject.id, questions);
    }

    return questionSets.get(subject.id);
  }

  async function ensureQuestionForCategory(categoryId, lastQuestionId = "") {
    const subject = getSubjectById(categoryId);

    if (!subject) {
      throw new Error("Please choose a valid subject.");
    }

    let pool = questionPools.get(categoryId) || [];

    if (pool.length === 0) {
      const questions = await getQuestionSet(subject);

      if (!questions.length) {
        throw new Error(`No questions were found for ${subject.name}.`);
      }

      pool = shuffle(questions);
    }

    let nextQuestion = pool.shift();

    if (nextQuestion && nextQuestion.id === lastQuestionId && pool.length > 0) {
      pool.push(nextQuestion);
      nextQuestion = pool.shift();
    }

    questionPools.set(categoryId, pool);
    return nextQuestion;
  }

  async function loadQuestion() {
    if (!challenge || challenge.phase !== "subject" || !challenge.categoryId) {
      return;
    }

    const nextChallenge = {
      ...challenge,
      phase: "loading",
      categoryName: getCategoryName(challenge.categoryId)
    };

    challenge = nextChallenge;
    note = `Loading a random ${nextChallenge.categoryName} question for Player ${nextChallenge.player}.`;
    render(state, challenge, categoryState, ui);

    try {
      const question = await ensureQuestionForCategory(nextChallenge.categoryId);

      if (!challenge || challenge.tileIndex !== nextChallenge.tileIndex || challenge.player !== nextChallenge.player) {
        return;
      }

      challenge = {
        ...nextChallenge,
        phase: "question",
        question
      };
      note = `Player ${nextChallenge.player}, answer correctly to claim ${formatTileLabel(nextChallenge.tileIndex)}.`;
    } catch (error) {
      challenge = {
        ...nextChallenge,
        phase: "subject"
      };
      note = error instanceof Error ? error.message : "Unable to load a question right now.";
    }

    render(state, challenge, categoryState, ui);
  }

  async function handOffQuestionToNextPlayer(previousChallenge) {
    const nextPlayer = getNextPlayer(previousChallenge.player);

    challenge = {
      ...previousChallenge,
      player: nextPlayer,
      phase: "loading",
      question: null
    };
    note = `Wrong answer. Player ${nextPlayer} now gets a new ${previousChallenge.categoryName} question for the same tile.`;
    render(state, challenge, categoryState, ui);

    try {
      const question = await ensureQuestionForCategory(previousChallenge.categoryId, previousChallenge.question?.id || "");

      if (!challenge || challenge.tileIndex !== previousChallenge.tileIndex || challenge.player !== nextPlayer) {
        return;
      }

      challenge = {
        ...challenge,
        phase: "question",
        question
      };
      note = `Player ${nextPlayer}, answer correctly to claim ${formatTileLabel(previousChallenge.tileIndex)}.`;
    } catch (error) {
      challenge = createChallenge(
        previousChallenge.tileIndex,
        nextPlayer,
        previousChallenge.categoryId,
        previousChallenge.categoryName
      );
      note = error instanceof Error ? error.message : "Unable to load a question right now.";
    }

    render(state, challenge, categoryState, ui);
  }

  async function loadCategories() {
    render(state, challenge, categoryState, ui);

    try {
      const items = await fetchQuestionSubjects();
      categoryState = {
        items,
        loading: false,
        error: ""
      };
      note = "Tap a tile, then choose a subject to get a random question from the local folder.";
    } catch (error) {
      categoryState = {
        items: [],
        loading: false,
        error: error instanceof Error ? error.message : "Unable to load subjects."
      };
      note = categoryState.error;
    }

    render(state, challenge, categoryState, ui);
  }

  function resetGame() {
    state = createGameState();
    challenge = null;
    note = categoryState.loading
      ? "Loading question subjects..."
      : "Tap a tile, then choose a subject to get a random question from the local folder.";
    render(state, challenge, categoryState, ui);
  }

  boardElement.addEventListener("click", (event) => {
    const cell = event.target.closest(".cell");
    if (!cell || challenge || state.winner || state.isDraw || categoryState.loading || categoryState.error) {
      return;
    }

    const index = Number(cell.dataset.index);
    if (state.board[index]) {
      return;
    }

    setChallengeForPlayer(index, state.currentPlayer);
  });

  subjectSelect.addEventListener("change", (event) => {
    if (!challenge || challenge.phase !== "subject") {
      return;
    }

    const selectedCategoryId = event.target.value;
    playerSubjects[challenge.player] = selectedCategoryId;
    challenge = {
      ...challenge,
      categoryId: selectedCategoryId,
      categoryName: selectedCategoryId ? getCategoryName(selectedCategoryId) : ""
    };
    note = selectedCategoryId
      ? `Player ${challenge.player} picked ${challenge.categoryName}.`
      : `Player ${challenge.player}, choose a subject for ${formatTileLabel(challenge.tileIndex)}.`;
    render(state, challenge, categoryState, ui);
  });

  loadQuestionButton.addEventListener("click", () => {
    loadQuestion();
  });

  choiceList.addEventListener("click", (event) => {
    const choiceButton = event.target.closest(".choice-button");
    if (!choiceButton || !challenge || challenge.phase !== "question" || state.winner || state.isDraw) {
      return;
    }

    const selectedIndex = Number(choiceButton.dataset.choiceIndex);
    const answeredPlayer = challenge.player;

    if (selectedIndex === challenge.question.answer) {
      state = applyMove(state, challenge.tileIndex, answeredPlayer);
      note = `Correct. Player ${answeredPlayer} claimed ${formatTileLabel(challenge.tileIndex)} with ${challenge.categoryName}.`;
      challenge = null;
      render(state, challenge, categoryState, ui);
      return;
    }

    const previousChallenge = challenge;
    handOffQuestionToNextPlayer(previousChallenge);
  });

  resetButton.addEventListener("click", resetGame);
  render(state, challenge, categoryState, ui);
  loadCategories();
}

if (typeof document !== "undefined") {
  setupGame();
}

if (typeof globalThis !== "undefined") {
  globalThis.GamixoTicTacToe = {
    createGameState,
    evaluateBoard,
    applyMove,
    getStatusMessage,
    getNextPlayer
  };
}

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

function formatEnglishCompetitor(player) {
  if (typeof player !== "string") {
    return String(player || "");
  }

  const normalizedPlayer = player.trim();
  return normalizedPlayer.length === 1 ? `Player ${normalizedPlayer}` : normalizedPlayer;
}

function formatArabicCompetitor(player) {
  if (typeof player !== "string") {
    return String(player || "");
  }

  const normalizedPlayer = player.trim();
  return normalizedPlayer.length === 1 ? `اللاعب ${normalizedPlayer}` : normalizedPlayer;
}

const QUESTIONS_FOLDER_PATH = "../../questions/";

const subjectTranslations = {
  science: { ar: "العلوم" },
  history: { ar: "التاريخ" },
  geography: { ar: "الجغرافيا" },
  sports: { ar: "الرياضة" },
  technology: { ar: "التقنية" },
  movies: { ar: "الأفلام" },
  animals: { ar: "الحيوانات" },
  literature: { ar: "الأدب" }
};

const questionTranslations = {
  "science-red-planet": {
    ar: {
      prompt: "أي كوكب يُعرف بالكوكب الأحمر؟",
      choices: ["المريخ", "الزهرة", "عطارد", "زحل"]
    }
  },
  "science-water-freeze": {
    ar: {
      prompt: "عند أي درجة تتجمد المياه على مقياس سلسيوس؟",
      choices: ["0", "10", "32", "100"]
    }
  },
  "science-largest-organ": {
    ar: {
      prompt: "ما أكبر عضو في جسم الإنسان؟",
      choices: ["القلب", "الجلد", "الكبد", "الرئة"]
    }
  },
  "science-gas-plants": {
    ar: {
      prompt: "أي غاز تمتصه النباتات من الغلاف الجوي؟",
      choices: ["الأكسجين", "الهيدروجين", "ثاني أكسيد الكربون", "النيتروجين"]
    }
  },
  "science-center-solar": {
    ar: {
      prompt: "ما الموجود في مركز مجموعتنا الشمسية؟",
      choices: ["القمر", "الشمس", "الأرض", "المريخ"]
    }
  },
  "science-spider-legs": {
    ar: {
      prompt: "كم عدد أرجل العنكبوت؟",
      choices: ["ست", "ثمانٍ", "عشر", "اثنتا عشرة"]
    }
  },
  "history-egypt-pyramids": {
    ar: {
      prompt: "في أي دولة بُنيت أهرامات الجيزة؟",
      choices: ["المكسيك", "اليونان", "مصر", "إيطاليا"]
    }
  },
  "history-first-president": {
    ar: {
      prompt: "من كان أول رئيس للولايات المتحدة؟",
      choices: ["جورج واشنطن", "توماس جيفرسون", "أبراهام لينكولن", "جون آدامز"]
    }
  },
  "history-wall-fall": {
    ar: {
      prompt: "أي جدار سقط عام 1989 وكان حدثاً مهماً في الحرب الباردة؟",
      choices: ["سور الصين العظيم", "جدار برلين", "جدار هادريان", "حائط المبكى"]
    }
  },
  "history-rome": {
    ar: {
      prompt: "أي حضارة قديمة بنت الكولوسيوم؟",
      choices: ["اليونانيون", "الرومان", "الفرس", "الفايكنغ"]
    }
  },
  "history-moon-landing": {
    ar: {
      prompt: "في أي عام هبط البشر لأول مرة على القمر؟",
      choices: ["1965", "1969", "1972", "1981"]
    }
  },
  "history-titanic": {
    ar: {
      prompt: "ما اسم السفينة الشهيرة التي غرقت عام 1912؟",
      choices: ["بريتانيك", "إنديفور", "تايتانيك", "فيكتوريا"]
    }
  },
  "geography-capital-france": {
    ar: {
      prompt: "ما عاصمة فرنسا؟",
      choices: ["روما", "باريس", "مدريد", "برلين"]
    }
  },
  "geography-largest-ocean": {
    ar: {
      prompt: "ما أكبر محيط على كوكب الأرض؟",
      choices: ["المحيط الأطلسي", "المحيط الهندي", "المحيط الهادئ", "المحيط المتجمد الشمالي"]
    }
  },
  "geography-largest-continent": {
    ar: {
      prompt: "ما أكبر قارة في العالم؟",
      choices: ["أفريقيا", "أوروبا", "آسيا", "أستراليا"]
    }
  },
  "geography-hot-desert": {
    ar: {
      prompt: "ما أكبر صحراء حارة في العالم؟",
      choices: ["غوبي", "الصحراء الكبرى", "الصحراء العربية", "كالاهاري"]
    }
  },
  "geography-nile": {
    ar: {
      prompt: "في أي قارة يجري نهر النيل؟",
      choices: ["آسيا", "أفريقيا", "أوروبا", "أمريكا الجنوبية"]
    }
  },
  "geography-japan-capital": {
    ar: {
      prompt: "ما عاصمة اليابان؟",
      choices: ["كيوتو", "سيول", "طوكيو", "أوساكا"]
    }
  },
  "sports-soccer-players": {
    ar: {
      prompt: "كم عدد لاعبي الفريق الواحد عادةً في ملعب كرة القدم؟",
      choices: ["9", "10", "11", "12"]
    }
  },
  "sports-basketball-hoop": {
    ar: {
      prompt: "كم نقطة تُحتسب للرمية الحرة في كرة السلة؟",
      choices: ["1", "2", "3", "4"]
    }
  },
  "sports-olympics": {
    ar: {
      prompt: "ما الحدث الذي يقام كل أربع سنوات وتشارك فيه دول كثيرة؟",
      choices: ["السوبر بول", "الألعاب الأولمبية", "ويمبلدون", "طواف فرنسا"]
    }
  },
  "sports-tennis": {
    ar: {
      prompt: "في التنس، ما الكلمة المستخدمة للدلالة على صفر؟",
      choices: ["بلانك", "لاف", "نِل", "إيس"]
    }
  },
  "sports-cricket-bat": {
    ar: {
      prompt: "أي رياضة تستخدم مضرباً وويكيت ورامياً؟",
      choices: ["البيسبول", "الكريكيت", "الغولف", "الهوكي"]
    }
  },
  "sports-world-cup": {
    ar: {
      prompt: "أي رياضة تمنح كأس العالم من فيفا؟",
      choices: ["كرة السلة", "الرجبي", "كرة القدم", "التنس"]
    }
  },
  "technology-html": {
    ar: {
      prompt: "ماذا تعني الأحرف HTML؟",
      choices: ["لغة ترميز النص التشعبي", "لغة أدوات المنزل", "لغة الروابط والنصوص", "لغة آلات النقل العالية"]
    }
  },
  "technology-browser": {
    ar: {
      prompt: "أي واحد من هذه يُعد متصفح ويب؟",
      choices: ["فوتوشوب", "كروم", "إكسل", "سبوتيفاي"]
    }
  },
  "technology-cpu": {
    ar: {
      prompt: "ماذا تعني الأحرف CPU؟",
      choices: ["وحدة المعالجة المركزية", "وحدة شخصية للحاسوب", "وحدة العمليات المركزية", "أداة التحكم بالبرامج"]
    }
  },
  "technology-binary": {
    ar: {
      prompt: "أي رقمين يشكلان النظام الثنائي؟",
      choices: ["0 و1", "1 و2", "2 و3", "8 و9"]
    }
  },
  "technology-phone": {
    ar: {
      prompt: "ما الجهاز المستخدم أساساً للمكالمات والرسائل وتشغيل التطبيقات؟",
      choices: ["الطابعة", "الشاشة", "الهاتف الذكي", "لوحة المفاتيح"]
    }
  },
  "technology-usb": {
    ar: {
      prompt: "أي نوع من الكابلات يُستخدم غالباً لتوصيل وشحن كثير من الأجهزة؟",
      choices: ["USB", "حبل", "HDMI فقط", "Ethernet فقط"]
    }
  },
  "movies-frozen": {
    ar: {
      prompt: "في فيلم Frozen، ما اسم أخت إلسا؟",
      choices: ["آنا", "أولاف", "موانا", "رابونزل"]
    }
  },
  "movies-lion-king": {
    ar: {
      prompt: "ما اسم والد سيمبا في The Lion King؟",
      choices: ["سكار", "موفاسا", "تيمون", "بومبا"]
    }
  },
  "movies-wizard": {
    ar: {
      prompt: "أي فيلم يتضمن فتى ساحراً اسمه هاري؟",
      choices: ["نارنيا", "هاري بوتر", "شريك", "توي ستوري"]
    }
  },
  "movies-pixar-toy": {
    ar: {
      prompt: "ما نوع اللعبة التي يمثلها باز يطير في فيلم Toy Story؟",
      choices: ["دمية راعي بقر", "حارس فضاء", "قائد قطار", "كلب آلي"]
    }
  },
  "movies-blue-fish": {
    ar: {
      prompt: "أي فيلم رسوم متحركة يتبع سمكة مهرجة تبحث عن ابنها؟",
      choices: ["كارز", "فايندينغ نيمو", "أب", "كوكو"]
    }
  },
  "movies-jurassic": {
    ar: {
      prompt: "أي سلسلة أفلام تشتهر بإعادة الديناصورات إلى الحياة؟",
      choices: ["أفاتار", "جوراسيك بارك", "الفك المفترس", "حرب النجوم"]
    }
  },
  "animals-largest": {
    ar: {
      prompt: "ما أكبر حيوان في العالم؟",
      choices: ["الفيل", "الحوت الأزرق", "الزرافة", "القرش"]
    }
  },
  "animals-camel": {
    ar: {
      prompt: "كم عدد السنامات لدى الجمل العربي؟",
      choices: ["واحد", "اثنان", "ثلاثة", "لا يوجد"]
    }
  },
  "animals-baby-frog": {
    ar: {
      prompt: "ماذا يُسمى صغير الضفدع؟",
      choices: ["شبل", "عجل", "شرغوف", "فرخ"]
    }
  },
  "animals-fastest-land": {
    ar: {
      prompt: "ما أسرع حيوان بري؟",
      choices: ["الأسد", "الحصان", "الفهد", "الغزال"]
    }
  },
  "animals-bees": {
    ar: {
      prompt: "ماذا تصنع النحل؟",
      choices: ["حرير", "حليب", "عسل", "خبز"]
    }
  },
  "animals-mammal": {
    ar: {
      prompt: "أي من هذه الحيوانات يُعد من الثدييات؟",
      choices: ["ضفدع", "حوت", "سحلية", "قرش"]
    }
  },
  "literature-shakespeare": {
    ar: {
      prompt: "من كتب روميو وجولييت؟",
      choices: ["ويليام شكسبير", "تشارلز ديكنز", "جين أوستن", "مارك توين"]
    }
  },
  "literature-jungle-book": {
    ar: {
      prompt: "ما اسم الصبي في كتاب The Jungle Book؟",
      choices: ["ماوكلي", "طرزان", "بينوكيو", "أوليفر"]
    }
  },
  "literature-wonderland": {
    ar: {
      prompt: "أي شخصية تسافر عبر بلاد العجائب؟",
      choices: ["دوروثي", "أليس", "ويندي", "ماتيلدا"]
    }
  },
  "literature-hobbit": {
    ar: {
      prompt: "ما نوع الكائن الذي يمثله بيلبو في The Hobbit؟",
      choices: ["جني", "ساحر", "هوبيت", "قزم"]
    }
  },
  "literature-lion-witch": {
    ar: {
      prompt: "أي مؤلف كتب The Lion, the Witch and the Wardrobe؟",
      choices: ["سي. إس. لويس", "ج. ك. رولينغ", "رولد دال", "لويس كارول"]
    }
  },
  "literature-treasure-island": {
    ar: {
      prompt: "أي كتاب شهير يتضمن قراصنة وخريطة كنز؟",
      choices: ["جزيرة الكنز", "شبكة شارلوت", "بيتر بان", "الحديقة السرية"]
    }
  }
};

const text = {
  en: {
    dir: "ltr",
    modeLabel: "Mode",
    modeHuman: "2 Players",
    modeBot: "Play With Bot",
    botLevelLabel: "Bot Level",
    botLevelEasy: "Easy",
    botLevelMedium: "Medium",
    botLevelHard: "Hard",
    playStyleLabel: "Turn Style",
    playStyleQuestions: "With Questions",
    playStyleDirect: "Direct Play",
    languageLabel: "Language",
    botName: "Bot",
    setupTitle: "Game Setup",
    setupHint: "Choose a mode, choose direct play or questions, adjust the bot if needed, and then start playing.",
    subtitle: "Train your mind with a classic game of strategy, focus, and timing.",
    highlightsAria: "Game highlights",
    pills: ["Arcade Style", "2 Players", "Fast Rounds"],
    pillsBot: ["Arcade Style", "Vs Bot", "Fast Rounds"],
    turnLabel: "Current Turn",
    progressLabel: "Round Progress",
    progressValue: (current, total) => `${current} / ${total}`,
    quizKicker: "Question Challenge",
    subjectLabel: "Subject",
    loadQuestionButton: "Get Question",
    boardCaptionLead: "Pick a tile and start the showdown.",
    boardCaptionAccent: "First line of three wins.",
    resetButton: "Play Again",
    boardAria: "Tic-Tac-Toe board",
    chooseSubjectOption: "Choose a subject",
    pickTileFirstOption: "Pick a tile first",
    roundComplete: "Round Complete",
    loadingBadge: (player) => `Loading: ${player}`,
    questionBadge: (player) => `Question: ${player}`,
    subjectBadge: (player) => `Subject: ${player}`,
    player: (player) => formatEnglishCompetitor(player),
    currentTurn: (player) => `${formatEnglishCompetitor(player)}'s turn`,
    winner: (player) => `${formatEnglishCompetitor(player)} wins!`,
    draw: "It's a draw!",
    botThinking: "Bot is planning the next move.",
    loadingStatus: (player, category) => `Loading a ${category || "subject"} question for ${formatEnglishCompetitor(player)}.`,
    answeringStatus: (player, category) => `${formatEnglishCompetitor(player)} is answering a ${category} question.`,
    choosingStatus: (player) => `${formatEnglishCompetitor(player)} is choosing a subject for a tile.`,
    loadingSubjectsPrompt: "Loading question subjects...",
    loadingSubjectsMeta: "The game is loading local subjects so players can choose a topic before each move.",
    loadSubjectsErrorPrompt: "We couldn't load subjects yet.",
    loadSubjectsErrorMeta: "Check that the local question files exist, then refresh the page to try again.",
    idlePrompt: "Choose a subject to unlock a move.",
    idleMeta: "Tap an open tile first. Then the active player can choose a subject and get a random question from the local question folder.",
    subjectPrompt: (tile) => `Choose a subject for ${tile}.`,
    subjectMeta: (player, nextPlayer) => `${formatEnglishCompetitor(player)}, pick the topic for your question. A wrong answer passes this same tile to ${formatEnglishCompetitor(nextPlayer)}.`,
    findingPrompt: (category) => `Finding a ${category} question...`,
    findingMeta: (player, category, tile) => `${formatEnglishCompetitor(player)} is getting a random ${category} question for ${tile}.`,
    answerPrompt: (player, category, tile) => `${formatEnglishCompetitor(player)}, answer this ${category} question to claim ${tile}.`,
    noteReady: "Tap a tile when you're ready to start.",
    noteLoadingSubjects: "Loading question subjects...",
    noteChooseSubject: (player, tile) => `${formatEnglishCompetitor(player)}, choose a subject for ${tile}.`,
    notePickedSubject: (player, category) => `${formatEnglishCompetitor(player)} picked ${category}.`,
    noteLoadingQuestion: (player, category) => `Loading a random ${category} question for ${formatEnglishCompetitor(player)}.`,
    noteAnswerToClaim: (player, tile) => `${formatEnglishCompetitor(player)}, answer correctly to claim ${tile}.`,
    noteCorrectClaim: (player, tile, category) => `Correct. ${formatEnglishCompetitor(player)} claimed ${tile} with ${category}.`,
    noteWrongHandoff: (player, category) => `Wrong answer. ${formatEnglishCompetitor(player)} now gets a new ${category} question for the same tile.`,
    noteTapChoose: "Tap a tile, then choose a subject to get a random question from the local folder.",
    noteDirectReady: "Tap any empty tile to play instantly.",
    validSubjectError: "Please choose a valid subject.",
    noQuestionsFound: (subject) => `No questions were found for ${subject}.`,
    unableLoadSubjects: "Unable to load subjects.",
    unableLoadQuestions: (subject) => `Unable to load ${subject} questions.`,
    unableLoadQuestionGeneric: "Unable to load a question right now.",
    rowColumn: (row, column) => `Row ${row}, Column ${column}`
  },
  ar: {
    dir: "rtl",
    modeLabel: "الوضع",
    modeHuman: "لاعبان",
    modeBot: "العب ضد البوت",
    botLevelLabel: "مستوى البوت",
    botLevelEasy: "سهل",
    botLevelMedium: "متوسط",
    botLevelHard: "صعب",
    playStyleLabel: "أسلوب اللعب",
    playStyleQuestions: "بالأسئلة",
    playStyleDirect: "مباشر",
    languageLabel: "اللغة",
    botName: "البوت",
    setupTitle: "إعداد اللعبة",
    setupHint: "اختر وضع اللعب، ثم اختر اللعب المباشر أو بالأسئلة، وعدّل مستوى البوت إذا أردت وابدأ اللعب.",
    subtitle: "نمِّ ذهنك من خلال لعبة كلاسيكية تجمع بين الاستراتيجية والتركيز وحسن التوقيت.",
    highlightsAria: "مميزات اللعبة",
    pills: ["أسلوب أركيد", "لاعبان", "جولات سريعة"],
    pillsBot: ["أسلوب أركيد", "ضد البوت", "جولات سريعة"],
    turnLabel: "الدور الحالي",
    progressLabel: "تقدم الجولة",
    progressValue: (current, total) => `${current} / ${total}`,
    quizKicker: "تحدي الأسئلة",
    subjectLabel: "الموضوع",
    loadQuestionButton: "احصل على سؤال",
    boardCaptionLead: "اختر خانة وابدأ المواجهة.",
    boardCaptionAccent: "أول خط من ثلاثة يفوز.",
    resetButton: "العب مرة أخرى",
    boardAria: "لوحة إكس أو",
    chooseSubjectOption: "اختر موضوعاً",
    pickTileFirstOption: "اختر خانة أولاً",
    roundComplete: "انتهت الجولة",
    loadingBadge: (player) => `جارٍ التحميل: ${player}`,
    questionBadge: (player) => `السؤال: ${player}`,
    subjectBadge: (player) => `الموضوع: ${player}`,
    player: (player) => formatArabicCompetitor(player),
    currentTurn: (player) => `دور ${formatArabicCompetitor(player)}`,
    winner: (player) => `فاز ${formatArabicCompetitor(player)}!`,
    draw: "انتهت المباراة بالتعادل!",
    botThinking: "البوت يخطط للحركة التالية.",
    loadingStatus: (player, category) => `جارٍ تحميل سؤال ${category || "موضوع"} لـ${formatArabicCompetitor(player)}.`,
    answeringStatus: (player, category) => `${formatArabicCompetitor(player)} يجيب عن سؤال ${category}.`,
    choosingStatus: (player) => `${formatArabicCompetitor(player)} يختار موضوعاً لخانة.`,
    loadingSubjectsPrompt: "جارٍ تحميل مواضيع الأسئلة...",
    loadingSubjectsMeta: "تقوم اللعبة بتحميل المواضيع المحلية ليختار اللاعب موضوعاً قبل كل حركة.",
    loadSubjectsErrorPrompt: "تعذر تحميل المواضيع حالياً.",
    loadSubjectsErrorMeta: "تأكد من وجود ملفات الأسئلة المحلية ثم أعد تحديث الصفحة للمحاولة مرة أخرى.",
    idlePrompt: "اختر موضوعاً لبدء الحركة.",
    idleMeta: "اضغط على خانة فارغة أولاً، ثم اختر الموضوع لتحصل على سؤال عشوائي من مجلد الأسئلة المحلي.",
    subjectPrompt: (tile) => `اختر موضوعاً للخانة ${tile}.`,
    subjectMeta: (player, nextPlayer) => `${formatArabicCompetitor(player)}، اختر موضوع السؤال. إذا كانت الإجابة خاطئة فستنتقل هذه الخانة نفسها إلى ${formatArabicCompetitor(nextPlayer)}.`,
    findingPrompt: (category) => `جارٍ البحث عن سؤال من ${category}...`,
    findingMeta: (player, category, tile) => `يحصل ${formatArabicCompetitor(player)} على سؤال عشوائي من ${category} للخانة ${tile}.`,
    answerPrompt: (player, category, tile) => `${formatArabicCompetitor(player)}، أجب عن سؤال ${category} للفوز بالخانة ${tile}.`,
    noteReady: "اضغط على خانة عندما تكون جاهزاً للبدء.",
    noteLoadingSubjects: "جارٍ تحميل مواضيع الأسئلة...",
    noteChooseSubject: (player, tile) => `${formatArabicCompetitor(player)}، اختر موضوعاً للخانة ${tile}.`,
    notePickedSubject: (player, category) => `اختار ${formatArabicCompetitor(player)} موضوع ${category}.`,
    noteLoadingQuestion: (player, category) => `جارٍ تحميل سؤال عشوائي من ${category} لـ${formatArabicCompetitor(player)}.`,
    noteAnswerToClaim: (player, tile) => `${formatArabicCompetitor(player)}، أجب بشكل صحيح للفوز بالخانة ${tile}.`,
    noteCorrectClaim: (player, tile, category) => `إجابة صحيحة. فاز ${formatArabicCompetitor(player)} بالخانة ${tile} عبر موضوع ${category}.`,
    noteWrongHandoff: (player, category) => `إجابة خاطئة. يحصل ${formatArabicCompetitor(player)} الآن على سؤال جديد من ${category} للخانة نفسها.`,
    noteTapChoose: "اضغط على خانة ثم اختر موضوعاً لتحصل على سؤال عشوائي من المجلد المحلي.",
    noteDirectReady: "اضغط على أي خانة فارغة لتلعب مباشرة.",
    validSubjectError: "يرجى اختيار موضوع صحيح.",
    noQuestionsFound: (subject) => `لم يتم العثور على أسئلة لموضوع ${subject}.`,
    unableLoadSubjects: "تعذر تحميل المواضيع.",
    unableLoadQuestions: (subject) => `تعذر تحميل أسئلة ${subject}.`,
    unableLoadQuestionGeneric: "تعذر تحميل سؤال الآن.",
    rowColumn: (row, column) => `الصف ${row}، العمود ${column}`
  }
};

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

function createChallenge(tileIndex, player, categoryId = "") {
  return {
    tileIndex,
    player,
    phase: "subject",
    categoryId,
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

async function fetchQuestionSubjects(errorMessage) {
  const payload = await fetchJsonAsset("subjects.json", errorMessage);
  return Array.isArray(payload.subjects) ? payload.subjects : [];
}

async function fetchSubjectQuestions(subject, errorMessage) {
  const payload = await fetchJsonAsset(subject.file, errorMessage);
  return Array.isArray(payload.questions) ? payload.questions : [];
}

function setupGame() {
  const boardElement = document.getElementById("board");
  const statusMessage = document.getElementById("statusMessage");
  const turnBadge = document.getElementById("turnBadge");
  const resetButton = document.getElementById("resetButton");
  const quizPanel = document.getElementById("quizPanel");
  const choiceList = document.getElementById("choiceList");
  const questionPrompt = document.getElementById("questionPrompt");
  const questionMeta = document.getElementById("questionMeta");
  const questionResult = document.getElementById("questionResult");
  const subjectSelect = document.getElementById("subjectSelect");
  const loadQuestionButton = document.getElementById("loadQuestionButton");
  const modeSelect = document.getElementById("modeSelect");
  const botLevelSelect = document.getElementById("botLevelSelect");
  const levelSwitcher = document.querySelector(".level-switcher");
  const playStyleSwitcher = document.querySelector(".play-style-switcher");
  const modeHumanButton = document.getElementById("modeHumanButton");
  const modeBotButton = document.getElementById("modeBotButton");
  const levelEasyButton = document.getElementById("levelEasyButton");
  const levelMediumButton = document.getElementById("levelMediumButton");
  const levelHardButton = document.getElementById("levelHardButton");
  const playStyleQuestionsButton = document.getElementById("playStyleQuestionsButton");
  const playStyleDirectButton = document.getElementById("playStyleDirectButton");
  const playStyleSelect = document.getElementById("playStyleSelect");
  const languageSelect = document.getElementById("languageSelect");
  const setupTitle = document.getElementById("setupTitle");
  const setupHint = document.getElementById("setupHint");
  const subtitleText = document.getElementById("subtitleText");
  const progressLabel = document.getElementById("progressLabel");
  const progressValue = document.getElementById("progressValue");
  const progressFill = document.getElementById("progressFill");
  const highlightsStrip = document.getElementById("highlightsStrip");
  const pillArcade = document.getElementById("pillArcade");
  const pillPlayers = document.getElementById("pillPlayers");
  const pillRounds = document.getElementById("pillRounds");
  const turnLabel = document.getElementById("turnLabel");
  const quizKicker = document.getElementById("quizKicker");
  const subjectLabel = document.getElementById("subjectLabel");
  const boardCaptionLead = document.getElementById("boardCaptionLead");
  const boardCaptionAccent = document.getElementById("boardCaptionAccent");
  const modeLabel = document.getElementById("modeLabel");
  const botLevelLabel = document.getElementById("botLevelLabel");
  const playStyleLabel = document.getElementById("playStyleLabel");
  const languageLabel = document.getElementById("languageLabel");
  const cells = Array.from(boardElement.querySelectorAll(".cell"));

  let currentLanguage = "en";
  let gameMode = "human";
  let botLevel = "medium";
  let playStyle = "questions";
  let state = createGameState();
  let categoryState = createCategoryState();
  let challenge = null;
  let noteState = { key: "noteReady", params: {} };
  let botActionTimer = null;

  const playerSubjects = { X: "", O: "" };
  const questionSets = new Map();
  const questionPools = new Map();

  function lang() {
    return text[currentLanguage];
  }

  function setNote(key, params = {}) {
    noteState = { key, params };
  }

  function isBotMode() {
    return gameMode === "bot";
  }

  function isBotPlayer(player) {
    return isBotMode() && player === "O";
  }

  function usesQuestions() {
    return playStyle === "questions";
  }

  function clearBotActionTimer() {
    if (botActionTimer) {
      window.clearTimeout(botActionTimer);
      botActionTimer = null;
    }
  }

  function localizeSubjectName(subjectId, fallbackName = "Selected Subject") {
    const subject = categoryState.items.find((item) => String(item.id) === String(subjectId));
    const englishName = subject ? subject.name : fallbackName;
    if (currentLanguage === "ar" && subjectTranslations[subjectId]?.ar) {
      return subjectTranslations[subjectId].ar;
    }
    return englishName;
  }

  function localizeQuestion(question) {
    if (!question || currentLanguage !== "ar" || !questionTranslations[question.id]?.ar) {
      return question;
    }

    return {
      ...question,
      prompt: questionTranslations[question.id].ar.prompt,
      choices: questionTranslations[question.id].ar.choices
    };
  }

  function playerLabel(player) {
    if (isBotPlayer(player)) {
      return lang().botName;
    }

    return lang().player(player);
  }

  function formatTileLabel(index) {
    const row = Math.floor(index / 3) + 1;
    const column = (index % 3) + 1;
    return lang().rowColumn(row, column);
  }

  function formatNote() {
    const { key, params } = noteState;
    const strings = lang();

    switch (key) {
      case "noteChooseSubject":
        return strings.noteChooseSubject(playerLabel(params.player), formatTileLabel(params.tileIndex));
      case "notePickedSubject":
        return strings.notePickedSubject(playerLabel(params.player), localizeSubjectName(params.categoryId, params.categoryName));
      case "noteLoadingQuestion":
        return strings.noteLoadingQuestion(playerLabel(params.player), localizeSubjectName(params.categoryId, params.categoryName));
      case "noteAnswerToClaim":
        return strings.noteAnswerToClaim(playerLabel(params.player), formatTileLabel(params.tileIndex));
      case "noteCorrectClaim":
        return strings.noteCorrectClaim(
          playerLabel(params.player),
          formatTileLabel(params.tileIndex),
          localizeSubjectName(params.categoryId, params.categoryName)
        );
      case "noteWrongHandoff":
        return strings.noteWrongHandoff(playerLabel(params.player), localizeSubjectName(params.categoryId, params.categoryName));
      case "noteTapChoose":
      case "noteReady":
      case "noteDirectReady":
      case "noteLoadingSubjects":
        return strings[key];
      case "custom":
        return params.valueAr && currentLanguage === "ar" ? params.valueAr : params.value;
      default:
        return strings.noteReady;
    }
  }

  function updateDocumentLanguage() {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = lang().dir;
  }

  function updateStaticTexts() {
    const strings = lang();
    const pills = isBotMode() ? strings.pillsBot : strings.pills;
    const modeButtons = [
      [modeHumanButton, gameMode === "human"],
      [modeBotButton, gameMode === "bot"]
    ];
    const levelButtons = [
      [levelEasyButton, botLevel === "easy"],
      [levelMediumButton, botLevel === "medium"],
      [levelHardButton, botLevel === "hard"]
    ];
    const playStyleButtons = [
      [playStyleQuestionsButton, playStyle === "questions"],
      [playStyleDirectButton, playStyle === "direct"]
    ];

    modeLabel.textContent = strings.modeLabel;
    modeSelect.value = gameMode;
    modeSelect.options[0].textContent = strings.modeHuman;
    modeSelect.options[1].textContent = strings.modeBot;
    modeHumanButton.textContent = strings.modeHuman;
    modeBotButton.textContent = strings.modeBot;
    botLevelLabel.textContent = strings.botLevelLabel;
    botLevelSelect.value = botLevel;
    botLevelSelect.options[0].textContent = strings.botLevelEasy;
    botLevelSelect.options[1].textContent = strings.botLevelMedium;
    botLevelSelect.options[2].textContent = strings.botLevelHard;
    levelEasyButton.textContent = strings.botLevelEasy;
    levelMediumButton.textContent = strings.botLevelMedium;
    levelHardButton.textContent = strings.botLevelHard;
    botLevelSelect.disabled = !isBotMode();
    levelSwitcher.hidden = !isBotMode();
    modeButtons.forEach(([button, isActive]) => {
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
    levelButtons.forEach(([button, isActive]) => {
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
      button.disabled = !isBotMode();
    });
    playStyleLabel.textContent = strings.playStyleLabel;
    playStyleSelect.value = playStyle;
    playStyleSelect.options[0].textContent = strings.playStyleQuestions;
    playStyleSelect.options[1].textContent = strings.playStyleDirect;
    playStyleQuestionsButton.textContent = strings.playStyleQuestions;
    playStyleDirectButton.textContent = strings.playStyleDirect;
    playStyleSwitcher.hidden = false;
    playStyleQuestionsButton.disabled = false;
    playStyleSelect.disabled = false;
    playStyleButtons.forEach(([button, isActive]) => {
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
    languageLabel.textContent = strings.languageLabel;
    setupTitle.textContent = strings.setupTitle;
    setupHint.textContent = strings.setupHint;
    subtitleText.textContent = strings.subtitle;
    progressLabel.textContent = strings.progressLabel;
    highlightsStrip.setAttribute("aria-label", strings.highlightsAria);
    pillArcade.textContent = pills[0];
    pillPlayers.textContent = pills[1];
    pillRounds.textContent = pills[2];
    turnLabel.textContent = strings.turnLabel;
    quizKicker.textContent = strings.quizKicker;
    subjectLabel.textContent = strings.subjectLabel;
    loadQuestionButton.textContent = strings.loadQuestionButton;
    boardCaptionLead.textContent = strings.boardCaptionLead;
    boardCaptionAccent.textContent = strings.boardCaptionAccent;
    resetButton.textContent = strings.resetButton;
    boardElement.setAttribute("aria-label", strings.boardAria);

    cells.forEach((cell, index) => {
      cell.setAttribute("aria-label", formatTileLabel(index));
    });
  }

  function getStatusMessage() {
    const strings = lang();
    const categoryName = challenge?.categoryId ? localizeSubjectName(challenge.categoryId) : "";

    if (challenge?.phase === "loading") {
      return strings.loadingStatus(playerLabel(challenge.player), categoryName);
    }

    if (challenge?.phase === "question") {
      return strings.answeringStatus(playerLabel(challenge.player), categoryName);
    }

    if (challenge?.phase === "subject") {
      return strings.choosingStatus(playerLabel(challenge.player));
    }

    if (state.winner) {
      return strings.winner(playerLabel(state.winner));
    }

    if (state.isDraw) {
      return strings.draw;
    }

    if (isBotPlayer(state.currentPlayer)) {
      return strings.botThinking;
    }

    return strings.currentTurn(playerLabel(state.currentPlayer));
  }

  function updateTurnBadge() {
    const strings = lang();

    if (challenge?.phase === "loading") {
      turnBadge.textContent = strings.loadingBadge(playerLabel(challenge.player));
      return;
    }

    if (challenge?.phase === "question") {
      turnBadge.textContent = strings.questionBadge(playerLabel(challenge.player));
      return;
    }

    if (challenge?.phase === "subject") {
      turnBadge.textContent = strings.subjectBadge(playerLabel(challenge.player));
      return;
    }

    turnBadge.textContent = state.winner || state.isDraw
      ? strings.roundComplete
      : playerLabel(state.currentPlayer);
  }

  function updateBodyState() {
    document.body.dataset.turn = challenge ? challenge.player : state.currentPlayer;
    document.body.dataset.outcome = state.winner
      ? "win"
      : state.isDraw
        ? "draw"
        : "active";
  }

  function updateProgressStatus() {
    const totalMoves = state.board.length;
    const playedMoves = state.board.filter(Boolean).length;
    const progressPercent = totalMoves === 0 ? 0 : (playedMoves / totalMoves) * 100;

    progressValue.textContent = lang().progressValue(playedMoves, totalMoves);
    progressFill.style.width = `${progressPercent}%`;
  }

  function renderSubjectOptions() {
    subjectSelect.replaceChildren();

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = challenge ? lang().chooseSubjectOption : lang().pickTileFirstOption;
    subjectSelect.append(defaultOption);

    categoryState.items.forEach((category) => {
      const option = document.createElement("option");
      option.value = String(category.id);
      option.textContent = localizeSubjectName(category.id, category.name);
      option.selected = String(category.id) === String(challenge?.categoryId || "");
      subjectSelect.append(option);
    });

    if (!challenge?.categoryId) {
      subjectSelect.value = "";
    }

    subjectSelect.disabled = categoryState.loading
      || !challenge
      || isBotPlayer(challenge?.player)
      || challenge.phase === "loading"
      || challenge.phase === "question";
  }

  function renderChallenge() {
    quizPanel.hidden = !usesQuestions();
    quizPanel.style.display = usesQuestions() ? "grid" : "none";

    if (!usesQuestions()) {
      return;
    }

    const strings = lang();
    choiceList.replaceChildren();
    renderSubjectOptions();

    loadQuestionButton.disabled = categoryState.loading
      || !challenge
      || isBotPlayer(challenge?.player)
      || challenge.phase === "loading"
      || challenge.phase === "question"
      || !challenge.categoryId;

    if (categoryState.loading) {
      questionPrompt.textContent = strings.loadingSubjectsPrompt;
      questionMeta.textContent = strings.loadingSubjectsMeta;
      questionResult.textContent = formatNote();
      return;
    }

    if (categoryState.error) {
      questionPrompt.textContent = strings.loadSubjectsErrorPrompt;
      questionMeta.textContent = strings.loadSubjectsErrorMeta;
      questionResult.textContent = categoryState.error;
      return;
    }

    if (!challenge) {
      questionPrompt.textContent = strings.idlePrompt;
      questionMeta.textContent = strings.idleMeta;
      questionResult.textContent = formatNote();
      return;
    }

    const tileLabel = formatTileLabel(challenge.tileIndex);
    const categoryName = challenge.categoryId ? localizeSubjectName(challenge.categoryId) : "";

    if (challenge.phase === "subject") {
      questionPrompt.textContent = strings.subjectPrompt(tileLabel);
      questionMeta.textContent = strings.subjectMeta(playerLabel(challenge.player), playerLabel(getNextPlayer(challenge.player)));
      questionResult.textContent = formatNote();
      return;
    }

    if (challenge.phase === "loading") {
      questionPrompt.textContent = strings.findingPrompt(categoryName);
      questionMeta.textContent = strings.findingMeta(playerLabel(challenge.player), categoryName, tileLabel);
      questionResult.textContent = formatNote();
      return;
    }

    const localizedQuestion = localizeQuestion(challenge.question);
    questionPrompt.textContent = localizedQuestion.prompt;
    questionMeta.textContent = strings.answerPrompt(playerLabel(challenge.player), categoryName, tileLabel);
    questionResult.textContent = formatNote();

    localizedQuestion.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-button";
      button.dataset.choiceIndex = String(index);
      button.textContent = choice;
      choiceList.append(button);
    });
  }

  function render() {
    updateDocumentLanguage();
    updateStaticTexts();

    cells.forEach((cell, index) => {
      const value = state.board[index];
      cell.textContent = value;
      cell.dataset.player = value;
      cell.disabled = Boolean(value)
        || Boolean(state.winner)
        || state.isDraw
        || (usesQuestions() && Boolean(challenge))
        || isBotPlayer(state.currentPlayer);
      cell.classList.toggle("winning", state.winningPattern.includes(index));
    });

    statusMessage.textContent = getStatusMessage();
    updateTurnBadge();
    updateBodyState();
    updateProgressStatus();
    renderChallenge();
    scheduleBotAction();
  }

  function getSubjectById(subjectId) {
    return categoryState.items.find((item) => String(item.id) === String(subjectId)) || null;
  }

  function setChallengeForPlayer(tileIndex, player) {
    const savedCategoryId = playerSubjects[player];
    challenge = createChallenge(tileIndex, player, savedCategoryId);
    setNote("noteChooseSubject", { player, tileIndex });
    render();
  }

  function getOpenTileIndexes(board) {
    return board
      .map((value, index) => (value ? null : index))
      .filter((value) => value !== null);
  }

  function findStrategicMove(board, player) {
    for (const pattern of winningPatterns) {
      const values = pattern.map((index) => board[index]);
      const playerCount = values.filter((value) => value === player).length;
      const emptyIndexes = pattern.filter((index) => !board[index]);

      if (playerCount === 2 && emptyIndexes.length === 1) {
        return emptyIndexes[0];
      }
    }

    return null;
  }

  function scoreBoardForBot(boardState, depth) {
    const result = evaluateBoard(boardState);

    if (result.winner === "O") {
      return 10 - depth;
    }

    if (result.winner === "X") {
      return depth - 10;
    }

    return 0;
  }

  function minimax(boardState, currentPlayer, depth = 0) {
    const result = evaluateBoard(boardState);
    if (result.winner || result.isDraw) {
      return {
        score: scoreBoardForBot(boardState, depth),
        move: null
      };
    }

    const openTiles = getOpenTileIndexes(boardState);
    let bestMove = null;

    if (currentPlayer === "O") {
      let bestScore = -Infinity;

      openTiles.forEach((index) => {
        const nextBoard = [...boardState];
        nextBoard[index] = "O";
        const outcome = minimax(nextBoard, "X", depth + 1);

        if (outcome.score > bestScore) {
          bestScore = outcome.score;
          bestMove = index;
        }
      });

      return { score: bestScore, move: bestMove };
    }

    let bestScore = Infinity;

    openTiles.forEach((index) => {
      const nextBoard = [...boardState];
      nextBoard[index] = "X";
      const outcome = minimax(nextBoard, "O", depth + 1);

      if (outcome.score < bestScore) {
        bestScore = outcome.score;
        bestMove = index;
      }
    });

    return { score: bestScore, move: bestMove };
  }

  function chooseBotMove(board) {
    if (botLevel === "easy") {
      const openTiles = getOpenTileIndexes(board);
      return openTiles[Math.floor(Math.random() * openTiles.length)];
    }

    if (botLevel === "hard") {
      const bestMove = minimax(board, "O").move;
      if (bestMove !== null) {
        return bestMove;
      }
    }

    const winningMove = findStrategicMove(board, "O");
    if (winningMove !== null) {
      return winningMove;
    }

    const blockingMove = findStrategicMove(board, "X");
    if (blockingMove !== null) {
      return blockingMove;
    }

    if (!board[4]) {
      return 4;
    }

    const corners = [0, 2, 6, 8].filter((index) => !board[index]);
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    const openTiles = getOpenTileIndexes(board);
    return openTiles[Math.floor(Math.random() * openTiles.length)];
  }

  function getBotDelay() {
    if (botLevel === "easy") {
      return 180;
    }

    if (botLevel === "hard") {
      return 260;
    }

    return 220;
  }

  function shuffle(items) {
    const nextItems = [...items];

    for (let index = nextItems.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [nextItems[index], nextItems[swapIndex]] = [nextItems[swapIndex], nextItems[index]];
    }

    return nextItems;
  }

  async function getQuestionSet(subject) {
    if (!questionSets.has(subject.id)) {
      const questions = await fetchSubjectQuestions(subject, lang().unableLoadQuestions(localizeSubjectName(subject.id, subject.name)));
      questionSets.set(subject.id, questions);
    }

    return questionSets.get(subject.id);
  }

  async function ensureQuestionForCategory(categoryId, lastQuestionId = "") {
    const subject = getSubjectById(categoryId);

    if (!subject) {
      throw new Error(lang().validSubjectError);
    }

    let pool = questionPools.get(categoryId) || [];

    if (pool.length === 0) {
      const questions = await getQuestionSet(subject);

      if (!questions.length) {
        throw new Error(lang().noQuestionsFound(localizeSubjectName(subject.id, subject.name)));
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

    challenge = {
      ...challenge,
      phase: "loading"
    };
    setNote("noteLoadingQuestion", { player: challenge.player, categoryId: challenge.categoryId });
    render();

    try {
      const question = await ensureQuestionForCategory(challenge.categoryId);

      if (!challenge || challenge.phase !== "loading") {
        return;
      }

      challenge = {
        ...challenge,
        phase: "question",
        question
      };
      setNote("noteAnswerToClaim", { player: challenge.player, tileIndex: challenge.tileIndex });
    } catch (error) {
      challenge = {
        ...challenge,
        phase: "subject"
      };
      setNote("custom", { value: error instanceof Error ? error.message : text.en.unableLoadQuestionGeneric, valueAr: error instanceof Error ? error.message : text.ar.unableLoadQuestionGeneric });
    }

    render();
  }

  async function handOffQuestionToNextPlayer(previousChallenge) {
    const nextPlayer = getNextPlayer(previousChallenge.player);

    challenge = {
      ...previousChallenge,
      player: nextPlayer,
      phase: "loading",
      question: null
    };
    setNote("noteWrongHandoff", { player: nextPlayer, categoryId: previousChallenge.categoryId });
    render();

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
      setNote("noteAnswerToClaim", { player: nextPlayer, tileIndex: previousChallenge.tileIndex });
    } catch (error) {
      challenge = createChallenge(previousChallenge.tileIndex, nextPlayer, previousChallenge.categoryId);
      setNote("custom", { value: error instanceof Error ? error.message : text.en.unableLoadQuestionGeneric, valueAr: error instanceof Error ? error.message : text.ar.unableLoadQuestionGeneric });
    }

    render();
  }

  function startBotTurn() {
    if (!isBotPlayer(state.currentPlayer) || challenge || state.winner || state.isDraw) {
      return;
    }

    if (usesQuestions() && (categoryState.loading || categoryState.error || categoryState.items.length === 0)) {
      return;
    }

    const tileIndex = chooseBotMove(state.board);
    if (tileIndex === undefined) {
      return;
    }

    if (!usesQuestions()) {
      state = applyMove(state, tileIndex, "O");
      setNote("noteDirectReady");
      render();
      return;
    }

    const randomSubject = categoryState.items[Math.floor(Math.random() * categoryState.items.length)] || null;
    const categoryId = randomSubject ? String(randomSubject.id) : "";

    if (!categoryId) {
      return;
    }

    playerSubjects.O = categoryId;
    challenge = createChallenge(tileIndex, "O", categoryId);
    setNote("notePickedSubject", {
      player: "O",
      categoryId,
      categoryName: localizeSubjectName(categoryId, randomSubject.name)
    });
    render();
    loadQuestion();
  }

  function getBotAnswerSuccessRate() {
    if (botLevel === "easy") {
      return 0.45;
    }

    if (botLevel === "hard") {
      return 0.9;
    }

    return 0.7;
  }

  function answerBotQuestion() {
    if (!challenge || challenge.phase !== "question" || !isBotPlayer(challenge.player) || state.winner || state.isDraw) {
      return;
    }

    if (Math.random() <= getBotAnswerSuccessRate()) {
      state = applyMove(state, challenge.tileIndex, challenge.player);
      setNote("noteCorrectClaim", {
        player: challenge.player,
        tileIndex: challenge.tileIndex,
        categoryId: challenge.categoryId
      });
      challenge = null;
      render();
      return;
    }

    const previousChallenge = challenge;
    handOffQuestionToNextPlayer(previousChallenge);
  }

  function scheduleBotAction() {
    clearBotActionTimer();

    if (!isBotMode() || state.winner || state.isDraw) {
      return;
    }

    if (challenge) {
      if (challenge.phase === "question" && isBotPlayer(challenge.player)) {
        botActionTimer = window.setTimeout(() => {
          answerBotQuestion();
        }, getBotDelay());
      }
      return;
    }

    if (isBotPlayer(state.currentPlayer)) {
      botActionTimer = window.setTimeout(() => {
        startBotTurn();
      }, getBotDelay());
    }
  }

  async function loadCategories() {
    render();

    try {
      const items = await fetchQuestionSubjects(lang().unableLoadSubjects);
      categoryState = {
        items,
        loading: false,
        error: ""
      };
      setNote("noteTapChoose");
    } catch (error) {
      categoryState = {
        items: [],
        loading: false,
        error: error instanceof Error ? error.message : lang().unableLoadSubjects
      };
      setNote("custom", { value: categoryState.error, valueAr: categoryState.error });
    }

    render();
  }

  function getResetNoteKey() {
    if (!usesQuestions()) {
      return "noteDirectReady";
    }

    if (isBotMode()) {
      return "noteReady";
    }

    return categoryState.loading ? "noteLoadingSubjects" : "noteTapChoose";
  }

  function resetGame() {
    clearBotActionTimer();
    state = createGameState();
    challenge = null;
    setNote(getResetNoteKey());
    render();
  }

  boardElement.addEventListener("click", (event) => {
    const cell = event.target.closest(".cell");
    if (!cell || state.winner || state.isDraw || isBotPlayer(state.currentPlayer)) {
      return;
    }

    const index = Number(cell.dataset.index);
    if (state.board[index]) {
      return;
    }

    if (!usesQuestions()) {
      state = applyMove(state, index, state.currentPlayer);
      setNote("noteDirectReady");
      render();
      return;
    }

    if (challenge || categoryState.loading || categoryState.error) {
      return;
    }

    setChallengeForPlayer(index, state.currentPlayer);
  });

  subjectSelect.addEventListener("change", (event) => {
    if (!challenge || challenge.phase !== "subject" || isBotPlayer(challenge.player)) {
      return;
    }

    const selectedCategoryId = event.target.value;
    playerSubjects[challenge.player] = selectedCategoryId;
    challenge = {
      ...challenge,
      categoryId: selectedCategoryId
    };

    if (selectedCategoryId) {
      setNote("notePickedSubject", {
        player: challenge.player,
        categoryId: selectedCategoryId,
        categoryName: localizeSubjectName(selectedCategoryId)
      });
    } else {
      setNote("noteChooseSubject", { player: challenge.player, tileIndex: challenge.tileIndex });
    }

    render();
  });

  loadQuestionButton.addEventListener("click", () => {
    if (challenge && isBotPlayer(challenge.player)) {
      return;
    }
    loadQuestion();
  });

  choiceList.addEventListener("click", (event) => {
    const choiceButton = event.target.closest(".choice-button");
    if (!choiceButton || !challenge || challenge.phase !== "question" || state.winner || state.isDraw || isBotPlayer(challenge.player)) {
      return;
    }

    const selectedIndex = Number(choiceButton.dataset.choiceIndex);
    const answeredPlayer = challenge.player;

    if (selectedIndex === challenge.question.answer) {
      state = applyMove(state, challenge.tileIndex, answeredPlayer);
      setNote("noteCorrectClaim", {
        player: answeredPlayer,
        tileIndex: challenge.tileIndex,
        categoryId: challenge.categoryId
      });
      challenge = null;
      render();
      return;
    }

    const previousChallenge = challenge;
    handOffQuestionToNextPlayer(previousChallenge);
  });

  languageSelect.addEventListener("change", (event) => {
    currentLanguage = event.target.value === "ar" ? "ar" : "en";
    render();
  });

  playStyleSelect.addEventListener("change", (event) => {
    playStyle = event.target.value === "direct" ? "direct" : "questions";
    resetGame();
  });

  modeSelect.addEventListener("change", (event) => {
    gameMode = event.target.value === "bot" ? "bot" : "human";
    resetGame();
  });

  modeHumanButton.addEventListener("click", () => {
    if (gameMode === "human") {
      return;
    }
    gameMode = "human";
    resetGame();
  });

  modeBotButton.addEventListener("click", () => {
    if (gameMode === "bot") {
      return;
    }
    gameMode = "bot";
    resetGame();
  });

  playStyleQuestionsButton.addEventListener("click", () => {
    if (playStyle === "questions") {
      return;
    }
    playStyle = "questions";
    resetGame();
  });

  playStyleDirectButton.addEventListener("click", () => {
    if (playStyle === "direct") {
      return;
    }
    playStyle = "direct";
    resetGame();
  });

  botLevelSelect.addEventListener("change", (event) => {
    botLevel = ["easy", "medium", "hard"].includes(event.target.value) ? event.target.value : "medium";
    render();
  });

  levelEasyButton.addEventListener("click", () => {
    botLevel = "easy";
    render();
  });

  levelMediumButton.addEventListener("click", () => {
    botLevel = "medium";
    render();
  });

  levelHardButton.addEventListener("click", () => {
    botLevel = "hard";
    render();
  });

  resetButton.addEventListener("click", resetGame);
  setNote("noteLoadingSubjects");
  render();
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
    getNextPlayer
  };
}

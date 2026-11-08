import { StoryScene, VocabWord, QuizQuestion, ClozeItem, SentencePracticeItem, MoralQuestion } from '../types/story';

export const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    title: 'The Magical Iron Pillar',
    zhTitle: '如意金箍棒與東海龍宮',
    location: 'Dragon Palace (東海龍宮)',
    image: '/images/wukong_dragon_staff_1793961266221.jpg',
    imageAlt: 'Sun Wukong testing the magical glowing iron pillar in the underwater Dragon Palace',
    summary: 'Sun Wukong finds the legendary iron pillar in the Dragon Palace and commands it to shrink into a tiny pin inside his ear.',
    sentences: [
      {
        id: 's1-1',
        speaker: 'Narrator',
        en: 'Sun Wukong put his hand on the iron pillar. He felt it move.',
        annotated: 'Sun Wukong put his hand on the iron pillar (鐵柱). He felt it move.',
        zh: '孫悟空把手放在這根鐵柱上，他感覺到它在晃動。'
      },
      {
        id: 's1-2',
        speaker: 'Sun Wukong',
        en: '"Hmm," he thought. "This piece of iron really is magical. I bet it will do whatever I want it to do."',
        annotated: '"Hmm," he thought. "This piece of iron really is magical (有魔力的). I bet (我敢打賭) it will do whatever I want it to do."',
        zh: '「嗯，」他心想：「這塊鐵果然是神奇的寶物。我敢打賭，它能隨我的心意變換。」'
      },
      {
        id: 's1-3',
        speaker: 'Sun Wukong',
        en: '"Smaller!" commanded Wukong.',
        annotated: '"Smaller (變小)!" commanded (命令) Wukong.',
        zh: '「小！小！小！」悟空大聲命令道。'
      },
      {
        id: 's1-4',
        speaker: 'Narrator',
        en: 'The pillar shrank! Soon it was just a little taller than Wukong. He picked it up and swung it around.',
        annotated: 'The pillar shrank (縮小了)! Soon it was just a little taller than Wukong. He picked it up and swung (揮舞) it around.',
        zh: '那鐵柱真的縮小了！很快它就只比悟空高出一點點。他一把抓起並在空中隨意揮舞。'
      },
      {
        id: 's1-5',
        speaker: 'Sun Wukong',
        en: '"This is a perfect weapon for me," he said.',
        annotated: '"This is a perfect weapon (武器) for me," he said.',
        zh: '「這對我來說真是件完美的武器，」他說道。'
      },
      {
        id: 's1-6',
        speaker: 'Dragon Queen',
        en: '"I can\'t believe he can lift it!" said the Dragon Queen.',
        annotated: '"I can\'t believe he can lift (舉起) it!" said the Dragon Queen (龍后).',
        zh: '「我真不敢相信他竟然能拿得動它！」龍后驚呼。'
      },
      {
        id: 's1-7',
        speaker: 'Narrator',
        en: 'Wukong made the bar even smaller. Soon it was no bigger than a pin. He placed it inside his ear.',
        annotated: 'Wukong made the bar even smaller. Soon it was no bigger than a pin (大頭針). He placed it inside his ear (耳朵).',
        zh: '悟空讓鐵棒變得更小。很快它就變得像一根繡花針一樣細小。他把它輕輕放進了耳朵裡。'
      },
      {
        id: 's1-8',
        speaker: 'Sun Wukong',
        en: '"I\'ve got what I want," said Wukong. "Good-bye." He turned around and left.',
        annotated: '"I\'ve got what I want," said Wukong. "Good-bye." He turned around and left.',
        zh: '「我拿到我想要的東西了，」悟空說：「再見！」他轉身便走。'
      },
      {
        id: 's1-9',
        speaker: 'Dragon Queen',
        en: '"He was very rude," said the Dragon Queen.',
        annotated: '"He was very rude (無禮的 / 粗魯的)," said the Dragon Queen.',
        zh: '「他太沒禮貌了，」龍后抱怨道。'
      },
      {
        id: 's1-10',
        speaker: 'Dragon King',
        en: 'The Dragon King clenched his fists. "I\'m going to report him to the Jade Emperor!"',
        annotated: 'The Dragon King clenched his fists (緊握雙拳). "I\'m going to report (告狀 / 稟報) him to the Jade Emperor (玉皇大帝)!"',
        zh: '龍王氣得緊握拳頭：「我要去向玉皇大帝告發他！」'
      }
    ]
  },
  {
    id: 2,
    title: 'The Feast & The Underworld Spirits',
    zhTitle: '花果山盛宴與幽冥拘魂',
    location: 'Water Curtain Cave & Underworld Path (水簾洞與幽冥界入口)',
    image: '/images/wukong_darkness_gate_1793961268218.jpg',
    imageAlt: 'Sun Wukong being dragged to the dark and creepy gates of the Land of Darkness',
    summary: 'While celebrating at Flower Fruit Mountain, two ghostly spirits ambush sleeping Wukong and drag him to the spooky Land of Darkness.',
    sentences: [
      {
        id: 's2-1',
        speaker: 'Narrator',
        en: 'Back home, the others were amazed by Wukong\'s new weapon.',
        annotated: 'Back home, the others were amazed (感到驚嘆) by Wukong\'s new weapon (武器).',
        zh: '回到花果山老家，大家都對悟空的新武器感到驚嘆不已。'
      },
      {
        id: 's2-2',
        speaker: 'Sun Wukong',
        en: '"Nobody will ever attack us again!" declared Wukong.',
        annotated: '"Nobody will ever attack (攻擊) us again!" declared (宣告) Wukong.',
        zh: '「再也沒有人敢欺負攻擊我們了！」悟空豪氣宣告。'
      },
      {
        id: 's2-3',
        speaker: 'Narrator',
        en: 'The monkeys and apes cheered. They held a big feast that lasted until late at night.',
        annotated: 'The monkeys and apes cheered (歡呼). They held a big feast (盛宴) that lasted until late at night.',
        zh: '猴子和猿猴們熱烈歡呼。他們舉辦了一場盛大的宴會，一直狂歡到深夜。'
      },
      {
        id: 's2-4',
        speaker: 'Narrator',
        en: 'Wukong went to bed happy. But as he fell asleep, two spirits grabbed him.',
        annotated: 'Wukong went to bed happy. But as he fell asleep, two spirits (靈魂 / 鬼怪) grabbed (抓住) him.',
        zh: '悟空高興地入睡。但在他剛睡著之際，兩個鬼差突然抓住了他。'
      },
      {
        id: 's2-5',
        speaker: 'Sun Wukong',
        en: '"What are you doing?" asked Wukong. "Let go of me!"',
        annotated: '"What are you doing?" asked Wukong. "Let go of (放開) me!"',
        zh: '「你們在幹什麼？」悟空質問道：「快放開我！」'
      },
      {
        id: 's2-6',
        speaker: 'Narrator',
        en: 'He kicked and struggled as the spirits dragged him out of his cave. They walked toward a dark and creepy city. A sign on the entrance gate said "Land of Darkness."',
        annotated: 'He kicked and struggled (掙扎) as the spirits dragged (拖 / 拉) him out of his cave. They walked toward a dark and creepy (令人毛骨悚然的) city. A sign on the entrance gate (大門) said "Land of Darkness (幽冥界)".',
        zh: '悟空踢腿掙扎，但鬼差們硬是把他拖出了洞穴。他們走進了一座陰森恐怖的城池，城門上赫然寫著「幽冥界」。'
      },
      {
        id: 's2-7',
        speaker: 'Sun Wukong',
        en: '"The Land of Darkness?" cried Wukong. "That\'s where people go when they die. I\'m supposed to live forever!"',
        annotated: '"The Land of Darkness?" cried Wukong. "That\'s where people go when they die. I\'m supposed to (理應) live forever (長生不老)!"',
        zh: '「幽冥界？」悟空喊道：「那是人死後去的地方！我明明修成了長生不老！」'
      },
      {
        id: 's2-8',
        speaker: 'Sun Wukong',
        en: 'He yanked his arms free. "Grow!" he cried.',
        annotated: 'He yanked (猛拉) his arms free. "Grow (變大)!" he cried.',
        zh: '他猛地甩開手臂掙脫束縛。「長！」他大喝一聲。'
      },
      {
        id: 's2-9',
        speaker: 'Narrator',
        en: 'His iron bar quickly grew. Whap! He knocked out the first spirit. Crack! He knocked out the second spirit.',
        annotated: 'His iron bar quickly grew. Whap! He knocked out (擊倒) the first spirit. Crack! He knocked out the second spirit.',
        zh: '金箍棒瞬間變大！啪的一聲！他打倒了第一個鬼差。喀嚓一聲！又撂倒了第二個鬼差。'
      }
    ]
  },
  {
    id: 3,
    title: 'The Judge of the Dead',
    zhTitle: '大鬧森羅殿與崔判官',
    location: 'Palace of Darkness (幽冥殿 / 森羅殿)',
    image: '/images/wukong_judge_palace_1793961268677.jpg',
    imageAlt: 'Sun Wukong holding his staff and confronting the Judge of the Dead in the Underworld Palace',
    summary: 'Sun Wukong marches into the Underworld Palace and demands to know why he was summoned. The Judge opens the ancient Directory of life and death.',
    interactiveType: 'judge_directory',
    sentences: [
      {
        id: 's3-1',
        speaker: 'Narrator',
        en: 'Wukong stomped into the Land of Darkness. He headed toward the Palace of Darkness. As he went, he swung his iron bar back and forth. Demons and ghosts fled.',
        annotated: 'Wukong stomped (大步邁進) into the Land of Darkness. He headed toward the Palace of Darkness (森羅殿). As he went, he swung his iron bar back and forth. Demons (惡魔) and ghosts (鬼魂) fled (逃跑了).',
        zh: '悟空大步踏進幽冥界，直奔森羅寶殿。一路上他左右揮舞鐵棒，嚇得群魔小鬼紛紛倉皇逃跑。'
      },
      {
        id: 's3-2',
        speaker: 'Judge of the Dead',
        en: 'A tall spirit stepped out of the palace. "What\'s going on out here?" the spirit asked.',
        annotated: 'A tall spirit stepped out of the palace. "What\'s going on out here?" the spirit asked.',
        zh: '一位身形高大的鬼官走出宮殿：「外面到底發生了什麼事？」'
      },
      {
        id: 's3-3',
        speaker: 'Sun Wukong',
        en: '"Who are you?" asked Wukong.',
        annotated: '"Who are you?" asked Wukong.',
        zh: '「你是誰？」悟空質問道。'
      },
      {
        id: 's3-4',
        speaker: 'Judge of the Dead',
        en: '"I am the Judge of the Dead," said the spirit. "Why are you causing all this trouble?"',
        annotated: '"I am the Judge (審判官 / 判官) of the Dead," said the spirit. "Why are you causing all this trouble (製造麻煩)?"',
        zh: '「我是掌管生死的判官，」鬼官說：「你為何在這裡大吵大鬧製造麻煩？」'
      },
      {
        id: 's3-5',
        speaker: 'Sun Wukong',
        en: '"I want to know why I was brought here," said Wukong. "Tell me now!"',
        annotated: '"I want to know why I was brought (被帶來) here," said Wukong. "Tell me now!"',
        zh: '「我要知道你們憑什麼把我抓到這裡來，」悟空說：「快給我說清楚！」'
      },
      {
        id: 's3-6',
        speaker: 'Judge of the Dead',
        en: 'The judge held up his hands. "If you were brought here, it means your time on Earth is over."',
        annotated: 'The judge held up his hands. "If you were brought here, it means your time on Earth is over (陽壽已盡)."',
        zh: '判官舉起雙手說：「既然你被抓到這兒，就代表你在陽間的陽壽已盡。」'
      },
      {
        id: 's3-7',
        speaker: 'Sun Wukong',
        en: '"Nonsense!" yelled Wukong. "I\'m going to live forever!"',
        annotated: '"Nonsense (胡說八道)!" yelled Wukong. "I\'m going to live forever (長生不死)!"',
        zh: '「胡說八道！」悟空大喝：「我老孫早已超脫生死、與天同壽！」'
      },
      {
        id: 's3-8',
        speaker: 'Judge of the Dead',
        en: 'The judge looked nervous. "Let\'s check the Directory," he said. "The Directory contains the name and age of every creature on Earth. It says when each creature will die."',
        annotated: 'The judge looked nervous (神色緊張). "Let\'s check the Directory (生死簿 / 名錄)," he said. "The Directory contains the name and age of every creature (生物) on Earth. It says when each creature will die."',
        zh: '判官神情緊張：「讓我們來查查生死簿。生死簿上記載了世間所有生靈的姓名與年齡，寫明了各自何時命終。」'
      }
    ]
  },
  {
    id: 4,
    title: 'Crossing Out the Directory',
    zhTitle: '神毫勾銷生死簿，長生不老',
    location: 'Judge\'s Desk (森羅殿案台)',
    image: '/images/wukong_directory_brush_1793961269529.jpg',
    imageAlt: 'Sun Wukong playfully using a magical calligraphy ink brush to cross out names in the Directory of life and death',
    summary: 'Wukong reads his entry in the Directory, snatches the book, turns monkey hairs into an ink brush, and crosses out the names of all monkeys and apes!',
    interactiveType: 'cross_out',
    sentences: [
      {
        id: 's4-1',
        speaker: 'Narrator',
        en: 'Inside the palace the judge opened a large book. "What is your name?" he asked.',
        annotated: 'Inside the palace the judge opened a large book. "What is your name?" he asked.',
        zh: '宮殿內，判官翻開了一本巨大的簿冊。「你叫什麼名字？」他問。'
      },
      {
        id: 's4-2',
        speaker: 'Narrator',
        en: 'Wukong told him. The judge flipped through the pages.',
        annotated: 'Wukong told him. The judge flipped through (快速翻閱) the pages.',
        zh: '悟空告訴了他。判官急忙翻閱那一頁頁簿冊。'
      },
      {
        id: 's4-3',
        speaker: 'Judge of the Dead',
        en: '"Here it is," said the judge. "It says \'Sun Wukong. Born from a stone three hundred years ago. Died today.\'"',
        annotated: '"Here it is," said the judge. "It says \'Sun Wukong. Born from a stone (生於仙石) three hundred years ago. Died today (今日命終).\'"',
        zh: '「找到了，」判官說：「上面寫著：『孫悟空，三百年前產於仙石，今日本該壽終。』」'
      },
      {
        id: 's4-4',
        speaker: 'Sun Wukong',
        en: 'Wukong shook his head. "No. I\'m going to live forever."',
        annotated: 'Wukong shook his head (搖頭). "No. I\'m going to live forever."',
        zh: '悟空搖了搖頭：「絕不可能！我注定長生不死！」'
      },
      {
        id: 's4-5',
        speaker: 'Judge of the Dead',
        en: '"The Directory isn\'t wrong," said the judge. "You\'ll have to stay here now."',
        annotated: '"The Directory (生死簿) isn\'t wrong," said the judge. "You\'ll have to stay here now."',
        zh: '「生死簿是不會出錯的，」判官說：「你現在必須留在地府。」'
      },
      {
        id: 's4-6',
        speaker: 'Sun Wukong',
        en: 'Wukong raised his iron bar and glared at the judge. "Give me that book!"',
        annotated: 'Wukong raised his iron bar and glared (怒視) at the judge. "Give me that book!"',
        zh: '悟空高舉鐵棒，雙眼怒視判官：「把那本書交給我！」'
      },
      {
        id: 's4-7',
        speaker: 'Narrator',
        en: 'The judge hesitated. "I can\'t give it to—" "Now!" said Wukong.',
        annotated: 'The judge hesitated (猶豫不決). "I can\'t give it to—" "Now (立刻)!" said Wukong.',
        zh: '判官猶豫著：「我不能交給……」「立刻交出來！」悟空厲聲道。'
      },
      {
        id: 's4-8',
        speaker: 'Narrator',
        en: 'Shaking, the judge handed the book to Wukong.',
        annotated: 'Shaking (渾身發抖), the judge handed (遞給) the book to Wukong.',
        zh: '判官嚇得瑟瑟發抖，只得把生死簿雙手呈給悟空。'
      },
      {
        id: 's4-9',
        speaker: 'Narrator',
        en: 'Wukong plucked two of his hairs and blew on them. They turned into a brush and a jar of ink. He drew a line through his name.',
        annotated: 'Wukong plucked (拔下) two of his hairs and blew on them. They turned into a brush (毛筆) and a jar of ink (一罐墨汁). He drew a line through (劃掉) his name.',
        zh: '悟空隨手拔下兩根毫毛，吹了一口仙氣，瞬間化作一管毛筆和一罐濃墨。他提起筆一筆劃掉了自己的名字！'
      },
      {
        id: 's4-10',
        speaker: 'Judge of the Dead',
        en: '"You can\'t do that!" said the judge. "Yes, I can," said Wukong.',
        annotated: '"You can\'t do that!" said the judge. "Yes, I can," said Wukong.',
        zh: '「你不能這麼做啊！」判官急叫。「我偏要這麼做！」悟空回答。'
      },
      {
        id: 's4-11',
        speaker: 'Narrator',
        en: 'Next, Wukong found the names of all the other monkeys and apes. He crossed out their names too.',
        annotated: 'Next, Wukong found the names of all the other monkeys and apes. He crossed out (劃去) their names too.',
        zh: '緊接著，悟空翻到猴屬簿冊，把所有猴子和猿猴的名字全都一筆劃去。'
      },
      {
        id: 's4-12',
        speaker: 'Sun Wukong',
        en: '"Now I really will live forever," said Wukong. "And so will all of my subjects!"',
        annotated: '"Now I really will live forever," said Wukong. "And so will all of my subjects (臣民 / 子民)!"',
        zh: '「現在我真的可以長生不老了，」悟空笑道：「我所有的猴子猴孫臣民們也是！」'
      }
    ]
  }
];

export const VOCABULARY_LIST: VocabWord[] = [
  {
    id: 'shrink',
    word: 'shrink',
    zh: '縮小',
    phonetic: '/ʃrɪŋk/',
    partOfSpeech: 'verb (動詞)',
    pastForm: 'shrank',
    image: '/images/vocab_shrink_1793962627453.jpg',
    imageAlt: 'Sun Wukong shrinking the iron pillar',
    storyQuote: '"Smaller!" commanded Wukong. The pillar shrank!'
  },
  {
    id: 'command',
    word: 'command',
    zh: '命令',
    phonetic: '/kəˈmænd/',
    partOfSpeech: 'verb / noun (動詞 / 名詞)',
    pastForm: 'commanded',
    image: '/images/vocab_command_1793962628720.jpg',
    imageAlt: 'Sun Wukong giving a bold command',
    storyQuote: '"Smaller!" commanded Wukong.'
  },
  {
    id: 'weapon',
    word: 'weapon',
    zh: '武器',
    phonetic: '/ˈwep.ən/',
    partOfSpeech: 'noun (名詞)',
    image: '/images/vocab_weapon_1793962629177.jpg',
    imageAlt: 'The golden magical staff weapon',
    storyQuote: '"This is a perfect weapon for me," he said.'
  },
  {
    id: 'drag',
    word: 'drag',
    zh: '拖 / 拉',
    phonetic: '/dræɡ/',
    partOfSpeech: 'verb (動詞)',
    pastForm: 'dragged',
    image: '/images/vocab_drag_1793962630122.jpg',
    imageAlt: 'Underworld spirits dragging sleeping Wukong',
    storyQuote: 'He kicked and struggled as the spirits dragged him out of his cave.'
  },
  {
    id: 'spirit',
    word: 'spirit',
    zh: '靈魂 / 鬼怪',
    phonetic: '/ˈspɪr.ɪt/',
    partOfSpeech: 'noun (名詞)',
    image: '/images/vocab_spirit_1793962630424.jpg',
    imageAlt: 'A glowing cute underworld spirit',
    storyQuote: 'But as he fell asleep, two spirits grabbed him.'
  },
  {
    id: 'creepy',
    word: 'creepy',
    zh: '令人毛骨悚然的',
    phonetic: '/ˈkriː.pi/',
    partOfSpeech: 'adjective (形容詞)',
    image: '/images/vocab_creepy_1793962630120.jpg',
    imageAlt: 'The creepy gate of the Land of Darkness',
    storyQuote: 'They walked toward a dark and creepy city.'
  },
  {
    id: 'judge',
    word: 'judge',
    zh: '審判官 / 法官',
    phonetic: '/dʒʌdʒ/',
    partOfSpeech: 'noun / verb (名詞 / 動詞)',
    image: '/images/vocab_judge_1793962631798.jpg',
    imageAlt: 'The Judge of the Dead with the Directory',
    storyQuote: '"I am the Judge of the Dead," said the spirit.'
  },
  {
    id: 'flee',
    word: 'flee',
    zh: '逃跑',
    phonetic: '/fliː/',
    partOfSpeech: 'verb (動詞)',
    pastForm: 'fled',
    image: '/images/vocab_flee_1793962632996.jpg',
    imageAlt: 'Demons and ghosts fleeing in terror',
    storyQuote: 'As he went, he swung his iron bar back and forth. Demons and ghosts fled.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What happened to the iron pillar (鐵柱) when Sun Wukong said "Smaller!"?',
    options: [
      { key: 'A', text: 'It broke into two pieces (斷成兩截).' },
      { key: 'B', text: 'It sank (沉入) into the water.' },
      { key: 'C', text: 'It shrank (縮小) and became smaller.' },
      { key: 'D', text: 'It flew up into the sky.' }
    ],
    correctAnswer: 'C',
    explanation: 'When Wukong said "Smaller!", the magical pillar immediately shrank until it was just a little taller than him.',
    quote: '"Smaller!" commanded Wukong. The pillar shrank!'
  },
  {
    id: 2,
    question: 'Where did Sun Wukong keep the iron bar (鐵棒) after it became as small as a pin (大頭針)?',
    options: [
      { key: 'A', text: 'Inside his ear (耳朵).' },
      { key: 'B', text: 'In his pocket (口袋).' },
      { key: 'C', text: 'Under his bed.' },
      { key: 'D', text: 'In the Dragon King\'s palace (龍王宮殿).' }
    ],
    correctAnswer: 'A',
    explanation: 'Sun Wukong shrank the iron bar until it was no bigger than a pin and conveniently placed it inside his ear.',
    quote: 'Soon it was no bigger than a pin. He placed it inside his ear.'
  },
  {
    id: 3,
    question: 'When did the two spirits (鬼怪/幽靈) come to take Sun Wukong away?',
    options: [
      { key: 'A', text: 'While he was eating fruit.' },
      { key: 'B', text: 'As he fell asleep (睡著) in his cave (洞穴).' },
      { key: 'C', text: 'When he was swimming in the sea.' },
      { key: 'D', text: 'During the feast (宴會) with the monkeys.' }
    ],
    correctAnswer: 'B',
    explanation: 'After celebrating with a big feast until late at night, Wukong went to bed happy, and as he fell asleep, two spirits grabbed him.',
    quote: 'Wukong went to bed happy. But as he fell asleep, two spirits grabbed him.'
  },
  {
    id: 4,
    question: 'Who did Sun Wukong meet outside the Palace of Darkness (森羅殿/幽冥殿)?',
    options: [
      { key: 'A', text: 'The Dragon King (東海龍王).' },
      { key: 'B', text: 'The Jade Emperor (玉皇大帝).' },
      { key: 'C', text: 'The Judge of the Dead (地府判官).' },
      { key: 'D', text: 'A friendly monkey.' }
    ],
    correctAnswer: 'C',
    explanation: 'Outside the Palace of Darkness, a tall spirit stepped out and introduced himself as the Judge of the Dead.',
    quote: '"Who are you?" asked Wukong. "I am the Judge of the Dead," said the spirit.'
  },
  {
    id: 5,
    question: 'What did Sun Wukong do to the names in the Directory (生死簿)?',
    options: [
      { key: 'A', text: 'He read them out loud.' },
      { key: 'B', text: 'He crossed them out (劃掉) with ink (墨汁).' },
      { key: 'C', text: 'He gave the book back to the judge (判官).' },
      { key: 'D', text: 'He tore (撕碎) the book into pieces.' }
    ],
    correctAnswer: 'B',
    explanation: 'Wukong turned his magical hairs into a brush and ink, then crossed out his own name and all other monkeys\' and apes\' names.',
    quote: 'They turned into a brush and a jar of ink. He drew a line through his name... He crossed out their names too.'
  }
];

export const CLOZE_ITEMS: ClozeItem[] = [
  {
    id: 1,
    speaker: 'Wukong',
    template: 'The iron pillar began to {blank} until it was the perfect size.',
    targetWord: 'shrink',
    image: '/images/vocab_shrink_1793962627453.jpg',
    fullEn: 'Wukong: "Smaller!" The iron pillar began to shrink until it was the perfect size.'
  },
  {
    id: 2,
    speaker: 'Dragon Queen',
    template: 'Look at that! He can carry such a heavy {blank}!',
    targetWord: 'weapon',
    image: '/images/vocab_weapon_1793962629177.jpg',
    fullEn: 'Dragon Queen: Look at that! He can carry such a heavy weapon!'
  },
  {
    id: 3,
    speaker: 'Narrator',
    template: 'That night, two dark {blank} grabbed Wukong while he was in bed.',
    targetWord: 'spirits',
    image: '/images/vocab_spirit_1793962630424.jpg',
    fullEn: 'Narrator: That night, two dark spirits grabbed Wukong while he was in bed.'
  },
  {
    id: 4,
    speaker: 'Wukong',
    template: '"Let me go!" shouted Wukong, but they started to {blank} him out of the cave.',
    targetWord: 'drag',
    image: '/images/vocab_drag_1793962630122.jpg',
    fullEn: 'Wukong: "Let me go!" shouted Wukong, but they started to drag him out of the cave.'
  },
  {
    id: 5,
    speaker: 'Narrator',
    template: 'They arrived at a dark and {blank} city called the Land of Darkness.',
    targetWord: 'creepy',
    image: '/images/vocab_creepy_1793962630120.jpg',
    fullEn: 'Narrator: They arrived at a dark and creepy city called the Land of Darkness.'
  },
  {
    id: 6,
    speaker: 'Wukong',
    template: '"Grow!" Wukong gave a loud {blank}, and his iron bar quickly got bigger!',
    targetWord: 'command',
    image: '/images/vocab_command_1793962628720.jpg',
    fullEn: 'Wukong: "Grow!" Wukong gave a loud command, and his iron bar quickly got bigger!'
  },
  {
    id: 7,
    speaker: 'Narrator',
    template: 'As he swung the bar, demons became scared and began to {blank}.',
    targetWord: 'flee',
    image: '/images/vocab_flee_1793962632996.jpg',
    fullEn: 'Narrator: As he swung the bar, demons became scared and began to flee.'
  },
  {
    id: 8,
    speaker: 'Judge',
    template: 'Stop! I am the {blank} of the Dead. Why are you causing trouble here?',
    targetWord: 'judge',
    image: '/images/vocab_judge_1793962631798.jpg',
    fullEn: 'Judge: Stop! I am the Judge of the Dead. Why are you causing trouble here?'
  }
];

export const SENTENCE_PRACTICE_ITEMS: SentencePracticeItem[] = [
  {
    id: 1,
    patternNumber: 1,
    pattern: 'This [object] is too [adjective].',
    zh: '1. 這個武器太重了。',
    en: 'This weapon is too heavy.',
    scrambledWords: ['too', 'This', 'heavy.', 'weapon', 'is'],
    keyVocab: 'weapon'
  },
  {
    id: 2,
    patternNumber: 1,
    pattern: 'This [object] is too [adjective].',
    zh: '2. 這個地方太恐怖了 (creepy)。',
    en: 'This place is too creepy.',
    scrambledWords: ['place', 'This', 'creepy.', 'is', 'too'],
    keyVocab: 'creepy'
  },
  {
    id: 3,
    patternNumber: 2,
    pattern: 'I can [verb]...',
    zh: '3. 我可以命令這根鐵柱。',
    en: 'I can command this iron pillar.',
    scrambledWords: ['iron', 'command', 'can', 'pillar.', 'this', 'I'],
    keyVocab: 'command'
  },
  {
    id: 4,
    patternNumber: 2,
    pattern: 'I can [verb]...',
    zh: '4. 我可以把這個柱子縮小。',
    en: 'I can shrink this pillar.',
    scrambledWords: ['shrink', 'pillar.', 'this', 'can', 'I'],
    keyVocab: 'shrink'
  },
  {
    id: 5,
    patternNumber: 3,
    pattern: 'They try to [verb]...',
    zh: '5. 他們試圖拖走我。',
    en: 'They try to drag me.',
    scrambledWords: ['me.', 'try', 'They', 'to', 'drag'],
    keyVocab: 'drag'
  },
  {
    id: 6,
    patternNumber: 3,
    pattern: 'They try to [verb]...',
    zh: '6. 那些鬼怪試圖逃跑。',
    en: 'Those spirits try to flee.',
    scrambledWords: ['flee.', 'try', 'spirits', 'Those', 'to'],
    keyVocab: 'spirits, flee'
  },
  {
    id: 7,
    patternNumber: 4,
    pattern: 'Where is the...?',
    zh: '7. 那個審判官在哪裡？',
    en: 'Where is the judge?',
    scrambledWords: ['judge?', 'Where', 'the', 'is'],
    keyVocab: 'judge'
  },
  {
    id: 8,
    patternNumber: 4,
    pattern: 'Where is the...?',
    zh: '8. 那個靈魂在哪裡？',
    en: 'Where is the spirit?',
    scrambledWords: ['the', 'spirit?', 'Where', 'is'],
    keyVocab: 'spirit'
  },
  {
    id: 9,
    patternNumber: 5,
    pattern: 'It is a...',
    zh: '9. 這是一件神奇的武器。',
    en: 'It is a magical weapon.',
    scrambledWords: ['magical', 'a', 'weapon.', 'is', 'It'],
    keyVocab: 'weapon'
  },
  {
    id: 10,
    patternNumber: 5,
    pattern: 'It is a...',
    zh: '10. 這是一個令人毛骨悚然的城市。',
    en: 'It is a creepy city.',
    scrambledWords: ['city.', 'It', 'a', 'is', 'creepy'],
    keyVocab: 'creepy'
  }
];

export const MORAL_QUESTIONS: MoralQuestion[] = [
  {
    id: 1,
    title: 'Lesson 1: Strength and Rules',
    storyContext: 'Sun Wukong got a very strong weapon. But he was rude to the Dragon King and broke rules in the Underworld.',
    question: 'If you are very strong, can you break rules and be mean to others? Why or why not?',
    keyConcepts: [
      { word: 'Be kind', zh: '友善對人' },
      { word: 'Help others', zh: '幫助他人' },
      { word: 'Follow rules', zh: '遵守規則' },
      { word: 'Say sorry', zh: '懂得道歉' }
    ],
    sentenceStarters: [
      'No, being strong does not mean you can...',
      'Strong people should use their power to...',
      'It is good to be nice because...'
    ],
    sampleResponses: [
      {
        perspective: 'Be Kind to Others',
        textEn: 'No. Being strong does not give anyone the right to be mean or break rules. Strong people should protect and help weak people.'
      },
      {
        perspective: 'Make Friends, Not Enemies',
        textEn: 'When Wukong was rude, he made enemies and got in trouble. If we are polite and kind, people will like us and be our friends.'
      }
    ]
  },
  {
    id: 2,
    title: 'Lesson 2: Telling an Adult or Fighting Back?',
    storyContext: 'The Dragon King was upset when Wukong was rude. But he did not start a fight. He went to talk to the Jade Emperor.',
    question: 'When someone is mean or bullies you, is it better to tell a teacher/parent, or fight back? Why?',
    keyConcepts: [
      { word: 'Tell an adult', zh: '告訴師長' },
      { word: 'Stay calm', zh: '保持冷靜' },
      { word: 'No fighting', zh: '不要動手' },
      { word: 'Stay safe', zh: '安全第一' }
    ],
    sentenceStarters: [
      'I think it is better to tell a teacher because...',
      'Fighting back is bad because...',
      'When someone is mean, we should...'
    ],
    sampleResponses: [
      {
        perspective: 'Ask for Help',
        textEn: 'It is better to tell a teacher or parent. If you fight back with anger, you can get hurt. A teacher can stop the bully safely.'
      },
      {
        perspective: 'Stay Calm and Smart',
        textEn: 'The Dragon King was smart. He stayed calm and asked a higher leader for help. Fighting makes things worse.'
      }
    ]
  }
];

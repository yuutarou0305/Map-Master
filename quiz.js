const quiz = [
  // 地形
  {
    category: '地形',
    question: '長野県と隣接している県はどれ？（複数選択可）',
    choices: ['A. 新潟県', 'B. 群馬県', 'C. 山形県', 'D. 富山県', 'E. 岐阜県', 'F. 静岡県', 'G. 愛知県', 'H. 福井県'],
    answer: ['A', 'B', 'D', 'E', 'F', 'G'],
    multi: true
  },
  {
    category: '地形',
    question: '日本で一番面積が狭い県は？',
    choices: ['A. 香川県', 'B. 大阪府', 'C. 佐賀県', 'D. 沖縄県'],
    answer: ['A'],
    multi: false
  },
  {
    category: '地形',
    question: '日本で一番雪が多く降る県は？',
    choices: ['A. 北海道', 'B. 新潟県', 'C. 長野県', 'D. 山形県'],
    answer: ['B'],
    multi: false
  },
  // 県庁所在地
  {
    category: '県庁所在地',
    question: '山梨県の県庁所在地はどこ？',
    choices: ['A. 甲府市', 'B. 山梨市', 'C. 富士吉田市', 'D. 南アルプス市'],
    answer: ['A'],
    multi: false
  },
  {
    category: '県庁所在地',
    question: '秋田県の県庁所在地はどこ？',
    choices: ['A. 秋田市', 'B. 能代市', 'C. 横手市', 'D. 大館市'],
    answer: ['A'],
    multi: false
  },
  // 名産
  {
    category: '名産',
    question: '青森県の名産品はどれ？',
    choices: ['A. りんご', 'B. みかん', 'C. さくらんぼ', 'D. ぶどう'],
    answer: ['A'],
    multi: false
  },
  {
    category: '名産',
    question: '香川県のご当地グルメはどれ？',
    choices: ['A. 讃岐うどん', 'B. きしめん', 'C. もんじゃ焼き', 'D. ちゃんぽん'],
    answer: ['A'],
    multi: false
  },
  // 人口
  {
    category: '人口',
    question: '日本で人口が最も多い都道府県は？',
    choices: ['A. 大阪府', 'B. 神奈川県', 'C. 東京都', 'D. 愛知県'],
    answer: ['C'],
    multi: false
  },
  {
    category: '人口',
    question: '日本で人口が最も少ない都道府県は？',
    choices: ['A. 鳥取県', 'B. 島根県', 'C. 高知県', 'D. 徳島県'],
    answer: ['A'],
    multi: false
  },
  // 観光
  {
    category: '観光',
    question: '日本三景の一つ「天橋立」があるのはどこ？',
    choices: ['A. 京都府', 'B. 宮城県', 'C. 広島県', 'D. 福井県'],
    answer: ['A'],
    multi: false
  },
  {
    category: '観光',
    question: 'ねぶた祭りが有名なのはどこ？',
    choices: ['A. 秋田県', 'B. 青森県', 'C. 岩手県', 'D. 宮城県'],
    answer: ['B'],
    multi: false
  },
  // 方言
  {
    category: '方言',
    question: '「なんしよん？」はどこの方言？',
    choices: ['A. 福岡県', 'B. 香川県', 'C. 青森県', 'D. 沖縄県'],
    answer: ['B'],
    multi: false
  },
  {
    category: '方言',
    question: '「だっぺ」はどこの方言？',
    choices: ['A. 茨城県', 'B. 福島県', 'C. 青森県', 'D. 鹿児島県'],
    answer: ['A'],
    multi: false
  },
  // 歴史
  {
    category: '歴史',
    question: '戦国武将・伊達政宗にゆかりのある県は？',
    choices: ['A. 宮城県', 'B. 山形県', 'C. 福島県', 'D. 愛知県'],
    answer: ['A'],
    multi: false
  },
  {
    category: '歴史',
    question: '伝統工芸品・有田焼が有名なのは？',
    choices: ['A. 佐賀県', 'B. 岐阜県', 'C. 石川県', 'D. 愛知県'],
    answer: ['A'],
    multi: false
  },
  // 祭り
  {
    category: '祭り',
    question: 'ねぶた祭りが有名なのはどこ？',
    choices: ['A. 秋田県', 'B. 青森県', 'C. 岩手県', 'D. 宮城県'],
    answer: ['B'],
    multi: false
  },
  {
    category: '祭り',
    question: '阿波踊りで有名なのは？',
    choices: ['A. 徳島県', 'B. 香川県', 'C. 愛媛県', 'D. 高知県'],
    answer: ['A'],
    multi: false
  },
  // 気候
  {
    category: '気候',
    question: '日本で一番雪が多く降る県は？',
    choices: ['A. 北海道', 'B. 新潟県', 'C. 長野県', 'D. 山形県'],
    answer: ['B'],
    multi: false
  },
  {
    category: '気候',
    question: '梅雨入りが一番遅い県は？',
    choices: ['A. 北海道', 'B. 沖縄県', 'C. 青森県', 'D. 鹿児島県'],
    answer: ['A'],
    multi: false
  }
];

let score = 0;
let current = 0;
let selectedCategory = '';
let quizSet = [];

// 並べ替えパズルデータ（問題数増加）
const sortPuzzles = [
  {
    title: '都道府県の人口が多い順に並べ替えよ',
    type: '人口',
    items: [
      { name: '東京都', value: 14000000 },
      { name: '神奈川県', value: 9200000 },
      { name: '大阪府', value: 8800000 },
      { name: '愛知県', value: 7500000 },
      { name: '北海道', value: 5100000 }
    ]
  },
  {
    title: '都道府県の面積が広い順に並べ替えよ',
    type: '面積',
    items: [
      { name: '北海道', value: 83424 },
      { name: '岩手県', value: 15275 },
      { name: '福島県', value: 13784 },
      { name: '長野県', value: 13562 },
      { name: '新潟県', value: 12584 }
    ]
  },
  {
    title: '都道府県の人口が少ない順に並べ替えよ',
    type: '人口',
    items: [
      { name: '鳥取県', value: 550000 },
      { name: '島根県', value: 670000 },
      { name: '高知県', value: 690000 },
      { name: '徳島県', value: 720000 },
      { name: '福井県', value: 760000 }
    ]
  },
  {
    title: '都道府県の面積が小さい順に並べ替えよ',
    type: '面積',
    items: [
      { name: '香川県', value: 1876 },
      { name: '大阪府', value: 1905 },
      { name: '東京都', value: 2191 },
      { name: '沖縄県', value: 2281 },
      { name: '神奈川県', value: 2416 }
    ]
  },
  {
    title: '都道府県を東から西に並べ替えよ',
    type: '東西',
    items: [
      { name: '千葉県', value: 140.1 },
      { name: '新潟県', value: 138.9 },
      { name: '石川県', value: 136.6 },
      { name: '兵庫県', value: 135.2 },
      { name: '山口県', value: 131.5 }
    ]
  },
  {
    title: '都道府県を北から南に並べ替えよ',
    type: '南北',
    items: [
      { name: '北海道', value: 45.5 },
      { name: '青森県', value: 40.8 },
      { name: '東京都', value: 35.7 },
      { name: '和歌山県', value: 33.7 },
      { name: '鹿児島県', value: 31.6 }
    ]
  }
];

// 47都道府県北から南モード用データ
const allPrefNorthToSouth = [
  '北海道','青森県','岩手県','秋田県','宮城県','山形県','福島県','新潟県','栃木県','群馬県','茨城県','埼玉県','千葉県','東京都','神奈川県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'
];

let sortPuzzleScore = 0;
let sortPuzzleCurrent = 0;
let isAllPrefMode = false;
let allPrefList = [];

// タイムアタック用変数
let timeAttackScore = 0;
let timeAttackCurrent = 0;
let timeAttackQuizSet = [];
let timeAttackTimer = null;
let timeAttackTimeLeft = 60; // 60秒制限

// 地図パズル用都道府県データ（10県サンプル）
const mapPuzzlePieces = [
  { id: 'hokkaido', label: '北海道', x: 310, y: 90 },
  { id: 'aomori', label: '青森県', x: 280, y: 160 },
  { id: 'iwate', label: '岩手県', x: 260, y: 220 },
  { id: 'miyagi', label: '宮城県', x: 300, y: 250 },
  { id: 'akita', label: '秋田県', x: 220, y: 200 },
  { id: 'yamagata', label: '山形県', x: 240, y: 260 },
  { id: 'fukushima', label: '福島県', x: 280, y: 310 },
  { id: 'ibaraki', label: '茨城県', x: 340, y: 320 },
  { id: 'tochigi', label: '栃木県', x: 320, y: 290 },
  { id: 'gunma', label: '群馬県', x: 300, y: 270 }
];

function getCategories() {
  return [...new Set(quiz.map(q => q.category))];
}

// ボタン色カスタマイズ用デフォルト
const modeButtonColors = {
  quiz: '#4f8ef7',
  sort: '#4f8ef7',
  allsort: '#4f8ef7',
  timeattack: '#4f8ef7',
  customize: '#4f8ef7',
  map: '#4f8ef7'
};

// 色選択肢
const colorChoices = [
  { name: '青', value: '#4f8ef7' },
  { name: '緑', value: '#4CAF50' },
  { name: '紫', value: '#9C27B0' },
  { name: 'オレンジ', value: '#FF9800' },
  { name: '赤', value: '#F44336' }
];

// モード選択画面を表示
function showModeSelect() {
  const area = document.getElementById('main-area');
  const scoreArea = document.getElementById('score-area');
  if (scoreArea) scoreArea.textContent = '';
  area.innerHTML = `
    <div class="mode-btns">
      <button id="btn-quiz" style="background:${modeButtonColors.quiz}" onclick="startQuizMode()">クイズ</button>
      <button id="btn-sort" style="background:${modeButtonColors.sort}" onclick="startSortPuzzleMode()">並べ替えパズル</button>
      <button id="btn-allsort" style="background:${modeButtonColors.allsort}" onclick="startAllPrefSortMode()">全都道府県並べ替え</button>
      <button id="btn-timeattack" style="background:${modeButtonColors.timeattack}" onclick="startTimeAttackMode()">タイムアタック</button>
      <button id="btn-map" style="background:${modeButtonColors.map}" onclick="showMapPuzzleModeSelect()">地図パズル</button>
    </div>
  `;
}

function showMapPuzzleModeSelect() {
  const area = document.getElementById('main-area');
  area.innerHTML = `
    <h2>地図パズル モード選択</h2>
    <div class="mode-btns">
      <button onclick="startMapPuzzle(true)">名前あり</button>
      <button onclick="startMapPuzzle(false)">名前なし</button>
      <button onclick="backToModeSelect()">トップに戻る</button>
    </div>
  `;
}

function startMapPuzzle(showNames) {
  const area = document.getElementById('main-area');
  let placed = {};
  area.innerHTML = `
    <div class="puzzle-pieces" id="puzzle-pieces"></div>
    <svg id="japan-map" class="svg-map" width="400" height="400" viewBox="0 0 400 400">
      <g id="zone-hokkaido">
        <!-- 本物の北海道パス（例: 簡略化） -->
        <path class="dropzone" id="hokkaido" d="M 200 60 L 260 80 L 250 140 L 180 120 L 170 80 Z" />
        ${showNames ? '<text x="210" y="110" class="label">北海道</text>' : ''}
      </g>
      <g id="zone-aomori">
        <!-- 本物の青森パス（例: 簡略化） -->
        <path class="dropzone" id="aomori" d="M 180 120 L 250 140 L 240 180 L 170 170 L 160 140 Z" />
        ${showNames ? '<text x="190" y="150" class="label">青森</text>' : ''}
      </g>
      <g id="zone-iwate">
        <!-- 本物の岩手パス（例: 簡略化） -->
        <path class="dropzone" id="iwate" d="M 170 170 L 240 180 L 230 240 L 160 230 L 150 190 Z" />
        ${showNames ? '<text x="180" y="210" class="label">岩手</text>' : ''}
      </g>
    </svg>
    <button class="clear-btn" onclick="resetMapPuzzle()">リセット</button>
    <button class="clear-btn" onclick="showMapPuzzleModeSelect()">モード選択に戻る</button>
    <div id="puzzle-message" style="text-align:center;margin-top:16px;font-weight:bold;"></div>
  `;
  renderMapPuzzlePieces(placed);
  setupMapPuzzleDropzones(placed, showNames);
}

function renderMapPuzzlePieces(placed) {
  const area = document.getElementById('puzzle-pieces');
  area.innerHTML = '';
  mapPuzzlePieces.forEach(piece => {
    const btn = document.createElement('div');
    btn.className = 'piece' + (placed[piece.id] ? ' placed' : '');
    btn.textContent = piece.label;
    btn.setAttribute('draggable', !placed[piece.id]);
    btn.dataset.pieceId = piece.id;
    if (!placed[piece.id]) {
      btn.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', piece.id);
      });
    }
    area.appendChild(btn);
  });
}

function setupMapPuzzleDropzones(placed, showNames) {
  mapPuzzlePieces.forEach(piece => {
    const zone = document.getElementById(piece.id);
    zone.classList.remove('placed');
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      if (!placed[piece.id]) zone.classList.add('active');
    });
    zone.addEventListener('dragleave', e => {
      zone.classList.remove('active');
    });
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('active');
      const draggedId = e.dataTransfer.getData('text/plain');
      if (draggedId === piece.id && !placed[piece.id]) {
        placed[piece.id] = true;
        zone.classList.add('placed');
        renderMapPuzzlePieces(placed);
        setupMapPuzzleDropzones(placed, showNames);
        checkMapPuzzleClear(placed);
      }
    });
  });
}

function checkMapPuzzleClear(placed) {
  if (mapPuzzlePieces.every(p => placed[p.id])) {
    document.getElementById('puzzle-message').textContent = 'クリア！おめでとう！';
  } else {
    document.getElementById('puzzle-message').textContent = '';
  }
}

function resetMapPuzzle() {
  startMapPuzzle(document.querySelector('.svg-map text') !== null);
}

// クイズモード開始
function startQuizMode() { alert('クイズモード'); }

// 並べ替えパズルモード開始
function startSortPuzzleMode() { alert('並べ替えパズル'); }

let sortPuzzleOrder = [];

function renderSortPuzzle() {
  const area = document.getElementById('main-area');
  const scoreArea = document.getElementById('score-area');
  scoreArea.textContent = `スコア: ${sortPuzzleScore} / ${sortPuzzleOrder.length}`;
  if (sortPuzzleCurrent >= sortPuzzleOrder.length) {
    area.innerHTML = `<h2>パズル終了！</h2><p>あなたのスコアは <b>${sortPuzzleScore} / ${sortPuzzleOrder.length}</b> です。</p><button onclick="backToModeSelect()">トップに戻る</button>`;
    return;
  }
  const puzzle = sortPuzzles[sortPuzzleOrder[sortPuzzleCurrent]];
  let html = `<h2>${puzzle.title}</h2><ul id="sort-list" style="list-style:none;padding:0;">`;
  puzzle.items.forEach((item, idx) => {
    html += `<li data-idx="${idx}" style="margin:8px 0;">
      <span>${item.name}</span>
      <button onclick="moveUp(${idx})">↑</button>
      <button onclick="moveDown(${idx})">↓</button>
    </li>`;
  });
  html += '</ul>';
  html += '<button onclick="checkSortAnswer()">答え合わせ</button>';
  area.innerHTML = html;
}

function moveUp(idx) {
  if (isAllPrefMode) {
    if (idx === 0) return;
    [allPrefList[idx - 1], allPrefList[idx]] = [allPrefList[idx], allPrefList[idx - 1]];
    renderAllPrefSort();
    return;
  }
  const puzzle = sortPuzzles[sortPuzzleOrder[sortPuzzleCurrent]];
  if (idx === 0) return;
  [puzzle.items[idx - 1], puzzle.items[idx]] = [puzzle.items[idx], puzzle.items[idx - 1]];
  renderSortPuzzle();
}

function moveDown(idx) {
  if (isAllPrefMode) {
    if (idx === allPrefList.length - 1) return;
    [allPrefList[idx + 1], allPrefList[idx]] = [allPrefList[idx], allPrefList[idx + 1]];
    renderAllPrefSort();
    return;
  }
  const puzzle = sortPuzzles[sortPuzzleOrder[sortPuzzleCurrent]];
  if (idx === puzzle.items.length - 1) return;
  [puzzle.items[idx + 1], puzzle.items[idx]] = [puzzle.items[idx], puzzle.items[idx + 1]];
  renderSortPuzzle();
}

function checkSortAnswer() {
  if (isAllPrefMode) {
    const area = document.getElementById('main-area');
    const isCorrect = allPrefList.every((name, i) => name === allPrefNorthToSouth[i]);
    if (isCorrect) {
      area.innerHTML += '<div style="color:green;">正解！</div>';
    } else {
      area.innerHTML += '<div style="color:red;">不正解。正解は<br>' + allPrefNorthToSouth.join(' → ') + '</div>';
    }
    area.innerHTML += '<br><button onclick="backToModeSelect()">トップに戻る</button>';
    return;
  }
  const puzzle = sortPuzzles[sortPuzzleOrder[sortPuzzleCurrent]];
  const sorted = [...puzzle.items].sort((a, b) => b.value - a.value);
  const isCorrect = puzzle.items.every((item, i) => item.name === sorted[i].name);
  const area = document.getElementById('main-area');
  if (isCorrect) {
    sortPuzzleScore++;
    area.innerHTML += '<div style="color:green;">正解！</div>';
  } else {
    area.innerHTML += '<div style="color:red;">不正解。正解は<br>' + sorted.map(i => i.name).join(' → ') + '</div>';
  }
  sortPuzzleCurrent++;
  setTimeout(renderSortPuzzle, 1500);
}

function renderAllPrefSort() {
  const area = document.getElementById('main-area');
  const scoreArea = document.getElementById('score-area');
  scoreArea.textContent = '';
  let html = `<h2>北海道から沖縄まで北から南に並べてください</h2><ul id="sort-list" style="list-style:none;padding:0;max-height:400px;overflow:auto;">`;
  allPrefList.forEach((name, idx) => {
    html += `<li data-idx="${idx}" style="margin:4px 0;">
      <span>${name}</span>
      <button onclick="moveUp(${idx})">↑</button>
      <button onclick="moveDown(${idx})">↓</button>
    </li>`;
  });
  html += '</ul>';
  html += '<button onclick="checkSortAnswer()">答え合わせ</button>';
  area.innerHTML = html;
}

function renderTimeAttack() {
  const area = document.getElementById('main-area');
  const scoreArea = document.getElementById('score-area');
  scoreArea.textContent = `スコア: ${timeAttackScore} | 残り時間: ${timeAttackTimeLeft}秒`;
  
  if (timeAttackCurrent >= timeAttackQuizSet.length || timeAttackTimeLeft <= 0) {
    clearInterval(timeAttackTimer);
    area.innerHTML = `<h2>タイムアタック終了！</h2><p>あなたのスコアは <b>${timeAttackScore} / ${timeAttackQuizSet.length}</b> です。</p><button onclick="backToModeSelect()">トップに戻る</button>`;
    return;
  }
  
  const q = timeAttackQuizSet[timeAttackCurrent];
  let html = `<div><b>第${timeAttackCurrent + 1}問</b></div><div style="margin:8px 0 16px 0;">${q.question}</div><form id="time-attack-form">`;
  q.choices.forEach((choice, idx) => {
    const value = choice.split('.')[0];
    if (q.multi) {
      html += `<label><input type="checkbox" name="choice" value="${value}"> ${choice}</label><br>`;
    } else {
      html += `<label><input type="radio" name="choice" value="${value}"> ${choice}</label><br>`;
    }
  });
  html += `<button type="submit">回答</button></form><div id="time-attack-feedback"></div>`;
  area.innerHTML = html;
  
  document.getElementById('time-attack-form').onsubmit = function(e) {
    e.preventDefault();
    let userAns = [];
    if (q.multi) {
      document.querySelectorAll('input[name="choice"]:checked').forEach(el => userAns.push(el.value));
      userAns.sort();
      const ansArr = q.answer.slice().sort();
      const correct = JSON.stringify(userAns) === JSON.stringify(ansArr);
      showTimeAttackFeedback(correct, q.answer);
    } else {
      const checked = document.querySelector('input[name="choice"]:checked');
      if (!checked) return;
      userAns = [checked.value];
      const correct = q.answer.includes(userAns[0]);
      showTimeAttackFeedback(correct, q.answer);
    }
  };
}

function showTimeAttackFeedback(correct, answerArr) {
  const feedback = document.getElementById('time-attack-feedback');
  if (correct) {
    feedback.innerHTML = '<span style="color:green;">正解！</span>';
    timeAttackScore++;
  } else {
    feedback.innerHTML = `<span style="color:red;">不正解。正解は ${answerArr.join(', ')} です。</span>`;
  }
  feedback.innerHTML += '<br><button id="time-attack-next-btn">次へ</button>';
  document.getElementById('time-attack-next-btn').onclick = () => {
    timeAttackCurrent++;
    renderTimeAttack();
  };
  const btn = document.querySelector('#time-attack-form button[type="submit"]');
  if (btn) btn.disabled = true;
  document.querySelectorAll('input[name="choice"]').forEach(el => el.disabled = true);
}

function startTimeAttackTimer() {
  timeAttackTimer = setInterval(() => {
    timeAttackTimeLeft--;
    const scoreArea = document.getElementById('score-area');
    if (scoreArea) {
      scoreArea.textContent = `スコア: ${timeAttackScore} | 残り時間: ${timeAttackTimeLeft}秒`;
    }
    if (timeAttackTimeLeft <= 0) {
      clearInterval(timeAttackTimer);
      renderTimeAttack(); // 時間切れで終了画面を表示
    }
  }, 1000);
}

// 初期化
document.addEventListener('DOMContentLoaded', showModeSelect); 

// グローバル化
function startAllPrefSortMode() { alert('全都道府県並べ替え'); }
function startTimeAttackMode() { alert('タイムアタック'); }
function showMapPuzzleModeSelect() { alert('地図パズル'); }
function backToModeSelect() { alert('トップに戻る'); }
function startCustomizeMode() { alert('カスタマイズ'); } 
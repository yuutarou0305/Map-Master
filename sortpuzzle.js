// 並べ替えパズルデータ例
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
  }
];

let sortPuzzleScore = 0;
let sortPuzzleCurrent = 0;

function startSortPuzzleMode() {
  document.getElementById('mode-area').style.display = 'none';
  sortPuzzleScore = 0;
  sortPuzzleCurrent = 0;
  renderSortPuzzle();
}

function renderSortPuzzle() {
  const area = document.getElementById('main-area');
  const scoreArea = document.getElementById('score-area');
  scoreArea.textContent = `スコア: ${sortPuzzleScore} / ${sortPuzzles.length}`;
  if (sortPuzzleCurrent >= sortPuzzles.length) {
    area.innerHTML = `<h2>パズル終了！</h2><p>あなたのスコアは <b>${sortPuzzleScore} / ${sortPuzzles.length}</b> です。</p><button onclick="backToModeSelect()">トップに戻る</button>`;
    document.getElementById('mode-area').style.display = '';
    return;
  }
  const puzzle = sortPuzzles[sortPuzzleCurrent];
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
  const puzzle = sortPuzzles[sortPuzzleCurrent];
  if (idx === 0) return;
  [puzzle.items[idx - 1], puzzle.items[idx]] = [puzzle.items[idx], puzzle.items[idx - 1]];
  renderSortPuzzle();
}

function moveDown(idx) {
  const puzzle = sortPuzzles[sortPuzzleCurrent];
  if (idx === puzzle.items.length - 1) return;
  [puzzle.items[idx + 1], puzzle.items[idx]] = [puzzle.items[idx], puzzle.items[idx + 1]];
  renderSortPuzzle();
}

function checkSortAnswer() {
  const puzzle = sortPuzzles[sortPuzzleCurrent];
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

function backToModeSelect() {
  document.getElementById('main-area').innerHTML = '';
  document.getElementById('score-area').textContent = '';
  document.getElementById('mode-area').style.display = '';
} 
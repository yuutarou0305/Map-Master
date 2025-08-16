// Active Recall and Spaced Repetition Features

class ActiveRecallSystem {
  constructor() {
    this.currentMode = null;
    this.currentContent = null;
  }

  // Fill-in-the-blank mode
  createFillInBlank(text, blanks) {
    const words = text.split(' ');
    const blankIndices = this.selectRandomIndices(words.length, blanks);
    
    return {
      original: text,
      blankedText: words.map((word, i) => 
        blankIndices.includes(i) ? '_____' : word
      ).join(' '),
      answers: blankIndices.map(i => words[i]),
      indices: blankIndices
    };
  }

  selectRandomIndices(total, count) {
    const indices = [];
    while (indices.length < Math.min(count, total)) {
      const idx = Math.floor(Math.random() * total);
      if (!indices.includes(idx)) {
        indices.push(idx);
      }
    }
    return indices.sort((a, b) => a - b);
  }

  // Table hide mode
  createTableHideMode(tableData, hideColumn = 'random') {
    const columnToHide = hideColumn === 'random' 
      ? Math.floor(Math.random() * tableData[0].length)
      : hideColumn;
    
    return {
      original: tableData,
      hiddenColumn: columnToHide,
      displayData: tableData.map(row => 
        row.map((cell, i) => i === columnToHide ? '?' : cell)
      ),
      answers: tableData.map(row => row[columnToHide])
    };
  }

  // Checkbox hide mode
  createCheckboxMode(items, hidePercentage = 0.5) {
    const hideCount = Math.floor(items.length * hidePercentage);
    const hideIndices = this.selectRandomIndices(items.length, hideCount);
    
    return {
      items: items.map((item, i) => ({
        text: item,
        hidden: hideIndices.includes(i),
        revealed: false,
        correct: null
      }))
    };
  }

  // Step-by-step learning flow
  createStepLesson(topic) {
    return {
      id: Date.now().toString(),
      topic: topic,
      steps: [
        { type: 'explanation', completed: false },
        { type: 'example', completed: false },
        { type: 'practice', completed: false },
        { type: 'reflection', completed: false }
      ],
      currentStep: 0,
      startTime: Date.now()
    };
  }

  // Dual explanation mode
  createDualExplanation(topic, simpleText, technicalText) {
    return {
      topic: topic,
      simple: {
        text: simpleText,
        level: '小学生向け',
        icon: '🧒'
      },
      technical: {
        text: technicalText,
        level: '専門用語あり',
        icon: '🎓'
      },
      currentMode: 'simple'
    };
  }

  // Interactive quiz generation
  generateQuizFromContent(content, questionCount = 5) {
    // This would integrate with AI API in production
    // For now, we'll create template-based questions
    const questions = [];
    const templates = [
      { type: 'multiple_choice', template: '{topic}について正しいものは？' },
      { type: 'true_false', template: '{statement}は正しい？' },
      { type: 'fill_blank', template: '{topic}の{aspect}は____である' },
      { type: 'matching', template: '以下を正しく組み合わせてください' }
    ];
    
    // Mock quiz generation
    for (let i = 0; i < questionCount; i++) {
      const template = templates[Math.floor(Math.random() * templates.length)];
      questions.push({
        id: `q_${Date.now()}_${i}`,
        type: template.type,
        question: template.template,
        options: this.generateOptions(template.type),
        correctAnswer: 0,
        explanation: '解説がここに入ります'
      });
    }
    
    return questions;
  }

  generateOptions(type) {
    switch (type) {
      case 'multiple_choice':
        return ['選択肢A', '選択肢B', '選択肢C', '選択肢D'];
      case 'true_false':
        return ['正しい', '間違い'];
      case 'matching':
        return { left: ['項目1', '項目2'], right: ['説明A', '説明B'] };
      default:
        return [];
    }
  }

  // Error analysis
  analyzeErrors(answers) {
    const errorTypes = {
      calculation: '計算ミス',
      terminology: '用語の混同',
      reading: '読み落とし',
      concept: '概念の誤解',
      careless: 'ケアレスミス'
    };
    
    const analysis = {
      totalErrors: answers.filter(a => !a.correct).length,
      errorBreakdown: {},
      recommendations: []
    };
    
    // Analyze error patterns
    answers.forEach(answer => {
      if (!answer.correct) {
        // Simplified error categorization
        const errorType = this.categorizeError(answer);
        analysis.errorBreakdown[errorType] = (analysis.errorBreakdown[errorType] || 0) + 1;
      }
    });
    
    // Generate recommendations
    Object.entries(analysis.errorBreakdown).forEach(([type, count]) => {
      if (count > 2) {
        analysis.recommendations.push(this.getRecommendation(type));
      }
    });
    
    return analysis;
  }

  categorizeError(answer) {
    // Simplified categorization logic
    if (answer.userAnswer && answer.correctAnswer) {
      if (typeof answer.userAnswer === 'number') {
        return 'calculation';
      } else if (answer.timeTaken < 5) {
        return 'careless';
      } else if (answer.question.includes('とは')) {
        return 'terminology';
      }
    }
    return 'concept';
  }

  getRecommendation(errorType) {
    const recommendations = {
      calculation: '計算問題は段階を踏んで確認しましょう',
      terminology: '用語カードを作成して復習しましょう',
      reading: '問題文を2回読んでから回答しましょう',
      concept: '基礎概念を図解で理解し直しましょう',
      careless: 'もう少し時間をかけて慎重に回答しましょう'
    };
    
    return recommendations[errorType] || '基礎から復習することをお勧めします';
  }
}

// UI Components for Active Recall
class ActiveRecallUI {
  constructor() {
    this.system = new ActiveRecallSystem();
  }

  showFillInBlankMode(content) {
    const fillInData = this.system.createFillInBlank(content, 3);
    const mainArea = document.getElementById('main-area');
    
    mainArea.innerHTML = `
      <div class="active-recall-mode">
        <h2>穴埋め問題モード</h2>
        <div class="fill-in-blank">
          <p class="blanked-text">${fillInData.blankedText}</p>
          <div class="answer-inputs">
            ${fillInData.indices.map((_, i) => `
              <div class="answer-input">
                <label>空欄${i + 1}:</label>
                <input type="text" id="blank_${i}" class="blank-input">
              </div>
            `).join('')}
          </div>
          <button onclick="activeRecallUI.checkFillInAnswers()" class="check-btn">答え合わせ</button>
        </div>
        <div id="feedback" class="feedback"></div>
      </div>
    `;
    
    this.currentFillInData = fillInData;
  }

  checkFillInAnswers() {
    const feedback = document.getElementById('feedback');
    let correct = 0;
    
    this.currentFillInData.indices.forEach((_, i) => {
      const input = document.getElementById(`blank_${i}`);
      const userAnswer = input.value.trim();
      const correctAnswer = this.currentFillInData.answers[i];
      
      if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        input.style.backgroundColor = '#90EE90';
        correct++;
      } else {
        input.style.backgroundColor = '#FFB6C1';
      }
    });
    
    feedback.innerHTML = `
      <p>正解: ${correct}/${this.currentFillInData.answers.length}</p>
      <p>正答: ${this.currentFillInData.original}</p>
    `;
    
    // Log to learning data
    learningData.logStudySession('穴埋め問題', this.currentFillInData.answers.length, correct, 60);
  }

  showTableHideMode(tableData, headers) {
    const hideData = this.system.createTableHideMode(tableData);
    const mainArea = document.getElementById('main-area');
    
    mainArea.innerHTML = `
      <div class="active-recall-mode">
        <h2>表の隠しモード</h2>
        <div class="hide-table">
          <table class="recall-table">
            <thead>
              <tr>
                ${headers.map((h, i) => `<th ${i === hideData.hiddenColumn ? 'class="hidden-column"' : ''}>${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${hideData.displayData.map((row, rowIdx) => `
                <tr>
                  ${row.map((cell, colIdx) => `
                    <td ${colIdx === hideData.hiddenColumn ? 'class="hidden-cell"' : ''}>
                      ${colIdx === hideData.hiddenColumn 
                        ? `<input type="text" class="cell-input" data-row="${rowIdx}">`
                        : cell}
                    </td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
          <button onclick="activeRecallUI.checkTableAnswers()" class="check-btn">答え合わせ</button>
        </div>
        <div id="feedback" class="feedback"></div>
      </div>
    `;
    
    this.currentHideData = hideData;
  }

  checkTableAnswers() {
    const inputs = document.querySelectorAll('.cell-input');
    let correct = 0;
    
    inputs.forEach(input => {
      const rowIdx = parseInt(input.dataset.row);
      const userAnswer = input.value.trim();
      const correctAnswer = this.currentHideData.answers[rowIdx];
      
      if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        input.style.backgroundColor = '#90EE90';
        correct++;
      } else {
        input.style.backgroundColor = '#FFB6C1';
      }
    });
    
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = `正解: ${correct}/${this.currentHideData.answers.length}`;
  }

  showStepLearning(topic, content) {
    const lesson = this.system.createStepLesson(topic);
    this.currentLesson = lesson;
    
    this.updateStepDisplay();
  }

  updateStepDisplay() {
    const mainArea = document.getElementById('main-area');
    const step = this.currentLesson.steps[this.currentLesson.currentStep];
    
    let stepContent = '';
    switch (step.type) {
      case 'explanation':
        stepContent = `
          <h3>📖 説明</h3>
          <div class="explanation-content">
            ${this.getExplanationContent(this.currentLesson.topic)}
          </div>
        `;
        break;
      case 'example':
        stepContent = `
          <h3>💡 例題</h3>
          <div class="example-content">
            ${this.getExampleContent(this.currentLesson.topic)}
          </div>
        `;
        break;
      case 'practice':
        stepContent = `
          <h3>✏️ 演習</h3>
          <div class="practice-content">
            ${this.getPracticeContent(this.currentLesson.topic)}
          </div>
        `;
        break;
      case 'reflection':
        stepContent = `
          <h3>🤔 振り返り</h3>
          <div class="reflection-content">
            <p>今回の学習で理解できたこと、難しかった点を記録しましょう。</p>
            <textarea id="reflection-text" rows="4" placeholder="学習の振り返りを入力..."></textarea>
          </div>
        `;
        break;
    }
    
    mainArea.innerHTML = `
      <div class="step-learning">
        <h2>${this.currentLesson.topic}</h2>
        <div class="step-progress">
          ${this.currentLesson.steps.map((s, i) => `
            <div class="step-indicator ${i === this.currentLesson.currentStep ? 'active' : ''} ${s.completed ? 'completed' : ''}">
              ${i + 1}
            </div>
          `).join('')}
        </div>
        <div class="step-content">
          ${stepContent}
        </div>
        <div class="step-navigation">
          ${this.currentLesson.currentStep > 0 
            ? '<button onclick="activeRecallUI.previousStep()">前へ</button>' 
            : ''}
          <button onclick="activeRecallUI.nextStep()" class="primary-btn">
            ${this.currentLesson.currentStep < this.currentLesson.steps.length - 1 ? '次へ' : '完了'}
          </button>
        </div>
      </div>
    `;
  }

  nextStep() {
    this.currentLesson.steps[this.currentLesson.currentStep].completed = true;
    
    if (this.currentLesson.currentStep < this.currentLesson.steps.length - 1) {
      this.currentLesson.currentStep++;
      this.updateStepDisplay();
    } else {
      // Complete lesson
      const timeSpent = Date.now() - this.currentLesson.startTime;
      learningData.logStudySession(this.currentLesson.topic, 1, 1, timeSpent / 1000);
      alert('レッスン完了！お疲れ様でした。');
      learningUI.showDashboard();
    }
  }

  previousStep() {
    if (this.currentLesson.currentStep > 0) {
      this.currentLesson.currentStep--;
      this.updateStepDisplay();
    }
  }

  getExplanationContent(topic) {
    // In production, this would fetch from content database
    return `<p>${topic}についての詳しい説明がここに入ります。</p>`;
  }

  getExampleContent(topic) {
    return `<p>${topic}の具体例を見てみましょう。</p>`;
  }

  getPracticeContent(topic) {
    return `<p>${topic}に関する練習問題を解いてみましょう。</p>`;
  }

  showDualExplanation(topic, simpleText, technicalText) {
    const dualExplanation = this.system.createDualExplanation(topic, simpleText, technicalText);
    const mainArea = document.getElementById('main-area');
    
    mainArea.innerHTML = `
      <div class="dual-explanation">
        <h2>${topic}</h2>
        <div class="explanation-toggle">
          <button onclick="activeRecallUI.toggleExplanation('simple')" class="toggle-btn ${dualExplanation.currentMode === 'simple' ? 'active' : ''}">
            ${dualExplanation.simple.icon} ${dualExplanation.simple.level}
          </button>
          <button onclick="activeRecallUI.toggleExplanation('technical')" class="toggle-btn ${dualExplanation.currentMode === 'technical' ? 'active' : ''}">
            ${dualExplanation.technical.icon} ${dualExplanation.technical.level}
          </button>
        </div>
        <div class="explanation-content" id="explanation-content">
          ${dualExplanation[dualExplanation.currentMode].text}
        </div>
      </div>
    `;
    
    this.currentDualExplanation = dualExplanation;
  }

  toggleExplanation(mode) {
    this.currentDualExplanation.currentMode = mode;
    document.getElementById('explanation-content').innerHTML = 
      this.currentDualExplanation[mode].text;
    
    document.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');
  }
}

// Initialize Active Recall UI
const activeRecallUI = new ActiveRecallUI();
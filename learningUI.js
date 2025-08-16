// Learning UI Components

class LearningUI {
  constructor() {
    this.currentView = 'home';
    this.init();
  }

  init() {
    this.createDarkModeToggle();
    this.updateStreakDisplay();
    this.generateDailyMissions();
    this.checkDailyReset();
  }

  createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.id = 'dark-mode-toggle';
    toggle.innerHTML = '🌙';
    toggle.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1000; background: transparent; border: none; font-size: 1.5rem; cursor: pointer;';
    document.body.appendChild(toggle);

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      learningData.updateSettings({ darkMode: document.body.classList.contains('dark-mode') });
      toggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    if (learningData.data.user.settings.darkMode) {
      document.body.classList.add('dark-mode');
      toggle.innerHTML = '☀️';
    }
  }

  updateStreakDisplay() {
    const streakDisplay = document.getElementById('streak-display') || this.createStreakDisplay();
    const streak = learningData.data.streak.current;
    const fire = streak > 0 ? '🔥' : '❄️';
    
    streakDisplay.innerHTML = `
      <div class="streak-count">${fire} ${streak}日</div>
      <div class="streak-label">連続学習</div>
    `;
  }

  createStreakDisplay() {
    const display = document.createElement('div');
    display.id = 'streak-display';
    display.className = 'streak-display';
    document.querySelector('.container').prepend(display);
    return display;
  }

  generateDailyMissions() {
    const today = new Date().toDateString();
    const lastGenerated = localStorage.getItem('last_mission_date');
    
    if (lastGenerated !== today) {
      learningData.generateDailyMissions();
      localStorage.setItem('last_mission_date', today);
    }
  }

  checkDailyReset() {
    const today = new Date().toDateString();
    const lastStudy = learningData.data.streak.lastStudyDate;
    
    if (lastStudy && lastStudy !== today) {
      learningData.data.streak.todayCompleted = false;
      learningData.save();
    }
  }

  showDashboard() {
    const mainArea = document.getElementById('main-area');
    const weekStats = learningData.getWeeklyStats();
    
    mainArea.innerHTML = `
      <div class="dashboard">
        <h2>学習ダッシュボード</h2>
        
        <div class="stats-grid">
          <div class="stat-card">
            <h3>今週の学習</h3>
            <div class="stat-value">${weekStats.totalMinutes}分</div>
            <div class="stat-label">${weekStats.daysStudied}/7日</div>
          </div>
          
          <div class="stat-card">
            <h3>正答率</h3>
            <div class="stat-value">${weekStats.accuracy.toFixed(1)}%</div>
            <div class="stat-label">${weekStats.totalQuestions}問中</div>
          </div>
          
          <div class="stat-card">
            <h3>最長連続記録</h3>
            <div class="stat-value">${learningData.data.streak.longest}日</div>
            <div class="stat-label">ベスト記録</div>
          </div>
        </div>
        
        <div class="daily-missions">
          <h3>今日のミッション</h3>
          ${this.renderDailyMissions()}
        </div>
        
        <div class="heatmap-container">
          <h3>学習カレンダー</h3>
          <div id="heatmap"></div>
        </div>
        
        <div class="progress-overview">
          <h3>カテゴリー別進捗</h3>
          ${this.renderCategoryProgress()}
        </div>
        
        <div class="review-reminder">
          <h3>復習待ちアイテム</h3>
          <div class="review-count">${learningData.getReviewItems().length}個</div>
          <button onclick="learningUI.startReview()" class="review-btn">復習を始める</button>
        </div>
      </div>
    `;
    
    this.renderHeatmap();
  }

  renderDailyMissions() {
    const missions = learningData.data.dailyMissions;
    
    return missions.map(mission => `
      <div class="mission-item ${mission.completed ? 'completed' : ''}">
        <div class="mission-desc">${mission.description}</div>
        <div class="mission-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${(mission.progress / mission.target) * 100}%"></div>
          </div>
          <span>${mission.progress}/${mission.target}</span>
        </div>
      </div>
    `).join('');
  }

  renderCategoryProgress() {
    const categories = Object.entries(learningData.data.progress.categoriesProgress);
    
    if (categories.length === 0) {
      return '<p class="no-data">まだ学習データがありません</p>';
    }
    
    return categories.map(([category, progress]) => `
      <div class="category-progress">
        <div class="category-name">${category}</div>
        <div class="mastery-bar">
          <div class="mastery-fill" style="width: ${progress.mastery}%"></div>
        </div>
        <div class="category-stats">
          習熟度: ${progress.mastery}% | 正答率: ${progress.totalQuestions > 0 ? ((progress.correctAnswers / progress.totalQuestions) * 100).toFixed(1) : 0}%
        </div>
      </div>
    `).join('');
  }

  renderHeatmap() {
    const heatmapData = learningData.getHeatmapData();
    const container = document.getElementById('heatmap');
    if (!container) return;
    
    const weeks = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);
    
    // Group by weeks
    let currentWeek = [];
    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const minutes = heatmapData[dateStr] || 0;
      
      currentWeek.push({
        date: dateStr,
        minutes: minutes,
        day: date.getDay()
      });
      
      if (date.getDay() === 6 || i === 364) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    
    const heatmapHTML = `
      <div class="heatmap-grid">
        ${weeks.map(week => `
          <div class="heatmap-week">
            ${week.map(day => `
              <div class="heatmap-day" 
                   data-date="${day.date}" 
                   data-minutes="${day.minutes}"
                   style="background-color: ${this.getHeatmapColor(day.minutes)}"
                   title="${day.date}: ${day.minutes}分">
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
      <div class="heatmap-legend">
        <span>少</span>
        <div class="legend-colors">
          <div style="background: #ebedf0"></div>
          <div style="background: #c6e48b"></div>
          <div style="background: #7bc96f"></div>
          <div style="background: #239a3b"></div>
          <div style="background: #196127"></div>
        </div>
        <span>多</span>
      </div>
    `;
    
    container.innerHTML = heatmapHTML;
  }

  getHeatmapColor(minutes) {
    if (minutes === 0) return '#ebedf0';
    if (minutes < 15) return '#c6e48b';
    if (minutes < 30) return '#7bc96f';
    if (minutes < 60) return '#239a3b';
    return '#196127';
  }

  startReview() {
    const reviewItems = learningData.getReviewItems();
    if (reviewItems.length === 0) {
      alert('復習するアイテムがありません！');
      return;
    }
    
    this.currentReviewIndex = 0;
    this.reviewItems = reviewItems;
    this.showReviewCard();
  }

  showReviewCard() {
    const item = this.reviewItems[this.currentReviewIndex];
    const mainArea = document.getElementById('main-area');
    
    mainArea.innerHTML = `
      <div class="review-session">
        <div class="review-progress">
          復習: ${this.currentReviewIndex + 1} / ${this.reviewItems.length}
        </div>
        
        <div class="review-card">
          <div class="card-front">
            <h3>${item.content.question}</h3>
            <button onclick="learningUI.flipCard()" class="flip-btn">答えを見る</button>
          </div>
          
          <div class="card-back" style="display: none;">
            <h3>${item.content.answer}</h3>
            <div class="review-buttons">
              <button onclick="learningUI.reviewResponse(false)" class="wrong-btn">間違えた</button>
              <button onclick="learningUI.reviewResponse(true)" class="correct-btn">正解した</button>
            </div>
          </div>
        </div>
        
        <button onclick="learningUI.endReview()" class="end-review-btn">復習を終了</button>
      </div>
    `;
  }

  flipCard() {
    document.querySelector('.card-front').style.display = 'none';
    document.querySelector('.card-back').style.display = 'block';
  }

  reviewResponse(correct) {
    const item = this.reviewItems[this.currentReviewIndex];
    learningData.updateReviewItem(item.id, correct);
    
    this.currentReviewIndex++;
    if (this.currentReviewIndex < this.reviewItems.length) {
      this.showReviewCard();
    } else {
      this.endReview();
    }
  }

  endReview() {
    alert(`復習完了！ ${this.reviewItems.length}個のアイテムを復習しました。`);
    this.showDashboard();
  }

  showBadges() {
    const mainArea = document.getElementById('main-area');
    const badges = learningData.data.badges;
    
    mainArea.innerHTML = `
      <div class="badges-view">
        <h2>獲得バッジ</h2>
        <div class="badges-grid">
          ${badges.length > 0 ? badges.map(badge => `
            <div class="badge-item">
              <div class="badge-icon">${badge.icon}</div>
              <div class="badge-name">${badge.name}</div>
              <div class="badge-desc">${badge.description}</div>
              <div class="badge-date">${new Date(badge.earnedAt).toLocaleDateString()}</div>
            </div>
          `).join('') : '<p class="no-badges">まだバッジを獲得していません</p>'}
        </div>
        
        <h3>獲得可能なバッジ</h3>
        <div class="available-badges">
          <div class="badge-preview">
            <span>🔥</span> 連続学習バッジ (3, 7, 14, 30, 60, 100, 365日)
          </div>
          <div class="badge-preview">
            <span>⭐</span> デイリーミッション達成
          </div>
          <div class="badge-preview">
            <span>🏆</span> カテゴリーマスター
          </div>
        </div>
      </div>
    `;
  }

  showSettings() {
    const mainArea = document.getElementById('main-area');
    const settings = learningData.data.user.settings;
    
    mainArea.innerHTML = `
      <div class="settings-view">
        <h2>設定</h2>
        
        <div class="setting-item">
          <label>1日の学習目標（分）</label>
          <input type="number" id="daily-goal" value="${settings.dailyGoalMinutes}" min="5" max="180">
        </div>
        
        <div class="setting-item">
          <label>週の学習目標（単元）</label>
          <input type="number" id="weekly-goal" value="${settings.weeklyGoalUnits}" min="1" max="20">
        </div>
        
        <div class="setting-item">
          <label>通知を有効にする</label>
          <input type="checkbox" id="notifications" ${settings.notificationsEnabled ? 'checked' : ''}>
        </div>
        
        <div class="setting-item">
          <label>効果音を有効にする</label>
          <input type="checkbox" id="sound" ${settings.soundEnabled ? 'checked' : ''}>
        </div>
        
        <div class="setting-item">
          <label>文字サイズ</label>
          <select id="font-size">
            <option value="small" ${settings.fontSize === 'small' ? 'selected' : ''}>小</option>
            <option value="medium" ${settings.fontSize === 'medium' ? 'selected' : ''}>中</option>
            <option value="large" ${settings.fontSize === 'large' ? 'selected' : ''}>大</option>
          </select>
        </div>
        
        <button onclick="learningUI.saveSettings()" class="save-settings-btn">設定を保存</button>
        
        <div class="danger-zone">
          <h3>データ管理</h3>
          <button onclick="learningData.resetProgress()" class="reset-btn">すべてのデータをリセット</button>
        </div>
      </div>
    `;
  }

  saveSettings() {
    const newSettings = {
      dailyGoalMinutes: parseInt(document.getElementById('daily-goal').value),
      weeklyGoalUnits: parseInt(document.getElementById('weekly-goal').value),
      notificationsEnabled: document.getElementById('notifications').checked,
      soundEnabled: document.getElementById('sound').checked,
      fontSize: document.getElementById('font-size').value
    };
    
    learningData.updateSettings(newSettings);
    document.body.className = `font-${newSettings.fontSize}`;
    alert('設定を保存しました！');
  }
}

// Initialize UI
const learningUI = new LearningUI();

// Badge notification handler
learningData.onBadgeEarned = (badge) => {
  const notification = document.createElement('div');
  notification.className = 'badge-notification';
  notification.innerHTML = `
    <div class="badge-earned">
      <div class="badge-icon">${badge.icon}</div>
      <div class="badge-text">
        <strong>バッジ獲得！</strong>
        <p>${badge.name}</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 100);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
};
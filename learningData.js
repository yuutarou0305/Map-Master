// Learning Data Management System
// Uses localStorage for persistence

class LearningDataManager {
  constructor() {
    this.STORAGE_KEY = 'jp_geography_learning_data';
    this.loadData();
  }

  loadData() {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    if (savedData) {
      this.data = JSON.parse(savedData);
    } else {
      this.data = this.getDefaultData();
    }
  }

  getDefaultData() {
    return {
      user: {
        id: this.generateUserId(),
        createdAt: new Date().toISOString(),
        settings: {
          dailyGoalMinutes: 30,
          weeklyGoalUnits: 5,
          notificationsEnabled: false,
          darkMode: false,
          fontSize: 'medium',
          soundEnabled: true
        }
      },
      streak: {
        current: 0,
        longest: 0,
        lastStudyDate: null,
        todayCompleted: false
      },
      progress: {
        totalMinutes: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        categoriesProgress: {},
        unitsCompleted: 0
      },
      dailyMissions: [],
      reviewQueue: [],
      flashcards: [],
      studyLogs: [],
      badges: []
    };
  }

  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  }

  save() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
  }

  // Streak Management
  updateStreak() {
    const today = new Date().toDateString();
    const lastStudy = this.data.streak.lastStudyDate;
    
    if (lastStudy) {
      const lastDate = new Date(lastStudy);
      const daysDiff = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 0) {
        // Already studied today
        return;
      } else if (daysDiff === 1) {
        // Consecutive day
        this.data.streak.current++;
        if (this.data.streak.current > this.data.streak.longest) {
          this.data.streak.longest = this.data.streak.current;
        }
      } else {
        // Streak broken
        this.data.streak.current = 1;
      }
    } else {
      // First time studying
      this.data.streak.current = 1;
      this.data.streak.longest = 1;
    }
    
    this.data.streak.lastStudyDate = today;
    this.data.streak.todayCompleted = true;
    this.checkStreakBadges();
    this.save();
  }

  // Badge System
  checkStreakBadges() {
    const streakMilestones = [3, 7, 14, 30, 60, 100, 365];
    const current = this.data.streak.current;
    
    streakMilestones.forEach(milestone => {
      if (current >= milestone && !this.hasBadge(`streak_${milestone}`)) {
        this.awardBadge({
          id: `streak_${milestone}`,
          name: `${milestone}日連続達成！`,
          description: `${milestone}日連続で学習を続けました`,
          icon: '🔥',
          earnedAt: new Date().toISOString()
        });
      }
    });
  }

  hasBadge(badgeId) {
    return this.data.badges.some(badge => badge.id === badgeId);
  }

  awardBadge(badge) {
    this.data.badges.push(badge);
    this.save();
    // Trigger notification
    if (this.onBadgeEarned) {
      this.onBadgeEarned(badge);
    }
  }

  // Daily Mission System
  generateDailyMissions() {
    const missions = [
      { id: 'quiz_5', type: 'quiz', target: 5, description: 'クイズを5問解く', completed: false, progress: 0 },
      { id: 'time_15', type: 'time', target: 15, description: '15分間学習する', completed: false, progress: 0 },
      { id: 'category_1', type: 'category', target: 1, description: '新しいカテゴリーを1つクリアする', completed: false, progress: 0 }
    ];
    
    // Add review mission if there are items in review queue
    if (this.data.reviewQueue.length > 0) {
      missions.push({
        id: 'review_3',
        type: 'review',
        target: Math.min(3, this.data.reviewQueue.length),
        description: `復習カードを${Math.min(3, this.data.reviewQueue.length)}枚クリアする`,
        completed: false,
        progress: 0
      });
    }
    
    this.data.dailyMissions = missions;
    this.save();
  }

  updateMissionProgress(type, amount = 1) {
    const mission = this.data.dailyMissions.find(m => m.type === type && !m.completed);
    if (mission) {
      mission.progress += amount;
      if (mission.progress >= mission.target) {
        mission.completed = true;
        mission.progress = mission.target;
        this.checkDailyMissionBadges();
      }
      this.save();
    }
  }

  checkDailyMissionBadges() {
    const completedToday = this.data.dailyMissions.filter(m => m.completed).length;
    const totalMissions = this.data.dailyMissions.length;
    
    if (completedToday === totalMissions && !this.hasBadge('daily_complete')) {
      this.awardBadge({
        id: 'daily_complete',
        name: 'デイリーミッション達成！',
        description: '1日のミッションをすべて完了しました',
        icon: '⭐',
        earnedAt: new Date().toISOString()
      });
    }
  }

  // Progress Tracking
  logStudySession(category, questions, correct, timeSpent) {
    const session = {
      id: Date.now().toString(),
      category,
      questions,
      correct,
      accuracy: questions > 0 ? (correct / questions) * 100 : 0,
      timeSpent,
      timestamp: new Date().toISOString()
    };
    
    this.data.studyLogs.push(session);
    this.data.progress.totalMinutes += Math.floor(timeSpent / 60);
    this.data.progress.totalQuestions += questions;
    this.data.progress.correctAnswers += correct;
    
    // Update category progress
    if (!this.data.progress.categoriesProgress[category]) {
      this.data.progress.categoriesProgress[category] = {
        totalQuestions: 0,
        correctAnswers: 0,
        studyTime: 0,
        lastStudied: null,
        mastery: 0
      };
    }
    
    const catProgress = this.data.progress.categoriesProgress[category];
    catProgress.totalQuestions += questions;
    catProgress.correctAnswers += correct;
    catProgress.studyTime += timeSpent;
    catProgress.lastStudied = new Date().toISOString();
    catProgress.mastery = this.calculateMastery(catProgress);
    
    this.updateStreak();
    this.updateMissionProgress('quiz', questions);
    this.updateMissionProgress('time', Math.floor(timeSpent / 60));
    
    this.save();
  }

  calculateMastery(categoryProgress) {
    if (categoryProgress.totalQuestions < 5) return 0;
    const accuracy = categoryProgress.correctAnswers / categoryProgress.totalQuestions;
    const practiceBonus = Math.min(categoryProgress.totalQuestions / 50, 1);
    return Math.floor((accuracy * 0.7 + practiceBonus * 0.3) * 100);
  }

  // Spaced Repetition System
  addToReviewQueue(item) {
    const reviewItem = {
      id: Date.now().toString(),
      content: item,
      level: 0, // 0: new, 1-5: increasing intervals
      nextReviewDate: this.calculateNextReviewDate(0),
      createdAt: new Date().toISOString(),
      lastReviewed: null,
      reviewCount: 0,
      correctCount: 0
    };
    
    this.data.reviewQueue.push(reviewItem);
    this.save();
  }

  calculateNextReviewDate(level) {
    const intervals = [1, 3, 7, 14, 30, 90]; // days
    const intervalDays = intervals[Math.min(level, intervals.length - 1)];
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + intervalDays);
    return nextDate.toISOString();
  }

  getReviewItems() {
    const today = new Date();
    return this.data.reviewQueue.filter(item => {
      const reviewDate = new Date(item.nextReviewDate);
      return reviewDate <= today;
    });
  }

  updateReviewItem(itemId, correct) {
    const item = this.data.reviewQueue.find(i => i.id === itemId);
    if (item) {
      item.reviewCount++;
      item.lastReviewed = new Date().toISOString();
      
      if (correct) {
        item.correctCount++;
        item.level = Math.min(item.level + 1, 5);
      } else {
        item.level = Math.max(0, item.level - 1);
      }
      
      item.nextReviewDate = this.calculateNextReviewDate(item.level);
      this.updateMissionProgress('review', 1);
      this.save();
    }
  }

  // Heatmap Data
  getHeatmapData() {
    const heatmap = {};
    const today = new Date();
    
    // Initialize last 365 days
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      heatmap[dateStr] = 0;
    }
    
    // Fill with actual study data
    this.data.studyLogs.forEach(log => {
      const dateStr = log.timestamp.split('T')[0];
      if (heatmap[dateStr] !== undefined) {
        heatmap[dateStr] += Math.floor(log.timeSpent / 60);
      }
    });
    
    return heatmap;
  }

  // Weekly Stats
  getWeeklyStats() {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 6);
    
    const weekLogs = this.data.studyLogs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate >= weekStart && logDate <= today;
    });
    
    const stats = {
      totalMinutes: 0,
      totalQuestions: 0,
      accuracy: 0,
      daysStudied: new Set(),
      byDay: {}
    };
    
    // Initialize days
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      stats.byDay[dateStr] = { minutes: 0, questions: 0, correct: 0 };
    }
    
    weekLogs.forEach(log => {
      const dateStr = log.timestamp.split('T')[0];
      const minutes = Math.floor(log.timeSpent / 60);
      
      stats.totalMinutes += minutes;
      stats.totalQuestions += log.questions;
      stats.daysStudied.add(dateStr);
      
      if (stats.byDay[dateStr]) {
        stats.byDay[dateStr].minutes += minutes;
        stats.byDay[dateStr].questions += log.questions;
        stats.byDay[dateStr].correct += log.correct;
      }
    });
    
    if (stats.totalQuestions > 0) {
      const totalCorrect = weekLogs.reduce((sum, log) => sum + log.correct, 0);
      stats.accuracy = (totalCorrect / stats.totalQuestions) * 100;
    }
    
    stats.daysStudied = stats.daysStudied.size;
    
    return stats;
  }

  // Settings
  updateSettings(newSettings) {
    this.data.user.settings = { ...this.data.user.settings, ...newSettings };
    this.save();
  }

  resetProgress() {
    if (confirm('本当にすべての学習データをリセットしますか？この操作は取り消せません。')) {
      this.data = this.getDefaultData();
      this.save();
      location.reload();
    }
  }
}

// Export for use in other modules
const learningData = new LearningDataManager();
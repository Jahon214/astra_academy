export type UserRole = 'student' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  role: UserRole;
  coins: number;
  xp: number;
  level: number;
  streak: number;
  telegram_username?: string;
  telegram_id?: number;
  phone?: string;
  is_telegram_user?: boolean;
  last_active_date?: string;
  created_at: string;
}

export type CourseDifficulty = 'Boshlang\'ich' | 'O\'rta' | 'Murakkab';

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail_url: string;
  difficulty: CourseDifficulty;
  category: string;
  is_published: boolean;
  total_lessons: number;
  order_index: number;
  modules?: CourseModule[];
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  order_index: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  course_id: string;
  title: string;
  description: string;
  youtube_video_id: string;
  duration_minutes: number;
  coin_reward: number;
  xp_reward: number;
  order_index: number;
  guide_content?: string;
  quiz_id?: string;
  is_published?: boolean;
  is_completed?: boolean;
}

export interface Guide {
  id: string;
  slug: string;
  category: 'HTML' | 'CSS' | 'JavaScript';
  title: string;
  description?: string;
  content_markdown: string;
  order_index: number;
}

export interface QuizOption {
  id: string;
  text: string;
  is_correct: boolean;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  explanation: string;
  options: QuizOption[];
}

export interface Quiz {
  id: string;
  lesson_id?: string;
  course_id?: string;
  title: string;
  description?: string;
  coin_reward: number;
  xp_reward: number;
  passing_score_percentage: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  total_questions: number;
  percentage: number;
  is_passed: boolean;
  created_at: string;
}

export interface PracticalTask {
  id: string;
  lesson_id?: string;
  title: string;
  description: string;
  requirements: string[];
  starter_code: string;
  difficulty: CourseDifficulty;
  coin_reward: number;
  xp_reward: number;
  is_completed?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: CourseDifficulty;
  technologies: string[];
  requirements: string[];
  youtube_tutorial_id?: string;
  starter_files_url?: string;
  coin_reward: number;
  xp_reward: number;
  is_completed?: boolean;
  github_url?: string;
  live_url?: string;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  requirement_count: number;
  current_count: number;
  reward_coins: number;
  reward_xp: number;
  is_unlocked: boolean;
}

export interface CoinTransaction {
  id: string;
  user_id: string;
  amount: number;
  category: 'lesson' | 'quiz' | 'task' | 'project' | 'streak' | 'bonus';
  description: string;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'reward' | 'course' | 'achievement';
  is_read: boolean;
  created_at: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar_url?: string;
  xp: number;
  coins: number;
  level: number;
  rank: number;
}

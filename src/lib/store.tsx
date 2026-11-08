'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Course,
  Guide,
  Quiz,
  PracticalTask,
  Project,
  Achievement,
  CoinTransaction,
  NotificationItem,
  LeaderboardUser,
  Lesson,
} from './types';
import {
  initialProfile,
  adminProfile,
  initialCourses,
  initialGuides,
  initialQuizzes,
  initialPracticalTasks,
  initialProjects,
  initialAchievements,
  initialTransactions,
  initialNotifications,
  initialLeaderboard,
} from './initialData';

interface AstraContextType {
  user: UserProfile | null;
  courses: Course[];
  guides: Guide[];
  quizzes: Quiz[];
  practicalTasks: PracticalTask[];
  projects: Project[];
  achievements: Achievement[];
  transactions: CoinTransaction[];
  notifications: NotificationItem[];
  leaderboard: LeaderboardUser[];
  allStudents: UserProfile[];
  unreadNotificationsCount: number;
  triggerHaptic: (type?: 'light' | 'medium' | 'heavy' | 'success' | 'error') => void;
  loginAsStudent: () => void;
  loginAsAdmin: () => void;
  login: (email: string, pass: string) => boolean;
  register: (first: string, last: string, email: string, pass: string) => boolean;
  logout: () => void;
  completeLesson: (courseId: string, lessonId: string) => { coinsEarned: number; xpEarned: number };
  submitQuiz: (quizId: string, score: number, total: number) => { passed: boolean; coinsEarned: number; xpEarned: number };
  completeTask: (taskId: string) => { coinsEarned: number; xpEarned: number };
  completeProject: (projectId: string, githubUrl?: string, liveUrl?: string) => { coinsEarned: number; xpEarned: number };
  addCourse: (course: Partial<Course>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addLesson: (courseId: string, moduleId: string, lesson: Partial<Lesson>) => void;
  addQuiz: (quiz: Partial<Quiz>) => void;
  addProject: (project: Partial<Project>) => void;
  updateStudentRole: (studentId: string, role: 'student' | 'admin') => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AstraContext = createContext<AstraContextType | undefined>(undefined);

export const AstraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(initialProfile);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [guides] = useState<Guide[]>(initialGuides);
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [practicalTasks, setPracticalTasks] = useState<PracticalTask[]>(initialPracticalTasks);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [transactions, setTransactions] = useState<CoinTransaction[]>(initialTransactions);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(initialLeaderboard);

  const [allStudents, setAllStudents] = useState<UserProfile[]>([
    initialProfile,
    {
      id: 'usr-student-02',
      email: 'madina@astra.uz',
      first_name: 'Madina',
      last_name: 'Karimova',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      role: 'student',
      coins: 210,
      xp: 680,
      level: 3,
      streak: 5,
      created_at: '2026-09-02T10:00:00Z',
    },
    {
      id: 'usr-student-03',
      email: 'javohir@astra.uz',
      first_name: 'Javohir',
      last_name: 'Toshmatov',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'student',
      coins: 180,
      xp: 540,
      level: 3,
      streak: 4,
      created_at: '2026-09-05T12:00:00Z',
    },
    adminProfile,
  ]);

  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success' | 'error' = 'light') => {
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.HapticFeedback) {
      try {
        const hf = (window as any).Telegram.WebApp.HapticFeedback;
        if (type === 'success' || type === 'error') {
          hf.notificationOccurred(type);
        } else {
          hf.impactOccurred(type);
        }
      } catch (e) {}
    }
  };

  // Load from localStorage & detect Telegram Mini App on mount
  useEffect(() => {
    setIsMounted(true);

    // Telegram Web App Auto-detection
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      try {
        const tg = (window as any).Telegram.WebApp;
        tg.ready();
        tg.expand();
        if (tg.setHeaderColor) tg.setHeaderColor('#000000');
        if (tg.setBackgroundColor) tg.setBackgroundColor('#000000');

        const tgUser = tg.initDataUnsafe?.user;
        if (tgUser && !localStorage.getItem('astra_user')) {
          const newTgProfile: UserProfile = {
            id: `tg-${tgUser.id}`,
            telegram_id: tgUser.id,
            telegram_username: tgUser.username,
            first_name: tgUser.first_name || 'Talaba',
            last_name: tgUser.last_name || '',
            email: tgUser.username ? `@${tgUser.username}` : `tg_${tgUser.id}@astra.uz`,
            avatar_url: tgUser.photo_url || initialProfile.avatar_url,
            role: 'student',
            coins: 150,
            xp: 350,
            level: 2,
            streak: 4,
            is_telegram_user: true,
            created_at: new Date().toISOString(),
          };
          setUser(newTgProfile);
        }
      } catch (err) {
        console.error('Telegram WebApp init error', err);
      }
    }

    const savedUser = localStorage.getItem('astra_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }
    const savedCourses = localStorage.getItem('astra_courses');
    if (savedCourses) {
      try {
        setCourses(JSON.parse(savedCourses));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save changes
  useEffect(() => {
    if (isMounted && user) {
      localStorage.setItem('astra_user', JSON.stringify(user));
    }
  }, [user, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('astra_courses', JSON.stringify(courses));
    }
  }, [courses, isMounted]);

  const loginAsStudent = () => {
    setUser(initialProfile);
    localStorage.setItem('astra_user', JSON.stringify(initialProfile));
  };

  const loginAsAdmin = () => {
    setUser(adminProfile);
    localStorage.setItem('astra_user', JSON.stringify(adminProfile));
  };

  const login = (email: string, pass: string) => {
    if (email === 'admin@astra.uz') {
      loginAsAdmin();
      return true;
    }
    const found = allStudents.find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      localStorage.setItem('astra_user', JSON.stringify(found));
      return true;
    }
    // Generic fallback login
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      first_name: email.split('@')[0],
      last_name: '',
      role: 'student',
      coins: 50,
      xp: 100,
      level: 1,
      streak: 1,
      created_at: new Date().toISOString(),
    };
    setUser(newUser);
    setAllStudents((prev) => [...prev, newUser]);
    return true;
  };

  const register = (first: string, last: string, email: string, pass: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      first_name: first,
      last_name: last,
      role: 'student',
      coins: 50,
      xp: 50,
      level: 1,
      streak: 1,
      created_at: new Date().toISOString(),
    };
    setUser(newUser);
    setAllStudents((prev) => [...prev, newUser]);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('astra_user');
  };

  // Helper for XP level recalculation
  const calculateLevel = (currentXp: number): number => {
    if (currentXp >= 4001) return 7; // Professional
    if (currentXp >= 2501) return 6; // Advanced Developer
    if (currentXp >= 1501) return 5; // Developer
    if (currentXp >= 901) return 4; // Junior Developer
    if (currentXp >= 501) return 3; // Explorer
    if (currentXp >= 201) return 2; // O'rganuvchi
    return 1; // Boshlovchi
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    let coinsEarned = 20;
    let xpEarned = 30;

    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id !== courseId) return c;
        const updatedModules = c.modules?.map((m) => {
          const updatedLessons = m.lessons.map((les) => {
            if (les.id === lessonId) {
              coinsEarned = les.coin_reward || 20;
              xpEarned = les.xp_reward || 30;
              return { ...les, is_completed: true };
            }
            return les;
          });
          return { ...m, lessons: updatedLessons };
        });
        return { ...c, modules: updatedModules };
      })
    );

    if (user) {
      const newXp = user.xp + xpEarned;
      const newLevel = calculateLevel(newXp);
      const updatedUser: UserProfile = {
        ...user,
        coins: user.coins + coinsEarned,
        xp: newXp,
        level: newLevel,
      };
      setUser(updatedUser);

      // Add transaction
      const newTx: CoinTransaction = {
        id: `tx-${Date.now()}`,
        user_id: user.id,
        amount: coinsEarned,
        category: 'lesson',
        description: `Darsni muvaffaqiyatli yakunladingiz`,
        created_at: new Date().toISOString(),
      };
      setTransactions((prev) => [newTx, ...prev]);

      // Add Notification
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        user_id: user.id,
        title: `Dars tugatildi! +${coinsEarned} coin 🪙`,
        message: `Siz yangi darsni o'zlashtirdingiz va +${xpEarned} XP to'pladingiz.`,
        type: 'reward',
        is_read: false,
        created_at: new Date().toISOString(),
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }

    return { coinsEarned, xpEarned };
  };

  const submitQuiz = (quizId: string, score: number, total: number) => {
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 70;
    const coinsEarned = passed ? 20 : 5;
    const xpEarned = passed ? 30 : 10;

    if (user && passed) {
      const newXp = user.xp + xpEarned;
      const newLevel = calculateLevel(newXp);
      setUser({
        ...user,
        coins: user.coins + coinsEarned,
        xp: newXp,
        level: newLevel,
      });

      const newTx: CoinTransaction = {
        id: `tx-${Date.now()}`,
        user_id: user.id,
        amount: coinsEarned,
        category: 'quiz',
        description: `Testdan muvaffaqiyatli o'tdingiz (${percentage}%)`,
        created_at: new Date().toISOString(),
      };
      setTransactions((prev) => [newTx, ...prev]);
    }

    return { passed, coinsEarned, xpEarned };
  };

  const completeTask = (taskId: string) => {
    let coinsEarned = 50;
    let xpEarned = 60;

    setPracticalTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          coinsEarned = t.coin_reward;
          xpEarned = t.xp_reward;
          return { ...t, is_completed: true };
        }
        return t;
      })
    );

    if (user) {
      const newXp = user.xp + xpEarned;
      const newLevel = calculateLevel(newXp);
      setUser({
        ...user,
        coins: user.coins + coinsEarned,
        xp: newXp,
        level: newLevel,
      });

      setTransactions((prev) => [
        {
          id: `tx-${Date.now()}`,
          user_id: user.id,
          amount: coinsEarned,
          category: 'task',
          description: `Amaliy topshiriq bajarildi`,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
    }

    return { coinsEarned, xpEarned };
  };

  const completeProject = (projectId: string, githubUrl?: string, liveUrl?: string) => {
    let coinsEarned = 100;
    let xpEarned = 150;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          coinsEarned = p.coin_reward;
          xpEarned = p.xp_reward;
          return { ...p, is_completed: true, github_url: githubUrl, live_url: liveUrl };
        }
        return p;
      })
    );

    if (user) {
      const newXp = user.xp + xpEarned;
      const newLevel = calculateLevel(newXp);
      setUser({
        ...user,
        coins: user.coins + coinsEarned,
        xp: newXp,
        level: newLevel,
      });

      setTransactions((prev) => [
        {
          id: `tx-${Date.now()}`,
          user_id: user.id,
          amount: coinsEarned,
          category: 'project',
          description: `Katta loyiha topshirildi`,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
    }

    return { coinsEarned, xpEarned };
  };

  // Admin Actions
  const addCourse = (courseData: Partial<Course>) => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      slug: courseData.slug || `kurs-${Date.now()}`,
      title: courseData.title || 'Yangi Kurs',
      description: courseData.description || 'Kurs tavsifi',
      thumbnail_url: courseData.thumbnail_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      difficulty: courseData.difficulty || 'Boshlang\'ich',
      category: courseData.category || 'Dasturlash',
      is_published: courseData.is_published ?? true,
      total_lessons: courseData.total_lessons || 1,
      order_index: courses.length + 1,
      modules: courseData.modules || [
        {
          id: `mod-${Date.now()}`,
          course_id: `course-${Date.now()}`,
          title: '1. Kirish',
          order_index: 1,
          lessons: [],
        },
      ],
    };
    setCourses((prev) => [newCourse, ...prev]);
  };

  const updateCourse = (id: string, updatedFields: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const addLesson = (courseId: string, moduleId: string, lessonData: Partial<Lesson>) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        const updatedModules = c.modules?.map((m) => {
          if (m.id !== moduleId) return m;
          const newLesson: Lesson = {
            id: `les-${Date.now()}`,
            module_id: moduleId,
            course_id: courseId,
            title: lessonData.title || 'Yangi Dars',
            description: lessonData.description || '',
            youtube_video_id: lessonData.youtube_video_id || 'UB1O30fR-EE',
            duration_minutes: lessonData.duration_minutes || 15,
            coin_reward: lessonData.coin_reward || 20,
            xp_reward: lessonData.xp_reward || 30,
            order_index: m.lessons.length + 1,
            is_published: true,
            is_completed: false,
          };
          return { ...m, lessons: [...m.lessons, newLesson] };
        });
        return {
          ...c,
          modules: updatedModules,
          total_lessons: (c.total_lessons || 0) + 1,
        };
      })
    );
  };

  const addQuiz = (quizData: Partial<Quiz>) => {
    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      title: quizData.title || 'Yangi Test',
      description: quizData.description || '',
      coin_reward: quizData.coin_reward || 20,
      xp_reward: quizData.xp_reward || 30,
      passing_score_percentage: quizData.passing_score_percentage || 70,
      questions: quizData.questions || [],
    };
    setQuizzes((prev) => [newQuiz, ...prev]);
  };

  const addProject = (projectData: Partial<Project>) => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      slug: projectData.slug || `loyiha-${Date.now()}`,
      title: projectData.title || 'Yangi Loyiha',
      description: projectData.description || '',
      difficulty: projectData.difficulty || 'Boshlang\'ich',
      technologies: projectData.technologies || ['HTML', 'CSS', 'JavaScript'],
      requirements: projectData.requirements || ['Barcha talablarga rioya qiling'],
      youtube_tutorial_id: projectData.youtube_tutorial_id || '',
      starter_files_url: projectData.starter_files_url || '',
      coin_reward: projectData.coin_reward || 100,
      xp_reward: projectData.xp_reward || 150,
      is_completed: false,
    };
    setProjects((prev) => [newProj, ...prev]);
  };

  const updateStudentRole = (studentId: string, newRole: 'student' | 'admin') => {
    setAllStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, role: newRole } : s))
    );
    if (user && user.id === studentId) {
      setUser({ ...user, role: newRole });
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.is_read).length;

  return (
    <AstraContext.Provider
      value={{
        user,
        courses,
        guides,
        quizzes,
        practicalTasks,
        projects,
        achievements,
        transactions,
        notifications,
        leaderboard,
        allStudents,
        unreadNotificationsCount,
        triggerHaptic,
        loginAsStudent,
        loginAsAdmin,
        login,
        register,
        logout,
        completeLesson,
        submitQuiz,
        completeTask,
        completeProject,
        addCourse,
        updateCourse,
        deleteCourse,
        addLesson,
        addQuiz,
        addProject,
        updateStudentRole,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AstraContext.Provider>
  );
};

export const useAstra = () => {
  const context = useContext(AstraContext);
  if (!context) {
    throw new Error('useAstra must be used within an AstraProvider');
  }
  return context;
};

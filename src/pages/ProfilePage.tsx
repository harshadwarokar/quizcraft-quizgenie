
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import UserProfile from '@/components/UserProfile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, BookOpen, Clock, Trophy, BarChart3 } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

const ProfilePage = () => {
  // Mock user data - in a real app, this would come from a user context or API
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=8B5CF6&color=fff"
  };
  
  // Mock stats - in a real app, this would come from an API
  const stats = {
    quizzesTaken: 12,
    avgScore: 78,
    totalTime: 186,
    lastActive: "2025-03-30"
  };
  
  // Mock quiz history
  const quizHistory = [
    { id: 1, title: 'Advanced Mathematics', date: '2025-03-30', score: 85, questions: 20 },
    { id: 2, title: 'World History', date: '2025-03-28', score: 72, questions: 15 },
    { id: 3, title: 'Computer Science Basics', date: '2025-03-25', score: 90, questions: 25 },
    { id: 4, title: 'English Literature', date: '2025-03-20', score: 65, questions: 18 },
  ];

  return (
    <PageLayout>
      <section className="py-12">
        <div className="content-container max-w-4xl">
          <h1 className="text-3xl font-bold gradient-heading mb-6">Your Profile</h1>
          
          {/* Top ad banner */}
          <AdBanner size="medium" className="mb-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <UserProfile user={user} stats={stats} />
            </div>
            
            <div className="md:col-span-2">
              <Tabs defaultValue="history" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="history">Quiz History</TabsTrigger>
                  <TabsTrigger value="stats">Performance</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="history" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Quiz Activity</CardTitle>
                      <CardDescription>
                        View your quiz history and results
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {quizHistory.map((quiz) => (
                          <div 
                            key={quiz.id}
                            className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-quiz-accent/30 rounded-full">
                                <BookOpen className="h-4 w-4 text-quiz-primary" />
                              </div>
                              <div>
                                <h3 className="text-sm font-medium">{quiz.title}</h3>
                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                  <CalendarIcon className="h-3 w-3 mr-1" />
                                  <span>{quiz.date}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{quiz.score}%</div>
                              <div className="text-xs text-gray-500">{quiz.questions} questions</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="stats" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Analytics</CardTitle>
                      <CardDescription>
                        Your quiz performance over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Trophy className="h-4 w-4 text-quiz-primary" />
                            <h3 className="text-sm font-medium">Highest Score</h3>
                          </div>
                          <p className="text-2xl font-bold">90%</p>
                          <p className="text-xs text-gray-500 mt-1">Computer Science Basics</p>
                        </div>
                        
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="h-4 w-4 text-quiz-primary" />
                            <h3 className="text-sm font-medium">Average Score</h3>
                          </div>
                          <p className="text-2xl font-bold">78%</p>
                          <p className="text-xs text-gray-500 mt-1">Across all quizzes</p>
                        </div>
                        
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-quiz-primary" />
                            <h3 className="text-sm font-medium">Total Time</h3>
                          </div>
                          <p className="text-2xl font-bold">3h 6m</p>
                          <p className="text-xs text-gray-500 mt-1">Time spent on quizzes</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 h-60 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-gray-500">Performance chart visualization would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>
                        Manage your account preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                          <input 
                            type="text" 
                            id="name" 
                            value={user.name}
                            className="px-3 py-2 border border-gray-300 rounded-md"
                            readOnly 
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <label htmlFor="email" className="text-sm font-medium">Email</label>
                          <input 
                            type="email" 
                            id="email" 
                            value={user.email}
                            className="px-3 py-2 border border-gray-300 rounded-md"
                            readOnly 
                          />
                        </div>
                        
                        <div className="pt-4">
                          <button className="quiz-button-primary px-4 py-2">
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Bottom ad banner */}
          <AdBanner size="medium" className="mt-12" />
        </div>
      </section>
    </PageLayout>
  );
};

export default ProfilePage;

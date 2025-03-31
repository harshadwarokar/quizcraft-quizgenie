
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trophy, Calendar, Clock, BookOpen } from "lucide-react";

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  stats?: {
    quizzesTaken: number;
    avgScore: number;
    totalTime: number;
    lastActive: string;
  };
}

const UserProfile = ({ user, stats }: UserProfileProps) => {
  // Default stats if none provided
  const userStats = stats || {
    quizzesTaken: 0,
    avgScore: 0,
    totalTime: 0,
    lastActive: new Date().toLocaleDateString(),
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-16 w-16 border-2 border-purple-100">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-quiz-primary text-white text-lg">
            {user.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-xl">{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
          <div className="mt-1">
            <Badge variant="outline" className="bg-quiz-accent/30 text-quiz-primary">
              Quiz Taker
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <Separator className="my-2" />
      
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-quiz-primary" />
            <div>
              <p className="text-sm font-medium">Quizzes Taken</p>
              <p className="text-2xl font-bold">{userStats.quizzesTaken}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-quiz-primary" />
            <div>
              <p className="text-sm font-medium">Avg. Score</p>
              <p className="text-2xl font-bold">{userStats.avgScore}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-quiz-primary" />
            <div>
              <p className="text-sm font-medium">Total Time</p>
              <p className="text-2xl font-bold">{userStats.totalTime} min</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-quiz-primary" />
            <div>
              <p className="text-sm font-medium">Last Active</p>
              <p className="text-2xl font-bold">{userStats.lastActive}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;

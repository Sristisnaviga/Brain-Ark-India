import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

// Types
export type User = {
  id: string;
  name: string;
  email: string;
  role: "parent" | "student" | "admin";
  profile?: {
    studentName?: string;
    grade?: string;
    school?: string;
    phone?: string;
  };
};

export type Booking = {
  id: string;
  userId: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
  paymentStatus: "paid" | "unpaid";
};

export type Post = {
  id: string;
  userId: string;
  authorName: string;
  title: string;
  content: string;
  category: "General" | "Stream Selection" | "Memory Techniques" | "Career Guidance";
  likes: number;
  createdAt: string;
  comments: Comment[];
};

export type Comment = {
  id: string;
  userId: string;
  authorName: string;
  content: string;
  createdAt: string;
};

// Mock Initial Data
const INITIAL_USERS: User[] = [
  { id: "1", name: "Admin User", email: "admin@sristi.com", role: "admin" },
  { id: "2", name: "Rahul Sharma", email: "rahul@example.com", role: "parent", profile: { studentName: "Arjun", grade: "10", phone: "9876543210" } },
];

const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    userId: "2",
    authorName: "Rahul Sharma",
    title: "Confused about Science vs Commerce for my son",
    content: "My son enjoys math but struggles with physics. Should we consider Commerce with Maths? Any advice from other parents?",
    category: "Stream Selection",
    likes: 12,
    createdAt: "2024-02-10T10:00:00Z",
    comments: [
      { id: "c1", userId: "1", authorName: "Admin User", content: "Hi Rahul, GBP can really help identify his innate learning style!", createdAt: "2024-02-10T11:00:00Z" }
    ]
  },
  {
    id: "2",
    userId: "3",
    authorName: "Priya Singh",
    title: "Best memory techniques for history dates?",
    content: "My daughter finds it hard to remember dates for her history board exams. Any tips?",
    category: "Memory Techniques",
    likes: 8,
    createdAt: "2024-02-11T09:30:00Z",
    comments: []
  }
];

const INITIAL_BOOKINGS: Booking[] = [
  { id: "b1", userId: "2", date: "2024-02-15", time: "10:00 AM", status: "confirmed", paymentStatus: "paid" }
];

// Context
type DataContextType = {
  user: User | null;
  users: User[];
  posts: Post[];
  bookings: Booking[];
  login: (email: string) => void;
  logout: () => void;
  register: (name: string, email: string, role: User["role"]) => void;
  addBooking: (date: string, time: string) => void;
  addPost: (title: string, content: string, category: Post["category"]) => void;
  likePost: (postId: string) => void;
  isAdmin: boolean;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const login = (email: string) => {
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      setUser(existingUser);
      toast({ title: "Welcome back!", description: `Logged in as ${existingUser.name}` });
      setLocation(existingUser.role === "admin" ? "/admin" : "/dashboard");
    } else {
      toast({ title: "User not found", description: "Please register first.", variant: "destructive" });
    }
  };

  const register = (name: string, email: string, role: User["role"]) => {
    const newUser: User = { id: Math.random().toString(), name, email, role };
    setUsers([...users, newUser]);
    setUser(newUser);
    toast({ title: "Account created!", description: "Welcome to Sristi BrainArk." });
    setLocation("/dashboard");
  };

  const logout = () => {
    setUser(null);
    setLocation("/");
    toast({ title: "Logged out", description: "See you soon!" });
  };

  const addBooking = (date: string, time: string) => {
    if (!user) return;
    const newBooking: Booking = {
      id: Math.random().toString(),
      userId: user.id,
      date,
      time,
      status: "confirmed",
      paymentStatus: "paid" // Mocking successful payment
    };
    setBookings([...bookings, newBooking]);
    toast({ title: "Booking Confirmed!", description: `Session booked for ${date} at ${time}` });
  };

  const addPost = (title: string, content: string, category: Post["category"]) => {
    if (!user) return;
    const newPost: Post = {
      id: Math.random().toString(),
      userId: user.id,
      authorName: user.name,
      title,
      content,
      category,
      likes: 0,
      createdAt: new Date().toISOString(),
      comments: []
    };
    setPosts([newPost, ...posts]);
    toast({ title: "Post published", description: "Your question is now live in the community." });
  };

  const likePost = (postId: string) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <DataContext.Provider value={{ 
      user, users, posts, bookings, 
      login, logout, register, 
      addBooking, addPost, likePost, 
      isAdmin: user?.role === "admin" 
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};

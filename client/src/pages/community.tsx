import { Layout } from "@/components/layout";
import { useData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ThumbsUp, Search, Tag, User } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function Community() {
  const { posts, addPost, likePost, user } = useData();
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [category, setCategory] = useState("General");
  const [activeTab, setActiveTab] = useState("all");

  const categories = ["All", "General", "Stream Selection", "Memory Techniques", "Career Guidance"];

  const handlePost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      addPost(newPostTitle, newPostContent, category as any);
      setNewPostTitle("");
      setNewPostContent("");
    }
  };

  const filteredPosts = activeTab === "all" 
    ? posts 
    : posts.filter(p => p.category === activeTab);

  return (
    <Layout>
      <div className="bg-muted/30 py-12 border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold font-serif mb-4">Parent Community</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A safe space to discuss parenting, education, and career guidance. Share your questions and experiences.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {categories.map(cat => (
                  <Button 
                    key={cat} 
                    variant={activeTab === cat || (activeTab === "all" && cat === "All") ? "secondary" : "ghost"} 
                    className="justify-start rounded-none h-12 px-6"
                    onClick={() => setActiveTab(cat === "All" ? "all" : cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary text-primary-foreground border-none">
            <CardHeader>
              <CardTitle className="text-lg">Forum Rules</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 opacity-90">
              <p>1. Be respectful and kind.</p>
              <p>2. No promotional content.</p>
              <p>3. Keep discussions relevant.</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          {/* Create Post */}
          <Card className="border-2 border-primary/10">
            <CardHeader>
              <CardTitle className="text-lg">Start a Discussion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="What's on your mind? (Title)" 
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
              <Textarea 
                placeholder="Share more details..." 
                className="resize-none"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <select 
                  className="bg-background border rounded px-3 py-2 text-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>General</option>
                  <option>Stream Selection</option>
                  <option>Memory Techniques</option>
                  <option>Career Guidance</option>
                </select>
                <Button onClick={handlePost} disabled={!user || !newPostTitle.trim()}>Post Discussion</Button>
              </div>
              {!user && <p className="text-xs text-destructive text-right">You must be logged in to post.</p>}
            </CardContent>
          </Card>

          {/* Filters (Mobile) */}
          <div className="lg:hidden overflow-x-auto pb-2">
            <div className="flex gap-2">
              {categories.map(cat => (
                <Badge 
                  key={cat} 
                  variant={activeTab === cat || (activeTab === "all" && cat === "All") ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setActiveTab(cat === "All" ? "all" : cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                      {formatDistanceToNow(new Date(post.createdAt))} ago
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <User className="w-4 h-4" />
                    <span>{post.authorName}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{post.content}</p>
                </CardContent>
                <CardFooter className="border-t bg-muted/10 py-3 px-6 flex justify-between items-center">
                  <div className="flex gap-4">
                    <Button variant="ghost" size="sm" className="gap-2" onClick={() => likePost(post.id)}>
                      <ThumbsUp className={`w-4 h-4 ${post.likes > 0 ? 'fill-primary text-primary' : ''}`} />
                      {post.likes} Likes
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      {post.comments.length} Comments
                    </Button>
                  </div>
                  <Button variant="link" size="sm">Read More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

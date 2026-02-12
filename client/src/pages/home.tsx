import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Brain, Sparkles, GraduationCap, Users, ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/30 to-background pt-16 pb-24 lg:pt-32 lg:pb-32">
        <div className="container px-4 mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 text-center lg:text-left z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-4 bg-background/50 backdrop-blur border-primary/20 text-primary px-4 py-1">
                Trusted by 5,000+ Parents in India
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold font-serif leading-tight text-foreground">
                Unlock Your Child's <span className="text-primary relative inline-block">
                  True Potential
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto lg:mx-0">
                Genetic Brain Profiling (GBP) helps you understand your child's innate learning style, talents, and ideal career path. No more guessing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                <Link href="/book">
                  <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-lg hover:shadow-xl transition-all">
                    Book a Session <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg bg-background/50 backdrop-blur">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
                <img 
                  src="/hero-brain.png" 
                  alt="Abstract Brain Illustration" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* Stats/Trust Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Students Profiled", value: "10,000+" },
            { label: "Happy Parents", value: "98%" },
            { label: "Partner Schools", value: "50+" },
            { label: "Years Experience", value: "12+" },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold font-serif">{stat.value}</div>
              <div className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services/Benefits */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif">Why Choose Genetic Brain Profiling?</h2>
            <p className="text-muted-foreground text-lg">
              Every child is unique. Traditional education treats everyone the same. GBP reveals the "User Manual" for your child's brain.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Identify Innate Talents",
                desc: "Discover if your child is Left-Brained (Analytical) or Right-Brained (Creative) and their specific intelligence types."
              },
              {
                icon: GraduationCap,
                title: "Stream Selection",
                desc: "Stop the confusion between Science, Commerce, or Arts. Choose based on capability, not just interest."
              },
              {
                icon: Sparkles,
                title: "Learning Styles",
                desc: "Does your child learn by seeing, hearing, or doing? Customize their study habits for maximum retention."
              }
            ].map((feature, i) => (
              <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4 text-secondary-foreground">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Steps */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-serif">A Simple Process for Clarity</h2>
              <div className="space-y-8">
                {[
                  "Book a slot for fingerprint scanning (15 mins).",
                  "Our experts generate a detailed 30-page report.",
                  "Attend a 1-hour counseling session to understand the report.",
                  "Receive a personalized roadmap for career and studies."
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <p className="text-lg text-foreground/80">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link href="/book">
                  <Button size="lg" className="rounded-full">Get Started Today</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img src="/fingerprint-brain.png" alt="Process Diagram" className="rounded-2xl shadow-xl w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Community Teaser */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 font-serif">Join our Parent Community</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Connect with other parents, share experiences about stream selection, and get advice from experts in our moderated forum.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/community">
              <Card className="max-w-md cursor-pointer hover:border-primary transition-colors text-left group">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">Career Discussions</CardTitle>
                    <CardDescription>Latest post 2 mins ago</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  "My son is confused between Engineering and Architecture. The GBP report suggested..."
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Compass, Briefcase, ArrowRight, Target, Globe } from "lucide-react";
import { useData } from "@/lib/mockData";

export default function Grade12Landing() {
  const content = {
    en: {
      badge: "For Grade 12 Students & Parents",
      title: "Engineering, Medical, or Management?",
      subtitle: "Design a Career That Fits Your Brain Design.",
      desc: "Grade 12 is the gateway to professional life. Don't just follow the crowd. Use GBP to find a career path that aligns with your natural strengths.",
      cta: "Book Career Guidance Session",
      learnMore: "How It Works",
      whyTitle: "Career Clarity for Grade 12",
      benefits: [
        {
          title: "Career Mapping",
          desc: "Match your Multiple Intelligences (MI) to over 200+ career options to find your perfect fit."
        },
        {
          title: "Entrance Exam Strategy",
          desc: "Understand your cognitive processing speed to plan better for NEET, JEE, or CA exams."
        },
        {
          title: "College Course Selection",
          desc: "Avoid dropping out later by choosing a degree that matches your personality and aptitude."
        }
      ]
    }
  };

  const t = content.en;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-background pt-16 pb-24">
        <div className="container px-4 mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4 text-secondary-foreground bg-secondary/20 font-bold px-4 py-1">
                {t.badge}
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold font-serif leading-tight text-foreground mb-6">
                {t.title}
              </h1>
              <h2 className="text-2xl text-secondary-foreground font-medium mb-4">
                {t.subtitle}
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                {t.desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book">
                  <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
                    {t.cta} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="flex-1 relative">
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="/grade-12-career.png" 
                  alt="Grade 12 Career Planning" 
                  className="w-full h-auto object-cover"
                />
              </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">{t.whyTitle}</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.benefits.map((benefit, i) => (
              <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-orange-50/50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4 text-secondary-foreground">
                    {i === 0 ? <Compass className="w-6 h-6" /> : i === 1 ? <Target className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {benefit.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
       {/* Testimonial / Trust */}
       <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-xl italic font-serif text-muted-foreground max-w-2xl mx-auto mb-6">
            "I was pushing my daughter towards Medicine, but her GBP report showed high Musical and Interpersonal intelligence. She is now pursuing Psychology and is incredibly happy and successful."
          </blockquote>
          <div className="font-bold text-primary">- Mr. Ravi, Parent from Coimbatore</div>
        </div>
      </section>
    </Layout>
  );
}

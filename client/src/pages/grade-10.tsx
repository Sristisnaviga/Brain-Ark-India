import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Brain, GraduationCap, ArrowRight, CheckCircle, BookOpen, Lightbulb } from "lucide-react";
import { useData } from "@/lib/mockData";

export default function Grade10Landing() {
  const { language } = useData();
  
  const content = {
    en: {
      badge: "For Grade 10 Students & Parents",
      title: "Science, Commerce, or Arts?",
      subtitle: "Make the Right Choice with Genetic Brain Profiling.",
      desc: "Stream selection is the first major career decision. Don't base it on marks alone. Understand your child's innate potential.",
      cta: "Book Stream Selection Session",
      learnMore: "How It Works",
      whyTitle: "Why GBP for Grade 10?",
      benefits: [
        {
          title: "Scientific Stream Selection",
          desc: "Match brain dominance with stream requirements (e.g., Left Brain for Science, Right Brain for Arts)."
        },
        {
          title: "Exam Stress Reduction",
          desc: "Identify your child's learning style (Visual, Auditory, Kinesthetic) to optimize study habits."
        },
        {
          title: "Confidence Booster",
          desc: "Help your child understand their unique strengths, reducing comparison with peers."
        }
      ]
    },
    ta: {
      badge: "10 ஆம் வகுப்பு மாணவர்களுக்கும் பெற்றோர்களுக்கும்",
      title: "அறிவியல், வணிகம் அல்லது கலை?",
      subtitle: "மரபணு மூளை சுயவிவரத்துடன் சரியான தேர்வு செய்யுங்கள்.",
      desc: "பாடப்பிரிவு தேர்வு வாழ்க்கையின் முதல் முக்கிய முடிவு. மதிப்பெண்களை மட்டும் நம்ப வேண்டாம். உங்கள் குழந்தையின் இயல்பான திறனைப் புரிந்து கொள்ளுங்கள்.",
      cta: "பாடப்பிரிவு தேர்வு அமர்வை முன்பதிவு செய்யவும்",
      learnMore: "எப்படி இது செயல்படுகிறது",
      whyTitle: "10 ஆம் வகுப்புக்கு ஏன் GBP?",
      benefits: [
        {
          title: "அறிவியல் பூர்வமான தேர்வு",
          desc: "மூளை ஆதிக்கத்தை பாடப்பிரிவு தேவைகளுடன் பொருத்துங்கள் (எ.கா., அறிவியலுக்கு இடது மூளை)."
        },
        {
          title: "தேர்வு மன அழுத்தத்தைக் குறைத்தல்",
          desc: "சிறந்த படிப்பு முறையை அடையாளம் காணுங்கள் (காட்சி, ஒலி, செயல்முறை)."
        },
        {
          title: "நம்பிக்கை அதிகரிப்பு",
          desc: "உங்கள் குழந்தையின் தனித்துவமான பலங்களைப் புரிந்துகொள்ள உதவுங்கள்."
        }
      ]
    }
  };

  const t = language === 'ta' ? content.ta : content.en;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-background pt-16 pb-24">
        <div className="container px-4 mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4 text-primary font-bold px-4 py-1">
                {t.badge}
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold font-serif leading-tight text-foreground mb-6">
                {t.title}
              </h1>
              <h2 className="text-2xl text-primary font-medium mb-4">
                {t.subtitle}
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                {t.desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/book">
                  <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
                    {t.cta} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="flex-1 relative">
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="/grade-10-streams.png" 
                  alt="Grade 10 Stream Selection" 
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
            <div className="h-1 w-20 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.benefits.map((benefit, i) => (
              <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-blue-50/50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    {i === 0 ? <Brain className="w-6 h-6" /> : i === 1 ? <BookOpen className="w-6 h-6" /> : <Lightbulb className="w-6 h-6" />}
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
            "We were confused between Biology and Computer Science. The report showed my son has high Logical Intelligence but lower Visual memory. We chose Computer Science and he is topping his class now."
          </blockquote>
          <div className="font-bold text-primary">- Mrs. Lakshmi, Parent from Coimbatore</div>
        </div>
      </section>
    </Layout>
  );
}

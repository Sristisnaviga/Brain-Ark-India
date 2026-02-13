import { Layout } from "@/components/layout";
import { useData } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { BookOpen, Briefcase, Users, Star, Brain, CheckCircle } from "lucide-react";

export default function AboutGBP() {
  const { language } = useData();

  const content = {
    en: {
      title: "Know | Grow | Glow with GBP",
      subtitle: "Genetic Brain Profiling: A Scientific Approach to Human Potential",
      sections: [
        {
          id: "students",
          title: "GBP For Students",
          icon: BookOpen,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          items: [
            "Learning Potential: Understand innate capacity to learn.",
            "Learning Styles: Visual, Auditory, or Kinesthetic learner?",
            "Educational Guidance: Choose the right stream and subjects.",
            "Career Pathways: Align career choices with natural strengths.",
            "Professional Success: Build a foundation for future achievement.",
            "Relationship Issues: Understand peer and family dynamics.",
            "Whole Brain Nurturing: Develop a balanced and sharp mind."
          ]
        },
        {
          id: "corporates",
          title: "GBP For Corporates",
          icon: Briefcase,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          items: [
            "Right Recruitment: Hire candidates who naturally fit the role.",
            "Leadership Skills: Identify and groom future leaders.",
            "Team Management: Build cohesive teams based on personality types.",
            "Customer Relationship: Improve empathy and communication.",
            "Lowest Attrition: Reduce turnover by matching talent to tasks."
          ]
        },
        {
          id: "parents",
          title: "GBP For Parents",
          icon: Users,
          color: "text-green-600",
          bgColor: "bg-green-50",
          items: [
            "Personality & Behaviors: Understand your child's true nature.",
            "Learning Dissonance: Resolve conflicts between teaching and learning styles.",
            "Thinking Pattern: Know if they are analytical, creative, or affective.",
            "Interests & Talents: Discover hidden gifts early.",
            "Hobbies and Sports: Guide them towards activities they will excel in.",
            "Parenting Techniques: Tailor your parenting to your child's needs."
          ]
        }
      ]
    },
    ta: {
      title: "GBP மூலம் அறிவோம் | வளர்வோம் | ஒளிர்வோம்",
      subtitle: "மரபணு மூளை சுயவிவரம்: மனித ஆற்றலுக்கான அறிவியல் அணுகுமுறை",
      sections: [
        {
          id: "students",
          title: "மாணவர்களுக்கான GBP",
          icon: BookOpen,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          items: [
            "கற்றல் திறன்: இயல்பான கற்றல் திறனைப் புரிந்து கொள்ளுங்கள்.",
            "கற்றல் முறைகள்: காட்சி, ஒலி அல்லது செயல்முறை வழி கற்றவரா?",
            "கல்வி வழிகாட்டுதல்: சரியான பாடப்பிரிவு மற்றும் பாடங்களைத் தேர்வுசெய்யுங்கள்.",
            "தொழில் பாதைகள்: இயற்கையான பலங்களுடன் தொழில் தேர்வுகளை இணைக்கவும்.",
            "தொழில்முறை வெற்றி: எதிர்கால சாதனைக்கான அடித்தளத்தை உருவாக்குங்கள்.",
            "உறவு சிக்கல்கள்: நண்பர்கள் மற்றும் குடும்ப இயக்கவியலைப் புரிந்து கொள்ளுங்கள்.",
            "முழு மூளை வளர்ப்பு: சீரான மற்றும் கூர்மையான மனதை வளர்த்துக் கொள்ளுங்கள்."
          ]
        },
        {
          id: "corporates",
          title: "நிறுவனங்களுக்கான GBP",
          icon: Briefcase,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          items: [
            "சரியான ஆட்சேர்ப்பு: பாத்திரத்திற்குப் பொருந்தும் வேட்பாளர்களை நியமிக்கவும்.",
            "தலைமைத்துவ திறன்கள்: எதிர்காலத் தலைவர்களை அடையாளம் கண்டு வளர்க்கவும்.",
            "குழு மேலாண்மை: ஆளுமை வகைகளின் அடிப்படையில் இணக்கமான அணிகளை உருவாக்குங்கள்.",
            "வாடிக்கையாளர் உறவு: பச்சாதாபம் மற்றும் தகவல்தொடர்புகளை மேம்படுத்தவும்.",
            "குறைந்த விலகல்: திறமைகளை பணிகளுடன் பொருத்துவதன் மூலம் பணிநீக்கத்தைக் குறைக்கவும்."
          ]
        },
        {
          id: "parents",
          title: "பெற்றோர்களுக்கான GBP",
          icon: Users,
          color: "text-green-600",
          bgColor: "bg-green-50",
          items: [
            "ஆளுமை மற்றும் நடத்தைகள்: உங்கள் குழந்தையின் உண்மையான தன்மையைப் புரிந்து கொள்ளுங்கள்.",
            "கற்றல் முரண்பாடு: கற்பித்தல் மற்றும் கற்றல் பாணிகளுக்கு இடையிலான முரண்பாடுகளைத் தீர்க்கவும்.",
            "சிந்தனை முறை: அவர்கள் பகுப்பாய்வு செய்பவரா, ஆக்கப்பூர்வமானவரா அல்லது உணர்வுபூர்வமானவரா என்பதை அறியவும்.",
            "ஆர்வம் மற்றும் திறமைகள்: மறைந்திருக்கும் பரிசுகளை முன்னதாகவே கண்டறியவும்.",
            " பொழுதுபோக்குகள் மற்றும் விளையாட்டு: அவர்கள் சிறந்து விளங்கும் செயல்பாடுகளை நோக்கி அவர்களை வழிநடத்துங்கள்.",
            "பெற்றோர் நுட்பங்கள்: உங்கள் குழந்தையின் தேவைகளுக்கு ஏற்ப உங்கள் வளர்ப்பை அமைத்துக் கொள்ளுங்கள்."
          ]
        }
      ]
    }
  };

  const t = language === 'ta' ? content.ta : content.en;

  return (
    <Layout>
      <div className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-6 text-foreground">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {t.sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className={`p-4 rounded-2xl ${section.bgColor} shrink-0`}>
                <section.icon className={`w-12 h-12 ${section.color}`} />
              </div>
              <div className="flex-1">
                <h2 className={`text-3xl font-bold mb-6 ${section.color}`}>{section.title}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {section.items.map((item, i) => (
                    <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 mt-0.5 ${section.color}`} />
                        <span className="text-foreground/80 font-medium">{item}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
}

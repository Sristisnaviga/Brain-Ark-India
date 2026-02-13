import { Layout } from "@/components/layout";
import { useData, Booking } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Check, Calendar as CalendarIcon, MessageCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function BookSession() {
  const { user, addBooking, language } = useData();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [reportType, setReportType] = useState<"Child" | "Adult">("Child");
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const content = {
    en: {
      title: "Book Your GBP Session",
      subtitle: "Select a convenient date and time for your child's brain profiling.",
      selectReport: "Select Report Type",
      child: "Student / Child",
      childDesc: "For Grade 10 & 12 Students",
      adult: "Adult / Professional",
      adultDesc: "For Career Growth & Self Awareness",
      selectDate: "Select Date",
      selectTime: "Select Time Slot",
      summary: "Booking Summary",
      service: "Service:",
      duration: "Duration:",
      date: "Date:",
      time: "Time:",
      total: "Total",
      note: "Includes report generation and 1 counseling session.",
      loginRequired: "Please Log In",
      loginDesc: "You need to be logged in to book a session.",
      incomplete: "Incomplete Selection",
      incompleteDesc: "Please select both a date and a time slot.",
      requestPayment: "Request Payment Link via WhatsApp",
      securedBy: "Payment via Secure Link",
      confirmedTitle: "Booking Request Initiated!",
      confirmedDesc: "Please complete the payment via WhatsApp to confirm your slot.",
      whatsAppSent: "WhatsApp chat opened to request payment link.",
      viewDashboard: "View Dashboard",
      backHome: "Back to Home",
      mins: "45 Mins",
      selectDatePlace: "Select date",
      selectTimePlace: "Select time"
    },
    ta: {
      title: "உங்கள் GBP அமர்வை முன்பதிவு செய்யுங்கள்",
      subtitle: "உங்கள் குழந்தையின் மூளை சுயவிவரத்திற்கு வசதியான தேதி மற்றும் நேரத்தைத் தேர்ந்தெடுக்கவும்.",
      selectReport: "அறிக்கை வகையைத் தேர்ந்தெடுக்கவும்",
      child: "மாணவர் / குழந்தை",
      childDesc: "10 மற்றும் 12 ஆம் வகுப்பு மாணவர்களுக்கு",
      adult: "வயது வந்தோர் / தொழில்முறை",
      adultDesc: "தொழில் வளர்ச்சி மற்றும் சுய விழிப்புணர்வுக்காக",
      selectDate: "தேதியைத் தேர்ந்தெடுக்கவும்",
      selectTime: "நேரத்தைத் தேர்ந்தெடுக்கவும்",
      summary: "முன்பதிவு சுருக்கம்",
      service: "சேவை:",
      duration: "கால அளவு:",
      date: "தேதி:",
      time: "நேரம்:",
      total: "மொத்தம்",
      note: "அறிக்கை உருவாக்கம் மற்றும் 1 ஆலோசனை அமர்வு ஆகியவை அடங்கும்.",
      loginRequired: "தயவுசெய்து உள்நுழையவும்",
      loginDesc: "அமர்வை முன்பதிவு செய்ய நீங்கள் உள்நுழைய வேண்டும்.",
      incomplete: "முழுமையற்ற தேர்வு",
      incompleteDesc: "தயவுசெய்து தேதி மற்றும் நேரம் இரண்டையும் தேர்ந்தெடுக்கவும்.",
      requestPayment: "வாட்ஸ்அப் வழியாக கட்டண இணைப்பைக் கோருங்கள்",
      securedBy: "பாதுகாப்பான இணைப்பு வழியாக கட்டணம்",
      confirmedTitle: "முன்பதிவு கோரிக்கை தொடங்கப்பட்டது!",
      confirmedDesc: "உங்கள் இடத்தை உறுதிப்படுத்த வாட்ஸ்அப் வழியாக கட்டணத்தை முடிக்கவும்.",
      whatsAppSent: "கட்டண இணைப்பைக் கோர வாட்ஸ்அப் அரட்டை திறக்கப்பட்டது.",
      viewDashboard: "டாஷ்போர்டைப் பார்க்கவும்",
      backHome: "முகப்புக்குத் திரும்பு",
      mins: "45 நிமிடங்கள்",
      selectDatePlace: "தேதியைத் தேர்ந்தெடுக்கவும்",
      selectTimePlace: "நேரத்தைத் தேர்ந்தெடுக்கவும்"
    }
  };

  const t = language === 'ta' ? content.ta : content.en;

  const timeSlots = [
    "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const prices = {
    Child: 3000,
    Adult: 2000
  };

  const currentPrice = prices[reportType];

  const handleBooking = () => {
    if (!user) {
      toast({ title: t.loginRequired, description: t.loginDesc, variant: "destructive" });
      setLocation("/auth");
      return;
    }
    if (!date || !selectedTime) {
      toast({ title: t.incomplete, description: t.incompleteDesc, variant: "destructive" });
      return;
    }

    const formattedDate = format(date, "yyyy-MM-dd");
    const booking = addBooking(formattedDate, selectedTime, reportType, currentPrice);
    setConfirmedBooking(booking);

    // Open WhatsApp
    const message = `Hello Sristi BrainArk, I would like to book a GBP session.\n\nName: ${user.name}\nReport Type: ${reportType} (₹${currentPrice})\nDate: ${formattedDate}\nTime: ${selectedTime}\n\nPlease send me the payment link.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918072159491?text=${encodedMessage}`, '_blank');
  };

  if (confirmedBooking) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 flex justify-center">
          <Card className="w-full max-w-lg text-center border-green-200 bg-green-50/50">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-800">
                {t.confirmedTitle}
              </CardTitle>
              <CardDescription>
                {t.confirmedDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm text-left">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.date}</p>
                    <p className="font-semibold">{date ? format(date, "PPPP") : ""}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.time}</p>
                    <p className="font-semibold">{selectedTime}</p>
                  </div>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between items-center mt-2">
                   <p className="font-medium text-sm">{t.total}:</p>
                   <p className="font-bold text-lg">₹{currentPrice}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-100 rounded-md text-green-800 text-sm">
                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                <p>{t.whatsAppSent}</p>
              </div>
            </CardContent>
            <CardFooter className="justify-center gap-4 flex-col sm:flex-row">
              <Link href="/dashboard"><Button variant="outline" className="w-full sm:w-auto">{t.viewDashboard}</Button></Link>
              <Link href="/"><Button className="w-full sm:w-auto">{t.backHome}</Button></Link>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold font-serif mb-2">{t.title}</h1>
          <p className="text-muted-foreground mb-8">{t.subtitle}</p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Selection */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Report Type Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.selectReport}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={reportType} onValueChange={(v) => setReportType(v as "Child" | "Adult")} className="grid sm:grid-cols-2 gap-4">
                    <div className={`border-2 rounded-lg p-4 cursor-pointer hover:bg-accent transition-all ${reportType === 'Child' ? 'border-primary bg-primary/5' : 'border-muted'}`} onClick={() => setReportType('Child')}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg">{t.child}</span>
                        <RadioGroupItem value="Child" id="child" className="data-[state=checked]:border-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{t.childDesc}</p>
                      <Badge variant="secondary" className="font-bold text-lg">₹3,000</Badge>
                    </div>
                    
                    <div className={`border-2 rounded-lg p-4 cursor-pointer hover:bg-accent transition-all ${reportType === 'Adult' ? 'border-primary bg-primary/5' : 'border-muted'}`} onClick={() => setReportType('Adult')}>
                       <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg">{t.adult}</span>
                        <RadioGroupItem value="Adult" id="adult" className="data-[state=checked]:border-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{t.adultDesc}</p>
                      <Badge variant="secondary" className="font-bold text-lg">₹2,000</Badge>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" /> {t.selectDate}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow-sm p-4"
                    disabled={(date) => date < new Date()}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.selectTime}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedTime} onValueChange={setSelectedTime} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {timeSlots.map((time) => (
                      <div key={time}>
                        <RadioGroupItem value={time} id={time} className="peer sr-only" />
                        <Label
                          htmlFor={time}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                        >
                          <span className="text-sm font-semibold">{time}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Summary & Payment */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-lg border-primary/10">
                <CardHeader className="bg-primary/5 border-b">
                  <CardTitle className="text-lg">{t.summary}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.service}</span>
                    <span className="font-medium">GBP - {reportType} Report</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.duration}</span>
                    <span className="font-medium">{t.mins}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.date}</span>
                    <span className="font-medium">{date ? format(date, "MMM dd, yyyy") : t.selectDatePlace}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.time}</span>
                    <span className="font-medium">{selectedTime || t.selectTimePlace}</span>
                  </div>
                  
                  <div className="h-px bg-border my-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{t.total}</span>
                    <span className="font-bold text-2xl text-primary">₹{currentPrice}</span>
                  </div>

                  <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded mt-2 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{t.note}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full text-lg h-auto py-3 shadow-md bg-green-600 hover:bg-green-700 text-white" 
                    onClick={handleBooking}
                    disabled={!date || !selectedTime}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    <span className="text-sm">{t.requestPayment}</span>
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="mt-4 flex flex-col items-center gap-2">
                 <div className="text-xs text-muted-foreground text-center">
                    {t.securedBy}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

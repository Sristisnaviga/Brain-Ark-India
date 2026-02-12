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
import { Check, CreditCard, Calendar as CalendarIcon, Loader2, Smartphone, Download, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { DownloadInvoiceButton } from "@/components/invoice-generator";
import { Badge } from "@/components/ui/badge";

export default function BookSession() {
  const { user, addBooking, language } = useData();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [reportType, setReportType] = useState<"Child" | "Adult">("Child");
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

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
      toast({ title: "Please Log In", description: "You need to be logged in to book a session.", variant: "destructive" });
      setLocation("/auth");
      return;
    }
    if (!date || !selectedTime) {
      toast({ title: "Incomplete Selection", description: "Please select both a date and a time slot.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    // Simulate payment gateway delay
    setTimeout(() => {
      const booking = addBooking(format(date, "yyyy-MM-dd"), selectedTime, reportType, currentPrice);
      setConfirmedBooking(booking);
      setIsProcessing(false);
    }, 2000);
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
                {language === 'ta' ? "முன்பதிவு உறுதிசெய்யப்பட்டது!" : "Booking Confirmed!"}
              </CardTitle>
              <CardDescription>
                {language === 'ta' ? "உங்கள் GBP அமர்வு வெற்றிகரமாக முன்பதிவு செய்யப்பட்டது." : "Your GBP session has been successfully booked."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm text-left">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Date</p>
                    <p className="font-semibold">{date ? format(date, "PPPP") : ""}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Time</p>
                    <p className="font-semibold">{selectedTime}</p>
                  </div>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between items-center mt-2">
                   <p className="font-medium text-sm">Amount Paid:</p>
                   <p className="font-bold text-lg">₹{currentPrice}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-100 rounded-md text-green-800 text-sm">
                <Smartphone className="w-5 h-5 flex-shrink-0" />
                <p>
                  {language === 'ta' 
                    ? "வாட்ஸ்அப் உறுதிப்படுத்தல் உங்கள் பதிவு செய்யப்பட்ட எண்ணுக்கு அனுப்பப்பட்டது." 
                    : "WhatsApp confirmation sent to your registered number."}
                </p>
              </div>

              {user && confirmedBooking && (
                <div className="pt-2">
                   <DownloadInvoiceButton booking={confirmedBooking} user={user} />
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-center gap-4 flex-col sm:flex-row">
              <Link href="/dashboard"><Button variant="outline" className="w-full sm:w-auto">View Dashboard</Button></Link>
              <Link href="/"><Button className="w-full sm:w-auto">Back to Home</Button></Link>
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
          <h1 className="text-3xl font-bold font-serif mb-2">Book Your GBP Session</h1>
          <p className="text-muted-foreground mb-8">Select a convenient date and time for your child's brain profiling.</p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Selection */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Report Type Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Report Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={reportType} onValueChange={(v) => setReportType(v as "Child" | "Adult")} className="grid sm:grid-cols-2 gap-4">
                    <div className={`border-2 rounded-lg p-4 cursor-pointer hover:bg-accent transition-all ${reportType === 'Child' ? 'border-primary bg-primary/5' : 'border-muted'}`} onClick={() => setReportType('Child')}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg">Student / Child</span>
                        <RadioGroupItem value="Child" id="child" className="data-[state=checked]:border-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">For Grade 10 & 12 Students</p>
                      <Badge variant="secondary" className="font-bold text-lg">₹3,000</Badge>
                    </div>
                    
                    <div className={`border-2 rounded-lg p-4 cursor-pointer hover:bg-accent transition-all ${reportType === 'Adult' ? 'border-primary bg-primary/5' : 'border-muted'}`} onClick={() => setReportType('Adult')}>
                       <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg">Adult / Professional</span>
                        <RadioGroupItem value="Adult" id="adult" className="data-[state=checked]:border-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">For Career Growth & Self Awareness</p>
                      <Badge variant="secondary" className="font-bold text-lg">₹2,000</Badge>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" /> Select Date
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
                  <CardTitle>Select Time Slot</CardTitle>
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
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="font-medium">GBP - {reportType} Report</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">45 Mins</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{date ? format(date, "MMM dd, yyyy") : "Select date"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{selectedTime || "Select time"}</span>
                  </div>
                  
                  <div className="h-px bg-border my-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-2xl text-primary">₹{currentPrice}</span>
                  </div>

                  <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded mt-2 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Includes report generation, GST invoice, and 1 counseling session.</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full text-lg h-12 shadow-md" 
                    onClick={handleBooking}
                    disabled={isProcessing || !date || !selectedTime}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                      </>
                    ) : (
                      <>
                        Pay & Book <CreditCard className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="mt-4 flex flex-col items-center gap-2">
                 <div className="text-xs text-muted-foreground text-center">
                    Secured by Razorpay <br/> (Mock Integration)
                 </div>
                 <div className="flex items-center gap-1 text-xs text-green-600">
                    <Smartphone className="w-3 h-3" />
                    <span>Get WhatsApp Confirmation</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

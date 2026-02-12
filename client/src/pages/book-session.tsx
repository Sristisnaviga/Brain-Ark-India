import { Layout } from "@/components/layout";
import { useData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Check, CreditCard, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function BookSession() {
  const { user, addBooking } = useData();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const timeSlots = [
    "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

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
      addBooking(format(date, "yyyy-MM-dd"), selectedTime);
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 flex justify-center">
          <Card className="w-full max-w-lg text-center border-green-200 bg-green-50/50">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-800">Booking Confirmed!</CardTitle>
              <CardDescription>
                Your GBP session has been successfully booked.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold text-lg">{date ? format(date, "PPPP") : ""}</p>
                <div className="h-px bg-border my-2" />
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-semibold text-lg">{selectedTime}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                A confirmation email has been sent to {user?.email}.
              </p>
            </CardContent>
            <CardFooter className="justify-center gap-4">
              <Link href="/dashboard"><Button variant="outline">View Dashboard</Button></Link>
              <Link href="/"><Button>Back to Home</Button></Link>
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
            {/* Left Column: Calendar */}
            <div className="lg:col-span-2 space-y-6">
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
                    <span className="font-medium">Standard GBP Profiling</span>
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
                    <span className="font-bold text-2xl text-primary">₹2,499</span>
                  </div>

                  <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded mt-2">
                    * Includes report generation and 1 counseling session.
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
              
              <div className="mt-4 flex justify-center gap-2">
                 <div className="text-xs text-muted-foreground text-center">
                    Secured by Razorpay <br/> (Mock Integration)
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

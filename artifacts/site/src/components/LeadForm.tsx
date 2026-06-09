import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCreateLead, getListLeadsQueryKey, getGetLeadStatsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "שם הוא שדה חובה" }),
  email: z.string().email({ message: "כתובת אימייל לא חוקית" }).optional().or(z.literal("")),
  phone: z.string().optional(),
  company: z.string().optional(),
  serviceInterest: z.string().optional(),
  message: z.string().optional(),
});

export function LeadForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      serviceInterest: "",
      message: "",
    },
  });

  const createLead = useCreateLead();

  function onSubmit(values: z.infer<typeof formSchema>) {
    createLead.mutate(
      { data: values },
      {
        onSuccess: () => {
          setIsSuccess(true);
          form.reset();
          queryClient.invalidateQueries({ queryKey: getListLeadsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetLeadStatsQueryKey() });
          toast({
            title: "הפנייה נשלחה בהצלחה!",
            description: "אחזור אליך בהקדם האפשרי.",
          });
          setTimeout(() => setIsSuccess(false), 5000);
        },
        onError: () => {
          toast({
            title: "שגיאה בשליחת הפנייה",
            description: "אנא נסה שוב מאוחר יותר.",
            variant: "destructive",
          });
        },
      }
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-card border border-border rounded-xl animate-in fade-in zoom-in text-center h-[400px]">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">הפנייה התקבלה</h3>
        <p className="text-muted-foreground">
          תודה על פנייתך. אבדוק את הפרטים ואחזור אליך בהקדם.
        </p>
        <Button variant="outline" onClick={() => setIsSuccess(false)} className="mt-4">
          שליחת פנייה נוספת
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card border border-border p-6 md:p-8 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>שם מלא *</FormLabel>
                <FormControl>
                  <Input placeholder="ישראל ישראלי" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>אימייל</FormLabel>
                <FormControl>
                  <Input placeholder="israel@company.co.il" type="email" dir="ltr" className="text-left" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>טלפון</FormLabel>
                <FormControl>
                  <Input placeholder="050-0000000" dir="ltr" className="text-left" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>חברה / ארגון</FormLabel>
                <FormControl>
                  <Input placeholder="שם החברה" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="serviceInterest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>במה אפשר לעזור?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger dir="rtl">
                    <SelectValue placeholder="בחר תחום עניין" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent dir="rtl">
                  <SelectItem value="consulting">ייעוץ אסטרטגי ל-AI</SelectItem>
                  <SelectItem value="automation">אוטומציה של תהליכים</SelectItem>
                  <SelectItem value="training">הדרכות והכשרות צוותים</SelectItem>
                  <SelectItem value="development">פיתוח והטמעה של מודלים</SelectItem>
                  <SelectItem value="other">אחר</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>הודעה / פירוט נוסף</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="ספר/י לי קצת על האתגרים שאת/ה חווה כיום..."
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-12 text-lg" disabled={createLead.isPending}>
          {createLead.isPending && <Loader2 className="ml-2 h-5 w-5 animate-spin" />}
          שליחת פנייה
        </Button>
      </form>
    </Form>
  );
}
import { Link } from "wouter";
import { useListLeads, useGetLeadStats, useUpdateLead, useDeleteLead, getListLeadsQueryKey, getGetLeadStatsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRight, BrainCircuit, Trash2, Mail, Phone, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const STATUS_LABELS = {
  new: "חדש",
  contacted: "נוצר קשר",
  won: "נסגר בהצלחה",
  lost: "לא רלוונטי"
};

const STATUS_COLORS = {
  new: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  contacted: "bg-amber-500/20 text-amber-500 border-amber-500/30",
  won: "bg-green-500/20 text-green-500 border-green-500/30",
  lost: "bg-red-500/20 text-red-500 border-red-500/30"
};

const SERVICE_LABELS: Record<string, string> = {
  consulting: "ייעוץ אסטרטגי ל-AI",
  automation: "אוטומציה של תהליכים",
  training: "הדרכות והכשרות צוותים",
  development: "פיתוח והטמעה של מודלים",
  other: "אחר"
};

export default function Leads() {
  const { data: leads, isLoading: isLoadingLeads } = useListLeads({ query: { queryKey: getListLeadsQueryKey() } });
  const { data: stats, isLoading: isLoadingStats } = useGetLeadStats({ query: { queryKey: getGetLeadStatsQueryKey() } });
  
  const updateLead = useUpdateLead();
  const deleteLead = useDeleteLead();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleStatusChange = (id: number, newStatus: "new" | "contacted" | "won" | "lost") => {
    updateLead.mutate({ id, data: { status: newStatus } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListLeadsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetLeadStatsQueryKey() });
        toast({ title: "סטטוס עודכן בהצלחה" });
      },
      onError: () => {
        toast({ title: "שגיאה בעדכון הסטטוס", variant: "destructive" });
      }
    });
  };

  const handleDelete = (id: number) => {
    deleteLead.mutate({ id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListLeadsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetLeadStatsQueryKey() });
        toast({ title: "הפנייה נמחקה בהצלחה" });
      },
      onError: () => {
        toast({ title: "שגיאה במחיקת הפנייה", variant: "destructive" });
      }
    });
  };

  if (isLoadingLeads || isLoadingStats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold flex items-center gap-2">
            <BrainCircuit className="text-primary w-5 h-5" />
            מערכת ניהול פניות (CRM)
          </div>
          <Button variant="ghost" asChild size="sm">
            <Link href="/">
              חזרה לאתר <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground font-medium">סה"כ פניות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.total || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground font-medium">פניות חדשות</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">{stats?.new || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground font-medium">עסקאות שנסגרו</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{stats?.won || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground font-medium">בשבעת הימים האחרונים</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.last7Days || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-border font-medium text-lg">
            רשימת הפניות
          </div>
          {leads && leads.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-right">שם הלקוח</TableHead>
                    <TableHead className="text-right">פרטי התקשרות</TableHead>
                    <TableHead className="text-right">עניין ב...</TableHead>
                    <TableHead className="text-right">תאריך</TableHead>
                    <TableHead className="text-right">סטטוס</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium align-top">
                        {lead.name}
                        {lead.company && (
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Building className="w-3 h-3 ml-1" />
                            {lead.company}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {lead.email && (
                            <div className="flex items-center" dir="ltr">
                              <span className="truncate max-w-[200px]">{lead.email}</span>
                              <Mail className="w-3 h-3 ml-2 text-primary" />
                            </div>
                          )}
                          {lead.phone && (
                            <div className="flex items-center" dir="ltr">
                              <span>{lead.phone}</span>
                              <Phone className="w-3 h-3 ml-2 text-primary" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="align-top max-w-[200px]">
                        <div className="text-sm truncate">
                          {lead.serviceInterest ? (SERVICE_LABELS[lead.serviceInterest] || lead.serviceInterest) : "-"}
                        </div>
                        {lead.message && (
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2" title={lead.message}>
                            {lead.message}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="align-top whitespace-nowrap text-sm text-muted-foreground">
                        {format(new Date(lead.createdAt), "dd MMM yyyy, HH:mm", { locale: he })}
                      </TableCell>
                      <TableCell className="align-top">
                        <Select 
                          value={lead.status} 
                          onValueChange={(val: any) => handleStatusChange(lead.id, val)}
                        >
                          <SelectTrigger className={`h-8 border text-xs w-[130px] ${STATUS_COLORS[lead.status]}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent dir="rtl">
                            <SelectItem value="new">חדש</SelectItem>
                            <SelectItem value="contacted">נוצר קשר</SelectItem>
                            <SelectItem value="won">נסגר בהצלחה</SelectItem>
                            <SelectItem value="lost">לא רלוונטי</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="align-top text-left">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent dir="rtl">
                            <AlertDialogHeader>
                              <AlertDialogTitle>למחוק פנייה זו?</AlertDialogTitle>
                              <AlertDialogDescription>
                                פעולה זו תמחק את הפנייה מ-{lead.name} באופן בלתי הפיך.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex-row gap-2">
                              <AlertDialogCancel className="mt-0">ביטול</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(lead.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                מחיקה
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-12 text-center text-muted-foreground">
              <div className="mx-auto w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">אין פניות עדיין</h3>
              <p>ברגע שיגיעו פניות מהאתר, הן יופיעו כאן.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
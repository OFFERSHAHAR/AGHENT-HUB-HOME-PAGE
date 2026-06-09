import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { ArrowLeft, BrainCircuit, Zap, BarChart3, Users, ChevronDown, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              <BrainCircuit size={20} />
            </div>
            Agent Hub Guru <span className="text-muted-foreground font-normal hidden sm:inline">| מטמיעי AI בארגונים</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">שירותים</a>
            <a href="#process" className="hover:text-foreground transition-colors">תהליך עבודה</a>
            <a href="#faq" className="hover:text-foreground transition-colors">שאלות נפוצות</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild className="rounded-full px-6">
              <a href="#contact">צור קשר</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              זמין לפרויקטים חדשים
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              הופכים בינה מלאכותית <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-blue-400">לתוצאות עסקיות.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
              אל תישארו מאחור. אנחנו מלווים ארגונים בהטמעת טכנולוגיות AI, אוטומציה של תהליכים וחיסכון בזמן יקר – מהאסטרטגיה ועד לביצוע בשטח.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full group" asChild>
                <a href="#contact">
                  בואו נדבר
                  <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-background/50 backdrop-blur" asChild>
                <a href="#services">
                  איך זה עובד?
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="py-12 border-b border-white/5 bg-white/2">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-x-reverse divide-white/10 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">40%</div>
              <div className="text-sm text-muted-foreground">חיסכון בזמן עבודה ממוצע</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">+15</div>
              <div className="text-sm text-muted-foreground">ארגונים שעברו הטמעה</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">התאמה אישית לצרכי החברה</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">תמיכה וליווי צמוד</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">פתרונות שמביאים ערך אמיתי</h2>
            <p className="text-muted-foreground text-lg">
              לא רק מילות באזז - פתרונות פרקטיים שמשתלבים בתהליכי העבודה הקיימים שלכם.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <BrainCircuit size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">אסטרטגיית AI וייעוץ</h3>
              <p className="text-muted-foreground leading-relaxed">
                מיפוי תהליכי העבודה בארגון, זיהוי צווארי בקבוק, ובניית מפת דרכים ברורה להטמעת פתרונות בינה מלאכותית.
              </p>
            </div>
            <div className="bg-card border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">אוטומציה וייעול</h3>
              <p className="text-muted-foreground leading-relaxed">
                חיבור בין מערכות, סוכני AI (Agents) אוטונומיים, ואוטומציה של משימות שגרתיות שגוזלות זמן יקר מהצוות.
              </p>
            </div>
            <div className="bg-card border border-border p-8 rounded-2xl hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">הכשרת צוותים</h3>
              <p className="text-muted-foreground leading-relaxed">
                סדנאות מעשיות לצוותי הנהלה ועובדים: איך להשתמש בכלים כמו ChatGPT, Claude ו-Midjourney בצורה מקצועית.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-white/2 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">איך אנחנו עובדים יחד?</h2>
              <p className="text-muted-foreground text-lg mb-8">
                תהליך העבודה שלנו מובנה, שקוף וממוקד בתוצאות. מהרגע הראשון נגדיר יעדים מדידים שיבטיחו החזר השקעה (ROI) מהיר.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">אפיון ומיפוי צרכים</h4>
                    <p className="text-muted-foreground">פגישת היכרות מעמיקה ללמידת הארגון, האתגרים וההזדמנויות לשילוב AI.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">תכנון אסטרטגיה ובחירת כלים</h4>
                    <p className="text-muted-foreground">התאמת הכלים והמודלים הנכונים ביותר לצרכים שלכם, מבלי לבזבז על טכנולוגיה מיותרת.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">פיתוח, הטמעה והדרכה</h4>
                    <p className="text-muted-foreground">ביצוע ההטמעה בפועל, חיבור המערכות, והעברת סדנאות הדרכה לצוותים.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">ליווי ואופטימיזציה מתמדת</h4>
                    <p className="text-muted-foreground">מדידת התוצאות, שיפור מתמיד של התהליכים והתאמה לחידושים בעולם ה-AI.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full bg-card border border-border p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">מוכנים לצאת לדרך?</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  <span>פגישת אפיון ראשונית ללא עלות</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  <span>הצעת מחיר מותאמת אישית</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  <span>לוחות זמנים ברורים מראש</span>
                </li>
              </ul>
              <Button size="lg" className="w-full h-14 text-lg" asChild>
                <a href="#contact">לתיאום פגישה אישית</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">שאלות נפוצות</h2>
            <p className="text-muted-foreground">כל מה שרציתם לדעת על תהליך ההטמעה.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">האם אנחנו צריכים ידע טכני מוקדם?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                ממש לא. התפקיד שלנו הוא להנגיש את הטכנולוגיה ולהפוך אותה לפשוטה לשימוש עבור כל עובד, גם ללא שום רקע טכני.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">כמה זמן לוקח תהליך ההטמעה?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                משך התהליך משתנה בהתאם למורכבות והיקף הפרויקט. פרויקטים ממוקדים יכולים להסתיים תוך שבועיים-שלושה, בעוד שהטמעה רוחבית בארגון גדול יכולה לארוך מספר חודשים.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">האם המידע של הארגון מאובטח?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                אבטחת מידע היא בראש סדר העדיפויות. אנו משתמשים רק בכלים שעומדים בתקני האבטחה המחמירים ביותר (Enterprise Grade) ומגדירים הרשאות שימוש בהתאם למדיניות הארגון, כולל אימון מודלים ללא שמירת דאטה חיצונית במידת הצורך.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg">האם ה-AI יחליף את העובדים שלי?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                לא. המטרה של AI היא להעצים את העובדים, להוריד מהם את המשימות השוחקות והחזרתיות, ולאפשר להם להתמקד בחשיבה אסטרטגית, יצירתיות ותקשורת בינאישית — דברים שמכונות עדיין לא יודעות לעשות.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-primary/5 border-t border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
            <div className="flex-1 md:pt-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">הגיע הזמן לעשות את הצעד הבא.</h2>
              <p className="text-xl text-muted-foreground mb-8">
                השאירו פרטים ונבדוק יחד איך בינה מלאכותית יכולה לחסוך לארגון שלכם זמן, כסף ומשאבים.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center border border-border">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">מענה תוך 24 שעות</div>
                    <div className="text-sm">בימי עסקים</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-bold">
              <BrainCircuit className="text-primary" />
              Agent Hub Guru AI Engineering
            </div>
            <span className="text-muted-foreground text-sm">עופר שחר ואור מוסה</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Agent Hub Guru AI Engineering · כל הזכויות שמורות.
          </p>
          <div className="flex gap-4">
            <Link href="/leads" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              כניסת מנהל
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
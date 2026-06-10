import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BrainCircuit,
  Waves,
  Hotel,
  CheckCircle2,
  Menu,
  Sparkles,
  Code2,
  Headphones,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

const WHATSAPP_URL =
  "https://wa.me/972505316380?text=%D7%94%D7%99%D7%99%2C%20%D7%A8%D7%90%D7%99%D7%AA%D7%99%20%D7%90%D7%AA%20%D7%94%D7%A4%D7%99%D7%AA%D7%95%D7%97%D7%99%D7%9D%20%D7%A9%D7%9C%D7%9B%D7%9D%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%95%D7%93";

const HOME = import.meta.env.BASE_URL;

type Stat = { value: string; label: string; sub: string };
type FeatureGroup = { num: string; title: string; desc: string };
type TeamMember = { role: string; name: string; icon: typeof Code2 };

type Product = {
  name: string;
  subtitle: string;
  badge: string;
  tagline: string;
  description: string;
  icon: typeof Waves;
  logoSrc?: string;
  imageSrc?: string;
  imageAlt?: string;
  tags?: string[];
  stats?: Stat[];
  featureGroups?: FeatureGroup[];
  features?: string[];
  team?: TeamMember[];
};

const products: Product[] = [
  {
    name: "Galileo",
    subtitle: "מערכת ניהול בריכות מקצועית",
    badge: "בפעולה אצל לקוחות",
    tagline: "ניהול בריכות חכם לצוותי שטח",
    description:
      "אפליקציית PWA בעברית לניהול פעילות בריכות מקצה לקצה — עם ממשק מנהל וממשק מפעיל שטח. חלוקת עבודה יומית, מדידות מים, דוחות טיפול, מעקב חומרים, התראות, ולקוחות במקום אחד. עבודה מול Google Sheets, התראות ודוחות אוטומטיים ללקוח.",
    icon: Waves,
    logoSrc: `${HOME}galileo-logo.png`,
    imageSrc: `${HOME}galileo-mockup.png`,
    imageAlt: "צילום מסך של אפליקציית Galileo לניהול בריכות",
    tags: ["PWA", "מובייל", "מנהלים", "שטח"],
    stats: [
      { value: "18", label: "משימות היום", sub: "סדר עבודה חי" },
      { value: "32", label: "לקוחות פעילים", sub: "ניהול לפי יום ומפעיל" },
      { value: "24/7", label: "PWA", sub: "מותקן כמו אפליקציה" },
      { value: "94%", label: "התקדמות", sub: "תצוגת מנהל בזמן אמת" },
    ],
    featureGroups: [
      {
        num: "01",
        title: "פאנל ניהול",
        desc: "מחוונים, לקוחות, משתמשים, חלוקת עבודה, משימות, שעות, תקלות ודוחות.",
      },
      {
        num: "02",
        title: "אפליקציית שטח",
        desc: "סדר יום למפעיל, מדידות מים, דוח טיפול, צילום, חומרים וסימון ביצוע.",
      },
      {
        num: "03",
        title: "אוטומציות",
        desc: "שליחת הודעות WhatsApp, התראות Push, סנכרון נתונים ושמירת cache לעבודה מהירה.",
      },
      {
        num: "04",
        title: "מוצר מותקן",
        desc: "PWA עם אייקונים, מסכי פתיחה, רישוי, הרשאות מנהל/מפעיל והתאמה למובייל.",
      },
    ],
    team: [
      { role: "מפתח ראשי", name: "אור מוסה", icon: Code2 },
      { role: "צוות טכני ותמיכה", name: "עופר שחר", icon: Headphones },
    ],
  },
  {
    name: "בית ויליאמס",
    subtitle: "מערכת ניהול בית אירוח",
    badge: "בפעולה אצל לקוחות",
    tagline: "ניהול תפעול מלא לבית אירוח",
    description:
      "מערכת PWA בעברית לניהול פעילות יומיומית בבית אירוח, עם הרשאות לפי תפקיד: יומן חדרים, משק בית, אחזקה, קניות, שעות עבודה, הודעות והתראות לצוות. ניהול חדרים, כניסות ועזיבות, מעקב תקלות וסימון ביצוע — הכול במקום אחד ובזמן אמת.",
    icon: Hotel,
    logoSrc: `${HOME}williams-logo.png`,
    imageSrc: `${HOME}williams-mockup.png`,
    imageAlt: "צילום מסך של אפליקציית בית ויליאמס לניהול בית אירוח",
    tags: ["PWA", "חדרים", "משק בית", "אחזקה"],
    stats: [
      { value: "5", label: "יחידות אירוח", sub: "קרון, יורט, ראג'ה, עדי, שיטה" },
      { value: "4", label: "תפקידי צוות", sub: "מנהל, הזמנות, אחזקה, משק" },
      { value: "Live", label: "יומן חדרים", sub: "כניסות, עזיבות וחסימות" },
      { value: "PWA", label: "אפליקציה מותקנת", sub: "מותאם למובייל ולשטח" },
    ],
    featureGroups: [
      {
        num: "01",
        title: "יומן חדרים והזמנות",
        desc: "כניסות, עזיבות, החלפות, חסימות, שהיית בעלים ותצוגה שבועית/חודשית.",
      },
      {
        num: "02",
        title: "משק בית",
        desc: "רשימת חדרים להכנה, סימון חדר מוכן, דיווח תקלה והעברת התראה לצוות.",
      },
      {
        num: "03",
        title: "אחזקה וקניות",
        desc: "משימות פתוחות, עדיפויות, פריטים לרכישה, מלאי בסיסי ומעקב ביצוע.",
      },
      {
        num: "04",
        title: "תפעול צוות",
        desc: "תפקידי משתמש, הודעות, התראות Push, שעות עבודה, סנכרון ו-cache לעבודה מהירה.",
      },
    ],
    team: [
      { role: "מפתח ראשי", name: "עופר שחר", icon: Code2 },
      { role: "תמיכה וליווי", name: "אור מוסה", icon: Headphones },
    ],
  },
];

export default function Products() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-xl tracking-tight flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              <BrainCircuit size={20} />
            </div>
            Agent Hub Guru{" "}
            <span className="text-muted-foreground font-normal hidden sm:inline">
              | מטמיעי AI בארגונים
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              בית
            </Link>
            <a
              href={`${HOME}#services`}
              className="hover:text-foreground transition-colors"
            >
              שירותים
            </a>
            <span className="text-foreground">הפיתוחים שלנו</span>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild className="rounded-full px-6">
              <a href={`${HOME}#contact`}>צור קשר</a>
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden rounded-full"
                  aria-label="פתיחת תפריט"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="text-right mb-8 flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                    <BrainCircuit size={20} />
                  </div>
                  Agent Hub Guru
                </SheetTitle>
                <nav className="flex flex-col gap-2 text-lg font-medium">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      בית
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <a
                      href={`${HOME}#services`}
                      className="py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      שירותים
                    </a>
                  </SheetClose>
                  <SheetClose asChild>
                    <span className="py-3 px-4 rounded-lg bg-white/5 text-foreground">
                      הפיתוחים שלנו
                    </span>
                  </SheetClose>
                </nav>
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full mt-8 rounded-full">
                    <a href={`${HOME}#contact`}>בואו נדבר</a>
                  </Button>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-36 pb-16 md:pt-48 md:pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src={`${HOME}hero-bg.png`}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            פיתוחים מקוריים שכבר עובדים בשטח
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-balance">
            לא רק מייעצים —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-blue-400">
              בונים מערכות אמיתיות.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            אלו פתרונות תוכנה מקוריים שפיתחנו מאפס ופועלים כבר היום אצל לקוחות
            אמיתיים. כל מערכת נבנתה כדי לפתור כאב תפעולי אמיתי — וכך גם נוכל לבנות
            עבורכם.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-16 md:gap-24 max-w-5xl mx-auto">
            {products.map((product, index) => (
              <ProductShowcase
                key={product.name}
                product={product}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary/5 border-t border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            יש לכם תהליך שצריך מערכת משלו?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            בדיוק כמו שבנינו את המערכות האלו, נוכל לבנות פתרון מקורי שמתאים בול
            לארגון שלכם. ספרו לנו על האתגר — ונראה לכם איך נראה הפתרון.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full group" asChild>
              <a href={`${HOME}#contact`}>
                בואו נדבר
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg rounded-full bg-background/50 backdrop-blur"
              asChild
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                דברו איתנו בוואטסאפ
              </a>
            </Button>
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
            <span className="text-muted-foreground text-sm">
              עופר שחר ואור מוסה
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Agent Hub Guru AI Engineering · כל
            הזכויות שמורות.
          </p>
          <div className="flex gap-4">
            <Link
              href="/leads"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              כניסת מנהל
            </Link>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp CTA — mobile bar */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שיחה בוואטסאפ"
        className="md:hidden fixed bottom-5 inset-x-4 z-50 flex items-center justify-center gap-2 h-14 rounded-full bg-[#25D366] text-white font-bold text-lg shadow-2xl shadow-[#25D366]/30 active:scale-[0.98] transition-transform"
      >
        <WhatsAppIcon className="w-6 h-6" />
        דברו איתנו בוואטסאפ
      </a>

      {/* Floating WhatsApp FAB — desktop */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שיחה בוואטסאפ"
        className="hidden md:flex fixed bottom-6 left-6 z-50 items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 hover:scale-105 transition-transform"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </div>
  );
}

function ProductShowcase({
  product,
  reverse,
}: {
  product: Product;
  reverse: boolean;
}) {
  const Icon = product.icon;
  return (
    <article className="bg-card border border-border rounded-3xl overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-10">
        {/* Visual */}
        <div className={`relative ${reverse ? "lg:order-2" : "lg:order-1"}`}>
          {product.imageSrc ? (
            <div className="relative aspect-[4/5] sm:aspect-[16/12] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center p-4">
              <img
                src={product.imageSrc}
                alt={product.imageAlt ?? product.name}
                loading="lazy"
                decoding="async"
                className="max-h-[520px] w-auto h-full object-contain drop-shadow-2xl"
              />
            </div>
          ) : (
            <div className="aspect-[4/3] lg:h-full rounded-2xl border border-border bg-background/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/10" />
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="relative h-full flex flex-col items-center justify-center gap-5 p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary">
                  <Icon size={40} />
                </div>
                <div className="text-lg font-bold">{product.name}</div>
                <div className="text-sm text-muted-foreground max-w-xs">
                  {product.tagline}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`${reverse ? "lg:order-1" : "lg:order-2"}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {product.badge}
          </div>

          <div className="flex items-center gap-3 mb-3">
            {product.logoSrc && (
              <img
                src={product.logoSrc}
                alt={`${product.name} לוגו`}
                className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-border"
                loading="lazy"
              />
            )}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                {product.name}
              </h2>
              <div className="text-sm text-muted-foreground">
                {product.subtitle}
              </div>
            </div>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            {product.description}
          </p>

          {product.stats && product.stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
              {product.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-background/50 border border-border p-3 text-center"
                >
                  <div className="text-xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium mt-0.5">{stat.label}</div>
                  <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          )}

          {product.features && (
            <ul className="space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Feature groups (full width) */}
      {product.featureGroups && product.featureGroups.length > 0 && (
        <div className="border-t border-border bg-background/30 p-6 md:p-10">
          <h3 className="text-lg font-bold mb-6">מה המערכת כוללת</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {product.featureGroups.map((group) => (
              <div
                key={group.num}
                className="rounded-2xl border border-border bg-card p-5 flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center font-bold text-sm">
                  {group.num}
                </div>
                <div>
                  <h4 className="font-bold mb-1">{group.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {group.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team credits */}
      {product.team && product.team.length > 0 && (
        <div className="border-t border-border p-6 md:px-10 md:py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <span className="text-sm font-medium text-muted-foreground">
            הצוות מאחורי המוצר
          </span>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {product.team.map((member) => {
              const MemberIcon = member.icon;
              return (
                <div key={member.name} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <MemberIcon size={18} />
                  </div>
                  <div className="leading-tight">
                    <div className="font-bold text-sm">{member.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {member.role}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import {
  type GeneratedContent,
  type StoryboardSegment,
  fullStoryboardText,
  generateContent,
} from "@/lib/generate";
import {
  AlignLeft,
  Check,
  Copy,
  Film,
  Hash,
  Loader2,
  Mic,
  Tag,
  Video,
  Youtube,
  Zap,
} from "lucide-react";
import { useCallback, useState } from "react";

function CopyButton({
  text,
  label = "Copy",
  dataOcid,
}: {
  text: string;
  label?: string;
  dataOcid?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      data-ocid={dataOcid}
      className="gap-1.5 border-border/50 bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted text-xs"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-400" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {copied ? "Copied!" : label}
    </Button>
  );
}

function SectionHeader({
  icon,
  title,
  color,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/40">
      <div className="flex items-center gap-2">
        <span className={color}>{icon}</span>
        <h2 className="font-display font-bold text-base text-foreground">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div data-ocid="topic.loading_state" className="space-y-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-xl border border-border/30 bg-card p-5">
          <Skeleton className="h-5 w-40 mb-3 bg-muted/50" />
          <Skeleton className="h-4 w-full mb-2 bg-muted/40" />
          <Skeleton className="h-4 w-4/5 mb-2 bg-muted/40" />
          <Skeleton className="h-4 w-3/5 bg-muted/40" />
        </div>
      ))}
    </div>
  );
}

const SEGMENT_COLORS = [
  {
    badge: "bg-primary/15 text-primary border-primary/30",
    label: "text-primary",
  },
  { badge: "bg-accent/15 text-accent border-accent/30", label: "text-accent" },
  {
    badge: "bg-chart-3/15 text-chart-3 border-chart-3/30",
    label: "text-chart-3",
  },
  {
    badge: "bg-chart-4/15 text-chart-4 border-chart-4/30",
    label: "text-chart-4",
  },
  {
    badge: "bg-chart-5/15 text-chart-5 border-chart-5/30",
    label: "text-chart-5",
  },
];

function StoryboardCard({
  segment,
  index,
}: {
  segment: StoryboardSegment;
  index: number;
}) {
  const colors = SEGMENT_COLORS[index % SEGMENT_COLORS.length];
  const copyText = `[${segment.timeRange} — ${segment.label}]\nNarration: ${segment.narration}\nVisual Prompt: ${segment.visualPrompt}`;

  return (
    <div className="rounded-xl border border-border/30 bg-background/40 overflow-hidden">
      {/* Segment header */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/20 border-b border-border/20">
        <div className="flex items-center gap-2.5">
          <Badge
            variant="outline"
            className={`text-xs font-mono font-bold ${colors.badge}`}
          >
            {segment.timeRange}
          </Badge>
          <span
            className={`text-xs font-bold uppercase tracking-widest ${colors.label}`}
          >
            {segment.label}
          </span>
        </div>
        <CopyButton text={copyText} label="Copy" />
      </div>

      {/* Narration block */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Mic className="h-3 w-3 text-muted-foreground" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Narration
          </span>
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed pl-1">
          {segment.narration}
        </p>
      </div>

      {/* Visual Prompt block */}
      <div className="px-4 pb-4 pt-2">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Video className="h-3 w-3 text-muted-foreground" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Visual Prompt
          </span>
        </div>
        <p className="text-xs text-foreground/70 leading-relaxed italic bg-muted/20 rounded-lg px-3 py-2 border border-border/20">
          {segment.visualPrompt}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const { actor } = useActor();

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    setContent(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = generateContent(topic.trim());
    setContent(result);
    setIsLoading(false);

    if (actor) {
      try {
        await actor.addToHistory(topic.trim());
      } catch (_e) {
        // silently fail
      }
    }
  }, [topic, actor]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Background decoration */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% -10%, oklch(0.62 0.24 27 / 0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 30% at 80% 100%, oklch(0.72 0.18 195 / 0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 pb-20">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10">
            <Youtube className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Shorts Creator
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground leading-tight mb-3">
            YouTube Shorts
            <span className="block text-primary">Content Generator</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            Enter any topic and get a complete, ready-to-film YouTube Shorts
            package in seconds.
          </p>
        </header>

        {/* Input */}
        <div className="rounded-2xl border border-border/50 bg-card p-5 mb-8 section-glow-red">
          <label
            htmlFor="topic-input"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            What's your topic?
          </label>
          <Textarea
            id="topic-input"
            data-ocid="topic.textarea"
            placeholder="e.g. The Great Wall of China, Quantum Computing, Sleep Optimization..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            className="resize-none bg-background/60 border-border/50 focus:border-primary/60 text-foreground placeholder:text-muted-foreground/50 mb-4"
          />
          <Button
            data-ocid="topic.submit_button"
            onClick={handleGenerate}
            disabled={isLoading || !topic.trim()}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-11 gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                Generate Full Content
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground/60 text-center mt-2">
            ⌘+Enter to generate
          </p>
        </div>

        {/* Loading */}
        {isLoading && <LoadingSkeleton />}

        {/* Results */}
        {content && !isLoading && (
          <div className="space-y-4">
            {/* Hooks */}
            <section
              data-ocid="hooks.section"
              className="rounded-2xl border border-border/30 bg-card p-5 section-glow-red fade-in stagger-1 opacity-0"
            >
              <SectionHeader
                icon={<Zap className="h-4 w-4" />}
                title="5 Hook Ideas"
                color="text-primary"
              >
                <CopyButton
                  dataOcid="hooks.primary_button"
                  text={content.hooks
                    .map((hook, i) => `${i + 1}. ${hook}`)
                    .join("\n")}
                  label="Copy All"
                />
              </SectionHeader>
              <ol className="space-y-2.5">
                {content.hooks.map((hook, i) => (
                  <li
                    key={hook}
                    className="flex gap-3 items-start text-sm text-foreground/90"
                  >
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span>{hook}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Storyboard */}
            <section
              data-ocid="storyboard.section"
              className="rounded-2xl border border-border/30 bg-card p-5 section-glow-cyan fade-in stagger-2 opacity-0"
            >
              <SectionHeader
                icon={<Film className="h-4 w-4" />}
                title="40-Second Storyboard"
                color="text-accent"
              >
                <CopyButton
                  dataOcid="storyboard.primary_button"
                  text={fullStoryboardText(content.storyboard)}
                  label="Copy All"
                />
              </SectionHeader>
              <div className="space-y-3">
                {content.storyboard.map((segment, i) => (
                  <StoryboardCard
                    key={segment.timeRange}
                    segment={segment}
                    index={i}
                  />
                ))}
              </div>
            </section>

            {/* Titles */}
            <section
              data-ocid="titles.section"
              className="rounded-2xl border border-border/30 bg-card p-5 section-glow-purple fade-in stagger-3 opacity-0"
            >
              <SectionHeader
                icon={<Film className="h-4 w-4" />}
                title="5 Title Ideas"
                color="text-chart-4"
              >
                <CopyButton
                  dataOcid="titles.primary_button"
                  text={content.titles
                    .map((title, i) => `${i + 1}. ${title}`)
                    .join("\n")}
                  label="Copy All"
                />
              </SectionHeader>
              <ol className="space-y-2">
                {content.titles.map((title, i) => (
                  <li
                    key={title}
                    className="flex gap-3 items-start text-sm text-foreground/90"
                  >
                    <span className="shrink-0 w-6 h-6 rounded-full bg-chart-4/15 text-chart-4 text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="font-medium">{title}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Description */}
            <section
              data-ocid="description.section"
              className="rounded-2xl border border-border/30 bg-card p-5 section-glow-yellow fade-in stagger-4 opacity-0"
            >
              <SectionHeader
                icon={<AlignLeft className="h-4 w-4" />}
                title="Description"
                color="text-chart-5"
              >
                <CopyButton
                  dataOcid="description.primary_button"
                  text={content.description}
                  label="Copy"
                />
              </SectionHeader>
              <p className="text-sm text-foreground/85 leading-relaxed bg-background/40 rounded-lg p-3 border border-border/30">
                {content.description}
              </p>
            </section>

            {/* Tags */}
            <section
              data-ocid="tags.section"
              className="rounded-2xl border border-border/30 bg-card p-5 section-glow-teal fade-in stagger-5 opacity-0"
            >
              <SectionHeader
                icon={<Hash className="h-4 w-4" />}
                title={`Tags (${content.tags.length})`}
                color="text-[oklch(0.65_0.16_175)]"
              >
                <CopyButton
                  dataOcid="tags.primary_button"
                  text={content.tags.join(", ")}
                  label="Copy All"
                />
              </SectionHeader>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-muted/50 text-foreground/70 hover:bg-muted cursor-default"
                  >
                    <Tag className="h-2.5 w-2.5 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-xs text-muted-foreground/40">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted-foreground/70 underline underline-offset-2 transition-colors"
          >
            caffeine.ai
          </a>
        </footer>
      </div>
    </div>
  );
}

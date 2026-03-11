export interface StoryboardSegment {
  timeRange: string;
  label: string;
  narration: string;
  visualPrompt: string;
}

export interface GeneratedContent {
  hooks: string[];
  storyboard: StoryboardSegment[];
  titles: string[];
  description: string;
  tags: string[];
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function topicSlug(topic: string): string {
  return topic.toLowerCase().trim();
}

function hashTopic(topic: string): number {
  let hash = 0;
  for (let i = 0; i < topic.length; i++) {
    hash = (hash * 31 + topic.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function generateContent(topic: string): GeneratedContent {
  const t = topicSlug(topic);
  const T = capitalize(t);
  const h = hashTopic(t);
  const variant = h % 4;

  // 5 hook variants rotated by topic hash
  const hookSets: string[][] = [
    [
      `What if everything you knew about ${t} was completely wrong?`,
      `99% of people don't know this shocking truth about ${t}…`,
      `You've been doing ${t} wrong your entire life — here's why.`,
      `The reason why ${t} is changing the world faster than you think.`,
      `I challenged myself to master ${t} in 30 days — the results blew my mind.`,
    ],
    [
      `Stop scrolling — what I'm about to tell you about ${t} will change how you see everything.`,
      `Scientists just discovered something about ${t} that nobody's talking about.`,
      `If you care about ${t}, you need to watch this right now.`,
      `The one thing about ${t} that experts keep hiding from you.`,
      `Most people spend years studying ${t} and still miss this.`,
    ],
    [
      `Here's the uncomfortable truth about ${t} that nobody wants to admit.`,
      `This one insight about ${t} took me years to figure out — you'll get it in 40 seconds.`,
      `Why do millions of people misunderstand ${t}? I'll show you.`,
      `${T} is more fascinating than you ever imagined — and I can prove it.`,
      `Before you go another day without knowing this about ${t}, watch this.`,
    ],
    [
      `The world changed the moment we understood ${t} — here's how.`,
      `Forget what you learned in school about ${t}. This is the real story.`,
      `${T} is hiding something remarkable. Let me explain in 40 seconds.`,
      `If you understood ${t} at this level, your whole perspective would shift.`,
      `What ${t} teaches us about life that nobody talks about.`,
    ],
  ];

  const hooks = hookSets[variant];

  // Storyboard: 5 time-coded segments with narration + visual prompt
  const storyboardVariants: StoryboardSegment[][] = [
    // Variant 0: Dramatic Reveal style
    [
      {
        timeRange: "0–2 seconds",
        label: "Hook",
        narration: `${T} is not what you think it is. Give me 40 seconds — I'll prove it.`,
        visualPrompt: `Extreme close-up cinematic shot of ${t}, dramatic chiaroscuro lighting, dark vignette edges, single golden highlight, hyper-realistic 8K, tension-building atmosphere, shallow depth of field`,
      },
      {
        timeRange: "3–8 seconds",
        label: "Context",
        narration: `For years, people have had a surface-level understanding of ${t}. But the deeper you look, the more it surprises you.`,
        visualPrompt: `Wide establishing documentary-style shot showing the broader world of ${t}, golden hour cinematic lighting, rich earth tones, photorealistic, establishing atmosphere`,
      },
      {
        timeRange: "9–18 seconds",
        label: "Explanation",
        narration: `Here's what most people miss: the fundamentals of ${t} that seem simple are actually the most powerful parts. The patterns, the principles, the hidden mechanics — once you see them, you can't unsee them.`,
        visualPrompt: `Split-screen infographic visualization of ${t} with clean modern design, glowing cyan accents on deep navy background, dynamic data-visualization aesthetic, 4K sharp, animated diagram style still frame`,
      },
      {
        timeRange: "19–30 seconds",
        label: "Deep Dive",
        narration: `Studies show that people who truly understand ${t} consistently outperform those who only know the surface. The difference isn't talent — it's the depth of their knowledge. And it comes down to one core insight.`,
        visualPrompt: `Person in focused contemplation surrounded by ${t} concept visuals, moody dramatic lighting, bokeh background with soft glowing particles, cinematic portrait 35mm lens, documentary aesthetic`,
      },
      {
        timeRange: "31–40 seconds",
        label: "Conclusion",
        narration: `Now you know the real truth about ${t}. This is just the beginning. Follow for more insights that will genuinely change how you think.`,
        visualPrompt: `Triumphant wide shot: person looking empowered and inspired, ${t} symbolism woven into background, uplifting warm sunrise lighting, motivational cinematic mood, bokeh foreground elements, 8K photo`,
      },
    ],
    // Variant 1: Myth-Busting style
    [
      {
        timeRange: "0–2 seconds",
        label: "Hook",
        narration: `Everything you've been told about ${t}? Most of it is wrong.`,
        visualPrompt: `Bold typographic splash frame: "${T}?" in massive white sans-serif on deep black, red underlining slashing through, high-contrast editorial design, print magazine aesthetic`,
      },
      {
        timeRange: "3–8 seconds",
        label: "Context",
        narration: `The conventional wisdom around ${t} has been around for decades. It's been repeated so many times, people stopped questioning it.`,
        visualPrompt: `Archival documentary aesthetic: sepia-toned montage frames of ${t}, aged film grain overlay, historical atmosphere, faded vignette, cinematic 4:3 ratio feel`,
      },
      {
        timeRange: "9–18 seconds",
        label: "Explanation",
        narration: `But when researchers actually studied ${t} up close, they found something completely different. The real mechanism behind ${t} is counterintuitive — and once you understand it, it changes everything.`,
        visualPrompt: `Scientific illustration style: clean white lab aesthetic, ${t} deconstructed into component diagrams, teal and electric blue color palette, precise vector-art feel, modern research presentation`,
      },
      {
        timeRange: "19–30 seconds",
        label: "Deep Dive",
        narration: `Take this example: when you apply the correct mental model for ${t}, the results are dramatic. Not marginal improvements — we're talking order-of-magnitude differences in outcomes.`,
        visualPrompt: `Before/after split composition showing contrast related to ${t}, left side muted and grey, right side vibrant and energetic, dynamic lighting shift across the frame, editorial photography style`,
      },
      {
        timeRange: "31–40 seconds",
        label: "Conclusion",
        narration: `So the next time someone tells you about ${t} the old way, you'll know better. Follow for more myth-busting content every single day.`,
        visualPrompt: `Confident portrait of someone smiling with ${t} visual metaphors in background, bold warm lighting, magazine cover quality, natural depth of field, authentic candid energy`,
      },
    ],
    // Variant 2: Journey/Challenge style
    [
      {
        timeRange: "0–2 seconds",
        label: "Hook",
        narration: `I spent 30 days going deep on ${t}. Here's what actually happened.`,
        visualPrompt: `Action-packed opener: dynamic motion blur of ${t} in progress, vivid saturated colors, fast-paced energy, GoPro-style cinematic frame, high octane atmosphere`,
      },
      {
        timeRange: "3–8 seconds",
        label: "Context",
        narration: `I went in with zero experience. Just curiosity and a notebook. The first week of learning ${t} humbled me completely.`,
        visualPrompt: `Intimate journaling aesthetic: open notebook, coffee, soft morning window light, ${t} reference materials scattered, cozy productive atmosphere, warm analog photography style`,
      },
      {
        timeRange: "9–18 seconds",
        label: "Explanation",
        narration: `By day 15, something clicked. The key to ${t} isn't what most people think — it's about consistency over intensity, systems over willpower, and understanding the underlying pattern.`,
        visualPrompt: `Progress visualization: ascending graph or timeline showing ${t} growth, clean infographic style, forest green and white palette, milestone markers glowing, data storytelling aesthetic`,
      },
      {
        timeRange: "19–30 seconds",
        label: "Deep Dive",
        narration: `By day 30, the compound effect of truly understanding ${t} was undeniable. The gap between beginners and those who get the fundamentals right widens exponentially — not linearly.`,
        visualPrompt: `Time-lapse style composition: ${t} transformation montage frozen in one frame, overlapping exposures, dynamic movement implied, vivid color grading, cinematic energy`,
      },
      {
        timeRange: "31–40 seconds",
        label: "Conclusion",
        narration: `30 days of ${t} taught me more about focus and consistency than anything else. Try it. Follow for more experiments like this.`,
        visualPrompt: `Triumphant final frame: sunlit open landscape with ${t} visual metaphor, golden hour rays, person in silhouette looking toward horizon, epic cinematic wide angle, motivational mood`,
      },
    ],
    // Variant 3: Philosophical/Insight style
    [
      {
        timeRange: "0–2 seconds",
        label: "Hook",
        narration: `There's a hidden layer to ${t} that almost nobody reaches. This is what it looks like.`,
        visualPrompt: `Abstract philosophical visual: deep perspective tunnel with ${t} symbolism, layers of meaning implied through geometric depth, midnight blue and gold color palette, surreal realism`,
      },
      {
        timeRange: "3–8 seconds",
        label: "Context",
        narration: `On the surface, ${t} looks like one thing. But every field of deep expertise reveals a second layer — one that only shows up after sustained attention.`,
        visualPrompt: `Dual-layer visual metaphor: iceberg or depth composition with ${t} theme, upper surface ordinary, lower depth extraordinary, cool ocean blues, cinematic underwater photography style`,
      },
      {
        timeRange: "9–18 seconds",
        label: "Explanation",
        narration: `That second layer of ${t} is where the real insight lives. It's counterintuitive, often uncomfortable, and rarely discussed — because it requires you to unlearn what you thought you knew.`,
        visualPrompt: `Mind-map or neural network visual inspired by ${t}, glowing synaptic connections, dark background with electric teal and violet nodes, knowledge architecture aesthetic, sci-fi realism`,
      },
      {
        timeRange: "19–30 seconds",
        label: "Deep Dive",
        narration: `Once you see this second layer, ${t} becomes a completely different tool. You start using it with precision instead of guesswork. The results are genuinely remarkable.`,
        visualPrompt: `Precision and mastery visual: detailed craftwork or focused expertise related to ${t}, warm workshop lighting, shallow depth of field on hands or tools, artisanal documentary aesthetic`,
      },
      {
        timeRange: "31–40 seconds",
        label: "Conclusion",
        narration: `Most people never reach that layer of ${t}. But now you know it exists. Go find it. Follow for more of this.`,
        visualPrompt: `Meditative final composition: lone figure contemplating vast landscape with ${t} visual echoes, cosmic or natural grandeur, long exposure starlight or sunset, philosophical cinematic mood`,
      },
    ],
  ];

  const storyboard = storyboardVariants[variant];

  // Title variants
  const titleSets: string[][] = [
    [
      `Why ${T} Will Change Your Life Forever #Shorts`,
      `The Truth About ${T} Nobody Tells You`,
      `${T} Will Shock You — Watch Until The End`,
      `Nobody Talks About This Side of ${T}`,
      `I Tried ${T} For 30 Days — Here's What Happened`,
    ],
    [
      `Stop Ignoring This About ${T} #Shorts`,
      `${T}: The Secret Everyone Misses`,
      `What They Don't Teach You About ${T}`,
      `This ${T} Fact Will Blow Your Mind`,
      `${T} Explained In 40 Seconds`,
    ],
    [
      `The ${T} Myth That's Holding You Back`,
      `Why Most People Get ${T} Wrong`,
      `${T} Is Not What You Think`,
      `The Hidden Truth About ${T}`,
      `Master ${T} In 40 Seconds`,
    ],
    [
      `${T} Unlocked: What Experts Know`,
      `The Deeper Layer of ${T} Most Miss`,
      `${T} Will Surprise You #Shorts`,
      `Everything Changes When You Understand ${T}`,
      `The Real Story Behind ${T}`,
    ],
  ];

  const titles = titleSets[variant];

  const descVariants = [
    `Everything you need to know about ${t} in under 40 seconds. This Short breaks down the key insights about ${t} that most people never discover — the hidden patterns, the real principles, and what actually matters. Follow for daily Shorts on topics that expand your thinking! #${T.replace(/\s+/g, "")} #Shorts`,
    `The truth about ${t} is more fascinating than the textbooks suggest. In this Short, I unpack the core insights that change how you see ${t} completely. If you found this useful, follow for more mind-expanding content every day! #${T.replace(/\s+/g, "")} #LearnOnShorts`,
    `I spent 30 days going deep on ${t} and distilled everything into 40 seconds. Here's what actually matters — the principles that separate beginners from experts when it comes to ${t}. Follow to keep leveling up your knowledge base! #${T.replace(/\s+/g, "")} #Shorts`,
    `There's a second layer to ${t} that almost nobody talks about — until now. This Short reveals the insight that changes how you think about ${t} and why it matters more than you'd expect. Follow for more depth-first content daily! #${T.replace(/\s+/g, "")} #Shorts`,
  ];

  const description = descVariants[variant];

  const tags: string[] = [
    t,
    `${t} tips`,
    `${t} facts`,
    `${t} explained`,
    `learn ${t}`,
    `${t} guide`,
    `${t} secrets`,
    `${t} for beginners`,
    `${t} tutorial`,
    `${t} 2025`,
    `${t} shorts`,
    `${t} knowledge`,
    `trending ${t}`,
    `${t} insight`,
    `${t} deep dive`,
    "youtube shorts",
    "shorts",
    "viral shorts",
    "educational shorts",
    "daily facts",
  ];

  return { hooks, storyboard, titles, description, tags };
}

export function fullStoryboardText(storyboard: StoryboardSegment[]): string {
  return storyboard
    .map(
      (seg) =>
        `[${seg.timeRange} — ${seg.label}]\nNarration: ${seg.narration}\nVisual Prompt: ${seg.visualPrompt}`,
    )
    .join("\n\n");
}

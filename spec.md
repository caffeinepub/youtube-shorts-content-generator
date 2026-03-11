# YouTube Shorts Content Generator

## Current State
App exists with a topic input and Generate button. The button calls `generateContent()` from `lib/generate.ts` (template-based). The storyboard shows script sections (hook/context/explanation/conclusion) and visual prompts separately. Visual prompts lack Narration fields.

## Requested Changes (Diff)

### Add
- Narration field to each storyboard segment
- Combined time-coded storyboard display (Narration + Visual Prompt per segment)

### Modify
- `generate.ts`: Restructure `VisualPrompt` to include `narration`; update time ranges to match 0-2s, 3-8s, 9-18s, 19-30s, 31-40s; improve template richness for more varied, topic-specific output
- `App.tsx`: Redesign storyboard section to show each time segment with Narration + Visual Prompt; remove separate Script section (merge into storyboard)

### Remove
- Separate script section from results display (content merged into storyboard)

## Implementation Plan
1. Update `generate.ts`: add `narration` to `VisualPrompt`, use 5 time segments, generate richer varied content
2. Update `App.tsx`: replace script + visual sections with unified storyboard showing Narration + Visual Prompt per segment
3. Validate and deploy

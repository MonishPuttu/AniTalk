# /brag plan — AniTalk

**What it is:** A voice-first AI agent platform where you can hop on a live voice call with custom agents — or with anime characters like Satoru Gojo, Madara Uchiha and Zero Two.
**Who it's for:** Anime fans and anyone who'd rather talk to an AI than type at it (tutors, companions, practice partners).
**What sets it apart:** It's a *call*, not a chatbot — real-time speech in and out, character personalities, multilingual replies.
**Most impressive claim:** Madara Uchiha answers you, in Japanese, in his own voice.
**Visual hook:** An incoming call from Madara Uchiha.
**Tone:** cinematic-default — punchy, dark, anime-night purple.
**Share caption:** "Madara Uchiha is calling. You can pick up."

## Visual identity (from the code)
- Font: Geist (next/font/google in `src/app/layout.tsx`)
- Sidebar purple `oklch(0.2195 0.0751 301)` ≈ `#2a1140`, primary plum `#4f1c51` (logo + buttons), card backgrounds `#1a1a2e` / `#2a1215` / `#1f1520` from `src/modules/anime/constants.ts`
- Real assets: `public/gojo.svg`, `public/madarauchiha.svg`, `public/zerotwo.svg`, `public/logo.svg`
- Chat UI rebuilt from `src/modules/anime/components/anime-conversation.tsx` (blue-600 user bubbles, frosted white/15 AI bubbles, Listening…/Speaking… status, mic + red hang-up)
- Dialogue lines taken from the real session in `assets/anime-voice-interaction.png`

## Storyboard (21s, 1920×1080 @ 30fps)
| # | Time | Scene | On screen |
|---|------|-------|-----------|
| 1 | 0.0–3.1 | **Hook** | "Madara Uchiha — incoming voice call…", pulsing rings, cursor taps accept |
| 2 | 3.1–8.6 | **Highlight: the call** | Real chat UI; Madara speaks, you ask in Japanese, he answers in Japanese. Chip: "Speaks Japanese, too." |
| 3 | 8.6–11.9 | **Reveal** | AniTalk logo + "Voice-first AI agents — and your favourite anime characters, one call away." |
| 4 | 11.9–15.5 | **Highlight: characters** | The real Anime grid (Gojo / Madara / Zero Two / Create Your Own). "Gojo. Madara. Zero Two. On speed dial." |
| 5 | 15.5–18.6 | **Highlight: custom agents** | New Agent form types "Math teacher" + instructions, Create is clicked |
| 6 | 18.6–21.0 | **Outro** | "Talk to AI like it's a call." + ani-talk-ai.vercel.app |

## Sound
D minor, 100 bpm; ringtone chimes in key over a quiet pad, drums enter under the conversation, riser + low impact on the logo reveal, soft in-key pops for bubbles/cards, key ticks under typing, closing chime.

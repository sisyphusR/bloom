# Bloom — Deployment Instructions
## From your Mac to your phone, fully working

---

## What you'll end up with
A private URL like `https://bloom-yourname.vercel.app` that you open on your phone (or any device), with the full app working including the AI Ask tab. Free. Takes about 15 minutes.

---

## What you need
- A Mac (you already have this)
- The `bloom` folder from Claude (download below)
- A free Vercel account (you'll create one)
- A free Anthropic API account (you'll create one)

---

## STEP 1 — Get your Anthropic API key

1. Go to **console.anthropic.com** and sign up for a free account
2. Once logged in, click **"API Keys"** in the left sidebar
3. Click **"Create Key"**, give it a name like `bloom`
4. **Copy the key** — it starts with `sk-ant-...`
5. Paste it somewhere safe (Notes app) — you can only see it once

> 💡 Anthropic gives you free credits when you sign up. The Ask tab uses a tiny amount per question — $5 of credits will last months of daily use.

---

## STEP 2 — Install the Vercel CLI on your Mac

Open **Terminal** (press `Cmd+Space`, type Terminal, hit Enter) and run:

```
npm install -g vercel
```

If you get a "command not found" error for npm, you need Node.js first:
1. Go to **nodejs.org** and click the big green "LTS" download button
2. Install it, then re-run the command above

---

## STEP 3 — Deploy the bloom folder

1. In Terminal, navigate to your Downloads folder:
   ```
   cd ~/Downloads
   ```

2. Then into the bloom folder (the one you downloaded from Claude):
   ```
   cd bloom
   ```

3. Deploy with Vercel:
   ```
   vercel
   ```

4. It will ask you a few questions — answer like this:
   - **"Set up and deploy?"** → press Enter (Yes)
   - **"Which scope?"** → press Enter (your account)
   - **"Link to existing project?"** → type `N`, press Enter
   - **"What's your project's name?"** → type `bloom`, press Enter
   - **"In which directory is your code?"** → press Enter (current directory `./`)
   - **"Want to override settings?"** → type `N`, press Enter

5. Wait ~30 seconds. You'll see a URL like:
   ```
   ✅ Production: https://bloom-abc123.vercel.app
   ```
   **Copy that URL.**

---

## STEP 4 — Add your API key to Vercel (the secure part)

Your API key never goes in the code — it lives as a secret environment variable on Vercel's servers.

1. Go to **vercel.com** in your browser and log in
2. Click on your **bloom** project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Fill in:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** paste your `sk-ant-...` key
   - **Environments:** check all three (Production, Preview, Development)
6. Click **Save**

7. Now redeploy so it picks up the key:
   ```
   vercel --prod
   ```

---

## STEP 5 — Open on your phone

1. On your phone, open **Safari** (iPhone) or **Chrome** (Android)
2. Go to your URL: `https://bloom-abc123.vercel.app`
3. The full app loads — try the Ask tab, it should work!

**To add it to your home screen (makes it feel like a real app):**

*iPhone:*
- Tap the Share button (box with arrow) at the bottom of Safari
- Scroll down and tap **"Add to Home Screen"**
- Tap **"Add"**

*Android:*
- Tap the three-dot menu in Chrome
- Tap **"Add to Home screen"**

Bloom now appears as an icon on your home screen and opens fullscreen like a native app.

---

## Troubleshooting

**"The Ask tab says it can't reach the assistant"**
→ Make sure you completed Step 4 and ran `vercel --prod` after adding the key.

**"npm: command not found"**
→ Install Node.js from nodejs.org first, then retry Step 2.

**"vercel: command not found" after installing**
→ Close Terminal, reopen it, and try again.

**The app loads but looks broken**
→ Try a hard refresh: on iPhone hold the reload button → "Reload Without Content Blockers"

---

## Your costs
- **Vercel hosting:** Free forever for personal projects
- **Anthropic API:** Pay-as-you-go. The Ask tab costs roughly $0.001 per question. $5 = ~5,000 questions.

---

*Bloom is a companion, not a clinician. Always reach out to your provider with concerns.*

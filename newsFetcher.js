/*!
 * ENYANWUMA.OS — Jobs & Opportunities Feed Plugin
 * File: enyanwuma-jobs-feed.js
 * Drop this file in the same folder as your portfolio HTML.
 * Add ONE line before </body>:
 *   <script src="enyanwuma-jobs-feed.js"></script>
 *
 * What it does:
 *  · Fetches 5 curated Blender/3D/Video Creator job listings
 *  · Sends them as OS-style toast notifications (1 at a time)
 *  · You click ACCEPT or DISMISS on each
 *  · Accepted jobs open a full briefing "window" inside your OS
 *  · Briefing looks like a proper website article — styled to match your OS
 *  · Auto-refreshes every 90 seconds (simulated feed)
 */

(function () {
  'use strict';

  /* ── Wait for the OS to be ready ── */
  function onOSReady(cb) {
    if (document.readyState === 'complete' && window.openWindow) { cb(); return; }
    var attempts = 0;
    var poll = setInterval(function () {
      attempts++;
      if (window.openWindow || attempts > 60) { clearInterval(poll); cb(); }
    }, 250);
  }

  /* ════════════════════════════════════════════════════════
     JOB DATA — 5 curated opportunity types
     In production you'd swap fetchJobs() to hit a real API
     (e.g. RemoteOK, LinkedIn, or your own backend scraper)
  ════════════════════════════════════════════════════════ */
  var JOB_POOL = [
    {
      id: 'j001',
      type: 'blender',
      urgent: true,
      badge: '🔥 HOT',
      role: 'Blender 3D Generalist',
      company: 'Neon Forge Studios',
      location: 'Remote · Worldwide',
      salary: '$65–95K / yr',
      posted: '2h ago',
      tags: ['Blender', 'Cycles', 'EEVEE', 'Character Rigging'],
      logo: '🏗️',
      color: '#ff6f00',
      excerpt: 'We need a skilled Blender artist for an upcoming cyberpunk animated short. Full creative input, flexible hours, remote-first.',
      body: `
        <h2>About the Role</h2>
        <p>Neon Forge Studios is a small, remote-first animation studio producing cyberpunk short films and motion graphics for brands. We're looking for a <strong>Blender Generalist</strong> who can own the 3D pipeline from blockout to final render.</p>

        <h2>What You'll Do</h2>
        <ul>
          <li>Model, rig and animate characters and environments in Blender 4.x</li>
          <li>Set up Cycles and EEVEE render pipelines for short-form video</li>
          <li>Collaborate with the art director on visual style and lighting</li>
          <li>Deliver render-ready assets for a 12-minute animated short</li>
          <li>Optional: contribute to Geometry Nodes procedural systems</li>
        </ul>

        <h2>Requirements</h2>
        <ul>
          <li>3+ years Blender experience — portfolio required</li>
          <li>Strong grasp of PBR shading and lighting theory</li>
          <li>Comfortable with Blender's rigging tools (Armature, IK, NLA)</li>
          <li>Experience with compositing in Blender or Davinci Resolve</li>
        </ul>

        <h2>Nice to Have</h2>
        <ul>
          <li>Geometry Nodes procedural modelling</li>
          <li>Substance Painter for texturing</li>
          <li>Unreal Engine 5 pipeline knowledge</li>
        </ul>

        <h2>Compensation</h2>
        <p><strong>$65,000 – $95,000 / year</strong> depending on experience. Contract or full-time. Equity available for long-term contributors.</p>

        <div class="jb-apply-block">
          <a class="jb-apply-btn" href="https://www.artstation.com/jobs" target="_blank" rel="noopener">APPLY NOW →</a>
          <span class="jb-apply-note">Applications close in 9 days</span>
        </div>
      `
    },
    {
      id: 'j002',
      type: 'video',
      urgent: false,
      badge: '📹 VIDEO',
      role: 'Freelance Video Creator',
      company: 'Veltrix Media',
      location: 'Remote · Contract',
      salary: '$50–80 / hr',
      posted: '5h ago',
      tags: ['Video Editing', 'After Effects', 'Motion Graphics', 'YouTube'],
      logo: '🎬',
      color: '#1d9bf0',
      excerpt: 'Fast-growing tech YouTube channel needs a video editor + motion graphics artist. ~20hrs/week, long-term contract, full creative freedom.',
      body: `
        <h2>About Veltrix Media</h2>
        <p>We run a tech-focused YouTube channel with 480K subscribers and growing. Our content covers AI tools, creative software tutorials and developer culture. We're hiring a <strong>Freelance Video Creator</strong> to handle editing, motion graphics and thumbnail design.</p>

        <h2>The Job</h2>
        <ul>
          <li>Edit 4–6 videos/month from raw footage to final export</li>
          <li>Create motion graphics, title cards and lower-thirds in After Effects</li>
          <li>Design YouTube thumbnails that convert</li>
          <li>Maintain consistent visual style across the channel</li>
        </ul>

        <h2>Skills Required</h2>
        <ul>
          <li>Adobe Premiere Pro or DaVinci Resolve — expert level</li>
          <li>After Effects — motion graphics, not just basic transitions</li>
          <li>Strong understanding of YouTube pacing and retention</li>
          <li>Bonus: 3D elements in videos (Blender, Cinema 4D)</li>
        </ul>

        <h2>Rate & Schedule</h2>
        <p><strong>$50–$80/hr</strong> based on experience. ~20 hours/week. Async-first — work when you want, deliver on schedule. Trial period: 2 videos.</p>

        <div class="jb-apply-block">
          <a class="jb-apply-btn" href="https://www.upwork.com" target="_blank" rel="noopener" style="background:#1d9bf0">APPLY NOW →</a>
          <span class="jb-apply-note">Rolling applications — start immediately</span>
        </div>
      `
    },
    {
      id: 'j003',
      type: '3d',
      urgent: true,
      badge: '⚡ URGENT',
      role: '3D Product Visualizer',
      company: 'LuxForm Brand Studio',
      location: 'Remote · Part-time',
      salary: '$40–60K / yr',
      posted: '1d ago',
      tags: ['Product Vis', 'Blender', 'KeyShot', 'Photorealism'],
      logo: '💎',
      color: '#c8ff00',
      excerpt: 'Luxury brand studio needs a 3D product visualization artist for packaging, hero shots and campaign renders. Immediate start.',
      body: `
        <h2>LuxForm Brand Studio</h2>
        <p>We're a boutique brand studio creating visual identities and product campaigns for luxury clients in fashion, cosmetics and lifestyle. We need a <strong>3D Product Visualizer</strong> who can make objects look better than photography.</p>

        <h2>Responsibilities</h2>
        <ul>
          <li>Create photorealistic renders of product packaging, bottles, jewellery and tech objects</li>
          <li>Build reusable scene templates for fast campaign turnaround</li>
          <li>Work with art directors to hit specific visual moods (editorial, minimal, cinematic)</li>
          <li>Deliver layered .EXR passes for compositing in Photoshop</li>
        </ul>

        <h2>Must Have</h2>
        <ul>
          <li>Portfolio showing photorealistic product renders</li>
          <li>Blender or KeyShot — advanced shading and lighting</li>
          <li>Understanding of real-world materials: glass, metal, fabric, liquid</li>
          <li>Ability to model clean CAD-like geometry from reference images</li>
        </ul>

        <h2>Compensation</h2>
        <p><strong>$40,000 – $60,000 / year</strong> part-time (20hrs/week). Retainer model — consistent monthly income.</p>

        <div class="jb-apply-block">
          <a class="jb-apply-btn" href="https://www.artstation.com/jobs" target="_blank" rel="noopener" style="background:#c8ff00;color:#000">APPLY NOW →</a>
          <span class="jb-apply-note">⚡ Urgent — interviewing this week</span>
        </div>
      `
    },
    {
      id: 'j004',
      type: 'blender',
      urgent: false,
      badge: '🌐 OPEN SOURCE',
      role: 'Blender Add-on Developer',
      company: 'BlenderKit Community',
      location: 'Remote · Open Source + Paid',
      salary: 'Bounties $500–5K',
      posted: '3d ago',
      tags: ['Python', 'Blender API', 'Add-on Dev', 'Open Source'],
      logo: '🧩',
      color: '#e87d0d',
      excerpt: 'BlenderKit is hiring Python developers to build and maintain Blender add-ons. Bounty-based system — earn per feature shipped.',
      body: `
        <h2>BlenderKit Add-on Program</h2>
        <p>BlenderKit is one of the largest Blender asset libraries with 600K+ users. We're expanding our <strong>paid contributor program</strong> for Python developers who want to build and maintain Blender add-ons — and get paid per bounty.</p>

        <h2>How It Works</h2>
        <ul>
          <li>Browse open issues and feature requests on our GitHub</li>
          <li>Claim a bounty (sizes range from $500 to $5,000)</li>
          <li>Submit a pull request, get reviewed, get paid</li>
          <li>Top contributors get invited to our core team (salaried)</li>
        </ul>

        <h2>What We Need</h2>
        <ul>
          <li>Python 3.x — confident with OOP and async patterns</li>
          <li>Blender Python API (bpy) — at least beginner level</li>
          <li>Git / GitHub workflow</li>
          <li>Bonus: experience with Blender's UI system and property groups</li>
        </ul>

        <h2>Current Open Bounties</h2>
        <ul>
          <li>Asset batch-import system — $2,400</li>
          <li>Material preview renderer — $1,800</li>
          <li>HDRI smart categorization — $900</li>
          <li>Search filter persistence — $500</li>
        </ul>

        <div class="jb-apply-block">
          <a class="jb-apply-btn" href="https://github.com/BlenderKit" target="_blank" rel="noopener" style="background:#e87d0d">VIEW BOUNTIES →</a>
          <span class="jb-apply-note">No deadline — contribute anytime</span>
        </div>
      `
    },
    {
      id: 'j005',
      type: 'video',
      urgent: false,
      badge: '🎨 CREATIVE',
      role: 'Motion Designer / 3D Artist',
      company: 'Synthrex Creative',
      location: 'Remote · Full-time',
      salary: '$70–110K / yr',
      posted: '6h ago',
      tags: ['Motion Design', 'Blender', 'After Effects', 'Brand Identity'],
      logo: '✦',
      color: '#b44dff',
      excerpt: 'Award-winning motion studio hiring a hybrid motion designer and 3D artist. Real projects, real credits, serious creative freedom.',
      body: `
        <h2>About Synthrex Creative</h2>
        <p>Synthrex is a motion design studio that creates brand identity systems, broadcast packages and digital experiences for clients like Netflix, Spotify and independent game studios. We're hiring a <strong>Motion Designer + 3D Artist</strong> who lives at the intersection of both disciplines.</p>

        <h2>Your Day to Day</h2>
        <ul>
          <li>Design and animate logo reveals, title sequences, brand systems</li>
          <li>Create 3D elements in Blender that integrate into After Effects comps</li>
          <li>Concept and storyboard motion pieces from brief to final delivery</li>
          <li>Collaborate directly with clients on revisions and approvals</li>
        </ul>

        <h2>Requirements</h2>
        <ul>
          <li>Strong portfolio showing motion design AND 3D work together</li>
          <li>After Effects — expressions, shape layers, Cinema 4D lite or Blender pipeline</li>
          <li>Blender 4.x — procedural materials, lighting, animation</li>
          <li>Design fundamentals: typography, composition, colour theory</li>
          <li>Understanding of brand guidelines and identity systems</li>
        </ul>

        <h2>Compensation</h2>
        <p><strong>$70,000 – $110,000 / year</strong> depending on seniority. Full-time, remote. Health benefits, equipment budget ($2K), annual creative conference budget.</p>

        <div class="jb-apply-block">
          <a class="jb-apply-btn" href="https://www.linkedin.com" target="_blank" rel="noopener" style="background:#b44dff">APPLY NOW →</a>
          <span class="jb-apply-note">Applications close in 14 days</span>
        </div>
      `
    }
  ];

  /* ════════════════════════════════════════════════════════
     CSS INJECTION — fully self-contained, OS-matching styles
  ════════════════════════════════════════════════════════ */
  var CSS = `
    /* ── JOB NOTIFICATION TOAST ── */
    #jf-notif-stack {
      position: fixed;
      top: 38px;
      right: 16px;
      z-index: 88888;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
      width: 320px;
    }
    @media(max-width:768px){ #jf-notif-stack{ width: calc(100vw - 24px); right:12px; } }

    .jf-notif {
      background: rgba(8,8,14,.97);
      border: 1.5px solid rgba(200,255,0,.35);
      box-shadow: 6px 6px 0 #000, 0 0 20px rgba(200,255,0,.06);
      backdrop-filter: blur(20px);
      padding: 0;
      pointer-events: all;
      transform: translateX(340px);
      opacity: 0;
      transition: transform .35s cubic-bezier(.34,1.56,.64,1), opacity .25s ease;
      position: relative;
      overflow: hidden;
    }
    .jf-notif.jf-show {
      transform: translateX(0);
      opacity: 1;
    }
    .jf-notif.jf-dismiss {
      transform: translateX(360px);
      opacity: 0;
    }
    .jf-notif-stripe {
      height: 2px;
      width: 100%;
    }
    .jf-notif-body {
      padding: 10px 12px 10px 12px;
    }
    .jf-notif-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .jf-notif-logo {
      width: 28px;
      height: 28px;
      background: rgba(200,255,0,.06);
      border: 1.5px solid rgba(200,255,0,.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      flex-shrink: 0;
      box-shadow: 2px 2px 0 #000;
    }
    .jf-notif-meta { flex: 1; min-width: 0; }
    .jf-notif-badge {
      font-size: 7px;
      letter-spacing: .14em;
      text-transform: uppercase;
      font-family: 'DM Mono', monospace;
      margin-bottom: 1px;
      opacity: .8;
    }
    .jf-notif-role {
      font-family: 'Syne', sans-serif;
      font-size: 11px;
      font-weight: 700;
      color: #f0ede6;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .jf-notif-company {
      font-size: 9px;
      color: rgba(240,237,230,.45);
      font-family: 'DM Mono', monospace;
      letter-spacing: .04em;
      margin-top: 1px;
    }
    .jf-notif-excerpt {
      font-size: 9.5px;
      color: rgba(240,237,230,.6);
      font-family: 'DM Mono', monospace;
      line-height: 1.55;
      margin-bottom: 8px;
    }
    .jf-notif-tags {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    .jf-notif-tag {
      font-size: 7px;
      padding: 1px 6px;
      border: 1px solid rgba(200,255,0,.2);
      color: rgba(200,255,0,.65);
      background: rgba(200,255,0,.05);
      font-family: 'DM Mono', monospace;
      letter-spacing: .07em;
      text-transform: uppercase;
    }
    .jf-notif-actions {
      display: flex;
      gap: 6px;
    }
    .jf-btn-accept {
      flex: 1;
      padding: 6px 0;
      background: #c8ff00;
      color: #000;
      border: 1.5px solid #000;
      box-shadow: 2px 2px 0 #000;
      font-family: 'Syne', sans-serif;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: .18em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all .12s;
    }
    .jf-btn-accept:hover {
      background: #e0ff40;
      transform: translate(-1px,-1px);
      box-shadow: 3px 3px 0 #000;
    }
    .jf-btn-accept:active { transform: translate(1px,1px); box-shadow: none; }
    .jf-btn-dismiss {
      padding: 6px 12px;
      background: transparent;
      color: rgba(240,237,230,.4);
      border: 1.5px solid rgba(240,237,230,.15);
      box-shadow: 2px 2px 0 #000;
      font-family: 'DM Mono', monospace;
      font-size: 9px;
      letter-spacing: .1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all .12s;
    }
    .jf-btn-dismiss:hover { color: #ff5f1f; border-color: rgba(255,95,31,.4); }
    .jf-notif-time {
      position: absolute;
      top: 8px;
      right: 10px;
      font-size: 7px;
      color: rgba(240,237,230,.22);
      font-family: 'DM Mono', monospace;
      letter-spacing: .08em;
    }
    .jf-notif-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background: rgba(200,255,0,.3);
      transition: width linear;
    }

    /* ── FEED DOCK BADGE ── */
    #jf-dock-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 16px;
      height: 16px;
      background: #ff5f1f;
      border: 1.5px solid #000;
      border-radius: 50%;
      font-size: 8px;
      font-weight: 900;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Syne', sans-serif;
      z-index: 10;
      animation: jfBadgePop .3s cubic-bezier(.34,1.56,.64,1) forwards;
    }
    @keyframes jfBadgePop {
      0%  { transform: scale(0); }
      100%{ transform: scale(1); }
    }

    /* ── BRIEFING WINDOW CONTENT ── */
    .jf-briefing {
      padding: 0;
      font-family: 'DM Mono', monospace;
      color: #f0ede6;
    }
    .jf-brief-hero {
      padding: 18px 20px 14px;
      border-bottom: 1px solid rgba(200,255,0,.12);
      position: relative;
      overflow: hidden;
    }
    .jf-brief-hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg, transparent, transparent 18px,
        rgba(200,255,0,.025) 18px, rgba(200,255,0,.025) 19px
      ),
      repeating-linear-gradient(
        90deg, transparent, transparent 18px,
        rgba(200,255,0,.025) 18px, rgba(200,255,0,.025) 19px
      );
    }
    .jf-brief-type-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
      position: relative;
    }
    .jf-brief-logo-big {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      border: 2px solid;
      box-shadow: 3px 3px 0 #000;
      flex-shrink: 0;
      background: rgba(0,0,0,.4);
    }
    .jf-brief-company-info { flex: 1; min-width:0; }
    .jf-brief-badge-big {
      font-size: 8px;
      letter-spacing: .2em;
      text-transform: uppercase;
      font-family: 'DM Mono', monospace;
      margin-bottom: 3px;
    }
    .jf-brief-company-name {
      font-family: 'Bebas Neue', cursive;
      font-size: 13px;
      letter-spacing: .12em;
      color: rgba(240,237,230,.6);
    }
    .jf-brief-title {
      font-family: 'Bebas Neue', cursive;
      font-size: clamp(22px, 4vw, 32px);
      letter-spacing: .06em;
      line-height: 1;
      margin-bottom: 10px;
      position: relative;
    }
    .jf-brief-meta-strip {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      position: relative;
    }
    .jf-brief-meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 9px;
      color: rgba(240,237,230,.55);
      font-family: 'DM Mono', monospace;
      letter-spacing: .04em;
    }
    .jf-brief-meta-icon { opacity: .6; }
    .jf-brief-salary {
      font-size: 13px;
      font-family: 'Bebas Neue', cursive;
      letter-spacing: .1em;
      margin-top: 8px;
      position: relative;
    }
    .jf-brief-tags-row {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-top: 10px;
      position: relative;
    }
    .jf-brief-tag {
      font-size: 8px;
      padding: 2px 8px;
      border: 1px solid;
      font-family: 'DM Mono', monospace;
      letter-spacing: .1em;
      text-transform: uppercase;
      background: transparent;
    }

    /* briefing article body */
    .jf-brief-article {
      padding: 16px 20px;
      font-size: 11px;
      line-height: 1.75;
      color: rgba(240,237,230,.8);
    }
    .jf-brief-article h2 {
      font-family: 'Bebas Neue', cursive;
      font-size: 16px;
      letter-spacing: .1em;
      color: #c8ff00;
      margin-top: 18px;
      margin-bottom: 6px;
      padding-bottom: 4px;
      border-bottom: 1px solid rgba(200,255,0,.15);
    }
    .jf-brief-article h2:first-child { margin-top: 0; }
    .jf-brief-article p { margin-bottom: 10px; }
    .jf-brief-article ul {
      padding-left: 0;
      list-style: none;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .jf-brief-article li {
      padding: 5px 10px;
      background: rgba(200,255,0,.03);
      border-left: 2px solid rgba(200,255,0,.3);
      font-size: 10px;
      color: rgba(240,237,230,.75);
    }
    .jf-brief-article li::before { content: '▶  '; color: #c8ff00; font-size: 7px; }
    .jf-brief-article strong { color: #f0ede6; font-weight: 600; }
    .jb-apply-block {
      margin-top: 20px;
      padding: 14px 16px;
      background: rgba(200,255,0,.04);
      border: 1.5px solid rgba(200,255,0,.2);
      box-shadow: 4px 4px 0 #000;
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }
    .jb-apply-btn {
      padding: 9px 20px;
      background: #c8ff00;
      color: #000;
      border: 2px solid #000;
      box-shadow: 3px 3px 0 #000;
      font-family: 'Syne', sans-serif;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: .18em;
      text-transform: uppercase;
      text-decoration: none;
      display: inline-block;
      transition: all .14s;
    }
    .jb-apply-btn:hover {
      transform: translate(-2px,-2px);
      box-shadow: 5px 5px 0 #000;
    }
    .jb-apply-note {
      font-size: 9px;
      color: rgba(240,237,230,.4);
      font-family: 'DM Mono', monospace;
      letter-spacing: .06em;
    }

    /* briefing nav bar */
    .jf-brief-nav {
      display: flex;
      gap: 0;
      padding: 6px 20px;
      border-bottom: 1px solid rgba(200,255,0,.1);
      background: rgba(200,255,0,.03);
      align-items: center;
      flex-shrink: 0;
    }
    .jf-brief-nav-url {
      flex: 1;
      background: rgba(0,0,0,.4);
      border: 1px solid rgba(200,255,0,.2);
      padding: 4px 10px;
      font-size: 9px;
      font-family: 'DM Mono', monospace;
      color: rgba(200,255,0,.6);
      letter-spacing: .04em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .jf-brief-nav-label {
      font-size: 8px;
      color: rgba(240,237,230,.3);
      font-family: 'DM Mono', monospace;
      letter-spacing: .1em;
      text-transform: uppercase;
      margin-right: 8px;
      flex-shrink: 0;
    }
    .jf-brief-nav-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #c8ff00;
      flex-shrink: 0;
      margin-left: 8px;
      box-shadow: 0 0 6px rgba(200,255,0,.6);
      animation: jfPulse 2s ease-in-out infinite;
    }
    @keyframes jfPulse {
      0%,100%{ opacity:1; transform:scale(1); }
      50%{ opacity:.4; transform:scale(.7); }
    }

    /* ── FEED TICKER (menubar) ── */
    #jf-ticker {
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 28px;
      z-index: 1001;
      display: flex;
      align-items: center;
      gap: 8px;
      pointer-events: none;
      overflow: hidden;
      max-width: 400px;
    }
    #jf-ticker-inner {
      font-size: 8px;
      font-family: 'DM Mono', monospace;
      color: rgba(200,255,0,.35);
      letter-spacing: .08em;
      white-space: nowrap;
      animation: jfTickerScroll 22s linear infinite;
    }
    @keyframes jfTickerScroll {
      0%   { transform: translateX(200px); }
      100% { transform: translateX(-100%); }
    }

    /* ── SAVED JOBS PANEL (in briefing window) ── */
    .jf-saved-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 20px;
      border-top: 1px solid rgba(200,255,0,.1);
      background: rgba(200,255,0,.02);
      flex-shrink: 0;
    }
    .jf-save-btn {
      padding: 4px 12px;
      background: transparent;
      border: 1.5px solid rgba(200,255,0,.3);
      color: rgba(200,255,0,.7);
      font-size: 8px;
      font-family: 'DM Mono', monospace;
      letter-spacing: .12em;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 2px 2px 0 #000;
      transition: all .12s;
    }
    .jf-save-btn:hover { background: rgba(200,255,0,.1); color: #c8ff00; }
    .jf-save-btn.saved { background: rgba(200,255,0,.15); color: #c8ff00; border-color: #c8ff00; }
    .jf-saved-info {
      font-size: 8px;
      color: rgba(240,237,230,.25);
      font-family: 'DM Mono', monospace;
      letter-spacing: .06em;
    }
  `;

  /* ════════════════════════════════════════════════════════
     STATE
  ════════════════════════════════════════════════════════ */
  var _queue    = [];       // jobs waiting to be notified
  var _shown    = {};       // job ids already shown this session
  var _savedIds = {};       // saved job ids
  var _notifEl  = null;     // current visible notification element
  var _notifTimer = null;
  var _stackEl  = null;
  var _winOpen  = false;

  /* ── Inject CSS ── */
  function injectCSS() {
    var st = document.createElement('style');
    st.id = 'jf-styles';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* ── Build notification stack container ── */
  function buildStack() {
    _stackEl = document.createElement('div');
    _stackEl.id = 'jf-notif-stack';
    document.body.appendChild(_stackEl);
  }

  /* ── Build menubar ticker ── */
  function buildTicker() {
    var ticker = document.createElement('div');
    ticker.id = 'jf-ticker';
    var inner = document.createElement('div');
    inner.id = 'jf-ticker-inner';
    inner.textContent = '▶ LIVE FEED — Blender jobs, 3D gigs, video creator roles — ' +
      JOB_POOL.map(function(j){ return j.role + ' @ ' + j.company; }).join('  ·  ') +
      '  ·  ';
    ticker.appendChild(inner);
    document.body.appendChild(ticker);
  }

  /* ── Add feed button to dock ── */
  function addDockItem() {
    var dock = document.getElementById('dock');
    if (!dock) return;
    var item = document.createElement('div');
    item.className = 'dock-item';
    item.id = 'jf-dock-item';
    item.setAttribute('title', 'Jobs Feed');
    item.innerHTML =
      '<div class="dock-icon" id="jf-dock-icon" style="border-color:rgba(255,95,31,.5);position:relative">' +
        '<span style="font-size:20px">📡</span>' +
      '</div>' +
      '<div class="dock-label">FEED</div>';
    item.addEventListener('click', function () {
      if (window.openWindow) window.openWindow('jobsfeed');
    });
    dock.appendChild(item);
  }

  /* ── Show badge on dock icon ── */
  function showDockBadge(count) {
    var icon = document.getElementById('jf-dock-icon');
    if (!icon) return;
    var old = document.getElementById('jf-dock-badge');
    if (old) old.remove();
    if (count < 1) return;
    var b = document.createElement('div');
    b.id = 'jf-dock-badge';
    b.textContent = count;
    icon.appendChild(b);
  }

  /* ── Register window type with the OS ── */
  function registerWindow() {
    /* The OS's openWindow function looks for a template function.
       We hook in by overriding the populate function after window opens. */
    var origOpen = window.openWindow;
    if (!origOpen) return;

    window.openWindow = function (id) {
      origOpen.call(window, id);
      if (id === 'jobsfeed') {
        setTimeout(populateFeedWindow, 60);
      }
    };

    /* Patch the OS window factory to know about our window ID */
    var origWinHTML = window._jfPatchedWinHTML;
    if (!origWinHTML) {
      /* Patch the WIN_CONFIGS inside the OS — we inject our config */
      patchOSWinConfigs();
    }
  }

  /* Patch OS WIN_CONFIGS to add our window */
  function patchOSWinConfigs() {
    /* The OS creates windows via buildWindow(id). We reach in and add
       our entry to whatever config array exists, or intercept buildWindow */
    var origBuildWin = window.__buildWindow__;
    // Instead of fragile internal patching, we add our window to the
    // OS's window creator by extending the WC_MAP it checks
    // (The OS checks id against hardcoded IDs; we must use a DOM injection approach)

    // Safer: listen for when our dock item is clicked and manually inject
    // our window into the desktop — mimicking what the OS does internally
    var _wins = null;
    Object.defineProperty(window, '__jfWinsRef__', {
      set: function(v){ _wins = v; },
      get: function(){ return _wins; }
    });
  }

  /* ════════════════════════════════════════════════════════
     NOTIFICATION SYSTEM
  ════════════════════════════════════════════════════════ */
  function showJobNotif(job) {
    if (_shown[job.id]) return;
    _shown[job.id] = true;

    var el = document.createElement('div');
    el.className = 'jf-notif';
    el.dataset.jid = job.id;

    var stripeColor = job.color || '#c8ff00';

    el.innerHTML =
      '<div class="jf-notif-stripe" style="background:' + stripeColor + ';opacity:.7"></div>' +
      '<div class="jf-notif-body">' +
        '<div class="jf-notif-time">' + job.posted + '</div>' +
        '<div class="jf-notif-header">' +
          '<div class="jf-notif-logo" style="border-color:' + stripeColor + '33;color:' + stripeColor + '">' + job.logo + '</div>' +
          '<div class="jf-notif-meta">' +
            '<div class="jf-notif-badge" style="color:' + stripeColor + '">' + job.badge + '</div>' +
            '<div class="jf-notif-role">' + job.role + '</div>' +
            '<div class="jf-notif-company">' + job.company + ' · ' + job.location + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="jf-notif-excerpt">' + job.excerpt + '</div>' +
        '<div class="jf-notif-tags">' +
          job.tags.map(function(t){ return '<span class="jf-notif-tag">' + t + '</span>'; }).join('') +
        '</div>' +
        '<div class="jf-notif-actions">' +
          '<button class="jf-btn-accept" data-jid="' + job.id + '">✓ OPEN BRIEFING</button>' +
          '<button class="jf-btn-dismiss" data-jid="' + job.id + '">PASS</button>' +
        '</div>' +
      '</div>' +
      '<div class="jf-notif-progress" id="jfprog-' + job.id + '" style="width:100%"></div>';

    _stackEl.appendChild(el);

    /* Slide in */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.classList.add('jf-show');
        // Progress bar countdown (12 seconds)
        var prog = document.getElementById('jfprog-' + job.id);
        if (prog) {
          prog.style.transition = 'width 12s linear';
          requestAnimationFrame(function(){ prog.style.width = '0%'; });
        }
      });
    });

    /* Auto-dismiss after 12 seconds */
    var autoTimer = setTimeout(function () { dismissNotif(el); }, 12000);

    /* Button handlers */
    el.querySelector('.jf-btn-accept').addEventListener('click', function () {
      clearTimeout(autoTimer);
      dismissNotif(el);
      openBriefing(job);
      updateBadge();
    });
    el.querySelector('.jf-btn-dismiss').addEventListener('click', function () {
      clearTimeout(autoTimer);
      dismissNotif(el);
      updateBadge();
    });

    updateBadge();

    /* OS click sound if available */
    if (window.playClick) setTimeout(function(){ window.playClick('open'); }, 50);
  }

  function dismissNotif(el) {
    el.classList.add('jf-dismiss');
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); updateBadge(); }, 380);
  }

  function updateBadge() {
    var count = _stackEl ? _stackEl.querySelectorAll('.jf-notif.jf-show:not(.jf-dismiss)').length : 0;
    showDockBadge(count);
  }

  /* ════════════════════════════════════════════════════════
     BRIEFING WINDOW — opens as a proper OS window
  ════════════════════════════════════════════════════════ */
  function openBriefing(job) {
    var winId = 'jf-brief-' + job.id;

    /* Build a window manually in the OS style */
    var desktop = document.getElementById('desktop') || document.querySelector('.desktop') || document.body;

    /* Remove if already open */
    var existing = document.getElementById('jfwin-' + job.id);
    if (existing) { existing.parentNode.removeChild(existing); }

    var isMobile = window.innerWidth <= 768;

    var win = document.createElement('div');
    win.className = 'app-window focused opening';
    win.id = 'jfwin-' + job.id;
    win.setAttribute('tabindex', '0');

    /* Position */
    if (isMobile) {
      win.style.cssText = 'position:fixed;left:0;top:36px;width:100vw;height:calc(100vh - 36px - 58px);z-index:500;';
    } else {
      var lp = 120 + Math.random() * 80;
      var tp = 60 + Math.random() * 40;
      win.style.cssText = 'position:absolute;left:' + lp + 'px;top:' + tp + 'px;width:580px;height:540px;z-index:500;';
    }

    var articleHTML = job.body || '<p>No details available.</p>';

    win.innerHTML =
      /* Title bar */
      '<div class="titlebar" style="cursor:grab">' +
        '<div class="titlebar-controls">' +
          '<div class="win-btn close" onclick="this.closest(\'.app-window\').remove()" title="Close">✕</div>' +
          '<div class="win-btn min" style="display:' + (isMobile?'none':'flex') + '" title="Minimise">–</div>' +
          '<div class="win-btn max" style="display:' + (isMobile?'none':'flex') + '" title="Maximise">+</div>' +
        '</div>' +
        '<span class="titlebar-icon">📡</span>' +
        '<span class="titlebar-title">JOB BRIEFING — ' + job.role.toUpperCase() + '</span>' +
        '<span class="titlebar-tag" style="border-color:' + job.color + '80;color:' + job.color + '">' + job.type.toUpperCase() + '</span>' +
      '</div>' +

      /* Fake browser nav bar */
      '<div class="jf-brief-nav">' +
        '<span class="jf-brief-nav-label">LIVE</span>' +
        '<div class="jf-brief-nav-dot"></div>' +
        '<div class="jf-brief-nav-url">jobs.enyanwuma.os/' + job.type + '/' + job.id + ' — ' + job.company.toLowerCase().replace(/\s/g,'-') + '</div>' +
      '</div>' +

      /* Scrollable content */
      '<div class="win-content">' +
        '<div class="jf-briefing">' +

          /* Hero section */
          '<div class="jf-brief-hero">' +
            '<div class="jf-brief-type-row">' +
              '<div class="jf-brief-logo-big" style="border-color:' + job.color + ';color:' + job.color + '">' + job.logo + '</div>' +
              '<div class="jf-brief-company-info">' +
                '<div class="jf-brief-badge-big" style="color:' + job.color + '">' + job.badge + ' &nbsp;·&nbsp; POSTED ' + job.posted + '</div>' +
                '<div class="jf-brief-company-name">' + job.company + '</div>' +
              '</div>' +
            '</div>' +
            '<div class="jf-brief-title" style="color:' + job.color + '">' + job.role + '</div>' +
            '<div class="jf-brief-meta-strip">' +
              '<span class="jf-brief-meta-item"><span class="jf-brief-meta-icon">📍</span>' + job.location + '</span>' +
              '<span class="jf-brief-meta-item"><span class="jf-brief-meta-icon">💼</span>' + (job.type === 'blender' ? 'Blender / 3D' : job.type === 'video' ? 'Video / Motion' : '3D Visualization') + '</span>' +
            '</div>' +
            '<div class="jf-brief-salary" style="color:' + job.color + '">' + job.salary + '</div>' +
            '<div class="jf-brief-tags-row">' +
              job.tags.map(function(t){
                return '<span class="jf-brief-tag" style="border-color:' + job.color + '44;color:' + job.color + '99">' + t + '</span>';
              }).join('') +
            '</div>' +
          '</div>' +

          /* Article body */
          '<div class="jf-brief-article">' + articleHTML + '</div>' +

        '</div>' +
      '</div>' +

      /* Save bar */
      '<div class="jf-saved-bar">' +
        '<button class="jf-save-btn' + (_savedIds[job.id] ? ' saved' : '') + '" id="jfsavebtn-' + job.id + '" onclick="window.__jfToggleSave(\''+job.id+'\')">' +
          (_savedIds[job.id] ? '★ SAVED' : '☆ SAVE JOB') +
        '</button>' +
        '<span class="jf-saved-info">Saved jobs persist in your session · type <code style="color:#c8ff00">jobs</code> in terminal</span>' +
      '</div>' +

      /* Resize handle */
      '<div class="resize-handle"><span></span></div>';

    desktop.appendChild(win);

    /* Drag support (desktop) */
    if (!isMobile) {
      var tb = win.querySelector('.titlebar');
      var dragging = false, ox = 0, oy = 0;
      tb.addEventListener('mousedown', function (e) {
        if (e.target.closest('.win-btn')) return;
        dragging = true; ox = e.clientX - win.offsetLeft; oy = e.clientY - win.offsetTop;
        win.style.transition = 'none'; e.preventDefault();
      });
      document.addEventListener('mousemove', function (e) {
        if (!dragging) return;
        win.style.left = Math.max(0, Math.min(e.clientX - ox, window.innerWidth - win.offsetWidth)) + 'px';
        win.style.top  = Math.max(28, Math.min(e.clientY - oy, window.innerHeight - 64 - win.offsetHeight)) + 'px';
      });
      document.addEventListener('mouseup', function () { dragging = false; win.style.transition = ''; });
    }

    /* Resize support */
    var rh = win.querySelector('.resize-handle');
    if (rh) {
      var resizing = false, sx = 0, sy = 0, sw = 0, sh = 0;
      rh.addEventListener('mousedown', function (e) {
        e.stopPropagation(); resizing = true;
        sx = e.clientX; sy = e.clientY; sw = win.offsetWidth; sh = win.offsetHeight; e.preventDefault();
      });
      document.addEventListener('mousemove', function (e) {
        if (!resizing) return;
        win.style.width  = Math.max(420, sw + (e.clientX - sx)) + 'px';
        win.style.height = Math.max(300, sh + (e.clientY - sy)) + 'px';
      });
      document.addEventListener('mouseup', function () { resizing = false; });
    }

    /* Remove opening class */
    setTimeout(function () { win.classList.remove('opening'); }, 400);

    if (window.playClick) window.playClick('open');
  }

  /* ── Toggle save ── */
  window.__jfToggleSave = function (jid) {
    _savedIds[jid] = !_savedIds[jid];
    var btn = document.getElementById('jfsavebtn-' + jid);
    if (btn) {
      btn.classList.toggle('saved', !!_savedIds[jid]);
      btn.textContent = _savedIds[jid] ? '★ SAVED' : '☆ SAVE JOB';
    }
    if (window.showToast) {
      window.showToast('JOBS FEED', _savedIds[jid] ? 'Job saved ★' : 'Job removed from saved');
    }
  };

  /* ════════════════════════════════════════════════════════
     FEED WINDOW — overview of all jobs
  ════════════════════════════════════════════════════════ */
  function populateFeedWindow() {
    /* The OS opens a window with id 'jobsfeed' but the content div will
       be wc-jobsfeed. Since our window type isn't in the OS config,
       we need to create it fresh. openBriefing approach works better. */
    openFeedOverview();
  }

  function openFeedOverview() {
    var existing = document.getElementById('jfwin-overview');
    if (existing) { existing.parentNode.removeChild(existing); }

    var isMobile = window.innerWidth <= 768;
    var desktop = document.getElementById('desktop') || document.body;

    var win = document.createElement('div');
    win.className = 'app-window focused opening';
    win.id = 'jfwin-overview';

    if (isMobile) {
      win.style.cssText = 'position:fixed;left:0;top:36px;width:100vw;height:calc(100vh - 36px - 58px);z-index:500;';
    } else {
      win.style.cssText = 'position:absolute;left:80px;top:55px;width:520px;height:580px;z-index:500;';
    }

    var listHTML = JOB_POOL.map(function (j) {
      return '<div class="jf-feed-card" onclick="window.__jfOpenJob(\'' + j.id + '\')">' +
        '<div class="jf-feed-card-top">' +
          '<div class="jf-feed-card-logo" style="border-color:' + j.color + '55;color:' + j.color + '">' + j.logo + '</div>' +
          '<div class="jf-feed-card-info">' +
            '<div class="jf-feed-card-badge" style="color:' + j.color + '">' + j.badge + '</div>' +
            '<div class="jf-feed-card-role">' + j.role + '</div>' +
            '<div class="jf-feed-card-company">' + j.company + ' · ' + j.location + '</div>' +
          '</div>' +
          '<div class="jf-feed-card-salary" style="color:' + j.color + '">' + j.salary + '</div>' +
        '</div>' +
        '<div class="jf-feed-card-excerpt">' + j.excerpt + '</div>' +
        '<div class="jf-feed-card-tags">' +
          j.tags.map(function(t){ return '<span class="jf-notif-tag" style="border-color:' + j.color + '33;color:' + j.color + '88">' + t + '</span>'; }).join('') +
        '</div>' +
      '</div>';
    }).join('');

    win.innerHTML =
      '<div class="titlebar">' +
        '<div class="titlebar-controls">' +
          '<div class="win-btn close" onclick="this.closest(\'.app-window\').remove()">✕</div>' +
          '<div class="win-btn min" style="display:' + (isMobile?'none':'flex') + '">–</div>' +
          '<div class="win-btn max" style="display:' + (isMobile?'none':'flex') + '">+</div>' +
        '</div>' +
        '<span class="titlebar-icon">📡</span>' +
        '<span class="titlebar-title">JOBS FEED — LIVE OPPORTUNITIES</span>' +
        '<span class="titlebar-tag">5 LIVE</span>' +
      '</div>' +
      '<div style="padding:10px 16px;border-bottom:1px solid rgba(200,255,0,.12);background:rgba(200,255,0,.03);flex-shrink:0;display:flex;align-items:center;gap:8px">' +
        '<span style="font-family:\'Bebas Neue\',cursive;font-size:18px;color:#c8ff00;letter-spacing:.1em">LIVE FEED</span>' +
        '<span style="font-size:9px;color:rgba(200,255,0,.4);font-family:\'DM Mono\',monospace;letter-spacing:.1em">· Blender · 3D Design · Video Creation ·</span>' +
        '<div class="jf-brief-nav-dot" style="margin-left:auto"></div>' +
      '</div>' +
      '<div class="win-content" style="padding:12px 14px;display:flex;flex-direction:column;gap:10px">' +
        '<style>' +
          '.jf-feed-card{background:rgba(200,255,0,.03);border:1.5px solid rgba(200,255,0,.15);padding:12px 14px;cursor:pointer;transition:all .15s;box-shadow:3px 3px 0 #000;position:relative;overflow:hidden}' +
          '.jf-feed-card::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#c8ff00,transparent 60%);transform:scaleX(0);transform-origin:left;transition:transform .3s}' +
          '.jf-feed-card:hover{border-color:#c8ff00;transform:translate(-2px,-2px);box-shadow:5px 5px 0 #000}' +
          '.jf-feed-card:hover::before{transform:scaleX(1)}' +
          '.jf-feed-card-top{display:flex;align-items:flex-start;gap:10px;margin-bottom:8px}' +
          '.jf-feed-card-logo{width:36px;height:36px;border:1.5px solid;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;box-shadow:2px 2px 0 #000;background:rgba(0,0,0,.4)}' +
          '.jf-feed-card-info{flex:1;min-width:0}' +
          '.jf-feed-card-badge{font-size:7px;letter-spacing:.14em;text-transform:uppercase;font-family:"DM Mono",monospace;margin-bottom:2px}' +
          '.jf-feed-card-role{font-family:"Syne",sans-serif;font-size:12px;font-weight:700;color:#f0ede6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
          '.jf-feed-card-company{font-size:9px;color:rgba(240,237,230,.4);font-family:"DM Mono",monospace;margin-top:1px}' +
          '.jf-feed-card-salary{font-family:"Bebas Neue",cursive;font-size:13px;letter-spacing:.08em;flex-shrink:0;margin-left:auto}' +
          '.jf-feed-card-excerpt{font-size:9.5px;color:rgba(240,237,230,.55);font-family:"DM Mono",monospace;line-height:1.5;margin-bottom:8px}' +
          '.jf-feed-card-tags{display:flex;gap:4px;flex-wrap:wrap}' +
        '</style>' +
        listHTML +
      '</div>' +
      '<div class="resize-handle"></div>';

    desktop.appendChild(win);

    /* Drag */
    if (!isMobile) {
      var tb = win.querySelector('.titlebar');
      var dragging = false, ox = 0, oy = 0;
      tb.addEventListener('mousedown', function(e){
        if(e.target.closest('.win-btn')) return;
        dragging=true; ox=e.clientX-win.offsetLeft; oy=e.clientY-win.offsetTop;
        win.style.transition='none'; e.preventDefault();
      });
      document.addEventListener('mousemove', function(e){
        if(!dragging) return;
        win.style.left = Math.max(0, Math.min(e.clientX-ox, window.innerWidth-win.offsetWidth))+'px';
        win.style.top  = Math.max(28, Math.min(e.clientY-oy, window.innerHeight-64-win.offsetHeight))+'px';
      });
      document.addEventListener('mouseup', function(){ dragging=false; win.style.transition=''; });
    }

    setTimeout(function(){ win.classList.remove('opening'); }, 400);
    if (window.playClick) window.playClick('open');
  }

  /* ── Open individual job briefing from overview ── */
  window.__jfOpenJob = function (jid) {
    var job = JOB_POOL.filter(function(j){ return j.id === jid; })[0];
    if (job) openBriefing(job);
  };

  /* ════════════════════════════════════════════════════════
     NOTIFICATION QUEUE SCHEDULER
     Fires 5 notifications one at a time, spaced 8 seconds apart.
     Repeats every 90 seconds (simulating a refreshing feed).
  ════════════════════════════════════════════════════════ */
  function scheduleNotifications(jobs) {
    jobs.forEach(function (job, i) {
      setTimeout(function () {
        showJobNotif(job);
      }, i * 8000); // 8 seconds between each
    });
  }

  function startFeed() {
    /* First pass — show all 5 with spacing */
    scheduleNotifications(JOB_POOL);

    /* Re-fire every 90 seconds — reset shown state so they can reappear */
    setInterval(function () {
      _shown = {};
      scheduleNotifications(JOB_POOL);
    }, 90 * 1000);
  }

  /* ── Terminal command: jobs ── */
  function hookTerminal() {
    var origRun = window.runTermCmd;
    if (!origRun) return;
    /* We can't easily override runTermCmd since it's inside the IIFE.
       Instead we intercept keydown on the terminal input. */
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      var inp = document.getElementById('term-input');
      if (!inp || document.activeElement !== inp) return;
      var cmd = inp.value.trim().toLowerCase();
      if (cmd === 'jobs' || cmd === 'feed' || cmd === 'ls jobs/') {
        setTimeout(function () {
          openFeedOverview();
          if (window.showToast) window.showToast('JOBS FEED', 'Opening live feed \u2713');
        }, 200);
      }
      if (cmd === 'saved' || cmd === 'cat saved.json') {
        var savedList = Object.keys(_savedIds).filter(function(k){ return _savedIds[k]; });
        setTimeout(function () {
          if (!savedList.length) {
            if (window.showToast) window.showToast('JOBS FEED', 'No saved jobs yet — accept a briefing first');
          } else {
            savedList.forEach(function(id){
              var j = JOB_POOL.filter(function(x){ return x.id === id; })[0];
              if (j) openBriefing(j);
            });
          }
        }, 200);
      }
    });
  }

  /* ── Update context menu (right-click) ── */
  function hookContextMenu() {
    var menu = document.getElementById('ctx-menu');
    if (!menu) return;
    var sep = document.createElement('div');
    sep.className = 'ctx-sep';
    var item = document.createElement('div');
    item.className = 'ctx-item';
    item.innerHTML = '<span class="ctx-icon">📡</span>Jobs Feed<span class="ctx-shortcut">⌘J</span>';
    item.addEventListener('click', function () {
      menu.classList.remove('show');
      openFeedOverview();
    });
    menu.appendChild(sep);
    menu.appendChild(item);
  }

  /* ════════════════════════════════════════════════════════
     INIT
  ════════════════════════════════════════════════════════ */
  onOSReady(function () {
    injectCSS();
    buildStack();
    buildTicker();
    addDockItem();
    registerWindow();
    hookTerminal();
    hookContextMenu();

    /* Start feed after a brief delay (let OS finish booting) */
    setTimeout(startFeed, 3500);

    console.log(
      '%c📡 ENYANWUMA.OS — Jobs Feed Plugin loaded',
      'color:#c8ff00;background:#050508;padding:4px 10px;font-family:monospace;border-left:3px solid #c8ff00'
    );
  });

})();
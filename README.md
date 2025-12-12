<div align="">
<h1>🌐 Job-Hunt-AI</h1>
AI-Powered Job Matching Platform
<p align="center"> <img src="https://img.shields.io/badge/AI_ENGINE-ACTIVE-7F00FF?style=for-the-badge"/> <img src="https://img.shields.io/badge/JOB_SEARCH-REAL_TIME-FF007F?style=for-the-badge"/> <img src="https://img.shields.io/badge/MATCH_SCORE-ENABLED-00E5FF?style=for-the-badge"/> </p> </div>
<div align="center"> <img src="https://readme-typing-svg.herokuapp.com?font=Montserrat&size=28&duration=3500&color=00E5FF&center=true&vCenter=true&width=750&lines=Find+Your+Perfect+Career+Match+Using+AI;Real-Time+Job+Search+Across+Platforms;AI-Enhanced+Skill+Matching+Engine;Fast%2C+Modern%2C+Cyberpunk+UI" /> </div>
<div align="">
   <h1>⚡ Overview</h1>
</div>

Job-Hunt-AI is a futuristic job-matching system that scans roles, locations, and skills—then ranks the best opportunities using AI-powered relevance scoring.
Designed to feel fast, futuristic, and efficient.

<div align="">
   <h1> 🚀Core Features</h1>
</div>
<div align="">

🤖 AI Skill Engine	Reads your skills & compares with thousands of roles
⚡ Live Job Fetching	Instantly streams fresh job listings
🎯 Match Score System	Each job gets a smart, relevance-based rating
📄 Resume Upload	AI extracts skills to improve accuracy
🧭 Guided Search UI	Minimal, fast, futuristic workflow
🔒 Secure System	No exposure of user data
</div>
<div align="">
   <h1>Screenshots</h1>
</div>
<p align="center"> <img src="Screenshot (748).png" width="430"/> Home page </p>
<div align="center"></div>
<div align="center">
🔥 Dashboard & Input UI
<table> <tr> <td><img src="Screenshot (749).png" width="420" style="border-radius:10px; box-shadow:0 0 18px #7F00FF;"></td> <td><img src="Screenshot (750).png" width="420" style="border-radius:10px; box-shadow:0 0 18px #00E5FF;"></td> </tr> </table> <br/>
🎯Results 
<table> <tr> <td><img src="Screenshot (751).png" width="420" style="border-radius:10px; box-shadow:0 0 18px #FF007F;"></td> <td><img src="Screenshot (752).png" width="420" style="border-radius:10px; box-shadow:0 0 18px #7F00FF;"></td> </tr> </table> </div>
<div align="">
   <h1>How It Works</h1>
</div>
USER INPUT
   │
   ▼
AI SKILL INTERPRETER
   │   → Extract skills
   │   → Understand job role context
   ▼
MATCH ENGINE
   │   → Compare & evaluate relevance
   ▼
JOB FEED OUTPUT (Ranked)

<div align="center">🛠 Tech Stack</div>
<details> <summary><h3>⚛️ Frontend</h3></summary>

React

Vite

TypeScript

Tailwind CSS

React Query

</details> <details> <summary><h3>🧩 System Architecture</h3></summary>

Modular component architecture

API-driven job fetch engine

AI-based skill ranking

Secure resume analyzer system

</details>
<div align="center">📁 Project Structure</div>
job-hunt-ai/
│── public/
│── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── assets/
│   └── App.tsx
│
├── package.json
├── vite.config.ts
└── README.md

<div align="center">⚙️ Installation</div>
git clone https://github.com/SurinderTech/job-hunt-ai-33
cd job-hunt-ai-33
npm install
npm run dev

<div align="center">🔐 Environment Variables</div>
VITE_JOB_API_KEY=your_api_key
VITE_BACKEND_URL=your_backend_url
VITE_RESUME_PARSER_KEY=your_parser

<div align="center">💻 API Usage Example</div>
const loadJobs = async (role, skills) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/jobs?role=${role}&skills=${skills}`
  );
  return res.json();
};

<div align="center">🔥 Highlight Features</div>
+ Ultra-fast job search system
+ Real-time intelligent ranking
+ Modern cyberpunk UI styling
+ Resume-powered recommendations
+ Multi-platform job aggregation

<div align="center">🏁 Closing Note</div>

Job-Hunt-AI blends AI intelligence with a next-gen UI to give job seekers a faster, smarter way to find opportunities.

# 🛡️ MEV-Shield: AI-Powered DeFi Security Agent

**MEV-Shield** is a real-time threat detection system designed to protect cryptocurrency transactions from Maximal Extractable Value (MEV) exploits, such as front-running and sandwich attacks. It utilizes an autonomous AI agent to analyze transaction metadata and predict slippage risks.

## 🚀 Key Features

* [cite_start]**Real-Time Threat Detection:** Detects MEV attacks like front-running and sandwich attacks before they impact the user[cite: 79].
* [cite_start]**AI Risk Analysis:** Integrated **Google Gemini 1.5 Flash API** to analyze transaction metadata and predict slippage risks with >90% simulated accuracy[cite: 80, 81].
* [cite_start]**Private Mempool Simulation:** Routes high-risk trades through secure relays (mimicking Flashbots) to bypass public mempool exploits[cite: 82].
* [cite_start]**Security Dashboard:** A responsive, cyber-security themed dashboard offering real-time attack feed simulations and persistent trade history logging[cite: 83].

## 🛠️ Tech Stack

* **Frontend:** React, Vite
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **AI Engine:** Google Gemini 1.5 Flash API
* [cite_start]**Architecture:** MERN Stack [cite: 82]

## ⚙️ Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/mev-shield.git](https://github.com/yourusername/mev-shield.git)
    cd mev-shield
    ```

2.  **Install Dependencies (Backend & Frontend):**
    ```bash
    cd backend && npm install
    cd ../frontend && npm install
    ```

3.  **Environment Setup:**
    * Create a `.env` file in the backend directory.
    * Add your `GEMINI_API_KEY` and `MONGO_URI`.

4.  **Run the Application:**
    * Backend: `npm start`
    * Frontend: `npm run dev`

---

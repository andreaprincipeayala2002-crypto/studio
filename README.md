# BioQuest: Space Biology Explorer

Welcome to BioQuest, an educational and interactive web app designed for the NASA Space Apps Challenge. This application takes users on a journey through the fascinating world of space biology, combining in-depth articles with AI-powered learning tools and interactive quizzes.

![Galactic Map Screenshot](https://via.placeholder.com/800x400.png?text=BioQuest+Galactic+Map)

## 🚀 Purpose and Objectives

The primary goal of BioQuest is to make complex space biology topics accessible and engaging for a broad audience. We aim to transform learning from a passive reading experience into an interactive "mission" where users explore, learn, and test their knowledge.

### Objectives:
- **Educate:** Provide clear, well-structured information on how spaceflight affects living organisms.
- **Engage:** Create an immersive experience with a "Galactic Map" interface, quizzes, and dynamic visuals.
- **Personalize:** Use AI to generate custom summaries and quizzes, allowing users to dive deeper into topics of interest.
- **Inspire:** Spark curiosity about space exploration and the biological challenges it entails.

## ✨ Key Features & Scope

The application is designed as a focused educational tool with the following features:

- **Interactive Galactic Map:** The homepage serves as a hub where users select "missions" (articles) presented as cosmic destinations.
- **In-depth Articles:** Each topic is presented as a detailed article, complete with data, key findings, and reflection questions.
- **Thematic Visuals:** Every article page features a dynamic background image related to its topic, creating an immersive atmosphere.
- **Knowledge Quizzes:** After reading an article, users can take a quiz to test their understanding. The app provides immediate feedback and stores scores locally.
- **Performance Dashboard:** The "Knowledge Engine" dashboard visualizes user performance across all quizzes, highlighting areas for improvement.
- **AI-Powered Tools:**
  - **Publication Summarizer:** An AI tool that condenses any pasted text into a concise summary.
  - **Quiz Generator:** An AI tool that creates personalized quiz questions based on a given topic and context.

![Dashboard Screenshot](https://via.placeholder.com/800x400.png?text=Knowledge+Engine+Dashboard)

## 🛠️ Tech Stack

BioQuest is built with a modern, robust, and scalable technology stack.

- **Framework:** **Next.js 15** (with App Router)
- **Language:** **TypeScript**
- **Styling:** **Tailwind CSS** for utility-first styling.
- **UI Components:** **ShadCN UI** for beautifully designed, accessible components.
- **Generative AI:** **Genkit (by Firebase)** to power the AI summarizer and quiz generator.
- **Animations:** **Framer Motion** for smooth page transitions and interactive elements.
- **Deployment:** Ready for **Firebase App Hosting**.

## 📂 Project Structure

The project follows a standard Next.js App Router structure, organizing files by feature and route.

```
/
├── public/                  # Static assets (e.g., downloadable files)
├── src/
│   ├── app/                 # Next.js App Router pages and layouts
│   │   ├── article/[slug]/  # Dynamic route for individual article pages
│   │   ├── dashboard/       # Dashboard page
│   │   ├── quiz/            # Quiz page
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page (Galactic Map)
│   │
│   ├── ai/                  # Genkit flows and AI logic
│   │   ├── flows/           # Specific AI flow definitions
│   │   └── genkit.ts        # Genkit initialization
│   │
│   ├── components/          # Reusable React components
│   │   ├── dashboard/       # Components for the dashboard
│   │   ├── layout/          # Layout components (Header, etc.)
│   │   ├── quiz/            # Components for the quiz experience
│   │   └── ui/              # ShadCN UI components
│   │
│   ├── lib/                 # Shared utilities, data, and hooks
│   │   ├── quiz-data.ts     # Main data source for articles and questions
│   │   ├── quiz-data.json   # Raw JSON data for topics
│   │   └── utils.ts         # Utility functions
│   │
│   └── hooks/               # Custom React hooks
│
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🚀 Getting Started

To run this project locally, you will need Node.js and npm installed.

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add your Genkit/Google AI API key:
    ```
    GOOGLE_GENAI_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    The application and the Genkit AI flows run on separate processes.

    - **Run the Next.js app:**
      ```bash
      npm run dev
      ```
      The app will be available at `http://localhost:9002`.

    - **Run the Genkit flows:**
      In a separate terminal, start the Genkit development server:
      ```bash
      npm run genkit:dev
      ```

5.  **Open your browser** and navigate to `http://localhost:9002` to start exploring!

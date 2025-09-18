# WebLens AI

WebLens AI is a web application that converts images into editable text and provides a suite of AI-powered tools to summarize, translate, rewrite, and proofread the extracted content. It enables users to turn visual information into actionable content instantly.

---

## Features

- **Image-to-Text Extraction:** Extract text from any image using a multimodal AI model (Prompt API).  
- **Summarization:** Condense long text into concise key points (Summarizer API).  
- **Translation:** Translate extracted text into multiple languages (Translator API).  
- **Rewriting:** Adapt the tone of text for professional, casual, or academic styles (Rewriter API).  
- **Proofreading:** Refine grammar and improve readability (Proofreader API).  
- **Clean and Responsive UI:** Built with Tailwind CSS and ShadCN UI, supports light and dark mode.  
- **Secure Backend:** Uses Next.js Server Actions to safely connect frontend and AI workflows.  

---

## Installation

1. **Clone the repository**  
```bash
git clone https://github.com/yourusername/weblens-ai.git
cd weblens-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
   Create a .env.local file in the root directory and configure the necessary API keys:
   GENKIT_API_KEY=your_genkit_api_key
   NEXT_PUBLIC_API_URL=http://localhost:3000/api

4. **Run the development server**
   npm run dev

5. **Open the app**
   Visit http://localhost:3000 in your browser.

---

## Usage

- Go to the homepage.

- Upload an image containing text.

- Use the AI features:

-- Summarize to get key points.

-- Translate to switch languages.

-- Rewrite to change tone.

-- Proofread to improve grammar and clarity.

- Copy or export the processed text for your work.

---

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS, ShadCN UI

- **Backend/AI**: Genkit (Prompt, Summarizer, Translator, Rewriter, Proofreader APIs)

- **Server**: Next.js Server Actions

- **Version Control**: Git, GitHub

## License

This project is licensed under the MIT License.

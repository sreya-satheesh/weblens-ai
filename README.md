# WebLens AI

WebLens AI is a web app that lets you turn any image into text you can edit. It also gives you smart tools to quickly summarize, translate, rewrite, or proofread that text—making it easy to turn pictures into useful content right away.

---

## Problem & Solution

Every day we come across text hidden inside images—like screenshots, articles, or social media posts. 
Typing it out by hand takes time and effort. 
WebLens AI makes this easy with a one-click tool that pulls out the text and helps you edit, summarize, translate, or refine it. With fast, private, and affordable AI running right on your device, it turns images into content you can actually use.

---

## Features

-   **Image-to-Text Extraction:** Extracts text from any image using the multimodal **Prompt API**.
-   **Summarization:** Condenses long text into concise key points using the **Summarizer API**.
-   **Translation:** Translates extracted text into multiple languages using the **Translator API**.
-   **Rewriting:** Adapts the tone of text for professional, casual, or academic styles using the **Rewriter API**.
-   **Proofreading:** Refines grammar and improves readability with the **Proofreader API**.
-   **Clean and Responsive UI:** Built with Tailwind CSS and ShadCN UI, it supports both light and dark modes for a great user experience.
-   **Secure Backend:** Uses Next.js Server Actions to safely connect the frontend to our AI workflows.

---

## Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/sreya-satheesh/weblens-ai.git
    cd weblens-ai
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root directory and add your Google AI API key:
    ```
    GEMINI_API_KEY=your_google_ai_api_key
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Open the app**
    Visit [http://localhost:9002](http://localhost:9002) in your browser.

---

## Usage

1.  Navigate to the app page.
2.  Upload an image containing text or drag and drop it into the uploader.
3.  Once the AI analyzes the image, the extracted text will appear.
4.  Use the tabs to perform AI actions:
    -   **Summarize:** Get the key points from the text.
    -   **Translate:** Select a language and translate the content.
    -   **Rewrite:** Change the tone to fit your needs.
    -   **Enhance:** Improve grammar and clarity.
5.  Copy the processed text from any of the results boxes to use in your work.

---

## Technologies Used

-   **Frontend:** Next.js, React, TypeScript, Tailwind CSS, ShadCN UI
-   **Backend & AI:** Genkit, Google AI (Gemini)
-   **APIs:** Prompt API, Summarizer API, Translator API, Rewriter API, Proofreader API

---

## License

This project is licensed under the MIT License.

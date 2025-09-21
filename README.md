# WebLens AI

WebLens AI is a web application built for the Google Chrome Built-in AI Challenge. It turns images into editable text and provides a suite of AI-powered tools to summarize, translate, rewrite, and proofread the extracted content, enabling users to turn visual information into actionable content instantly.

---

## Problem & Solution

In our daily digital lives, we constantly encounter text locked within images—screenshots, articles, or social media posts. Manually transcribing this text is slow and inefficient. WebLens AI solves this problem by providing a seamless, one-click solution to extract, refine, and repurpose this content. By leveraging powerful on-device AI, it offers a private, fast, and cost-effective way to make visual information fully accessible and editable.

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
    git clone https://github.com/your-username/weblens-ai.git
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
-   **APIs Used:** Prompt API, Summarizer API, Translator API, Rewriter API, Proofreader API
-   **Server:** Next.js Server Actions
-   **Version Control:** Git, GitHub

---

## License

This project is licensed under the MIT License.

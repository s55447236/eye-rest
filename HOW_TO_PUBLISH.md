# How to Publish Your "Eye Rest Cat" Chrome Extension

Since you already have a Chrome Web Store Developer account, here are the steps to publish your extension.

## Step 1: Prepare the Package
1.  Go to the folder where we created the extension: `eye-rest-cat`.
2.  Select all the files inside this folder (`manifest.json`, `background.js`, `content.js`, `style.css`, and the `images` folder).
3.  **Zip** them into a single file.
    *   **Mac**: Select files -> Right click -> Compress.
    *   **Windows**: Select files -> Right click -> Send to -> Compressed (zipped) folder.
    *   Name it something like `eye-rest-cat.zip`.

## Step 2: Upload to Chrome Web Store
1.  Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).
2.  Click the **"New Item"** button (usually top right).
3.  Drag and drop your `eye-rest-cat.zip` file or click "Choose file" to upload it.

## Step 3: Fill in Store Listing
You will need to provide details for your extension:
*   **Title**: Eye Rest Cat (or your preferred name).
*   **Description**: A description of what it does (e.g., "A cute cat that reminds you to take a break every hour.").
*   **Category**: Lifestyle or Productivity.
*   **Language**: English (or Chinese if you prefer).
*   **Icons**: You might need to upload a 128x128 icon (you can use the `cat.png` we generated, but resizing it to exactly 128x128 is better. The current one is likely different dimensions, but might work. If not, let me know and I can resize it).
*   **Promotional Image**: I have generated a cover image for you! You can find it at `images/promo_cover.png`. Use this for the "Marquee" or "Promotional Tile" slot.
*   **Screenshots**: You will need to take at least one screenshot of your extension in action.
    *   *Tip*: Load the extension locally first (see below), wait for the cat to appear, and take a screenshot.

## Step 4: Privacy Practices
*   Go to the **"Privacy"** tab.
*   **Privacy Policy**: You will need to provide a link to your privacy policy.
    *   Since you have a GitHub repo (`https://github.com/s55447236/eye-rest`), you can upload the `PRIVACY_POLICY.md` file I just created to your repository.
    *   Then, the link will be: `https://github.com/s55447236/eye-rest/blob/main/PRIVACY_POLICY.md` (assuming your default branch is `main` or `master`).
*   **Single Purpose**: Explain that the extension's single purpose is to remind users to rest their eyes.
*   **Permission Justification**:
    *   `alarms`: Used to trigger the timer every hour.
    *   `scripting` / `activeTab`: Used to show the overlay on the current page.
*   **Data Usage**: Check "No" for "Do you collect any user data?" (since we don't).

## Step 5: Submit for Review
1.  Click **"Submit for Review"**.
2.  It usually takes a few days for Google to review and approve your extension.

---

## How to Test Locally Before Publishing
1.  Open Chrome and go to `chrome://extensions`.
2.  Toggle **"Developer mode"** on (top right).
3.  Click **"Load unpacked"**.
4.  Select the `eye-rest-cat` folder.
5.  **Test the Settings**:
    *   Click the extension icon (the cat) in your browser toolbar.
    *   You should see the **Settings Panel**.
    *   Click **"Show Cat Now"** to instantly test if the overlay works.
    *   Try changing the interval (e.g., to 1 minute) and click **"Save Settings"**, then wait to see if it triggers automatically.

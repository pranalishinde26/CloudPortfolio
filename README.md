# CloudPortfolio: Pranali Shinde

A static, dark-themed personal portfolio website built with HTML, CSS, and vanilla JavaScript. It runs by opening `index.html` in a browser and can be hosted on Amazon S3 with Amazon CloudFront over HTTPS.

No React, no Node.js, no build tools, no backend, no database, and no external analytics.

---

## Project files

```
CloudPortfolio/
├── index.html      Page structure and content
├── style.css       All styling and responsive design
├── script.js       Contact settings, project data, filters, menu, dialog
├── README.md       This guide
└── assets/
    └── profile.jpg Your profile photo (already added)
```

---

## 1. Create the folder on Windows

1. Open **File Explorer**.
2. Go to **Documents** (or any location you like).
3. Right-click an empty area, choose **New > Folder**, and name it `CloudPortfolio`.
4. Inside `CloudPortfolio`, create another folder named `assets`.

## 2. Save each file using VS Code

1. Install **Visual Studio Code** from https://code.visualstudio.com if you do not have it.
2. Open VS Code, choose **File > Open Folder**, and select `CloudPortfolio`.
3. In the Explorer panel on the left, click the **New File** icon, type `index.html`, and press Enter.
4. Paste the complete contents of `index.html` into it and press **Ctrl + S** to save.
5. Repeat for `style.css`, `script.js`, and `README.md`.
6. Make sure the file names match exactly, including lowercase letters and the file extension. Windows may hide extensions, so check that `index.html` is not `index.html.txt`. To check, open **File Explorer > View > Show > File name extensions**.

## 3. Place your photograph

Your photo has already been placed at `assets/profile.jpg`.

To replace it later:

1. Rename your photo to `profile.jpg` (or any `.jpg`, then rename it exactly to `profile.jpg`).
2. Copy it into the `assets` folder, replacing the existing file if asked.
3. Refresh the browser page.

Tips:
- A square or portrait photo works best. The site crops it to a circle with `object-fit: cover`.
- If the file is missing, the page shows a "PS" monogram instead of a broken image.

## 4. Open and test `index.html` locally

1. In File Explorer, go to `CloudPortfolio` and double-click `index.html`.
2. It opens in your default browser. No server or installation is needed.
3. Test the following:
   - Click each navigation link and confirm it scrolls to the right section.
   - Resize the browser window or use Developer Tools (F12, then the phone icon) to check mobile layout.
   - On mobile width, click the three-line menu button.
   - Click each filter button (All, Web Development, IoT, Cloud Computing, Planned Projects) and confirm the cards change.
   - Click **View Details** on a project to open its popup. Close it with the X, the Escape key, or by clicking outside it.
   - Scroll down and click the round arrow in the bottom-right corner to return to the top.

## 5. Check the browser console for errors

1. Open `index.html` in Chrome or Edge.
2. Press **F12** and open the **Console** tab.
3. Refresh the page with **Ctrl + Shift + R**.
4. You should see no red errors.

If you see a red message such as `Failed to load resource: profile.jpg 404`, the photo is not in `assets/` with the exact name `profile.jpg`. Font messages are harmless if you are offline, because the site falls back to system fonts.

## 6. Edit your contact details and projects

Open `script.js` in VS Code.

- **Contact links:** Fill in `email`, `linkedin`, and `github` in the `CONFIG` object at the top. Leave a value as `""` to hide that link. Do not paste passwords or API keys.
- **Projects:** Edit the `PROJECTS` array. Change titles, descriptions, statuses, technologies, and the `github` URL (only add a real repository link).
- **Implemented vs proposed:** Update the `details` list of each project to clearly state what is finished.

Open `index.html` to edit the text in the About, Skills, Experience, Achievements, and Education sections.

After each change, save the file and refresh the browser.

## 7. Upload the website to Amazon S3

You will need an AWS account. Use the AWS Free Tier where possible.

1. Sign in to the **AWS Management Console** and search for **S3**.
2. Click **Create bucket**.
3. **Bucket name:** choose a globally unique name, for example `pranali-cloudportfolio-2026`. Use lowercase letters, numbers, and hyphens only.
4. **Region:** choose the region closest to you or to your users, for example Asia Pacific (Mumbai) `ap-south-1`.
5. **Block Public Access:** keep **Block all public access** turned ON. Do not make the bucket public.
6. Leave the other options at their defaults and click **Create bucket**.
7. Click your new bucket name, then click **Upload**.
8. Drag and drop **`index.html`**, **`style.css`**, **`script.js`**, and the **`assets`** folder (containing `profile.jpg`). You may leave out `README.md`.
9. Click **Upload**, then **Close**.

## 8. Create a CloudFront distribution with Origin Access Control (OAC)

1. In the AWS Console, search for **CloudFront** and click **Create distribution**.
2. **Origin domain:** choose your S3 bucket from the dropdown. Choose the REST endpoint, not the website endpoint.
3. **Origin access:** choose **Origin access control settings (recommended)**.
4. Click **Create control setting**, keep the default options, and click **Create**.
5. **Viewer protocol policy:** choose **Redirect HTTP to HTTPS**. This enables HTTPS.
6. **Default root object:** type `index.html`. This makes `index.html` load when visitors open your main link.
7. Leave the other settings at their defaults and click **Create distribution**.
8. AWS will show a yellow banner with a **Copy policy** button. Click it. Then:
   - Go to **S3 > your bucket > Permissions > Bucket policy > Edit**.
   - Paste the copied policy and click **Save changes**.
   - This allows only your CloudFront distribution to read the bucket.
9. Wait for the distribution **Status** to change from *Deploying* to *Enabled*. This can take 5 to 15 minutes.

## 9. HTTPS with the CloudFront certificate

You do not need to buy a domain or certificate.

- Your default CloudFront address looks like `https://d1234abcd.cloudfront.net`.
- It already uses a valid AWS-issued HTTPS certificate.
- The setting **Redirect HTTP to HTTPS** from Step 8 ensures visitors always use HTTPS.

## 10. Test the live website

1. On the CloudFront distribution page, copy the **Distribution domain name**.
2. Open `https://` followed by that domain in your browser.
3. Confirm that the padlock icon shows a secure connection.
4. Check that the styles, photo, and project filters all work.

If you update the files later, upload them to S3 again. Then in CloudFront, open **Invalidations > Create invalidation**, enter `/*`, and click **Create invalidation** so visitors receive the new version quickly.

## 11. Update the deployment badge

After the site is live and working, open `index.html`, find the line that says `data-status="Development"`, and change it to `data-status="Deployed"`. Then upload the file again and create an invalidation.

Only change it after the site is actually live.

## 12. Avoid unexpected AWS charges

- Use only the Free Tier services in this project: S3, CloudFront, and the AWS Console.
- Keep the site small. The photo should be a few hundred KB at most. You can compress it at https://squoosh.app if needed.
- Do not create extra CloudFront invalidations often. The first 1,000 invalidation paths per month are free, but using `/*` counts as one path.
- Turn on **AWS Budgets** to get an alert:
  1. Search for **Billing** in the console, then **Budgets > Create budget**.
  2. Choose **Zero spend budget** or a monthly cost budget of about 1 USD.
  3. Enter your email address for alerts.
- When you finish the mini project and no longer need the site, delete everything:
  1. Disable the CloudFront distribution, wait for it to deploy, then delete it.
  2. Empty the S3 bucket, then delete the bucket.
- Never share your AWS root account password or access keys. Do not put them in these files.

## 13. Troubleshooting missing CSS, JavaScript, or images

| Problem | What to check |
|---|---|
| The page has no styling | `style.css` must be in the same folder as `index.html`. Check the name is exactly `style.css`. |
| Filters or menu do not work | `script.js` must be in the same folder. Open the console (F12) and look for red errors. |
| Photo does not show, shows PS monogram | The file must be named `profile.jpg` and be inside the `assets` folder. Names are case-sensitive on AWS. |
| Works locally but not on CloudFront | Upload the `assets` folder and all three files to S3, keeping the same folder structure. |
| 403 Access Denied on the live site | The bucket policy from Step 8 is missing or wrong. Copy the policy from CloudFront again and save it in S3. |
| Opening the main link shows an error or a blank XML page | Set **Default root object** to `index.html` in the CloudFront distribution settings. |
| Changes are not showing on the live site | Create a CloudFront invalidation for `/*` and refresh with **Ctrl + Shift + R**. |
| Links point to the wrong place | All internal links use `#section` names and relative paths, so they work on any static host. Check that section IDs in `index.html` match the links. |

---

## Manual steps still required

- Replace `assets/profile.jpg` only if you want a different photo. The current photo is your uploaded image.
- Add your real email, LinkedIn, and GitHub links in `script.js` (`CONFIG` object). Empty links are hidden.
- Confirm each project status and feature list in `script.js` matches what is actually built. Add real GitHub URLs if you have repositories.
- Create the AWS resources in Sections 7 to 9.
- Change the deployment badge to `Deployed` only after the live site works.

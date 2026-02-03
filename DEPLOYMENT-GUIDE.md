# 🚀 DEPLOYMENT GUIDE: GitHub & Vercel

Follow these steps to put your **FactsScan** project online!

---

## 🟢 PART 1: Push to your Personal GitHub

Since I have already prepared your local repository, you just need to create the remote repository and push.

### **Step 1: Create a Repository**
1.  Log in to your [GitHub Account](https://github.com).
2.  Click the **+** icon in top right -> **New repository**.
3.  Name it: `factsscan` (or whatever you prefer).
4.  Description: "Instant food scanner app for healthier choices."
5.  Set visibility to **Public**.
6.  **Do NOT** initialize with README, .gitignore, or License (we already have them).
7.  Click **Create repository**.

### **Step 2: Push Your Code**
Copy the commands shown on your GitHub page under *"...or push an existing repository from the command line"*.

They will look like this (run these in your **terminal**):

```bash
git remote add origin https://github.com/YOUR_USERNAME/factsscan.git
git branch -M main
git push -u origin main
```

*(Replace `YOUR_USERNAME` with your actual GitHub username)*

✅ **Verify:** Refresh your GitHub page. You should see all your files!

---

## ▲ PART 2: Deploy Live on Vercel

Vercel is the best place to host React/Vite apps for free.

### **Step 1: Import Project**
1.  Go to [Vercel.com](https://vercel.com) and log in (continue with GitHub).
2.  On your dashboard, click **Add New...** -> **Project**.
3.  You will see "Import Git Repository". Find `factsscan` in the list.
4.  Click **Import**.

### **Step 2: Config & Deploy**
1.  **Framework Preset**: It should auto-detect **Vite**. If not, select Vite.
2.  **Root Directory**: `./` (Default is correct).
3.  **Build Command**: `npm run build` (Default is correct).
4.  **Output Directory**: `dist` (Default is correct).
5.  **Environment Variables**: You don't need any for now.
6.  Click **Deploy**.

### **Step 3: Go Live!**
- Wait about 1-2 minutes.
- When you see the confetti 🎉, click the image to visit your live site!
- Your URL will be something like: `https://factsscan.vercel.app`

---

## 🔄 How to Update Later

Whenever you make changes to your code:

1.  **Commit your changes:**
    ```bash
    git add .
    git commit -m "Description of changes"
    ```

2.  **Push to GitHub:**
    ```bash
    git push
    ```

3.  **Vercel Auto-Deploys**: Vercel will automatically detect the push and re-deploy your site within seconds!

---

### 🎉 Congratulations! Your project is now LIVE!

# Automatic Deployment Setup

This project is configured for automatic deployment to Vercel whenever you push to the `main` branch.

## Setup Instructions

### Option 1: Vercel GitHub Integration (Recommended - Easiest)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project or click "Add New Project"
3. Click "Import Git Repository"
4. Select your GitHub repository: `MeWaqasahmed/Tajizgroup`
5. Configure project settings:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: (leave empty for static site)
   - Output Directory: (leave empty)
6. Click "Deploy"

**That's it!** Vercel will now automatically deploy every time you push to the main branch.

### Option 2: GitHub Actions (Manual Setup Required)

If you prefer using GitHub Actions, follow these steps:

#### 1. Get Vercel Token

1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Give it a name (e.g., "GitHub Actions")
4. Copy the token (you won't see it again!)

#### 2. Get Vercel Project Details

Run these commands in your project directory:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Get your project details
cat .vercel/project.json
```

You'll need:
- `orgId` (Organization ID)
- `projectId` (Project ID)

#### 3. Add GitHub Secrets

1. Go to your GitHub repository: https://github.com/MeWaqasahmed/Tajizgroup
2. Click Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add these three secrets:

   - **VERCEL_TOKEN**: Your Vercel token from step 1
   - **VERCEL_ORG_ID**: Your orgId from step 2
   - **VERCEL_PROJECT_ID**: Your projectId from step 2

#### 4. Update the Workflow (if needed)

The workflow file is already created at `.github/workflows/deploy.yml`

If you need to customize it, you can add environment variables:

```yaml
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

## How It Works

Once set up, the deployment process is automatic:

1. You make changes to your code
2. You commit and push to the `main` branch:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. Vercel (or GitHub Actions) automatically detects the push
4. Your site is built and deployed
5. You receive a deployment URL

## Deployment Status

- **Vercel Integration**: Check deployment status at https://vercel.com/dashboard
- **GitHub Actions**: Check workflow runs at https://github.com/MeWaqasahmed/Tajizgroup/actions

## Troubleshooting

### Vercel Integration Issues
- Make sure your GitHub repository is connected in Vercel settings
- Check that the production branch is set to `main`
- Verify build settings in Vercel project settings

### GitHub Actions Issues
- Verify all three secrets are added correctly
- Check the Actions tab for error logs
- Make sure the Vercel token hasn't expired

## Current Configuration

- **Repository**: https://github.com/MeWaqasahmed/Tajizgroup
- **Production Branch**: main
- **Deployment Platform**: Vercel
- **Site Type**: Static HTML/CSS/JS

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check GitHub Actions logs (if using Option 2)
3. Verify all secrets are correctly set
4. Ensure your Vercel token has the necessary permissions

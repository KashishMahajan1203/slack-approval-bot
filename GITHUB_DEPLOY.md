# GitHub Deployment Guide

## 1. Initialize Git Repository (if not already done)
```bash
git init
```

## 2. Add and Commit Files
```bash
git add .
git commit -m "Initial commit of Slack approval bot"
```

## 3. Create GitHub Repository
1. Go to github.com and create a new repository
2. Don't initialize with README or .gitignore (we already have these)

## 4. Connect Local Repository to GitHub
```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git branch -M main
git push -u origin main
```

## Important Notes:
1. The .env file is in .gitignore (keeps secrets safe)
2. node_modules/ is also ignored (should not be committed)
3. For production deployment:
   - Set up GitHub Actions for CI/CD
   - Configure environment variables in your hosting provider
   - Consider using GitHub Secrets for sensitive data

## Next Steps:
1. Set up a hosting service (Heroku, Railway, etc.)
2. Configure production environment variables
3. Set up continuous deployment

# 📧 Email Notification App

A simple web application to send email notifications containing user data from the database.

## 🎯 Purpose

This app allows you to enter a receiver email address and trigger email notifications. The email will contain all user data stored in the Azure SQL Database.

## 🎨 Features

- ✅ Light blue theme (matches Name-Age App)
- ✅ API connection test button
- ✅ Receiver email input
- ✅ Send email notification
- ✅ Simple and user-friendly interface
- ✅ Auto-saves API endpoint configuration

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6)
- **Deployment:** Azure Static Web Apps
- **CI/CD:** GitHub Actions
- **Theme:** Light blue (#4A90E2)

## 📁 File Structure

```
email-notification-app/
├── index.html              # Main HTML page
├── styles.css              # Light blue theme styles
├── app.js                  # Application logic
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml  # GitHub Actions workflow
├── DEPLOYMENT.md           # Step-by-step deployment guide
├── README.md               # This file
└── SYSTEM_ARCHITECTURE.md  # Complete system overview
```

## 🚀 How to Use

### For Users:

1. Open the app in your browser
2. Configure your API Service URL
3. Click "Test API Connection" to verify it works
4. Enter the receiver's email address
5. Click "Send Email Notification"
6. Email with all user data will be sent

### For Developers:

1. Clone the repository
2. Open `index.html` in a browser to test locally
3. Make changes to HTML/CSS/JS files
4. Push to GitHub - automatic deployment via GitHub Actions
5. Check Azure Static Web Apps for live version

## 🔗 Integration

### API Endpoints Used:

- `GET /api/health` - Test API connection
- `POST /api/email/send` - Trigger email notification

### Data Flow:

```
User enters email → App calls API Service → API calls Java Email Service →
Java reads database → Sends email via Azure Communication Service → Success!
```

## ⚙️ Configuration

### API Endpoint:

- Configured directly in the web app
- Saved in browser localStorage
- No need to redeploy when API URL changes

### Example API URL:

```
https://your-api-service.azurewebsites.net
```

## 📋 Prerequisites

- API Service App deployed and running
- CORS configured in API Service to allow Static Web App URL
- Java Email Service deployed
- Azure Communication Service configured
- Azure SQL Database with user data

## 🐛 Troubleshooting

### Connection Test Fails:

- Verify API Service URL is correct
- Check API Service is running
- Ensure CORS is configured
- Open browser console (F12) for errors

### Email Not Sending:

- Verify email address format
- Check Java Email Service is deployed
- Verify Azure Communication Service configuration
- Check database has data

### Deployment Issues:

- Check GitHub secret is configured
- Verify GitHub Actions workflow runs
- Check Azure Static Web App settings

## 📚 Documentation

- **DEPLOYMENT.md** - Complete deployment guide (Azure Portal UI only)
- **SYSTEM_ARCHITECTURE.md** - Full system overview with all 5 applications
- **GitHub Actions** - Automatic deployment on push to main branch

## 🎨 Theme

This app uses the same light blue theme as the Name-Age App:

- Primary Color: #4A90E2
- Gradient Background: #E8F4F8 to #B3D9F2
- Clean and modern design
- Responsive layout

## 🔒 Security

- No secrets in code
- API URL configured by user
- HTTPS enforced
- Email validation
- CORS protection

## 📞 API Service Integration

This app communicates with the API Service App, which then:

1. Validates the request
2. Calls Java Email Service
3. Java Email Service reads database
4. Sends email using Azure Communication Service
5. Returns success/failure response

## 🔄 Updates

To update the app:

1. Edit files locally
2. Test in browser
3. Commit and push to GitHub
4. GitHub Actions deploys automatically
5. Changes live in 2-3 minutes

## 💡 Tips

- Always test API connection first
- Use browser console for debugging
- API URL is saved automatically
- Email format is validated before sending
- Success messages auto-hide after 5 seconds

---

**Part of the User Data Collection System**  
See `SYSTEM_ARCHITECTURE.md` for complete system overview.

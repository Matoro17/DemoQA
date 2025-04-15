# DemoQA Automation Challenge

**Objective**: Demonstrate automated testing capabilities for [DemoQA](https://demoqa.com/) using Cypress and JavaScript, covering key functionalities and best practices.


## 🛠 Framework Setup

### Prerequisites
- Node.js v18+
- npm v9+
- Chrome/Firefox browser

### Installation
```bash
git clone https://github.com/Matoro17/DemoQA
cd demoqa-automation
npm install
```

### Directory Structure
```
demoqa-automation/
├── cypress/
│   ├── e2e/                 # Test specs
│   ├── fixtures/            # Test data
│   ├── support/             # Custom commands
├── reports/                 # HTML/JSON test reports
└── .github/workflows/       # CI/CD pipelines
```

---

## 🚀 Test Execution

### Run Tests Locally
```bash
npx cypress open    # Interactive mode
npx cypress run     # Headless mode
```

### Generate Reports
```bash
npm run test:report  # Creates HTML report in reports/html/
```

### CI/CD Pipeline
- GitHub Actions workflow runs on push
- Results published to [GitHub Pages](https://matoro17.github.io/DemoQA/)

---

## 📋 Test Coverage

| Feature                | Test Cases                              | File               |
|------------------------|-----------------------------------------|--------------------|
| Forms                  | Valid/invalid submissions, validation   | `forms.cy.js`      |
| Elements               | Radio buttons, checkboxes, alerts       | `elements.cy.js`   |
| Widgets                | Date picker, sliders, tooltips          | `widgets.cy.js`    |
| Alerts Frame Windows   | Alerts, Frames and windows              | `alerts-frame-windows.cy.js` |
| Interactions           | Drag-and-drop, resizable elements       | `interactions.cy.js` |

---

## 🐛 Defect Report

**Issue**: Form accepts invalid email format  
**Steps to Reproduce**:
1. Navigate to Practice Form
2. Enter `invalid-email` in email field
3. Submit form

**Expected**: Validation error message  
**Actual**: Form submits successfully  
**Severity**: High (P1)  
**Status**: ----

---

## 💡 Improvement Recommendations

1. **CI Enhancements**:
   - Parallel test execution
   - Slack/MS Teams notifications
2. **Framework Upgrades**:
   - Page Object Model adoption
   - Visual regression testing
3. **Monitoring**:
   - Automated flaky test detection
   - Performance benchmarking

---

## 📄 Summary Report Highlights

**Tool Selection**:
- **Cypress**: Real-time reloads, built-in assertions, cross-browser support
- **Mochawesome**: Interactive HTML reporting

**Key Decisions**:
- GitHub Actions for CI/CD
- Atomic test design pattern
- Custom commands for login/API reuse

**Challenges**:
- Handling dynamic element IDs
- Cross-origin iframe limitations

---

## 📬 Submission

**GitHub Repository**:  
[https://github.com/yourusername/demoqa-automation](https://github.com/yourusername/demoqa-automation)

**Artifacts Included**:
- Full test scripts
- HTML/JSON reports
- CI/CD workflows
- Defect documentation

---

**Evaluation Criteria Alignment**:

✅ Modular/reusable test architecture  
✅ Clear defect documentation  
✅ Actionable CI improvement plan  
✅ Cross-browser error handling  

---

*Created for the DemoQA Automation Challenge*  
*Gabriel Silva de Azevedo | 15/04/2025*  
*gabrielsilvadeazevedo@gmail.com*  
```

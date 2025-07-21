# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
hi hi hi hi hi hi inhi jhih
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
sgfsadgnjkasnkljdgnkjlasegnfkaskngfklsngLKNLSLKNFKLASNklvnasgNKAKLSENGKLASD
### `npm test`
name: SonarQube PR Analysis (Community Edition)

on:
  pull_request:
    branches:
      - main

jobs:
  sonar-analysis:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run tests with coverage
        run: npm test -- --coverage
        continue-on-error: true

      - name: Run SonarQube scanner (Community Edition Safe)
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        run: |
          npx sonar-scanner \
            -Dsonar.projectKey=myreactproject \
            -Dsonar.sources=. \
            -Dsonar.host.url=${{ secrets.SONAR_HOST_URL }} \
            -Dsonar.login=${{ secrets.SONAR_TOKEN }} \
            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info

      - name: Wait for SonarQube analysis to complete
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        run: |
          echo "Waiting for SonarQube analysis to complete..."
          COMPONENT_KEY="myreactproject"
          ATTEMPTS=0
          MAX_ATTEMPTS=10
          SLEEP_SECONDS=10

          TASK_ID=$(curl -s -u "${{ secrets.SONAR_TOKEN }}:" \
            "${{ secrets.SONAR_HOST_URL }}/api/ce/component?component=${COMPONENT_KEY}" | jq -r '.current.id')

          while [ $ATTEMPTS -lt $MAX_ATTEMPTS ]; do
            STATUS=$(curl -s -u "${{ secrets.SONAR_TOKEN }}:" \
              "${{ secrets.SONAR_HOST_URL }}/api/ce/task?id=${TASK_ID}" | jq -r '.task.status')

            echo "SonarQube task status: $STATUS"

            if [ "$STATUS" = "SUCCESS" ]; then
              break
            elif [ "$STATUS" = "FAILED" ]; then
              echo "SonarQube analysis failed."
              exit 1
            fi

            sleep $SLEEP_SECONDS
            ATTEMPTS=$((ATTEMPTS+1))
          done

      - name: Fetch metrics from SonarQube
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        run: |
          curl -s -u "${{ secrets.SONAR_TOKEN }}:" \
            "${{ secrets.SONAR_HOST_URL }}/api/measures/component?component=myreactproject&metricKeys=bugs,vulnerabilities,code_smells,coverage,duplicated_lines_density,reliability_rating,security_rating,sqale_rating" \
            -o sonar_metrics.json

          echo "### 📊 SonarQube Quality Report" > sonar_comment.md
          echo "**Project:** \`myreactproject\`" >> sonar_comment.md
          echo "" >> sonar_comment.md

          if jq -e '.component.measures' sonar_metrics.json > /dev/null; then
            jq -r '.component.measures[] | 
              "- \(.metric | 
                  if . == \"bugs\" then \"🐞 Bugs\" 
                  elif . == \"vulnerabilities\" then \"🔐 Vulnerabilities\" 
                  elif . == \"code_smells\" then \"💨 Code Smells\" 
                  elif . == \"coverage\" then \"📈 Coverage\" 
                  elif . == \"duplicated_lines_density\" then \"🧬 Duplicated Lines (%)\" 
                  elif . == \"reliability_rating\" then \"📊 Reliability Rating\" 
                  elif . == \"security_rating\" then \"🔒 Security Rating\" 
                  elif . == \"sqale_rating\" then \"⚙️ Maintainability Rating\" 
                  else . 
                end): \(.value)"' sonar_metrics.json >> sonar_comment.md
          else
            echo "⚠️ Could not retrieve metrics. Check project key/token or SonarQube availability." >> sonar_comment.md
          fi
ewsfsadfrdeasedfdesfddesd
      - name: Comment on Pull Request with SonarQube Results
        uses: peter-evans/create-or-update-comment@v4
        with:
          token: ${{ secrets.GH_PAT }}
          issue-number: ${{ github.event.pull_request.number }}
          body-path: sonar_comment.md

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
zsfgsdgsdgsrdgkflasdkkgsleigadZx
### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

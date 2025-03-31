<<<<<<< HEAD
# E-Waste Management Dashboard

A comprehensive dashboard for visualizing and analyzing global e-waste management data.

## Features

- Interactive data visualizations
- Global e-waste distribution maps
- Trend analysis and predictions
- Material composition insights
- Recovery efficiency tracking

## Setup Instructions

### Frontend Setup

1. Install Node.js dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

### ML Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Generate plots:
```bash
cd ml_scripts
python generate_plots.py
```

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. For production deployment:
```bash
vercel --prod
```

### Build Commands

- Development build: `npm run build`
- Production build: `npm run build:prod`

## Project Structure

```
e-waste-management/
├── public/
│   └── plots/           # Generated visualization plots
├── src/
│   ├── components/      # React components
│   ├── assets/          # Static assets
│   └── styles/          # CSS styles
├── ml_scripts/
│   └── generate_plots.py # ML code for generating plots
└── package.json
```

## Technologies Used

- React.js
- TypeScript
- Styled Components
- Plotly.js
- Python (Data Analysis)
- Pandas
- Plotly Python

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
>>>>>>> origin/main

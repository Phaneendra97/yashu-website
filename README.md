# Yashaswini Mohan - Portfolio

A creative Kanban board-style portfolio website showcasing project management and software engineering expertise.

## Features

- **Interactive Kanban Board**: Drag and drop cards to explore different sections
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional design with smooth animations
- **Project Management Focus**: Layout reflects PM methodologies and attention to detail

## Sections

- **👤 Summary**: Professional overview with contact information
- **💼 Experience**: Work history at Wabtec Inc with key achievements
- **🏆 Certifications**: PMI-ACP, CSM, Six Sigma, Google PM certifications
- **🚀 Projects**: Technical projects including Power BI dashboards and API development
- **🎓 Education**: Academic background and ongoing studies
- **🛠️ Skills**: Comprehensive skill set organized by category

## Technology Stack

- **Frontend**: React 18
- **Styling**: CSS3 with modern features (backdrop-filter, gradients)
- **Drag & Drop**: react-beautiful-dnd
- **Icons**: Lucide React
- **Hosting**: Firebase Hosting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd yashu-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Deployment

### Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase project:
```bash
firebase init hosting
```

4. Update `.firebaserc` with your Firebase project ID

5. Build and deploy:
```bash
npm run build
firebase deploy
```

## Customization

### Adding a Headshot

1. Add your headshot image to `public/images/`
2. Update the profile card in `src/App.js` to include the image

### Modifying Content

All content is defined in the `columns` state in `src/App.js`. You can easily:
- Add new cards to existing columns
- Create new columns
- Modify card content and styling
- Update contact information

### Styling

- Global styles: `src/index.css`
- Component styles: Individual `.css` files in `src/components/`
- Main app styles: `src/App.css`

## Contact

- **Email**: yashaswini.phani@gmail.com
- **LinkedIn**: [linkedin.com/in/yashaswinimohan](https://linkedin.com/in/yashaswinimohan)

## License

MIT License - see LICENSE file for details.
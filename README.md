# Espotz Standings Generator

A modern, feature-rich esports standings generator that creates beautiful, customizable tournament graphics. Perfect for tournament organizers, content creators, and esports teams to generate professional-looking standings images for social media sharing.

![Espotz Standings Generator](https://img.shields.io/badge/version-0.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.7-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.19-38B2AC.svg)

## ✨ Features

- **Multiple Template Variants** - Choose from 6 stunning color themes (PMGC, BGIS, Black Gold, Dark Red, Dark Grey, Emerald Masters)
- **Dual Format Support** - Generate graphics in both Story (9:16) and Post (1:1) formats
- **Real-time Preview** - See changes instantly as you customize your standings
- **Export to PNG** - High-quality image export using html-to-image
- **Share Functionality** - Native Web Share API for easy sharing on mobile devices
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **History Tracking** - Save and access your previously generated standings
- **Customizable Tournament Info** - Add tournament name, game, and stage details
- **Beautiful UI** - Modern glassmorphism design with smooth animations

## 🚀 Tech Stack

- **Frontend Framework**: React 19.2.7
- **Language**: TypeScript 6.0.2
- **Styling**: Tailwind CSS 3.4.19
- **Build Tool**: Vite 8.1.1
- **Routing**: React Router DOM 7.18.1
- **Icons**: Lucide React 1.23.0
- **Image Export**: html-to-image 1.11.13
- **UI Components**: Radix UI (Label, Select, Switch, Slot)

## 📦 Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Clone the Repository

```bash
git clone https://github.com/raunaktastic/Espotz-Standings-Generator.git
cd Espotz-Standings-Generator
```

### Install Dependencies

```bash
npm install
```

## 🎯 Usage

### Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
Espotz-Standings-Generator/
├── src/
│   ├── components/
│   │   ├── common/          # Shared components
│   │   ├── controls/        # Input controls and form elements
│   │   ├── export/          # Export-related components
│   │   ├── layout/          # Layout components (Sidebar, ControlPanel)
│   │   ├── preview/         # Preview component
│   │   ├── templates/       # Template components
│   │   │   └── OverallStandings/
│   │   │       ├── OverallStandings.tsx
│   │   │       └── StandingsTable.tsx
│   │   └── ui/              # UI components (buttons, cards, etc.)
│   ├── hooks/              # Custom React hooks
│   │   └── useAppState.ts
│   ├── pages/               # Page components
│   │   ├── History.tsx
│   │   ├── SquareGenerator.tsx
│   │   ├── Templates.tsx
│   │   └── TournamentDetails.tsx
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── style.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Project dependencies
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## 🎨 Available Templates & Variants

### Overall Standings Template

The Overall Standings template supports 6 color variants:

| Variant | Primary Color | Description |
|---------|---------------|-------------|
| **PMGC** | Purple (#7f13eb) | PUBG Mobile Global Championship theme |
| **BGIS** | Orange (#dc2626) | BGIS theme |
| **Black Gold** | Gold (#f59e0b) | Premium black and gold theme |
| **Dark Red** | Red (#991b1b) | Dark red theme |
| **Dark Grey** | Grey (#6b7280) | Minimalist grey theme |
| **Emerald Masters** | Green (#059669) | Emerald green theme |

### Format Options

- **Story Format (9:16)** - Vertical format optimized for Instagram Stories
- **Post Format (1:1)** - Square format optimized for Instagram posts and Twitter

## 📝 Standings Data Structure

The standings data follows this structure:

```typescript
interface StandingEntry {
  rank: number              // Team rank position
  teamLogo: string         // URL to team logo
  teamName: string         // Full team name
  teamTag: string          // Team tag/abbreviation
  matches: number          // Number of matches played
  wwcd: number             // Winner Winner Chicken Dinner count
  finishPts: number        // Finish points
  positionPts: number      // Position points
  total: number            // Total points
  support: number          // Support points
  top8: number            // Top 8 placements
  top12: number           // Top 12 placements
  top16: number           // Top 16 placements
}

interface StandingsData {
  tournamentName: string    // Tournament name
  stageName: string        // Stage name
  gameName: string         // Game name
  date: string            // Tournament date
  entries: StandingEntry[] // Array of team entries
}
```

## 🛠️ Development Guide

### Adding a New Template Variant

1. Add the variant to the `OverallStandingsVariant` type in `src/types/index.ts`
2. Add the variant styling in the `getVariantStyles()` function in `src/components/templates/OverallStandings/OverallStandings.tsx`
3. Add the variant to the `variants` array in `src/components/layout/ControlPanel.tsx`

### Modifying Color Schemes

Color schemes are defined in the `getVariantStyles()` function in each template component. Modify the color values to create custom themes.

### Adding New Templates

1. Create a new folder in `src/components/templates/`
2. Implement the template component following the existing pattern
3. Add the template to `TEMPLATE_CONFIGS` in `src/types/index.ts`
4. Update the routing in `src/App.tsx`

## 🌐 Deployment

### Vercel

The easiest way to deploy is using Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect the Vite configuration
4. Deploy with one click

### Manual Deployment

Build the project and deploy the `dist` folder to any static hosting service:

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing code structure
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Ensure the build passes before submitting

## 📄 License

This project is private and proprietary. All rights reserved.

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf dist
npm run build
```

### TypeScript Errors

Ensure all dependencies are installed and TypeScript is properly configured:

```bash
npm install
npm run build
```

### Export Issues

If image export fails, ensure:
- The preview element is fully loaded
- No console errors are present
- Sufficient memory is available

## 📞 Support

For support, please contact the development team or open an issue in the repository.

## 🔮 Future Enhancements

- [ ] More template variants
- [ ] Custom color scheme editor
- [ ] Batch export functionality
- [ ] Team logo upload
- [ ] Data import from CSV/JSON
- [ ] Dark/Light mode toggle
- [ ] Multi-language support
- [ ] Advanced statistics visualization

---

Made with ❤️ for the esports community

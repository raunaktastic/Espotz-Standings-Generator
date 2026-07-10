import type { OverallStandingsVariant, StandingsData } from '@/types'
import { StandingsTable } from '@/components/templates/OverallStandings/StandingsTable'

interface OverallStandingsProps {
  variant: OverallStandingsVariant
  isThumbnail?: boolean
  data?: StandingsData
}

export function OverallStandings({ variant, isThumbnail = false, data }: OverallStandingsProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'pmgc':
        return {
          bgPrimary: 'from-slate-900 via-blue-950 to-slate-900',
          bgSecondary: 'from-cyan-600/20 to-blue-600/20',
          accent: 'from-cyan-400 to-blue-500',
          accentSecondary: 'from-blue-500 to-cyan-600',
          text: 'text-white',
          textSecondary: 'text-cyan-200',
          glow: 'shadow-cyan-500/50',
          border: 'border-cyan-500/30',
        }
      case 'bgis':
        return {
          bgPrimary: 'from-slate-900 via-purple-950 to-slate-900',
          bgSecondary: 'from-purple-600/20 to-violet-600/20',
          accent: 'from-purple-400 to-violet-500',
          accentSecondary: 'from-violet-500 to-purple-600',
          text: 'text-white',
          textSecondary: 'text-purple-200',
          glow: 'shadow-purple-500/50',
          border: 'border-purple-500/30',
        }
      case 'blackGold':
        return {
          bgPrimary: 'from-black via-gray-950 to-black',
          bgSecondary: 'from-yellow-600/15 to-amber-600/15',
          accent: 'from-yellow-400 to-amber-500',
          accentSecondary: 'from-amber-500 to-yellow-600',
          text: 'text-white',
          textSecondary: 'text-yellow-200',
          glow: 'shadow-yellow-500/50',
          border: 'border-yellow-500/30',
        }
      case 'darkRed':
        return {
          bgPrimary: 'from-slate-900 via-red-950 to-slate-900',
          bgSecondary: 'from-red-600/20 to-orange-600/20',
          accent: 'from-red-400 to-orange-500',
          accentSecondary: 'from-orange-500 to-red-600',
          text: 'text-white',
          textSecondary: 'text-red-200',
          glow: 'shadow-red-500/50',
          border: 'border-red-500/30',
        }
      case 'minimalWhite':
        return {
          bgPrimary: 'from-gray-100 via-white to-gray-200',
          bgSecondary: 'from-gray-300/30 to-slate-300/30',
          accent: 'from-gray-600 to-slate-700',
          accentSecondary: 'from-slate-600 to-gray-700',
          text: 'text-gray-900',
          textSecondary: 'text-gray-600',
          glow: 'shadow-gray-500/30',
          border: 'border-gray-400/40',
        }
      case 'emeraldMasters':
        return {
          bgPrimary: 'from-slate-900 via-emerald-950 to-slate-900',
          bgSecondary: 'from-emerald-600/20 to-teal-600/20',
          accent: 'from-emerald-400 to-teal-500',
          accentSecondary: 'from-teal-500 to-emerald-600',
          text: 'text-white',
          textSecondary: 'text-emerald-200',
          glow: 'shadow-emerald-500/50',
          border: 'border-emerald-500/30',
        }
      default:
        return {
          bgPrimary: 'from-slate-900 via-blue-950 to-slate-900',
          bgSecondary: 'from-cyan-600/20 to-blue-600/20',
          accent: 'from-cyan-400 to-blue-500',
          accentSecondary: 'from-blue-500 to-cyan-600',
          text: 'text-white',
          textSecondary: 'text-cyan-200',
          glow: 'shadow-cyan-500/50',
          border: 'border-cyan-500/30',
        }
    }
  }

  const styles = getVariantStyles()

  // Mock data for preview
  const mockData: StandingsData = data || {
    tournamentName: 'CHAMPIONSHIP 2024',
    stageName: 'GRAND FINALS',
    gameName: 'PUBG MOBILE',
    date: 'DAY 3',
    entries: [
      { rank: 1, teamLogo: '🏆', teamName: 'Team Alpha', teamTag: 'ALPHA', matches: 15, wwcd: 3, finishPts: 120, positionPts: 45, total: 165, support: 0, top8: 12, top12: 14, top16: 15 },
      { rank: 2, teamLogo: '🥈', teamName: 'Team Beta', teamTag: 'BETA', matches: 15, wwcd: 2, finishPts: 115, positionPts: 40, total: 155, support: 0, top8: 11, top12: 13, top16: 15 },
      { rank: 3, teamLogo: '🥉', teamName: 'Team Gamma', teamTag: 'GAMMA', matches: 15, wwcd: 2, finishPts: 110, positionPts: 35, total: 145, support: 0, top8: 10, top12: 12, top16: 15 },
      { rank: 4, teamLogo: '4️⃣', teamName: 'Team Delta', teamTag: 'DELTA', matches: 15, wwcd: 1, finishPts: 105, positionPts: 30, total: 135, support: 0, top8: 9, top12: 11, top16: 15 },
      { rank: 5, teamLogo: '5️⃣', teamName: 'Team Epsilon', teamTag: 'EPS', matches: 15, wwcd: 1, finishPts: 100, positionPts: 25, total: 125, support: 0, top8: 8, top12: 10, top16: 15 },
      { rank: 6, teamLogo: '6️⃣', teamName: 'Team Zeta', teamTag: 'ZETA', matches: 15, wwcd: 1, finishPts: 95, positionPts: 20, total: 115, support: 0, top8: 7, top12: 9, top16: 15 },
      { rank: 7, teamLogo: '7️⃣', teamName: 'Team Eta', teamTag: 'ETA', matches: 15, wwcd: 0, finishPts: 90, positionPts: 18, total: 108, support: 0, top8: 6, top12: 8, top16: 15 },
      { rank: 8, teamLogo: '8️⃣', teamName: 'Team Theta', teamTag: 'THETA', matches: 15, wwcd: 0, finishPts: 85, positionPts: 15, total: 100, support: 0, top8: 5, top12: 7, top16: 15 },
    ],
  }

  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${styles.bgPrimary} overflow-hidden`}>
      {/* Layered Background Effects */}
      <div className="absolute inset-0">
        {/* Primary radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-white/5 to-transparent rounded-full blur-3xl" />
        
        {/* Corner glows */}
        <div className={`absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl ${styles.bgSecondary} rounded-full blur-3xl opacity-60`} />
        <div className={`absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr ${styles.bgSecondary} rounded-full blur-3xl opacity-60`} />
        
        {/* Diagonal overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        
        {/* Gaming shapes */}
        <div className="absolute top-1/4 left-0 w-32 h-32 border-l-2 border-t-2 border-white/10 rounded-tl-3xl" />
        <div className="absolute bottom-1/4 right-0 w-32 h-32 border-r-2 border-b-2 border-white/10 rounded-br-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-6">
        {/* Header Section */}
        <div className="mb-5">
          {/* Tournament Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r ${styles.accent} rounded-full mb-4 shadow-lg ${styles.glow}`}>
            <span className="text-white text-xs font-bold uppercase tracking-widest">Live</span>
          </div>
          
          {/* Main Title */}
          <h1 className={`${isThumbnail ? 'text-2xl' : 'text-5xl'} font-black ${styles.text} uppercase tracking-tight mb-2 leading-none`}>
            {mockData.tournamentName}
          </h1>
          
          {/* Subtitle */}
          <div className="flex items-center gap-4">
            <h2 className={`${isThumbnail ? 'text-sm' : 'text-xl'} font-bold ${styles.textSecondary} uppercase tracking-wider`}>
              {mockData.stageName}
            </h2>
            {!isThumbnail && (
              <>
                <div className={`h-6 w-px bg-gradient-to-b ${styles.accent}`} />
                <span className={`${styles.text} text-sm font-medium opacity-70`}>{mockData.gameName}</span>
                <div className={`h-6 w-px bg-gradient-to-b ${styles.accent}`} />
                <span className={`${styles.text} text-sm font-medium opacity-70`}>{mockData.date}</span>
              </>
            )}
          </div>
        </div>

        {/* Standings Panel */}
        <div className="flex-1">
          <div className={`bg-black/30 backdrop-blur-xl rounded-2xl border ${styles.border} p-4 shadow-2xl`}>
            <StandingsTable 
              entries={mockData.entries}
              variant={variant}
              isThumbnail={isThumbnail}
            />
          </div>
        </div>

        {/* Footer */}
        {!isThumbnail && (
          <div className="mt-4 flex items-center justify-between">
            <div className={`text-xs ${styles.text} opacity-50`}>
              © 2024 Tournament Organizers
            </div>
            <div className={`text-xs ${styles.text} opacity-50`}>
              Official Standings
            </div>
          </div>
        )}
      </div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  )
}

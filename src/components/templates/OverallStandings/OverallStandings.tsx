import { forwardRef } from 'react'
import type { OverallStandingsVariant, StandingsData } from '@/types'
import { StandingsTable } from '@/components/templates/OverallStandings/StandingsTable'

interface OverallStandingsProps {
  variant?: OverallStandingsVariant
  isThumbnail?: boolean
  data?: StandingsData
  tournamentName?: string
  stageName?: string
  gameName?: string
}

export const OverallStandings = forwardRef<HTMLDivElement, OverallStandingsProps>(({ variant = 'pmgc', isThumbnail = false, data, tournamentName, stageName, gameName }, ref) => {
  // Variant-specific styling
  const getVariantStyles = () => {
    switch (variant) {
      case 'pmgc':
        return {
          primary: '#7f13eb',
          secondary: '#8b5cf6',
          accent: '#d8b4fe',
          bgGradient: 'from-[#7f13eb]/30 via-[#7f13eb]/10 to-transparent',
          accentGradient: 'from-[#7f13eb] to-[#8b5cf6]',
        }
      case 'bgis':
        return {
          primary: '#dc2626',
          secondary: '#ef4444',
          accent: '#fca5a5',
          bgGradient: 'from-[#dc2626]/30 via-[#dc2626]/10 to-transparent',
          accentGradient: 'from-[#dc2626] to-[#ef4444]',
        }
      case 'blackGold':
        return {
          primary: '#f59e0b',
          secondary: '#fbbf24',
          accent: '#fcd34d',
          bgGradient: 'from-[#f59e0b]/30 via-[#f59e0b]/10 to-transparent',
          accentGradient: 'from-[#f59e0b] to-[#fbbf24]',
        }
      case 'darkRed':
        return {
          primary: '#991b1b',
          secondary: '#b91c1c',
          accent: '#fecaca',
          bgGradient: 'from-[#991b1b]/30 via-[#991b1b]/10 to-transparent',
          accentGradient: 'from-[#991b1b] to-[#b91c1c]',
        }
      case 'darkGrey':
        return {
          primary: '#6b7280',
          secondary: '#9ca3af',
          accent: '#d1d5db',
          bgGradient: 'from-[#6b7280]/30 via-[#6b7280]/10 to-transparent',
          accentGradient: 'from-[#6b7280] to-[#9ca3af]',
        }
      case 'emeraldMasters':
        return {
          primary: '#059669',
          secondary: '#10b981',
          accent: '#6ee7b7',
          bgGradient: 'from-[#059669]/30 via-[#059669]/10 to-transparent',
          accentGradient: 'from-[#059669] to-[#10b981]',
        }
      default:
        return {
          primary: '#7f13eb',
          secondary: '#8b5cf6',
          accent: '#d8b4fe',
          bgGradient: 'from-[#7f13eb]/30 via-[#7f13eb]/10 to-transparent',
          accentGradient: 'from-[#7f13eb] to-[#8b5cf6]',
        }
    }
  }

  const styles = getVariantStyles()

  // Mock data for preview - 12 teams
  const mockData: StandingsData = data || {
    tournamentName: tournamentName || 'CHAMPIONSHIP 2024',
    stageName: stageName || 'GRAND FINALS',
    gameName: gameName || 'PUBG MOBILE',
    date: '',
    entries: [
      { rank: 1, teamLogo: '', teamName: 'Team Alpha', teamTag: 'ALPHA', matches: 15, wwcd: 3, finishPts: 120, positionPts: 45, total: 165, support: 0, top8: 12, top12: 14, top16: 15 },
      { rank: 2, teamLogo: '', teamName: 'Team Beta', teamTag: 'BETA', matches: 15, wwcd: 2, finishPts: 115, positionPts: 40, total: 155, support: 0, top8: 11, top12: 13, top16: 15 },
      { rank: 3, teamLogo: '', teamName: 'Team Gamma', teamTag: 'GAMMA', matches: 15, wwcd: 2, finishPts: 110, positionPts: 35, total: 145, support: 0, top8: 10, top12: 12, top16: 15 },
      { rank: 4, teamLogo: '', teamName: 'Team Delta', teamTag: 'DELTA', matches: 15, wwcd: 1, finishPts: 105, positionPts: 30, total: 135, support: 0, top8: 9, top12: 11, top16: 15 },
      { rank: 5, teamLogo: '', teamName: 'Team Epsilon', teamTag: 'EPS', matches: 15, wwcd: 1, finishPts: 100, positionPts: 25, total: 125, support: 0, top8: 8, top12: 10, top16: 15 },
      { rank: 6, teamLogo: '', teamName: 'Team Zeta', teamTag: 'ZETA', matches: 15, wwcd: 1, finishPts: 95, positionPts: 20, total: 115, support: 0, top8: 7, top12: 9, top16: 15 },
      { rank: 7, teamLogo: '', teamName: 'Team Eta', teamTag: 'ETA', matches: 15, wwcd: 0, finishPts: 90, positionPts: 18, total: 108, support: 0, top8: 6, top12: 8, top16: 15 },
      { rank: 8, teamLogo: '', teamName: 'Team Theta', teamTag: 'THETA', matches: 15, wwcd: 0, finishPts: 85, positionPts: 15, total: 100, support: 0, top8: 5, top12: 7, top16: 15 },
      { rank: 9, teamLogo: '', teamName: 'Team Iota', teamTag: 'IOTA', matches: 15, wwcd: 0, finishPts: 80, positionPts: 12, total: 92, support: 0, top8: 4, top12: 6, top16: 15 },
      { rank: 10, teamLogo: '', teamName: 'Team Kappa', teamTag: 'KAPPA', matches: 15, wwcd: 0, finishPts: 75, positionPts: 10, total: 85, support: 0, top8: 3, top12: 5, top16: 15 },
      { rank: 11, teamLogo: '', teamName: 'Team Lambda', teamTag: 'LAMBDA', matches: 15, wwcd: 0, finishPts: 70, positionPts: 8, total: 78, support: 0, top8: 2, top12: 4, top16: 15 },
      { rank: 12, teamLogo: '', teamName: 'Team Mu', teamTag: 'MU', matches: 15, wwcd: 0, finishPts: 65, positionPts: 6, total: 71, support: 0, top8: 1, top12: 3, top16: 15 },
    ],
  }

  return (
    <div ref={ref} className="relative w-full h-full bg-[#050508] overflow-hidden">
      {/* Premium Geometric Background */}
      <div className="absolute inset-0">
        {/* Top-left gradient burst */}
        <div className={`absolute top-0 left-0 w-[600px] h-[400px] bg-gradient-to-br ${styles.bgGradient} rounded-full blur-[100px]`} />
        {/* Bottom-right accent */}
        <div className={`absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[${styles.secondary}]/20 via-transparent to-transparent rounded-full blur-[80px]`} />
        {/* Geometric grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(0deg, ${styles.primary} 1px, transparent 1px), linear-gradient(90deg, ${styles.primary} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        {/* Diagonal light beam */}
        <div className={`absolute top-0 right-0 w-[300px] h-full bg-gradient-to-b from-transparent via-[${styles.primary}]/5 to-transparent transform skew-x-12`} />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Hero Section */}
        {isThumbnail ? (
          <div className="relative px-4 pt-3 pb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${styles.accentGradient} rounded-lg blur-sm opacity-60`} />
                  <img src="/favicon.svg" alt="Espotz" className="relative h-6 w-auto" />
                </div>
                <div className="text-sm font-black text-white uppercase tracking-tighter">ESPOTZ</div>
              </div>
            </div>
            <div className="mb-2">
              <h1 className="text-lg font-black text-white uppercase tracking-tighter leading-none">{mockData.tournamentName}</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-0.5 w-10 bg-gradient-to-r ${styles.accentGradient}`} />
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Overall Standings</span>
            </div>
          </div>
        ) : (
          <div className="relative px-6 pt-6 pb-4">
            {/* ESPOTZ Logo & Branding */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`absolute -inset-2 bg-gradient-to-r ${styles.accentGradient} rounded-xl blur-md opacity-60`} />
                  <img src="/favicon.svg" alt="Espotz" className="relative h-10 w-auto" />
                </div>
                <div>
                  <div className="text-xl font-black text-white uppercase tracking-tighter">ESPOTZ</div>
                  <div className={`text-[10px] text-[${styles.accent}] uppercase tracking-[0.3em] font-semibold`}>Esports Platform</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                <div className="text-right">
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">Official</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">Standings</div>
                </div>
              </div>
            </div>

            {/* Tournament Title */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`h-0.5 w-12 bg-gradient-to-r ${styles.accentGradient}`} />
                <span className={`text-xs font-bold text-[${styles.accent}] uppercase tracking-[0.2em]`}>Tournament</span>
              </div>
              <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                {mockData.tournamentName}
              </h1>
            </div>

            {/* Overall Standings Label */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 bg-[${styles.primary}] rounded-full`} />
                <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Overall Standings</span>
                <div className={`w-1.5 h-1.5 bg-[${styles.primary}] rounded-full`} />
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/20 to-transparent" />
            </div>
          </div>
        )}

        {/* Standings Section */}
        <div className={`flex-1 ${isThumbnail ? 'px-4 pb-2' : 'px-6 pb-4'}`}>
          <div className="h-full bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <StandingsTable
              entries={mockData.entries}
              variant={variant}
              isThumbnail={isThumbnail}
            />
          </div>
        </div>

        {/* Footer */}
        {!isThumbnail && (
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between py-3 border-t border-white/10 bg-gradient-to-r from-white/[0.02] to-transparent rounded-b-2xl">
              <div className="flex items-center gap-3">
                <img src="/favicon.svg" alt="Espotz" className="h-4 w-auto opacity-60" />
                <span className="text-[10px] text-white/50 uppercase tracking-wider font-black">ESPOTZ</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-[9px] text-white/40 uppercase tracking-wider">© 2024 Tournament Organizers</div>
                <div className="h-3 w-px bg-white/10" />
                <div className="text-[9px] text-white/40 uppercase tracking-wider">Official Standings</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

OverallStandings.displayName = 'OverallStandings'

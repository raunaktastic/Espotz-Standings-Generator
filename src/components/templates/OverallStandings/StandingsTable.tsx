import type { StandingEntry, OverallStandingsVariant } from '@/types'

interface StandingsTableProps {
  entries: StandingEntry[]
  variant?: OverallStandingsVariant
  isThumbnail?: boolean
}

export function StandingsTable({ entries, variant = 'pmgc', isThumbnail = false }: StandingsTableProps) {
  // Variant-specific styling
  const getVariantStyles = () => {
    switch (variant) {
      case 'pmgc':
        return {
          primary: '#7f13eb',
          secondary: '#8b5cf6',
          accent: '#a855f7',
          headerGradient: 'from-[#7f13eb]/15 via-[#8b5cf6]/10 to-transparent',
        }
      case 'bgis':
        return {
          primary: '#dc2626',
          secondary: '#ef4444',
          accent: '#f87171',
          headerGradient: 'from-[#dc2626]/15 via-[#ef4444]/10 to-transparent',
        }
      case 'blackGold':
        return {
          primary: '#f59e0b',
          secondary: '#fbbf24',
          accent: '#fbbf24',
          headerGradient: 'from-[#f59e0b]/15 via-[#fbbf24]/10 to-transparent',
        }
      case 'darkRed':
        return {
          primary: '#991b1b',
          secondary: '#b91c1c',
          accent: '#fca5a5',
          headerGradient: 'from-[#991b1b]/15 via-[#b91c1c]/10 to-transparent',
        }
      case 'darkGrey':
        return {
          primary: '#6b7280',
          secondary: '#9ca3af',
          accent: '#9ca3af',
          headerGradient: 'from-[#6b7280]/15 via-[#9ca3af]/10 to-transparent',
        }
      case 'emeraldMasters':
        return {
          primary: '#059669',
          secondary: '#10b981',
          accent: '#34d399',
          headerGradient: 'from-[#059669]/15 via-[#10b981]/10 to-transparent',
        }
      default:
        return {
          primary: '#7f13eb',
          secondary: '#8b5cf6',
          accent: '#a855f7',
          headerGradient: 'from-[#7f13eb]/15 via-[#8b5cf6]/10 to-transparent',
        }
    }
  }

  const styles = getVariantStyles()
  if (isThumbnail) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className={`px-2 py-1.5 bg-gradient-to-r ${styles.headerGradient} border-b border-white/10`}>
          <div className="grid grid-cols-6 gap-1 items-center">
            <div className="text-[8px] font-black uppercase tracking-widest text-white/60 text-center">Rank</div>
            <div className="col-span-2 text-[8px] font-black uppercase tracking-widest text-white/60">Team Name</div>
            <div className="text-[8px] font-black uppercase tracking-widest text-white/60 text-center">WWCD</div>
            <div className="text-[8px] font-black uppercase tracking-widest text-white/60 text-center">Fin. Pts.</div>
            <div className="text-[8px] font-black uppercase tracking-widest text-white/60 text-center">Pos. Pts.</div>
            <div className="text-[8px] font-black uppercase tracking-widest text-white/60 text-center">Tot. Pts.</div>
          </div>
        </div>

        {/* Rows */}
        <div className="flex-1">
          {entries.map((entry, index) => (
            <div
              key={entry.rank}
              className={`relative group px-2 py-1 border-b border-white/[0.03] transition-all ${
                index === 0 ? 'bg-gradient-to-r from-yellow-500/8 via-transparent to-transparent' :
                index === 1 ? 'bg-gradient-to-r from-gray-400/8 via-transparent to-transparent' :
                index === 2 ? 'bg-gradient-to-r from-amber-600/8 via-transparent to-transparent' :
                'hover:bg-white/[0.02]'
              }`}
            >
              <div className="grid grid-cols-6 gap-1 items-center">
                {/* Rank */}
                <div className="flex items-center justify-center">
                  <div className={`w-5 h-5 flex items-center justify-center rounded-sm font-black text-[9px] ${
                    entry.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-black shadow-sm shadow-yellow-500/30' :
                    entry.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-slate-400 text-black shadow-sm shadow-gray-400/30' :
                    entry.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-sm shadow-amber-600/30' :
                    'bg-white/10 text-white'
                  }`}>
                    {entry.rank}
                  </div>
                </div>

                {/* Team */}
                <div className="col-span-2 min-w-0">
                  <div className="text-[9px] font-black text-white truncate uppercase tracking-tight leading-none">{entry.teamName}</div>
                  <div className="text-[7px] text-white/40 uppercase tracking-wider leading-none">{entry.teamTag}</div>
                </div>

                {/* Stats */}
                <div className="text-[9px] font-bold text-white/70 text-center leading-none">{entry.wwcd}</div>
                <div className="text-[9px] font-bold text-white/70 text-center leading-none">{entry.finishPts}</div>
                <div className="text-[9px] font-bold text-white/70 text-center leading-none">{entry.positionPts}</div>
                <div className="text-[9px] font-black text-white text-center leading-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className={`px-4 py-2 bg-gradient-to-r ${styles.headerGradient} border-b border-white/10`}>
        <div className="grid grid-cols-6 gap-2 items-center">
          <div className="text-[10px] font-black uppercase tracking-widest text-white/60 text-center">Rank</div>
          <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-white/60">Team Name</div>
          <div className="text-[10px] font-black uppercase tracking-widest text-white/60 text-center">WWCD</div>
          <div className="text-[10px] font-black uppercase tracking-widest text-white/60 text-center">Fin. Pts.</div>
          <div className="text-[10px] font-black uppercase tracking-widest text-white/60 text-center">Pos. Pts.</div>
          <div className="text-[10px] font-black uppercase tracking-widest text-white/60 text-center">Tot. Pts.</div>
        </div>
      </div>

      {/* Rows */}
      <div className="flex-1">
        {entries.map((entry, index) => (
          <div
            key={entry.rank}
            className={`relative group px-4 py-2 border-b border-white/[0.03] transition-all ${
              index === 0 ? 'bg-gradient-to-r from-yellow-500/8 via-transparent to-transparent' :
              index === 1 ? 'bg-gradient-to-r from-gray-400/8 via-transparent to-transparent' :
              index === 2 ? 'bg-gradient-to-r from-amber-600/8 via-transparent to-transparent' :
              'hover:bg-white/[0.02]'
            }`}
          >
            <div className="grid grid-cols-6 gap-2 items-center">
              {/* Rank */}
              <div className="flex items-center justify-center">
                <div className={`w-7 h-7 flex items-center justify-center rounded-lg font-black text-xs ${
                  entry.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/30' :
                  entry.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-slate-400 text-black shadow-lg shadow-gray-400/30' :
                  entry.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-lg shadow-amber-600/30' :
                  'bg-white/10 text-white'
                }`}>
                  {entry.rank}
                </div>
              </div>

              {/* Team */}
              <div className="col-span-2 flex-1 min-w-0">
                <div className="text-xs font-black text-white truncate uppercase tracking-tight">{entry.teamName}</div>
                <div className="text-[9px] text-white/40 uppercase tracking-wider">{entry.teamTag}</div>
              </div>

              {/* Stats */}
              <div className="text-[10px] font-bold text-white/70 text-center">{entry.wwcd}</div>
              <div className="text-[10px] font-bold text-white/70 text-center">{entry.finishPts}</div>
              <div className="text-[10px] font-bold text-white/70 text-center">{entry.positionPts}</div>
              <div className="text-xs font-black text-white text-center"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

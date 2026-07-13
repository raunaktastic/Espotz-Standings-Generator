import type { StandingEntry, OverallStandingsVariant } from '@/types'

interface StandingsTableProps {
  entries: StandingEntry[]
  variant: OverallStandingsVariant
  isThumbnail?: boolean
}

export function StandingsTable({ entries, variant, isThumbnail = false }: StandingsTableProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'pmgc':
        return {
          header: 'from-cyan-500/30 to-blue-500/30',
          row: 'bg-white/5 hover:bg-white/10',
          rowTop3: 'from-cyan-500/20 to-blue-500/20',
          border: 'border-cyan-500/20',
          text: 'text-white',
          textSecondary: 'text-cyan-200',
          accent: 'text-cyan-400',
          rank1: 'from-yellow-400 to-amber-500',
          rank2: 'from-gray-300 to-slate-400',
          rank3: 'from-amber-600 to-orange-700',
        }
      case 'bgis':
        return {
          header: 'from-purple-500/30 to-violet-500/30',
          row: 'bg-white/5 hover:bg-white/10',
          rowTop3: 'from-purple-500/20 to-violet-500/20',
          border: 'border-purple-500/20',
          text: 'text-white',
          textSecondary: 'text-purple-200',
          accent: 'text-purple-400',
          rank1: 'from-yellow-400 to-amber-500',
          rank2: 'from-gray-300 to-slate-400',
          rank3: 'from-amber-600 to-orange-700',
        }
      case 'blackGold':
        return {
          header: 'from-yellow-500/25 to-amber-500/25',
          row: 'bg-white/5 hover:bg-white/10',
          rowTop3: 'from-yellow-500/15 to-amber-500/15',
          border: 'border-yellow-500/20',
          text: 'text-white',
          textSecondary: 'text-yellow-200',
          accent: 'text-yellow-400',
          rank1: 'from-yellow-300 to-amber-400',
          rank2: 'from-gray-200 to-slate-300',
          rank3: 'from-amber-500 to-orange-600',
        }
      case 'darkRed':
        return {
          header: 'from-red-500/30 to-orange-500/30',
          row: 'bg-white/5 hover:bg-white/10',
          rowTop3: 'from-red-500/20 to-orange-500/20',
          border: 'border-red-500/20',
          text: 'text-white',
          textSecondary: 'text-red-200',
          accent: 'text-red-400',
          rank1: 'from-yellow-400 to-amber-500',
          rank2: 'from-gray-300 to-slate-400',
          rank3: 'from-amber-600 to-orange-700',
        }
      case 'darkGrey':
        return {
          header: 'from-gray-500/30 to-slate-500/30',
          row: 'bg-white/5 hover:bg-white/10',
          rowTop3: 'from-gray-500/20 to-slate-500/20',
          border: 'border-gray-500/20',
          text: 'text-white',
          textSecondary: 'text-gray-300',
          accent: 'text-gray-400',
          rank1: 'from-yellow-400 to-amber-500',
          rank2: 'from-gray-300 to-slate-400',
          rank3: 'from-amber-600 to-orange-700',
        }
      case 'emeraldMasters':
        return {
          header: 'from-emerald-500/30 to-teal-500/30',
          row: 'bg-white/5 hover:bg-white/10',
          rowTop3: 'from-emerald-500/20 to-teal-500/20',
          border: 'border-emerald-500/20',
          text: 'text-white',
          textSecondary: 'text-emerald-200',
          accent: 'text-emerald-400',
          rank1: 'from-yellow-400 to-amber-500',
          rank2: 'from-gray-300 to-slate-400',
          rank3: 'from-amber-600 to-orange-700',
        }
      default:
        return {
          header: 'from-cyan-500/30 to-blue-500/30',
          row: 'bg-white/5 hover:bg-white/10',
          rowTop3: 'from-cyan-500/20 to-blue-500/20',
          border: 'border-cyan-500/20',
          text: 'text-white',
          textSecondary: 'text-cyan-200',
          accent: 'text-cyan-400',
          rank1: 'from-yellow-400 to-amber-500',
          rank2: 'from-gray-300 to-slate-400',
          rank3: 'from-amber-600 to-orange-700',
        }
    }
  }

  const styles = getVariantStyles()

  const getRankBadge = () => {
    return 'from-white/10 to-white/5'
  }

  const getRowBackground = (rank: number) => {
    if (rank <= 3) return styles.rowTop3
    return styles.row
  }

  if (isThumbnail) {
    return (
      <div className="space-y-1.5">
        {entries.slice(0, 3).map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center gap-2 p-2 rounded-xl border ${styles.border} bg-gradient-to-r ${getRowBackground(entry.rank)} backdrop-blur-sm`}
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold bg-gradient-to-br ${getRankBadge()} shadow-lg`}>
              {entry.rank}
            </div>
            <div className="flex-1">
              <div className={`text-xs font-bold ${styles.text}`}>{entry.teamTag}</div>
            </div>
            <div className={`text-sm font-black ${styles.accent}`}>{entry.total}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto space-y-2">
      {/* Header */}
      <div className={`grid grid-cols-7 gap-2 px-3 py-2 rounded-lg bg-gradient-to-r ${styles.header} backdrop-blur-sm`}>
        <div className="text-xs font-bold uppercase tracking-wider text-center">RANK</div>
        <div className="col-span-2 text-xs font-bold uppercase tracking-wider">TEAM</div>
        <div className="text-xs font-bold uppercase tracking-wider text-center">MATCHES</div>
        <div className="text-xs font-bold uppercase tracking-wider text-center">WWCD</div>
        <div className="text-xs font-bold uppercase tracking-wider text-center">FIN. PTS.</div>
        <div className="text-xs font-bold uppercase tracking-wider text-center">POS. PTS.</div>
        <div className="text-xs font-bold uppercase tracking-wider text-center">TOTAL</div>
      </div>

      {/* Rows */}
      {entries.map((entry) => (
        <div
          key={entry.rank}
          className={`grid grid-cols-7 gap-2 px-3 py-2.5 rounded-xl border ${styles.border} bg-gradient-to-r ${getRowBackground(entry.rank)} backdrop-blur-sm hover:scale-[1.02] transition-all duration-200`}
        >
          {/* Rank */}
          <div className="flex items-center justify-center">
            <div className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-black bg-gradient-to-br ${getRankBadge()} shadow-lg`}>
              {entry.rank}
            </div>
          </div>

          {/* Team */}
          <div className="col-span-2 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-lg backdrop-blur-sm">
              {entry.teamLogo}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-bold ${styles.text} truncate`}>{entry.teamName}</div>
              <div className={`text-xs ${styles.textSecondary} opacity-70`}>{entry.teamTag}</div>
            </div>
          </div>

          {/* Matches */}
          <div className={`flex items-center justify-center text-sm font-medium ${styles.text}`}>
            {entry.matches}
          </div>

          {/* WWCD */}
          <div className={`flex items-center justify-center text-sm font-black ${styles.accent}`}>
            {entry.wwcd}
          </div>

          {/* Position Pts */}
          <div className={`flex items-center justify-center text-sm font-medium ${styles.text}`}>
            {entry.positionPts}
          </div>

          {/* Total */}
          <div className={`flex items-center justify-center text-sm font-black ${styles.accent}`}>
            {entry.total}
          </div>
        </div>
      ))}
    </div>
  )
}

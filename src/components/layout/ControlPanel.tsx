import type { TemplateVariant, Format } from '@/types'

interface ControlPanelProps {
  tournamentName: string
  stageName: string
  gameName: string
  templateVariant: TemplateVariant
  selectedFormat: Format
  onTournamentNameChange: (value: string) => void
  onStageNameChange: (value: string) => void
  onGameNameChange: (value: string) => void
  onVariantChange: (value: TemplateVariant) => void
  onFormatChange: (format: Format) => void
  onExport: () => void
  onShare: () => void
}

const variants: { id: TemplateVariant; label: string; color: string }[] = [
  { id: 'pmgc', label: 'PMGC', color: 'from-[#7f13eb] to-[#8b5cf6]' },
  { id: 'bgis', label: 'BGIS', color: 'from-[#f59e0b] to-[#d97706]' },
  { id: 'blackGold', label: 'Black Gold', color: 'from-[#fbbf24] to-[#b45309]' },
  { id: 'darkRed', label: 'Dark Red', color: 'from-[#dc2626] to-[#991b1b]' },
  { id: 'darkGrey', label: 'Dark Grey', color: 'from-[#6b7280] to-[#374151]' },
  { id: 'emeraldMasters', label: 'Emerald', color: 'from-[#10b981] to-[#059669]' },
]

export function ControlPanel({
  tournamentName,
  stageName,
  gameName,
  templateVariant,
  selectedFormat,
  onTournamentNameChange,
  onStageNameChange,
  onGameNameChange,
  onVariantChange,
  onFormatChange,
  onExport,
  onShare,
}: ControlPanelProps) {
  return (
    <div className="w-full lg:w-[400px] h-full bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col flex-shrink-0">
      {/* Section 1: Tournament Info */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7f13eb] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-[#7f13eb]/30">
            <span className="text-sm font-black text-white">1</span>
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Tournament Info</h3>
        </div>
        <div className="space-y-2">
          <div>
            <label className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-1 block">Tournament Name</label>
            <input
              type="text"
              value={tournamentName}
              onChange={(e) => onTournamentNameChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#7f13eb]/50 focus:ring-1 focus:ring-[#7f13eb]/20 transition-all"
              placeholder="Enter tournament name"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-1 block">Game</label>
            <input
              type="text"
              value={gameName}
              onChange={(e) => onGameNameChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#7f13eb]/50 focus:ring-1 focus:ring-[#7f13eb]/20 transition-all"
              placeholder="Enter game name"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-1 block">Stage</label>
            <input
              type="text"
              value={stageName}
              onChange={(e) => onStageNameChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#7f13eb]/50 focus:ring-1 focus:ring-[#7f13eb]/20 transition-all"
              placeholder="Enter stage name"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Select Template */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7f13eb] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-[#7f13eb]/30">
            <span className="text-sm font-black text-white">2</span>
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Select Template</h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => onVariantChange(variant.id)}
              className={`relative px-3 py-2 rounded-lg border transition-all ${
                templateVariant === variant.id
                  ? `bg-gradient-to-r ${variant.color} border-transparent shadow-lg`
                  : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05]'
              }`}
            >
              <span className={`text-xs font-semibold ${templateVariant === variant.id ? 'text-white' : 'text-white/70'}`}>
                {variant.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Section 3: Select Format */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7f13eb] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-[#7f13eb]/30">
            <span className="text-sm font-black text-white">3</span>
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Select Format</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 items-stretch">
          <button
            onClick={() => onFormatChange('story')}
            className={`relative p-4 rounded-xl border transition-all ${
              selectedFormat === 'story'
                ? 'bg-gradient-to-br from-[#7f13eb]/20 to-[#8b5cf6]/10 border-[#7f13eb]/30'
                : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05]'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl font-black text-white mb-1">9:16</div>
              <div className="text-xs font-semibold text-white/60">Story</div>
            </div>
          </button>
          <button
            onClick={() => onFormatChange('square')}
            className={`relative p-4 rounded-xl border transition-all ${
              selectedFormat === 'square'
                ? 'bg-gradient-to-br from-[#7f13eb]/20 to-[#8b5cf6]/10 border-[#7f13eb]/30'
                : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05]'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl font-black text-white mb-1">1:1</div>
              <div className="text-xs font-semibold text-white/60">Post</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

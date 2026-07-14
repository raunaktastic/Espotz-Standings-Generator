import { Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { Template, TemplateVariant } from '@/types'
import { TEMPLATE_VARIANTS } from '@/types'

interface EditingControlsProps {
  selectedTemplate: Template
  selectedVariant: string
  tournamentName: string
  stageName: string
  gameName: string
  onVariantChange: (variant: TemplateVariant) => void
  onTournamentNameChange: (name: string) => void
  onStageNameChange: (name: string) => void
  onGameNameChange: (name: string) => void
  onExport: () => void
  onShare: () => void
}

export function EditingControls({
  selectedTemplate,
  selectedVariant,
  tournamentName,
  stageName,
  gameName,
  onVariantChange,
  onTournamentNameChange,
  onStageNameChange,
  onGameNameChange,
  onExport,
  onShare,
}: EditingControlsProps) {
  const currentVariants = TEMPLATE_VARIANTS[selectedTemplate]

  return (
    <div className="space-y-5 h-full flex flex-col">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <h3 className="text-xs font-black text-white/50 uppercase tracking-widest">Controls</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto pr-1">
        {/* Variant Selection */}
        <div className="space-y-2">
          <Label className="text-white/60 text-xs font-bold uppercase tracking-wider">Template Variant</Label>
          <div className="flex flex-wrap gap-2">
            {currentVariants.map((variant) => (
              <button
                key={variant}
                onClick={() => onVariantChange(variant as TemplateVariant)}
                className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedVariant === variant
                    ? 'bg-gradient-to-r from-[#7f13eb] to-[#8b5cf6] text-white shadow-lg shadow-[#7f13eb]/30 border border-[#7f13eb]/40'
                    : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15]'
                }`}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>

        {/* Tournament Name */}
        <div className="space-y-2">
          <Label className="text-white/60 text-xs font-bold uppercase tracking-wider">Tournament Name</Label>
          <div className="relative">
            <input
              type="text"
              value={tournamentName}
              onChange={(e) => onTournamentNameChange(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-sm focus:outline-none focus:border-[#7f13eb]/50 focus:ring-1 focus:ring-[#7f13eb]/20 transition-all duration-300 placeholder-white/30 backdrop-blur-sm"
              placeholder="Enter tournament name"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7f13eb]/5 to-transparent opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </div>

        {/* Stage */}
        <div className="space-y-2">
          <Label className="text-white/60 text-xs font-bold uppercase tracking-wider">Stage</Label>
          <div className="relative">
            <input
              type="text"
              value={stageName}
              onChange={(e) => onStageNameChange(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-sm focus:outline-none focus:border-[#7f13eb]/50 focus:ring-1 focus:ring-[#7f13eb]/20 transition-all duration-300 placeholder-white/30 backdrop-blur-sm"
              placeholder="Enter stage name"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7f13eb]/5 to-transparent opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </div>

        {/* Game */}
        <div className="space-y-2">
          <Label className="text-white/60 text-xs font-bold uppercase tracking-wider">Game</Label>
          <div className="relative">
            <input
              type="text"
              value={gameName}
              onChange={(e) => onGameNameChange(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-sm focus:outline-none focus:border-[#7f13eb]/50 focus:ring-1 focus:ring-[#7f13eb]/20 transition-all duration-300 placeholder-white/30 backdrop-blur-sm"
              placeholder="Enter game name"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7f13eb]/5 to-transparent opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <Button 
          onClick={onExport}
          className="group relative w-full bg-gradient-to-r from-[#7f13eb] to-[#8b5cf6] text-white border-0 shadow-xl shadow-[#7f13eb]/30 rounded-xl py-3 font-bold transition-all duration-300 hover:shadow-[#7f13eb]/50 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Export PNG
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#7f13eb] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
        <Button 
          onClick={onShare}
          className="group relative w-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] text-white rounded-xl py-3 font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:border-white/[0.15]"
        >
          <span className="flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </span>
        </Button>
      </div>
    </div>
  )
}

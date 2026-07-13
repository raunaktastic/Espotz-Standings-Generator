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
    <div className="space-y-2 h-full flex flex-col">
      <h3 className="text-sm font-semibold text-purple-200/80 uppercase tracking-wider">Controls</h3>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {/* Variant Selection */}
        <div className="space-y-1">
          <Label className="text-purple-200/70 text-xs font-medium">Template Variant</Label>
          <div className="flex flex-wrap gap-1.5">
            {currentVariants.map((variant) => (
              <button
                key={variant}
                onClick={() => onVariantChange(variant as TemplateVariant)}
                className={`px-2 py-1 rounded text-xs font-medium capitalize transition-all duration-200 ${
                  selectedVariant === variant
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>

        {/* Tournament Name */}
        <div className="space-y-1">
          <Label className="text-purple-200/70 text-xs font-medium">Tournament Name</Label>
          <input
            type="text"
            value={tournamentName}
            onChange={(e) => onTournamentNameChange(e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200 placeholder-white/30"
            placeholder="Enter tournament name"
          />
        </div>

        {/* Stage */}
        <div className="space-y-1">
          <Label className="text-purple-200/70 text-xs font-medium">Stage</Label>
          <input
            type="text"
            value={stageName}
            onChange={(e) => onStageNameChange(e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200 placeholder-white/30"
            placeholder="Enter stage name"
          />
        </div>

        {/* Game */}
        <div className="space-y-1">
          <Label className="text-purple-200/70 text-xs font-medium">Game</Label>
          <input
            type="text"
            value={gameName}
            onChange={(e) => onGameNameChange(e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200 placeholder-white/30"
            placeholder="Enter game name"
          />
        </div>

      </div>

      {/* Action Buttons */}
      <div className="space-y-1.5 pt-1">
        <Button 
          onClick={onExport}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border-0 shadow-lg shadow-purple-500/30 rounded-lg py-2.5 font-medium transition-all duration-200 hover:shadow-purple-500/50 hover:scale-105"
        >
          <Download className="w-4 h-4 mr-2" />
          Export PNG
        </Button>
        <Button 
          onClick={onShare}
          variant="outline"
          className="w-full border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-white rounded-lg py-2.5 font-medium transition-all duration-200 hover:scale-105"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  )
}

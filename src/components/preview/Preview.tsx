import type { Template, Format, TemplateVariant } from '@/types'
import { OverallStandings } from '@/components/templates/OverallStandings/OverallStandings'

interface PreviewProps {
  template: Template
  templateVariant: TemplateVariant
  format: Format
  tournamentName?: string
  stageName?: string
  gameName?: string
  onGraphicRef: (element: HTMLDivElement | null) => void
}

export function Preview({ template, templateVariant, format, tournamentName, stageName, gameName, onGraphicRef }: PreviewProps) {
  const aspectRatio = format === 'story' ? 'aspect-[9/16]' : 'aspect-square'

  const renderTemplate = () => {
    const props = { variant: templateVariant, isThumbnail: false, tournamentName, stageName, gameName }
    
    switch (template) {
      case 'overallStandings':
        return <OverallStandings {...props} />
      default:
        return <OverallStandings {...props} />
    }
  }

  return (
    <div className="h-full">
      <div
        ref={onGraphicRef}
        className={`${aspectRatio} w-full rounded-2xl shadow-2xl overflow-hidden relative`}
      >
        {renderTemplate()}
      </div>
    </div>
  )
}

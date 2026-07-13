import { useState } from 'react'
import { Trophy, Sparkles, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '@/hooks/useAppState'
import { EditingControls } from '@/components/controls/EditingControls'
import { Preview } from '@/components/preview/Preview'
import { TemplateGallery } from '@/components/controls/TemplateGallery'
import { toPng } from 'html-to-image'

function SquareGenerator() {
  const navigate = useNavigate()
  const { state, setTemplate, setTemplateVariant, setTournamentName, setStageName, setGameName } = useAppState()
  const [graphicElement, setGraphicElement] = useState<HTMLDivElement | null>(null)

  const handleExport = async () => {
    if (graphicElement) {
      try {
        // Wait for fonts to be fully loaded
        await document.fonts.ready

        // Store original styles
        const originalMaxWidth = graphicElement.style.maxWidth
        const originalWidth = graphicElement.style.width

        // Temporarily remove max-width constraint to capture at full resolution
        graphicElement.style.maxWidth = 'none'
        graphicElement.style.width = 'auto'

        // Disable backdrop-blur and blur effects during export
        const elementsWithBackdropBlur = graphicElement.querySelectorAll('[class*="backdrop-blur"]')
        const elementsWithBlur = graphicElement.querySelectorAll('[class*="blur-"]')

        const backdropBlurStyles: string[] = []
        elementsWithBackdropBlur.forEach((el, i) => {
          backdropBlurStyles[i] = (el as HTMLElement).style.backdropFilter
          ;(el as HTMLElement).style.backdropFilter = 'none'
        })

        const blurFilters: string[] = []
        elementsWithBlur.forEach((el, i) => {
          blurFilters[i] = (el as HTMLElement).style.filter
          ;(el as HTMLElement).style.filter = (el as HTMLElement).style.filter?.replace(/blur\([^)]+\)/g, '') || 'none'
        })

        // Calculate natural dimensions
        const naturalWidth = graphicElement.scrollWidth
        const naturalHeight = graphicElement.scrollHeight

        // Export at high resolution
        const dataUrl = await toPng(graphicElement, {
          quality: 1,
          pixelRatio: window.devicePixelRatio * 2,
          width: naturalWidth,
          height: naturalHeight,
          backgroundColor: null,
          cacheBust: true,
        })

        // Restore original styles
        graphicElement.style.maxWidth = originalMaxWidth
        graphicElement.style.width = originalWidth

        // Restore backdrop-blur and blur effects
        elementsWithBackdropBlur.forEach((el, i) => {
          ;(el as HTMLElement).style.backdropFilter = backdropBlurStyles[i]
        })

        elementsWithBlur.forEach((el, i) => {
          ;(el as HTMLElement).style.filter = blurFilters[i]
        })

        const link = document.createElement('a')
        link.download = `espotz-square-${state.template}-${Date.now()}.png`
        link.href = dataUrl
        link.click()
      } catch (error) {
        console.error(' Export failed:', error)
      }
    }
  }

  const handleShare = async () => {
    if (graphicElement) {
      try {
        // Wait for fonts to be fully loaded
        await document.fonts.ready

        // Store original styles
        const originalMaxWidth = graphicElement.style.maxWidth
        const originalWidth = graphicElement.style.width

        // Temporarily remove max-width constraint to capture at full resolution
        graphicElement.style.maxWidth = 'none'
        graphicElement.style.width = 'auto'

        // Disable backdrop-blur and blur effects during export
        const elementsWithBackdropBlur = graphicElement.querySelectorAll('[class*="backdrop-blur"]')
        const elementsWithBlur = graphicElement.querySelectorAll('[class*="blur-"]')

        const backdropBlurStyles: string[] = []
        elementsWithBackdropBlur.forEach((el, i) => {
          backdropBlurStyles[i] = (el as HTMLElement).style.backdropFilter
          ;(el as HTMLElement).style.backdropFilter = 'none'
        })

        const blurFilters: string[] = []
        elementsWithBlur.forEach((el, i) => {
          blurFilters[i] = (el as HTMLElement).style.filter
          ;(el as HTMLElement).style.filter = (el as HTMLElement).style.filter?.replace(/blur\([^)]+\)/g, '') || 'none'
        })

        // Calculate natural dimensions
        const naturalWidth = graphicElement.scrollWidth
        const naturalHeight = graphicElement.scrollHeight

        // Export at high resolution
        const dataUrl = await toPng(graphicElement, {
          quality: 1,
          pixelRatio: window.devicePixelRatio * 2,
          width: naturalWidth,
          height: naturalHeight,
          backgroundColor: null,
          cacheBust: true,
        })

        // Restore original styles
        graphicElement.style.maxWidth = originalMaxWidth
        graphicElement.style.width = originalWidth

        // Restore backdrop-blur and blur effects
        elementsWithBackdropBlur.forEach((el, i) => {
          ;(el as HTMLElement).style.backdropFilter = backdropBlurStyles[i]
        })

        elementsWithBlur.forEach((el, i) => {
          ;(el as HTMLElement).style.filter = blurFilters[i]
        })

        const response = await fetch(dataUrl)
        const blob = await response.blob()
        const file = new File([blob], 'standings.png', { type: 'image/png' })

        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'Espotz Standings',
            text: 'Check out this tournament standing!',
            files: [file],
          })
        } else {
          const link = document.createElement('a')
          link.download = `espotz-square-${state.template}-${Date.now()}.png`
          link.href = dataUrl
          link.click()
        }
      } catch (error) {
        console.error(' Share failed:', error)
      }
    }
  }

  return (
    <div className="min-h-screen text-white relative">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10" />
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/standings-generator')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 text-white/70" />
                <span className="text-sm text-white/70">Back to Story</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full animate-pulse" />
                <div className="relative bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-xl shadow-lg shadow-purple-500/30">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">
                  Espotz Square Generator
                </h1>
                <p className="text-xs text-purple-300/70 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  1:1 Format
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 relative z-10">
        <div className="flex gap-3 sm:gap-4 items-start min-h-[calc(100vh-80px)] flex-col lg:flex-row">
          
          <div className="w-full lg:w-[270px] flex-shrink-0 order-1 lg:order-1">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl lg:h-full">
              <TemplateGallery
                selectedTemplate={state.template}
                onTemplateChange={setTemplate}
              />
            </div>
          </div>

          <div className="w-full lg:w-[400px] flex-shrink-0 order-2 lg:order-2">
            <div className="lg:h-full">
              <EditingControls
                selectedTemplate={state.template}
                selectedVariant={state.templateVariant}
                tournamentName={state.tournamentName}
                stageName={state.stageName}
                gameName={state.gameName}
                onVariantChange={setTemplateVariant}
                onTournamentNameChange={setTournamentName}
                onStageNameChange={setStageName}
                onGameNameChange={setGameName}
                onExport={handleExport}
                onShare={handleShare}
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 min-w-0 order-3 lg:order-3">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl lg:h-full">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="text-xs sm:text-sm font-semibold text-purple-200/80 uppercase tracking-wider">Square Preview</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400">Live</span>
                </div>
              </div>
              <div className="h-[calc(100%-35px)] sm:h-[calc(100%-40px)] lg:h-[calc(100%-40px)] flex items-center justify-center">
                <Preview
                  template={state.template}
                  templateVariant={state.templateVariant as any}
                  format="square"
                  tournamentName={state.tournamentName}
                  stageName={state.stageName}
                  gameName={state.gameName}
                  onGraphicRef={setGraphicElement}
                />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default SquareGenerator

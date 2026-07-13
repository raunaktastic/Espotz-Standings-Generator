import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Trophy, Sparkles } from 'lucide-react'
import { useAppState } from '@/hooks/useAppState'
import { EditingControls } from '@/components/controls/EditingControls'
import { Preview } from '@/components/preview/Preview'
import { TemplateGallery } from '@/components/controls/TemplateGallery'
import { TournamentDetails } from '@/pages/TournamentDetails'
import SquareGenerator from '@/pages/SquareGenerator'
import { toPng } from 'html-to-image'

function StandingsGenerator() {
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
        link.download = `espotz-${state.template}-${Date.now()}.png`
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

        // Convert to blob
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
          // Fallback: download
          const link = document.createElement('a')
          link.download = `espotz-${state.template}-${Date.now()}.png`
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
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full animate-pulse" />
                <div className="relative bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-xl shadow-lg shadow-purple-500/30">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">
                  Espotz Standings Generator
                </h1>
                <p className="text-xs text-purple-300/70 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Professional Esports Graphics
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/standings-generator/square')}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border-0 shadow-lg shadow-purple-500/30 transition-all duration-200 hover:shadow-purple-500/50 hover:scale-105 text-sm font-medium"
            >
              Open Square Generator
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - 3 Column Layout */}
      <main className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 relative z-10">
        <div className="flex gap-3 sm:gap-4 items-start min-h-[calc(100vh-80px)] flex-col lg:flex-row">

          {/* Left Column - Templates (Fixed 270px on desktop, full on mobile) */}
          <div className="w-full lg:w-[270px] flex-shrink-0 order-1 lg:order-1">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl lg:h-full">
              <TemplateGallery
                selectedTemplate={state.template}
                onTemplateChange={setTemplate}
              />
            </div>
          </div>

          {/* Middle Column - Controls (Fixed 400px on desktop, full on mobile) */}
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

          {/* Right Column - Live Preview (Fill remaining width) */}
          <div className="w-full lg:flex-1 min-w-0 order-3 lg:order-3">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl lg:h-full">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="text-xs sm:text-sm font-semibold text-purple-200/80 uppercase tracking-wider">Live Preview</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400">Live</span>
                </div>
              </div>
              <div className="h-[calc(100%-35px)] sm:h-[calc(100%-40px)] lg:h-[calc(100%-40px)] flex items-center justify-center">
                <Preview
                  template={state.template}
                  templateVariant={state.templateVariant as any}
                  format="story"
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

function App() {
  return (
    <Routes>
      <Route path="/tournaments/:id" element={<TournamentDetails />} />
      <Route path="/standings-generator" element={<StandingsGenerator />} />
      <Route path="/standings-generator/square" element={<SquareGenerator />} />
      <Route path="/" element={<Navigate to="/tournaments/1" replace />} />
    </Routes>
  )
}

export default App

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
      {/* Premium Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050508] via-[#0a0a12] to-[#050508]" />
        {/* Purple accent glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-[#7f13eb]/20 via-[#7f13eb]/5 to-transparent rounded-full blur-[120px]" />
        {/* Bottom-right accent */}
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-[#8b5cf6]/15 via-transparent to-transparent rounded-full blur-[100px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(0deg, #7f13eb 1px, transparent 1px), linear-gradient(90deg, #7f13eb 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Premium Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#050508]/80 backdrop-blur-2xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* ESPOTZ Branding */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#7f13eb] to-[#8b5cf6] rounded-xl blur-md opacity-50" />
                <div className="relative bg-gradient-to-br from-[#7f13eb] to-[#8b5cf6] p-2.5 rounded-xl shadow-xl shadow-[#7f13eb]/30">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-black text-white uppercase tracking-tight">ESPOTZ</h1>
                <p className="text-[10px] text-[#a855f7] uppercase tracking-[0.3em] font-semibold">Standings Generator</p>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => navigate('/standings-generator/square')}
              className="group relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7f13eb] to-[#8b5cf6] text-white font-semibold text-sm shadow-xl shadow-[#7f13eb]/30 transition-all duration-300 hover:shadow-[#7f13eb]/50 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Square Generator
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#7f13eb] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 relative z-10">
        <div className="flex gap-5 items-start min-h-[calc(100vh-100px)] flex-col lg:flex-row">

          {/* Left Column - Templates */}
          <div className="w-full lg:w-[280px] flex-shrink-0 order-1 lg:order-1">
            <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl lg:h-full">
              <TemplateGallery
                selectedTemplate={state.template}
                onTemplateChange={setTemplate}
              />
            </div>
          </div>

          {/* Middle Column - Controls */}
          <div className="w-full lg:w-[420px] flex-shrink-0 order-2 lg:order-2">
            <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl lg:h-full">
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

          {/* Right Column - Live Preview */}
          <div className="w-full lg:flex-1 min-w-0 order-3 lg:order-3">
            <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl lg:h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#7f13eb] rounded-full animate-pulse" />
                  <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest">Live Preview</h3>
                </div>
                <div className="px-3 py-1 bg-[#7f13eb]/10 border border-[#7f13eb]/20 rounded-full">
                  <span className="text-[10px] font-bold text-[#a855f7] uppercase tracking-wider">Story Format</span>
                </div>
              </div>
              <div className="h-[calc(100%-45px)] flex items-center justify-center">
                <Preview
                  template={state.template}
                  templateVariant={state.templateVariant}
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

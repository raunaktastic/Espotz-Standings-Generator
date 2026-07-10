import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Trophy, Sparkles } from 'lucide-react'
import { useAppState } from '@/hooks/useAppState'
import { EditingControls } from '@/components/controls/EditingControls'
import { Preview } from '@/components/preview/Preview'
import { TemplateGallery } from '@/components/controls/TemplateGallery'
import { TournamentDetails } from '@/pages/TournamentDetails'
import { toPng } from 'html-to-image'

function StandingsGenerator() {
  const { state, setDataset, setTemplate, setTemplateVariant, setThemePack, setFormat, setShowStats } = useAppState()
  const [graphicElement, setGraphicElement] = useState<HTMLDivElement | null>(null)

  const handleExport = async () => {
    if (graphicElement) {
      try {
        const dataUrl = await toPng(graphicElement, {
          quality: 1,
          pixelRatio: 2,
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Espotz Standings',
        text: 'Check out this tournament standing!',
        url: window.location.href,
      })
    }
  }

  return (
    <div className="min-h-screen text-white relative">
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10" />
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

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
                dataset={state.dataset}
                format={state.format}
                themePack={state.themePack}
                showStats={state.showStats}
                selectedTemplate={state.template}
                selectedVariant={state.templateVariant}
                onDatasetChange={setDataset}
                onFormatChange={setFormat}
                onThemePackChange={setThemePack}
                onShowStatsChange={setShowStats}
                onVariantChange={setTemplateVariant}
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
                  format={state.format}
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
      <Route path="/" element={<Navigate to="/tournaments/1" replace />} />
    </Routes>
  )
}

export default App

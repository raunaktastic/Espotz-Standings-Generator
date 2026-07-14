import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAppState } from '@/hooks/useAppState'
import { Preview } from '@/components/preview/Preview'
import { Sidebar } from '@/components/layout/Sidebar'
import { ControlPanel } from '@/components/layout/ControlPanel'
import { TournamentDetails } from '@/pages/TournamentDetails'
import { Templates } from '@/pages/Templates'
import { History } from '@/pages/History'
import { toPng } from 'html-to-image'
import type { Format } from '@/types'

function StandingsGenerator() {
  const navigate = useNavigate()
  const location = useLocation()
  const { state, setTemplateVariant, setTournamentName, setStageName, setGameName } = useAppState()
  const [graphicElement, setGraphicElement] = useState<HTMLDivElement | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<Format>('story')
  const [activeSection, setActiveSection] = useState('generator')

  // Update active section based on current path
  useEffect(() => {
    const path = location.pathname
    if (path === '/standings-generator') setActiveSection('generator')
    else if (path === '/templates') setActiveSection('templates')
    else if (path === '/history') setActiveSection('history')
    else if (path === '/settings') setActiveSection('settings')
  }, [location.pathname])

  // Handle state from Templates or History pages
  useEffect(() => {
    if (location.state) {
      if (location.state.selectedVariant) {
        setTemplateVariant(location.state.selectedVariant)
      }
      if (location.state.tournamentName) {
        setTournamentName(location.state.tournamentName)
      }
      if (location.state.stageName) {
        setStageName(location.state.stageName)
      }
      if (location.state.gameName) {
        setGameName(location.state.gameName)
      }
      if (location.state.format) {
        setSelectedFormat(location.state.format)
      }
    }
  }, [location.state, setTemplateVariant, setTournamentName, setStageName, setGameName])

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

        // Save to history
        saveToHistory(dataUrl)
      } catch (error) {
        console.error(' Export failed:', error)
      }
    }
  }

  const saveToHistory = (thumbnailUrl: string) => {
    try {
      const HISTORY_STORAGE_KEY = 'espotz_generator_history'
      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        tournamentName: state.tournamentName,
        stageName: state.stageName,
        gameName: state.gameName,
        templateVariant: state.templateVariant,
        format: selectedFormat,
        timestamp: Date.now(),
        thumbnailUrl,
      }

      const existing = localStorage.getItem(HISTORY_STORAGE_KEY)
      const history = existing ? JSON.parse(existing) : []
      history.unshift(entry)
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
    } catch (error) {
      console.error('Failed to save to history:', error)
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
    <div className="h-screen flex text-white relative overflow-hidden">
      {/* Premium Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050508] via-[#0a0a12] to-[#050508]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-[#7f13eb]/20 via-[#7f13eb]/5 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-[#8b5cf6]/15 via-transparent to-transparent rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(0deg, #7f13eb 1px, transparent 1px), linear-gradient(90deg, #7f13eb 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Left Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-white/[0.08] bg-[#050508]/60 backdrop-blur-2xl flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Back Button */}
            <button
              onClick={() => navigate('/tournaments/1', { state: { activeTab: 'finalStanding' } })}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-white/70" />
              <span className="text-sm font-semibold text-white/70 hidden md:inline">Back</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={handleExport}
              className="px-4 md:px-5 py-2 rounded-xl bg-gradient-to-r from-[#7f13eb] to-[#8b5cf6] text-white font-semibold text-sm shadow-lg shadow-[#7f13eb]/30 hover:shadow-[#7f13eb]/50 transition-all"
            >
              <span className="hidden md:inline">Export PNG</span>
              <span className="md:hidden">Export</span>
            </button>
            <button
              onClick={handleShare}
              className="px-4 md:px-5 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white font-semibold text-sm hover:bg-white/[0.08] transition-all"
            >
              Share
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col lg:flex-row p-4 md:p-6 gap-4 md:gap-6 overflow-hidden">
          {/* Control Panel */}
          <ControlPanel
            tournamentName={state.tournamentName}
            stageName={state.stageName}
            gameName={state.gameName}
            templateVariant={state.templateVariant}
            selectedFormat={selectedFormat}
            onTournamentNameChange={setTournamentName}
            onStageNameChange={setStageName}
            onGameNameChange={setGameName}
            onVariantChange={setTemplateVariant}
            onFormatChange={setSelectedFormat}
          />

          {/* Preview Area */}
          <div className="flex-1 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col overflow-hidden min-w-0">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#7f13eb] rounded-full animate-pulse" />
                <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest">Live Preview</h3>
              </div>
              <div className="px-3 py-1 bg-[#7f13eb]/10 border border-[#7f13eb]/20 rounded-full">
                <span className="text-[10px] font-bold text-[#a855f7] uppercase tracking-wider">
                  {selectedFormat === 'story' ? 'Story Format (9:16)' : 'Post Format (1:1)'}
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <Preview
                template={state.template}
                templateVariant={state.templateVariant}
                format={selectedFormat}
                tournamentName={state.tournamentName}
                stageName={state.stageName}
                gameName={state.gameName}
                onGraphicRef={setGraphicElement}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/tournaments/:id" element={<TournamentDetails />} />
      <Route path="/standings-generator" element={<StandingsGenerator />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/history" element={<History />} />
      <Route path="/" element={<Navigate to="/tournaments/1" replace />} />
    </Routes>
  )
}

export default App

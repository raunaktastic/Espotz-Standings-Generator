import { useState } from 'react'
import { ArrowLeft, Download, Share2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '@/hooks/useAppState'
import { OverallStandings } from '@/components/templates/OverallStandings/OverallStandings'
import { toPng } from 'html-to-image'

function SquareGenerator() {
  const navigate = useNavigate()
  const { state } = useAppState()
  const [templateElement, setTemplateElement] = useState<HTMLDivElement | null>(null)

  const handleExport = async () => {
    if (templateElement) {
      try {
        await document.fonts.ready

        console.log('=== EXPORT DEBUG ===')
        console.log('Element being exported:', templateElement)
        console.log('Element className:', templateElement.className)
        console.log('offsetWidth:', templateElement.offsetWidth)
        console.log('offsetHeight:', templateElement.offsetHeight)
        console.log('scrollWidth:', templateElement.scrollWidth)
        console.log('scrollHeight:', templateElement.scrollHeight)
        console.log('clientWidth:', templateElement.clientWidth)
        console.log('clientHeight:', templateElement.clientHeight)
        console.log('computedStyle maxWidth:', getComputedStyle(templateElement).maxWidth)
        console.log('computedStyle maxHeight:', getComputedStyle(templateElement).maxHeight)
        console.log('computedStyle overflow:', getComputedStyle(templateElement).overflow)

        const originalMaxWidth = templateElement.style.maxWidth
        const originalWidth = templateElement.style.width
        const originalMaxHeight = templateElement.style.maxHeight
        const originalHeight = templateElement.style.height
        const originalOverflow = templateElement.style.overflow

        templateElement.style.maxWidth = 'none'
        templateElement.style.width = 'auto'
        templateElement.style.maxHeight = 'none'
        templateElement.style.height = 'auto'
        templateElement.style.overflow = 'visible'

        console.log('After removing constraints:')
        console.log('scrollWidth:', templateElement.scrollWidth)
        console.log('scrollHeight:', templateElement.scrollHeight)

        const elementsWithBackdropBlur = templateElement.querySelectorAll('[class*="backdrop-blur"]')
        const elementsWithBlur = templateElement.querySelectorAll('[class*="blur-"]')

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

        const naturalWidth = templateElement.scrollWidth
        const naturalHeight = templateElement.scrollHeight

        console.log('Export dimensions:', { width: naturalWidth, height: naturalHeight })

        const dataUrl = await toPng(templateElement, {
          quality: 1,
          pixelRatio: window.devicePixelRatio * 2,
          width: naturalWidth,
          height: naturalHeight,
          cacheBust: true,
        })

        templateElement.style.maxWidth = originalMaxWidth
        templateElement.style.width = originalWidth
        templateElement.style.maxHeight = originalMaxHeight
        templateElement.style.height = originalHeight
        templateElement.style.overflow = originalOverflow

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
    if (templateElement) {
      try {
        await document.fonts.ready

        const originalMaxWidth = templateElement.style.maxWidth
        const originalWidth = templateElement.style.width
        const originalMaxHeight = templateElement.style.maxHeight
        const originalHeight = templateElement.style.height
        const originalOverflow = templateElement.style.overflow

        templateElement.style.maxWidth = 'none'
        templateElement.style.width = 'auto'
        templateElement.style.maxHeight = 'none'
        templateElement.style.height = 'auto'
        templateElement.style.overflow = 'visible'

        const elementsWithBackdropBlur = templateElement.querySelectorAll('[class*="backdrop-blur"]')
        const elementsWithBlur = templateElement.querySelectorAll('[class*="blur-"]')

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

        const naturalWidth = templateElement.scrollWidth
        const naturalHeight = templateElement.scrollHeight

        const dataUrl = await toPng(templateElement, {
          quality: 1,
          pixelRatio: window.devicePixelRatio * 2,
          width: naturalWidth,
          height: naturalHeight,
          cacheBust: true,
        })

        templateElement.style.maxWidth = originalMaxWidth
        templateElement.style.width = originalWidth
        templateElement.style.maxHeight = originalMaxHeight
        templateElement.style.height = originalHeight
        templateElement.style.overflow = originalOverflow

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

      {/* Premium Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#050508]/80 backdrop-blur-2xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={() => navigate('/standings-generator')}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 text-white/60 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              <span className="text-sm font-semibold">Back</span>
            </button>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                className="group relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7f13eb] to-[#8b5cf6] text-white font-semibold text-sm shadow-xl shadow-[#7f13eb]/30 transition-all duration-300 hover:shadow-[#7f13eb]/50 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export PNG
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#7f13eb] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button
                onClick={handleShare}
                className="group relative px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] text-white font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 hover:border-white/[0.15]"
              >
                <span className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="aspect-square w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08]">
          <OverallStandings
            ref={setTemplateElement}
            variant={state.templateVariant}
            isThumbnail={false}
            tournamentName={state.tournamentName}
            stageName={state.stageName}
            gameName={state.gameName}
          />
        </div>
      </main>
    </div>
  )
}

export default SquareGenerator

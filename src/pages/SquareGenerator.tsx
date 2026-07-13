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
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <button
          onClick={() => navigate('/standings-generator')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 text-white/70 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border-0 shadow-lg shadow-purple-500/30 transition-all duration-200 hover:shadow-purple-500/50 hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export PNG</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-white transition-all duration-200 hover:scale-105"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div
          className="aspect-square w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden relative"
        >
          <OverallStandings
            ref={setTemplateElement}
            variant={state.templateVariant as any}
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

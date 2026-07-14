import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, Sparkles, Trash2, Copy, Calendar, Clock } from 'lucide-react'
import { Sidebar } from '@/components/layout/Sidebar'
import type { TemplateVariant, Format } from '@/types'

interface HistoryEntry {
  id: string
  tournamentName: string
  stageName: string
  gameName: string
  templateVariant: TemplateVariant
  format: Format
  timestamp: number
  thumbnailUrl?: string
}

const HISTORY_STORAGE_KEY = 'espotz_generator_history'

export function History() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('history')
  const [history, setHistory] = useState<HistoryEntry[]>([])

  useEffect(() => {
    setActiveSection('history')
    loadHistory()
  }, [])

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setHistory(parsed.sort((a: HistoryEntry, b: HistoryEntry) => b.timestamp - a.timestamp))
      }
    } catch (error) {
      console.error('Failed to load history:', error)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this design?')) {
      const updated = history.filter(entry => entry.id !== id)
      setHistory(updated)
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated))
    }
  }

  const handleDuplicate = (entry: HistoryEntry) => {
    navigate('/standings-generator', { 
      state: { 
        selectedVariant: entry.templateVariant,
        tournamentName: entry.tournamentName,
        stageName: entry.stageName,
        gameName: entry.gameName,
        format: entry.format
      } 
    })
  }

  const handleOpen = (entry: HistoryEntry) => {
    navigate('/standings-generator', { 
      state: { 
        selectedVariant: entry.templateVariant,
        tournamentName: entry.tournamentName,
        stageName: entry.stageName,
        gameName: entry.gameName,
        format: entry.format
      } 
    })
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const getVariantColor = (variant: TemplateVariant) => {
    switch (variant) {
      case 'pmgc': return 'from-[#7f13eb] to-[#8b5cf6]'
      case 'bgis': return 'from-[#f59e0b] to-[#d97706]'
      case 'blackGold': return 'from-[#fbbf24] to-[#b45309]'
      case 'darkRed': return 'from-[#dc2626] to-[#991b1b]'
      case 'darkGrey': return 'from-[#6b7280] to-[#374151]'
      case 'emeraldMasters': return 'from-[#10b981] to-[#059669]'
      default: return 'from-[#7f13eb] to-[#8b5cf6]'
    }
  }

  const getVariantLabel = (variant: TemplateVariant) => {
    switch (variant) {
      case 'pmgc': return 'PMGC'
      case 'bgis': return 'BGIS'
      case 'blackGold': return 'Black Gold'
      case 'darkRed': return 'Dark Red'
      case 'darkGrey': return 'Dark Grey'
      case 'emeraldMasters': return 'Emerald'
      default: return variant
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-white/[0.08] bg-[#050508]/60 backdrop-blur-2xl flex items-center justify-between px-6">
          <h2 className="text-xl font-bold text-white">History</h2>
          {history.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all history?')) {
                  setHistory([])
                  localStorage.removeItem(HISTORY_STORAGE_KEY)
                }
              }}
              className="px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 text-sm font-medium transition-all"
            >
              Clear All
            </button>
          )}
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-white/[0.03] rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-white/20" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No History Yet</h3>
                <p className="text-white/50 max-w-md">Your generated designs will appear here. Export a design to see it in your history.</p>
                <button
                  onClick={() => navigate('/standings-generator')}
                  className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7f13eb] to-[#8b5cf6] text-white font-semibold shadow-lg shadow-[#7f13eb]/30 hover:shadow-[#7f13eb]/50 transition-all"
                >
                  Go to Generator
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className="group bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl hover:border-[#7f13eb]/30 transition-all duration-300"
                  >
                    {/* Thumbnail */}
                    <div className={`aspect-square bg-gradient-to-br ${getVariantColor(entry.templateVariant)} flex items-center justify-center relative`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <Trophy className="w-16 h-16 text-white/80 relative z-10" />
                      <div className="absolute top-3 right-3 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full">
                        <span className="text-xs font-semibold text-white uppercase">
                          {entry.format === 'story' ? '9:16' : '1:1'}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-white mb-1 truncate">{entry.tournamentName}</h4>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-0.5 rounded-md bg-gradient-to-r ${getVariantColor(entry.templateVariant)} text-[10px] font-bold text-white uppercase`}>
                          {getVariantLabel(entry.templateVariant)}
                        </span>
                      </div>
                      
                      {/* Date & Time */}
                      <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(entry.timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(entry.timestamp)}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpen(entry)}
                          className="flex-1 px-3 py-2 rounded-lg bg-[#7f13eb]/20 hover:bg-[#7f13eb]/30 border border-[#7f13eb]/30 text-white text-xs font-semibold transition-all"
                        >
                          Open
                        </button>
                        <button
                          onClick={() => handleDuplicate(entry)}
                          className="flex-1 px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.10] border border-white/[0.08] text-white text-xs font-semibold transition-all"
                        >
                          <div className="flex items-center justify-center gap-1">
                            <Copy className="w-3 h-3" />
                            <span>Duplicate</span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

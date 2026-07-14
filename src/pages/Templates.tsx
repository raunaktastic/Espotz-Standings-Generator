import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy } from 'lucide-react'
import { Sidebar } from '@/components/layout/Sidebar'
import type { TemplateVariant } from '@/types'

const templates = [
  { id: 'pmgc' as TemplateVariant, label: 'PMGC', color: 'from-[#7f13eb] to-[#8b5cf6]', description: 'PUBG Mobile Global Championship' },
  { id: 'bgis' as TemplateVariant, label: 'BGIS', color: 'from-[#f59e0b] to-[#d97706]', description: 'BGMI India Series' },
  { id: 'blackGold' as TemplateVariant, label: 'Black Gold', color: 'from-[#fbbf24] to-[#b45309]', description: 'Premium Black & Gold' },
  { id: 'darkRed' as TemplateVariant, label: 'Dark Red', color: 'from-[#dc2626] to-[#991b1b]', description: 'Bold Red Theme' },
  { id: 'darkGrey' as TemplateVariant, label: 'Dark Grey', color: 'from-[#6b7280] to-[#374151]', description: 'Minimal Grey' },
  { id: 'emeraldMasters' as TemplateVariant, label: 'Emerald', color: 'from-[#10b981] to-[#059669]', description: 'Green Masters' },
]

export function Templates() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('templates')

  useEffect(() => {
    setActiveSection('templates')
  }, [])

  const handleSelectTemplate = (variant: TemplateVariant) => {
    navigate('/standings-generator', { state: { selectedVariant: variant } })
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
        <header className="h-16 border-b border-white/[0.08] bg-[#050508]/60 backdrop-blur-2xl flex items-center px-6">
          <h2 className="text-xl font-bold text-white">Templates</h2>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-white mb-2">Select a Template</h3>
              <p className="text-white/50">Choose from our collection of premium esports standings templates</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleSelectTemplate(template.id)}
                  className="group relative bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl hover:border-[#7f13eb]/30 transition-all duration-300 hover:shadow-[#7f13eb]/10"
                >
                  {/* Preview Area */}
                  <div className={`aspect-square rounded-xl bg-gradient-to-br ${template.color} mb-4 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <Trophy className="w-16 h-16 text-white/80 relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="text-left">
                    <h4 className="text-lg font-black text-white mb-1">{template.label}</h4>
                    <p className="text-sm text-white/50">{template.description}</p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7f13eb]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

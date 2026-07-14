import { Trophy, LayoutTemplate, History as HistoryIcon, Settings, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const navigate = useNavigate()

  const menuItems = [
    { id: 'generator', label: 'Generator', icon: Trophy, path: '/standings-generator' },
    { id: 'templates', label: 'Templates', icon: LayoutTemplate, path: '/templates' },
    { id: 'history', label: 'History', icon: HistoryIcon, path: '/history' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ]

  return (
    <div className="w-[260px] h-full bg-gradient-to-b from-[#0a0a12] to-[#050508] border-r border-white/[0.08] flex flex-col flex-shrink-0 hidden lg:flex">
      {/* Logo */}
      <div className="p-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#7f13eb] to-[#8b5cf6] rounded-xl blur-md opacity-50" />
            <div className="relative bg-gradient-to-br from-[#7f13eb] to-[#8b5cf6] p-2 rounded-xl shadow-xl shadow-[#7f13eb]/30">
              <Trophy className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-black text-white uppercase tracking-tight">ESPOTZ</h1>
            <p className="text-[9px] text-[#a855f7] uppercase tracking-[0.3em] font-semibold">Generator</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id)
                navigate(item.path)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-[#7f13eb]/20 to-[#8b5cf6]/10 border border-[#7f13eb]/30'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#a855f7]' : ''}`} />
              <span className={`text-sm font-semibold ${isActive ? 'text-white' : ''}`}>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/[0.08]">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7f13eb] to-[#8b5cf6] flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white truncate">Admin User</div>
            <div className="text-[10px] text-white/40 truncate">admin@espotz.com</div>
          </div>
        </div>
      </div>
    </div>
  )
}

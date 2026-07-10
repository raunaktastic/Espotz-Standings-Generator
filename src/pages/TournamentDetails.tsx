import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy, Users, DollarSign, Calendar, MapPin, ChevronRight, Sparkles } from 'lucide-react'

export function TournamentDetails() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'matches', label: 'Matches' },
    { id: 'participants', label: 'Participants' },
    { id: 'finalStanding', label: 'Final Standing' },
    { id: 'prizes', label: 'Prizes' },
    { id: 'streams', label: 'Streams' },
    { id: 'rules', label: 'Rules' },
    { id: 'ratings', label: 'Ratings' },
    { id: 'disputes', label: 'Disputes' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/tournaments" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Tournaments</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium transition-colors">
                Edit Tournament
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Tournament Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-64 overflow-hidden rounded-xl">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://static-cdn.cars24.com/prod/new-car-cms/Fortuner_Legender_Feature_Image_709d621333.png')" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full flex items-end pb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">BGMI Pro Series 2024</h1>
              <div className="flex items-center gap-4 text-purple-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">March 15 - March 30, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Organizer Card */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-purple-300 uppercase tracking-wider">Organizer</div>
                <div className="text-sm font-medium text-white">Esportz Gaming</div>
              </div>
            </div>
          </div>

          {/* Prize Pool Card */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <div className="text-xs text-yellow-300 uppercase tracking-wider">Prize Pool</div>
                <div className="text-sm font-medium text-white">₹5,00,000</div>
              </div>
            </div>
          </div>

          {/* Entry Fee Card */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-xs text-green-300 uppercase tracking-wider">Entry Fee</div>
                <div className="text-sm font-medium text-white">₹500</div>
              </div>
            </div>
          </div>

          {/* Players Card */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-blue-300 uppercase tracking-wider">Players</div>
                <div className="text-sm font-medium text-white">64/100</div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Progress */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Registration Progress</h3>
            <span className="text-purple-400 font-medium">64%</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full" style={{ width: '64%' }} />
          </div>
          <div className="flex items-center justify-between mt-2 text-sm text-slate-400">
            <span>64 players registered</span>
            <span>36 spots remaining</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-purple-400 border-purple-400'
                    : 'text-slate-400 border-transparent hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'finalStanding' && (
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-purple-400" />
                  <h2 className="text-xl font-semibold text-white">Final Standing</h2>
                </div>
                <button
                  onClick={() => navigate('/standings-generator')}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 hover:border-purple-500/50 rounded-lg text-sm font-medium text-purple-300 transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4" />
                  Open Generator
                </button>
              </div>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Trophy className="w-16 h-16 text-slate-600 mb-4" />
                <h3 className="text-lg font-medium text-slate-400 mb-2">Final standings not available yet</h3>
                <p className="text-sm text-slate-500">Standings will be published after the tournament concludes</p>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Tournament Overview</h2>
              <p className="text-slate-300 leading-relaxed">
                BGMI Pro Series 2024 is a premier esports tournament featuring the best BGMI teams competing for a prize pool of ₹5,00,000. 
                The tournament will be held online from March 15 to March 30, 2024, with 64 teams participating in intense matches.
              </p>
            </div>
          )}

          {activeTab !== 'finalStanding' && activeTab !== 'overview' && (
            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <ChevronRight className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-400 mb-2">{tabs.find(t => t.id === activeTab)?.label}</h3>
                <p className="text-sm text-slate-500">Content coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

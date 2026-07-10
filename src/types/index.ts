export type Dataset = 'team' | 'solo'
export type Format = 'story' | 'square'
export type ThemePack = 'dark' | 'light'

export type Template = 'overallStandings'

export type OverallStandingsVariant = 'pmgc' | 'bgis' | 'blackGold' | 'darkRed' | 'minimalWhite' | 'emeraldMasters'

export type TemplateVariant = OverallStandingsVariant

export interface AppState {
  dataset: Dataset
  template: Template
  templateVariant: TemplateVariant
  themePack: ThemePack
  format: Format
  showStats: boolean
}

export interface TemplateConfig {
  id: Template
  name: string
  icon: string
  category: Template
  variants: TemplateVariant[]
}

export const TEMPLATE_CONFIGS: TemplateConfig[] = [
  { id: 'overallStandings', name: 'Overall Standings', icon: '📊', category: 'overallStandings', variants: ['pmgc', 'bgis', 'blackGold', 'darkRed', 'minimalWhite', 'emeraldMasters'] },
]

export const TEMPLATE_VARIANTS: Record<Template, TemplateVariant[]> = {
  overallStandings: ['pmgc', 'bgis', 'blackGold', 'darkRed', 'minimalWhite', 'emeraldMasters'],
}

export interface StandingEntry {
  rank: number
  teamLogo: string
  teamName: string
  teamTag: string
  matches: number
  wwcd: number
  finishPts: number
  positionPts: number
  total: number
  support: number
  top8: number
  top12: number
  top16: number
}

export interface StandingsData {
  tournamentName: string
  stageName: string
  gameName: string
  date: string
  entries: StandingEntry[]
}

export interface TemplateProps {
  variant: TemplateVariant
  themePack: ThemePack
  isThumbnail?: boolean
  data?: StandingsData
}

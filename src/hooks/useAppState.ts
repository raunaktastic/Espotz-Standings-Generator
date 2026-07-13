import { useState } from 'react'
import type { AppState, Dataset, Template, Format, ThemePack, TemplateVariant } from '@/types'

const initialState: AppState = {
  dataset: 'team',
  template: 'overallStandings',
  templateVariant: 'pmgc',
  themePack: 'dark',
  format: 'story',
  showStats: true,
  tournamentName: 'Espotz Championship',
  stageName: 'Grand Finals',
  gameName: 'PUBG MOBILE',
}

export function useAppState() {
  const [state, setState] = useState<AppState>(initialState)

  const setDataset = (dataset: Dataset) => 
    setState(prev => ({ ...prev, dataset }))
  
  const setTemplate = (template: Template) => 
    setState(prev => ({ ...prev, template, templateVariant: 'pmgc' as TemplateVariant }))
  
  const setTemplateVariant = (templateVariant: TemplateVariant) => 
    setState(prev => ({ ...prev, templateVariant }))
  
  const setThemePack = (themePack: ThemePack) => 
    setState(prev => ({ ...prev, themePack }))
  
  const setFormat = (format: Format) => 
    setState(prev => ({ ...prev, format }))
  
  const setShowStats = (showStats: boolean) => 
    setState(prev => ({ ...prev, showStats }))

  const setTournamentName = (tournamentName: string) => 
    setState(prev => ({ ...prev, tournamentName }))

  const setStageName = (stageName: string) => 
    setState(prev => ({ ...prev, stageName }))

  const setGameName = (gameName: string) => 
    setState(prev => ({ ...prev, gameName }))

  return {
    state,
    setDataset,
    setTemplate,
    setTemplateVariant,
    setThemePack,
    setFormat,
    setShowStats,
    setTournamentName,
    setStageName,
    setGameName,
  }
}

export interface Interaction {
  interaction_id?: number
  interaction_type: string
  week_commencing: string
  hit_count: number
}

export interface EnrichedInteraction {
  interaction_id?: number
  interaction_type: string
  week_commencing: string
  hit_count: number
  orangeMilestoneCount: number
  greenMilestoneCount: number
  maxMilestoneCount: number
  milestoneCounts: number[]
}

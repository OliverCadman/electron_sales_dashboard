interface IInteraction {
  interactionType: string
  hitCount: number
  orangeMilestoneCount: number
  greenMilestoneCount: number
  maxMilestoneCount: number
  milestoneCounts: number[]
  maxMilestoneReached: boolean;
}

export const interactions: IInteraction[] = [
  {
    interactionType: 'Contact Attempts',
    hitCount: 0,
    orangeMilestoneCount: 30,
    greenMilestoneCount: 60,
    maxMilestoneCount: 80,
    milestoneCounts: [0, 30, 60, 80],
    maxMilestoneReached: false
  },
  {
    interactionType: 'Conversations',
    hitCount: 0,
    orangeMilestoneCount: 15,
    greenMilestoneCount: 30,
    maxMilestoneCount: 40,
    milestoneCounts: [0, 15, 30, 40],
    maxMilestoneReached: false
  },
  {
    interactionType: 'Market Intelligence',
    hitCount: 0,
    orangeMilestoneCount: 1,
    greenMilestoneCount: 3,
    maxMilestoneCount: 5,
    milestoneCounts: [0, 1, 3, 5],
    maxMilestoneReached: false
  },
  {
    interactionType: 'Meetings',
    hitCount: 0,
    orangeMilestoneCount: 1,
    greenMilestoneCount: 3,
    maxMilestoneCount: 4,
    milestoneCounts: [0, 1, 3, 4],
    maxMilestoneReached: false
  }
]

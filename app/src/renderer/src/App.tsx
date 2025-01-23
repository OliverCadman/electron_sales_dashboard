import { useEffect, useState } from 'react'

import Gauge from './components/gauge/Gauge'
import { DBClient } from './data/DBClient'
import { Interaction } from './data/types/interactions.types'
import Timer from './components/timer/Timer'

type EnrichedInteraction = (
  | Interaction[]
  | {
      interaction_id: number | undefined
      interaction_type: string
      hit_count: number
      week_commencing: string
      orangeMilestoneCount: number
      greenMilestoneCount: number
      maxMilestoneCount: number
      milestoneCounts: number[]
    }
)[]

function App(): JSX.Element {
  const [interactions, setInteractions] = useState<EnrichedInteraction[]>()
  const [transactionMade, setTransactionMade] = useState(false)

  const transformInteractions: (interactions: Interaction[]) => EnrichedInteraction[] = (
    interactions: Interaction[]
  ) => {
    return interactions.map((item: Interaction) => {
      const interactionType = item.interaction_type

      if (interactionType === 'Contact Attempt') {
        return {
          ...(item as any),
          orangeMilestoneCount: 30,
          greenMilestoneCount: 60,
          maxMilestoneCount: 80,
          milestoneCounts: [0, 30, 60, 80]
        }
      } else if (interactionType === 'Conversation') {
        return {
          ...(item as any),
          orangeMilestoneCount: 15,
          greenMilestoneCount: 30,
          maxMilestoneCount: 40,
          milestoneCounts: [0, 15, 30, 40]
        }
      } else if (interactionType === 'Meeting') {
        return {
          ...(item as any),
          orangeMilestoneCount: 1,
          greenMilestoneCount: 3,
          maxMilestoneCount: 4,
          milestoneCounts: [0, 1, 3, 4]
        }
      } else if (interactionType === 'Market Intelligence') {
        return {
          ...(item as any),
          orangeMilestoneCount: 1,
          greenMilestoneCount: 3,
          maxMilestoneCount: 5,
          milestoneCounts: [0, 1, 3, 5]
        }
      } else return item
    })
  }
  const getInteractions = () => {
    const dbClient = new DBClient()
    let interactions = dbClient.getInteractions()
    interactions.then((res) => {
      if (!res || res.length === 0) {
        console.log("Couldn't find any interactions. Inserting fresh ones...")
        dbClient.insertFreshInteractions().then((_) => {
          return setTimeout(() => {
            dbClient.getInteractions().then((res) => {
              console.log('Grabbing new interactions')
              console.log(res)
              const supplementedInteractions = transformInteractions(res)
              setInteractions(supplementedInteractions)
            })
          }, 200)
        })
      } else {
        console.log('Grabbing already-created interactions...')
        const supplementedInteractions = transformInteractions(res)
        console.log('Supplemented interactions:', supplementedInteractions)

        setInteractions(supplementedInteractions)
        setTransactionMade(false)
      }
    })
  }

  const handleClick = (interactionId: number, hitCount: number) => {
    if (hitCount < 0) return

    const dbClient = new DBClient()

    setTransactionMade(true)
    dbClient.updateInteraction(interactionId, hitCount)
  }

  useEffect(() => {
    getInteractions()
  }, [transactionMade])

  return (
    <>
      <h1 className="hero__header">The Clock Is Ticking</h1>
      <Timer />
      <div className="gauge__banner">
        {!!interactions &&
          interactions.map((interaction: any, idx: number) => {
            const {
              hit_count,
              orangeMilestoneCount,
              greenMilestoneCount,
              maxMilestoneCount,
              milestoneCounts
            } = interaction

            const gaugeProps = {
              value: hit_count,
              minValue: 0,
              maxValue: maxMilestoneCount,
              animationSpeed: 20,
              options: {
                angle: 0,
                lineWidth: 0.08975,
                radiusScale: 1.015,
                pointer: {
                  length: 0.25,
                  strokeWidth: 0.045,
                  color: '#333333'
                },
                renderTicks: {
                  divisions: milestoneCounts.length,
                  divWidth: 1.1,
                  divLength: 1,
                  divColor: '#333333',
                  subDivisions: 10,
                  subLength: 0.2,
                  subWidth: 0.6,
                  subColor: '#333333'
                },

                staticLabels: {
                  font: '16px sans-serif', // Specifies font
                  labels: milestoneCounts, // Print labels at these values
                  color: '#000000', // Optional: Label text color
                  fractionDigits: 0 // Optional: Numerical precision. 0=round off.
                },
                staticZones: [
                  { strokeStyle: '#A63A2F', min: 0, max: orangeMilestoneCount }, // Red from 100 to 130
                  { strokeStyle: '#ff8000', min: orangeMilestoneCount, max: greenMilestoneCount }, // Yellow
                  { strokeStyle: '#387806', min: greenMilestoneCount, max: maxMilestoneCount } // Green
                ],
                limitMax: true,
                limitMin: false,
                colorStart: '#6F6EA0',
                colorStop: '#C0C0DB',
                strokeColor: '#EEEEEE',
                generateGradient: true,
                highDpiSupport: true
              }
            }

            const allProps = { ...gaugeProps, interaction }

            return <Gauge key={idx} {...allProps} handleClick={handleClick} />
          })}
      </div>
    </>
  )
}

export default App

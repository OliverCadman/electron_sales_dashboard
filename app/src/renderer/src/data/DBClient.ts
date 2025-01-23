import { DateUtil } from '@renderer/utils/dateUtils'
import { Interaction } from './types/interactions.types'

export class DBClient {
  dateUtil = new DateUtil()
  prevMondayDate = this.dateUtil.createPreviousMondaysDate()

  getInteractions() {
    return window.api.ipcRenderer.getInteractionsForMonday(this.prevMondayDate)
  }

  async insertFreshInteractions() {
    const metrics = {
      hit_count: 0,
      week_commencing: this.prevMondayDate
    }

    const conversation: Interaction = { ...metrics, interaction_type: 'Conversation' }
    const contactAttempt: Interaction = { ...metrics, interaction_type: 'Contact Attempt' }
    const marketIntelligence: Interaction = { ...metrics, interaction_type: 'Market Intelligence' }
    const meeting: Interaction = { ...metrics, interaction_type: 'Meeting' }

    return window.api.ipcRenderer.insertInteraction(contactAttempt).then((_) => {
      window.api.ipcRenderer
        .insertInteraction(conversation)
        .then((_) => {
          window.api.ipcRenderer.insertInteraction(marketIntelligence).then((_) => {
            window.api.ipcRenderer.insertInteraction(meeting).then((res) => {
              console.log('Things have been inserted.')
              return res
            })
          })
        })
        .catch((err) => err)
    })
  }

  async updateInteraction(interactionId: number, hitCount: number) {
    return window.api.ipcRenderer.updateInteraction(interactionId, hitCount)
  }
}

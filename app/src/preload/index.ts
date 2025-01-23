import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Interaction } from '../main/services/database.service'

export type Channels = 'electron_dashboard'

// Custom APIs for renderer
const api = {
  ipcRenderer: {
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => func(...args)
      ipcRenderer.on(channel, subscription)

      return () => {
        ipcRenderer.removeListener(channel, subscription)
      }
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args))
    },
    insertInteraction: (interaction: Interaction) =>
      ipcRenderer.invoke('interactions:insert', interaction),
    updateInteraction: (interactionId: number, hitCount: number) =>
      ipcRenderer.invoke('interactions:update', interactionId, hitCount),
    deleteInteraction: (interactionId: string) =>
      ipcRenderer.invoke('interactions:delete', interactionId),
    getInteractionsForMonday: (dateString: string) =>
      ipcRenderer.invoke('interactions:select_monday_interactions', dateString),
    getInteractionsForOtherDaysOfWeek: (dateString: string) =>
      ipcRenderer.invoke('interactions:select_interactions_for_other_days', dateString)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  console.log('process is isolated')
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  console.log('process not isolated')
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

export type APIHandler = typeof api

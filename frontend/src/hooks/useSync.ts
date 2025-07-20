import { useState, useCallback } from 'react'

export type SyncTimestamps = Record<string, string | null>

export default function useSync(): [SyncTimestamps, (platform:string)=>Promise<void>] {
  const [ts, setTs] = useState<SyncTimestamps>({ epic: null, steam: null, xbox: null })
  const doSync = useCallback(async (platform: string) => {
    // simulate API call
    await new Promise(r => setTimeout(r, 3000))
    const now = new Date().toISOString()
    setTs(prev => ({ ...prev, [platform]: now }))
  }, [])
  return [ts, doSync]
}

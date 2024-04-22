import { create } from 'zustand'

type TimerStore = {
	enabled: boolean
	currentTime: number
	endTime: number
	setEndTime: (time: number) => void
	start: () => void
	stop: () => void
	reset: () => void
	tick: (delta: number) => void
}

const useTimerStore = create<TimerStore>()((set) => ({
	enabled: false,
	currentTime: Number(localStorage.getItem('currentTime')) || 0,
	endTime: Number(localStorage.getItem('endTime')) || 0,
	setEndTime: (time: number) => set(() => ({ endTime: time || 0 })),
	start: () => set((state) => ({ enabled: state.endTime > 0 })),
	stop: () => set(() => ({ enabled: false })),
	reset: () =>
		set(() => {
			localStorage.setItem('currentTime', String(0))
			localStorage.setItem('endTime', String(0))
			return {
				enabled: false,
				currentTime: 0,
				endTime: 0,
			}
		}),
	tick: (delta) =>
		set((state) => {
			const newTime = state.currentTime + delta
			localStorage.setItem('currentTime', String(newTime))

			return {
				currentTime: newTime,
			}
		}),
}))

export default useTimerStore

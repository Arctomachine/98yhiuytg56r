import { useEffect, useState } from 'react'
import useTimerStore from '../stores/timerStore.ts'

function Timer() {
	const timerEnabled = useTimerStore((state) => state.enabled)
	const currentTime = useTimerStore((state) => state.currentTime)
	const endTime = useTimerStore((state) => state.endTime)
	const tick = useTimerStore((state) => state.tick)
	const [prevTime, setPrevTime] = useState(Date.now())

	useEffect(() => {
		const timer = setInterval(() => {
			const newTime = Date.now()
			const delta = newTime - prevTime
			tick(delta)
			setPrevTime(newTime)
		}, 100)

		if (!timerEnabled) {
			clearInterval(timer)
		}

		return () => {
			clearInterval(timer)
		}
	}, [prevTime, tick, timerEnabled])

	const remainingTime = endTime - currentTime
	const remainingMinutes = Math.floor(remainingTime / 60000)
	const remainingSeconds = Math.floor((remainingTime / 1000) % 60)

	if (remainingTime === 0) {
		return null
	}

	return (
		<div>
			Оставшееся время: {remainingMinutes.toString().padStart(2, '0')}:
			{remainingSeconds.toString().padStart(2, '0')}
		</div>
	)
}

export default Timer

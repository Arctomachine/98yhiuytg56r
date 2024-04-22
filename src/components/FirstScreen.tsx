import { useEffect, useId } from 'react'
import useQuestionStore from '../stores/questionStore.ts'
import useTimerStore from '../stores/timerStore.ts'

function FirstScreen() {
	const start = useQuestionStore((state) => state.goToNextQuestion)
	const resetTimer = useTimerStore((state) => state.reset)
	const setTimerGoal = useTimerStore((state) => state.setEndTime)
	const startTimer = useTimerStore((state) => state.start)
	const inputTimeLimitId = useId()

	useEffect(() => {
		resetTimer()
	}, [resetTimer])

	function onStart() {
		startTimer()
		start()
	}

	return (
		<div>
			<div>
				<label htmlFor={inputTimeLimitId}>
					Ограничение по премени, минут. (0 - без ограничения)
				</label>{' '}
				<br />
				<input
					type="number"
					step={0.25}
					id={inputTimeLimitId}
					onChange={(event) =>
						// -1 милисекунда на результат не повлияет, но помогает убрать перескок таймера сразу после старта
						setTimerGoal(
							Math.max(Number(event.target.value) * 1000 * 60 - 1, 0),
						)
					}
				/>
			</div>
			<div>
				<button type="button" onClick={onStart}>
					Начать
				</button>
			</div>
		</div>
	)
}

export default FirstScreen

import { useEffect, useState } from 'react'
import './App.css'
import FirstScreen from './components/FirstScreen.tsx'
import LastScreen from './components/LastScreen.tsx'
import NextQuestion from './components/NextQuestion.tsx'
import Timer from './components/Timer.tsx'
import useQuestionStore from './stores/questionStore.ts'
import useTimerStore from './stores/timerStore.ts'
import { getQuestionsListLength } from './utils/QuestionsHandler.ts'

function App() {
	const [totalQuestions, setTotalQuestions] = useState(Number.POSITIVE_INFINITY)
	const currentQuestionNumber = useQuestionStore(
		(state) => state.currentQuestionNumber,
	)
	const setCurrentQuestionNumber = useQuestionStore(
		(state) => state.setCurrentQuestionNumber,
	)

	const currentTime = useTimerStore((state) => state.currentTime)
	const endTime = useTimerStore((state) => state.endTime)
	const resetTimer = useTimerStore((state) => state.reset)

	useEffect(() => {
		if (endTime > 0 && currentTime > endTime) {
			setCurrentQuestionNumber(totalQuestions + 1)
			resetTimer()
		}
	}, [
		currentTime,
		endTime,
		setCurrentQuestionNumber,
		totalQuestions,
		resetTimer,
	])

	useEffect(() => {
		try {
			getQuestionsListLength().then((res) => {
				setTotalQuestions(res.length)
			})
		} catch (e) {
			alert(e)
		}
	}, [])

	if (
		currentQuestionNumber < 0 ||
		totalQuestions === Number.POSITIVE_INFINITY
	) {
		return <>...</>
	}

	if (currentQuestionNumber === 0) {
		return (
			<div className="container">
				<FirstScreen />
			</div>
		)
	}

	if (currentQuestionNumber > totalQuestions) {
		return (
			<div className="container">
				<LastScreen />
			</div>
		)
	}

	return (
		<div className="container">
			<Timer />
			<NextQuestion questionNumber={currentQuestionNumber} />
			<div>
				Вопрос {currentQuestionNumber} из {totalQuestions}
			</div>
		</div>
	)
}

export default App

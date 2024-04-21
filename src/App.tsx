import { useEffect, useState } from 'react'
import './App.css'
import FirstScreen from './components/FirstScreen.tsx'
import LastScreen from './components/LastScreen.tsx'
import NextQuestion from './components/NextQuestion.tsx'
import useQuestionStore from './stores/questionStore.ts'
import { getQuestionsListLength } from './utils/QuestionsHandler.ts'

function App() {
	const [totalQuestions, setTotalQuestions] = useState(Number.POSITIVE_INFINITY)
	const currentQuestionNumber = useQuestionStore(
		(state) => state.currentQuestionNumber,
	)

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
			<NextQuestion questionNumber={currentQuestionNumber} />
		</div>
	)
}

export default App

import './App.css'
import FirstScreen from './components/FirstScreen.tsx'
import NextQuestion from './components/NextQuestion.tsx'
import useQuestionStore from './stores/questionStore.ts'

function App() {
	const currentQuestionNumber = useQuestionStore(
		(state) => state.currentQuestionNumber,
	)

	if (Number(currentQuestionNumber) === 0) {
		return (
			<div className="container">
				<FirstScreen />
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

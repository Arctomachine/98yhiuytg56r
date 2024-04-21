import useQuestionStore from '../stores/questionStore.ts'

export function AnswerSelectionMark({
	correctAnswer,
	index,
}: {
	correctAnswer: string
	index: number
}) {
	const answer = useQuestionStore((state) => state.currentAnswer)
	const correctAnswerArray = correctAnswer.split(',')

	if (correctAnswerArray.includes(index.toString())) return <>✅</>
	if (answer?.split(',').includes(index.toString())) return <>❌</>
	return null
}

import useQuestionStore from '../stores/questionStore.ts'

export function AnswerMark({
	correctAnswer,
	index,
}: {
	correctAnswer: string
	index: number
}) {
	const answer = useQuestionStore((state) => state.currentAnswer)
	if (Number(correctAnswer) === index) return <>✅</>
	if (answer && Number(answer) === index) return <>❌</>
	return null
}

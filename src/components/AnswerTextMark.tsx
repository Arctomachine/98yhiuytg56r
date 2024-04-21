import useQuestionStore from '../stores/questionStore.ts'

export function AnswerTextMark({ correctAnswer }: { correctAnswer: string }) {
	const answer = useQuestionStore((state) => state.currentAnswer)

	if (answer === correctAnswer) return <>✅</>
	return <>❌</>
}

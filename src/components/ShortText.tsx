import type { InputShort } from '../data/questions.ts'
import useQuestionStore from '../stores/questionStore.ts'
import { AnswerTextMark } from './AnswerTextMark.tsx'

export function ShortText(props: {
	data: InputShort
	correctAnswer?: string
}) {
	const currentState = useQuestionStore((state) => state.currentState)
	const currentAnswer = useQuestionStore((state) => state.currentAnswer)
	const setAnswer = useQuestionStore((state) => state.setAnswer)

	return (
		<div>
			<div>{props.data.question}</div>
			<div>
				<input
					type="text"
					disabled={
						currentState === 'submittingAnswer' ||
						currentState === 'afterSubmit'
					}
					onChange={(event) => setAnswer(event.target.value)}
				/>
				{currentState === 'afterSubmit' && props.correctAnswer ? (
					<AnswerTextMark correctAnswer={props.correctAnswer} />
				) : null}
			</div>
			<div>
				{currentState === 'afterSubmit' &&
				props.correctAnswer !== currentAnswer ? (
					<>Правильный ответ: {props.correctAnswer}</>
				) : null}
			</div>
		</div>
	)
}

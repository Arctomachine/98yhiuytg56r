import type { SelectSingle } from '../data/questions.ts'
import useQuestionStore from '../stores/questionStore.ts'
import { AnswerSelectionMark } from './AnswerSelectionMark.tsx'

export function SingleOption({
	data,
	correctAnswer,
}: {
	data: SelectSingle
	correctAnswer?: string
}) {
	const currentState = useQuestionStore((state) => state.currentState)
	const setAnswer = useQuestionStore((state) => state.setAnswer)
	return (
		<div>
			<div>{data.question}</div>
			<div>
				{data.options.map((option, index) => (
					<div key={option}>
						<label>
							<input
								type="radio"
								value={index}
								name="answer"
								disabled={
									currentState === 'submittingAnswer' ||
									currentState === 'afterSubmit'
								}
								onChange={(event) => setAnswer(event.target.value)}
							/>
							{option}
						</label>
						{currentState === 'afterSubmit' && correctAnswer ? (
							<AnswerSelectionMark
								correctAnswer={correctAnswer}
								index={index}
							/>
						) : null}
					</div>
				))}
			</div>
		</div>
	)
}

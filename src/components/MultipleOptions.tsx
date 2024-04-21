import { type ChangeEvent, useState } from 'react'
import type { SelectMultiple } from '../data/questions.ts'
import useQuestionStore from '../stores/questionStore.ts'
import { AnswerSelectionMark } from './AnswerSelectionMark.tsx'

export function MultipleOptions(props: {
	data: SelectMultiple
	correctAnswers?: string
}) {
	const currentState = useQuestionStore((state) => state.currentState)
	const setAnswer = useQuestionStore((state) => state.setAnswer)
	const [selectedIndexes, setSelectedIndexes] = useState<string[]>([])

	function changeHandler(event: ChangeEvent<HTMLInputElement>) {
		const { value } = event.target
		const updatedIndexes = selectedIndexes.includes(value)
			? selectedIndexes.filter((index) => index !== value)
			: [...selectedIndexes, value]

		setSelectedIndexes(updatedIndexes)
		setAnswer(updatedIndexes.join(','))
	}

	return (
		<div>
			<div>{props.data.question}</div>
			<div>
				{props.data.options.map((option, index) => (
					<div key={option}>
						<label>
							<input
								type="checkbox"
								value={index}
								disabled={
									currentState === 'submittingAnswer' ||
									currentState === 'afterSubmit'
								}
								onChange={changeHandler}
							/>
							{option}
						</label>
						{currentState === 'afterSubmit' && props.correctAnswers ? (
							<AnswerSelectionMark
								correctAnswer={props.correctAnswers}
								index={index}
							/>
						) : null}
					</div>
				))}
			</div>
		</div>
	)
}

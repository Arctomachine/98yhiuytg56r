import { useEffect, useState } from 'react'
import useQuestionStore from '../stores/questionStore.ts'
import { loadOneQuestion, submitAnswer } from '../utils/QuestionsHandler.ts'
import { SingleOption } from './SingleOption.tsx'

function NextQuestion({ questionNumber }: { questionNumber: number }) {
	const currentState = useQuestionStore((state) => state.currentState)
	const changeState = useQuestionStore((state) => state.changeState)
	const goToNextQuestion = useQuestionStore((state) => state.goToNextQuestion)
	const [loadedQuestionData, setLoadedQuestionData] = useState<null | Awaited<
		ReturnType<typeof loadOneQuestion>
	>>(null)
	const [hasMore, setHasMore] = useState(false)
	const answer = useQuestionStore((state) => state.currentAnswer)
	const [correctAnswer, setCorrectAnswer] = useState<string | undefined>(
		undefined,
	)

	useEffect(() => {
		changeState('loadingQuestion')
		loadOneQuestion(questionNumber).then((res) => {
			setLoadedQuestionData(res)
			setHasMore(res.hasMore)
			changeState('idle')
		})
	}, [questionNumber, changeState])

	if (!loadedQuestionData) {
		return <div>...</div>
	}

	function onSubmitAnswer() {
		if (!answer) {
			return
		}
		changeState('submittingAnswer')
		try {
			submitAnswer(questionNumber, answer).then((res) => {
				changeState('afterSubmit')
				setCorrectAnswer(res?.correctAnswerNumber)

				if (hasMore) {
					localStorage.setItem(
						'currentQuestionNumber',
						String(questionNumber + 1),
					)
				}
			})
		} catch (err) {
			changeState('idle')
			alert(err)
		}
	}

	return (
		<div>
			{loadedQuestionData.data.type === 'selectSingle' ? (
				<SingleOption
					data={loadedQuestionData.data}
					correctAnswer={correctAnswer}
				/>
			) : null}
			<button
				type="button"
				onClick={onSubmitAnswer}
				disabled={
					!answer ||
					currentState === 'submittingAnswer' ||
					currentState === 'afterSubmit'
				}
			>
				Проверить
			</button>
			{hasMore && currentState === 'afterSubmit' ? (
				<button type="button" onClick={goToNextQuestion}>
					Следующий вопрос
				</button>
			) : null}
		</div>
	)
}

export default NextQuestion

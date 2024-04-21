import { useEffect, useState } from 'react'
import useQuestionStore from '../stores/questionStore.ts'
import { loadOneQuestion, submitAnswer } from '../utils/QuestionsHandler.ts'
import { SingleOption } from './SingleOption.tsx'
import { MultipleOptions } from './MultipleOptions.tsx'
import { ShortText } from './ShortText.tsx'

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
			submitAnswer(questionNumber).then((res) => {
				if (!res) {
					changeState('idle')
					return alert('Ошибка при проверке ответа')
				}

				changeState('afterSubmit')

				if ('correctAnswerNumber' in res) {
					setCorrectAnswer(res.correctAnswerNumber)
				}
				if ('correctAnswerNumbers' in res) {
					setCorrectAnswer(res.correctAnswerNumbers)
				}
				if ('correctAnswerText' in res) {
					setCorrectAnswer(res.correctAnswerText)
				}

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
			{loadedQuestionData.data.type === 'selectMultiple' ? (
				<MultipleOptions
					data={loadedQuestionData.data}
					correctAnswers={correctAnswer}
				/>
			) : null}
			{loadedQuestionData.data.type === 'inputShort' ? (
				<ShortText
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

import questions from '../data/questions.ts'

export async function getQuestionsListLength() {
	return {
		length: questions.length,
	}
}

export async function loadOneQuestion(questionNumber: number) {
	if (!questionNumber) {
		throw new Error('questionNumber is required')
	}

	if (questions.length < questionNumber - 1) {
		throw new Error('questionNumber is bigger than number of questions')
	}

	// todo убрать правильный ответ
	return {
		data: questions[questionNumber - 1],
		hasMore: Boolean(questions[questionNumber]),
	}
}

type CorrectSingle = {
	correctAnswerNumber: string
}
type CorrectMultiple = {
	correctAnswerNumbers: string
}
type CorrectTextShort = {
	correctAnswerText: string
}
type CorrectTextLong = {
	correctAnswerText: string
}
export async function submitAnswer(questionNumber: number) {
	const question = questions[questionNumber - 1]

	if (question.type === 'selectSingle') {
		const data: CorrectSingle = {
			correctAnswerNumber: question.answerNumber.toString(),
		}
		return data
	}

	if (question.type === 'selectMultiple') {
		const data: CorrectMultiple = {
			correctAnswerNumbers: question.answerNumbers.join(','),
		}
		return data
	}

	if (question.type === 'inputShort') {
		const data: CorrectTextShort = {
			correctAnswerText: question.expectedAnswer,
		}
		return data
	}

	if (question.type === 'inputLong') {
		const data: CorrectTextLong = {
			correctAnswerText: question.expectedAnswer,
		}
		return data
	}

	// todo обработать запрос несуществубщего вопроса или неправильного типа
}

import questions from '../data/questions.ts'

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

export async function submitAnswer(questionNumber: number, answer: string) {
	const question = questions[questionNumber - 1]

	if (question.type === 'selectSingle') {
		return {
			correctAnswerNumber: question.answerNumber.toString(),
		}
	}

	if (question.type === 'selectMultiple') {
		return {
			correctAnswerNumbers: question.answerNumbers.join(','),
		}
	}
}

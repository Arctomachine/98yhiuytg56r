import { create } from 'zustand'

type QuestionStore = {
	currentState:
		| 'initial'
		| 'loadingQuestion'
		| 'idle'
		| 'submittingAnswer'
		| 'afterSubmit'
	changeState: (newState: QuestionStore['currentState']) => void
	currentQuestionNumber: number
	goToNextQuestion: () => void
	currentAnswer?: string
	setAnswer: (newAnswer: string) => void
}

const useQuestionStore = create<QuestionStore>()((set) => ({
	currentState: 'initial',
	changeState: (newState) => set(() => ({ currentState: newState })),
	currentQuestionNumber: Number(localStorage.getItem('currentQuestionNumber')),
	goToNextQuestion: () =>
		set((state) => ({
			currentQuestionNumber: state.currentQuestionNumber + 1,
			currentState: 'initial',
			currentAnswer: undefined,
		})),
	currentAnswer: undefined,
	setAnswer: (newAnswer: string) => set(() => ({ currentAnswer: newAnswer })),
}))

export default useQuestionStore

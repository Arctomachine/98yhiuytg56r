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
	setCurrentQuestionNumber: (newQuestion: number) => void
	goToNextQuestion: () => void
	resetProgress: () => void
	currentAnswer?: string
	setAnswer: (newAnswer: string) => void
}

const useQuestionStore = create<QuestionStore>()((set) => ({
	currentState: 'initial',
	changeState: (newState) => set(() => ({ currentState: newState })),
	currentQuestionNumber: Number(localStorage.getItem('currentQuestionNumber')),
	setCurrentQuestionNumber: (newQuestion: number) =>
		set(() => ({ currentQuestionNumber: newQuestion })),
	goToNextQuestion: () =>
		set((state) => ({
			currentQuestionNumber: state.currentQuestionNumber + 1,
			currentState: 'initial',
			currentAnswer: undefined,
		})),
	resetProgress: () =>
		set(() => {
			localStorage.setItem('currentQuestionNumber', String(0))
			return { currentQuestionNumber: 0 }
		}),
	currentAnswer: undefined,
	setAnswer: (newAnswer: string) => set(() => ({ currentAnswer: newAnswer })),
}))

export default useQuestionStore

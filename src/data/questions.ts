export type Question = SelectSingle | SelectMultiple | InputShort | InputLong
export type SelectSingle = {
	type: 'selectSingle'
	question: string
	options: string[]
	answerNumber: number
}
export type SelectMultiple = {
	type: 'selectMultiple'
	question: string
	options: string[]
	answerNumbers: number[]
}
export type InputShort = {
	type: 'inputShort'
	question: string
	expectedAnswer: string
}
export type InputLong = {
	type: 'inputLong'
	question: string
	expectedAnswer: string
}

const questions: Question[] = [
	{
		type: 'selectSingle',
		question: btoa(Date.now().toString()),
		options: [
			btoa(Math.random().toString()),
			btoa(Math.random().toString()),
			btoa(Math.random().toString()),
		],
		answerNumber: 0,
	},
	// {
	// 	type: 'selectMultiple',
	// 	question: btoa(Date.now().toString()),
	// 	options: [
	// 		btoa(Math.random().toString()),
	// 		btoa(Math.random().toString()),
	// 		btoa(Math.random().toString()),
	// 		btoa(Math.random().toString()),
	// 		btoa(Math.random().toString()),
	// 	],
	// 	answerNumbers: [0,1],
	// },
	// {
	// 	type: 'inputShort',
	// 	question: btoa(Date.now().toString()),
	// 	expectedAnswer: '12345',
	// },
	// {
	// 	type: 'inputLong',
	// 	question: btoa(Date.now().toString()),
	// 	expectedAnswer: '12345',
	// },
]

export default questions

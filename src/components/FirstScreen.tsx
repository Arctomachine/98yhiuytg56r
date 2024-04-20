import { useId } from 'react'
import useQuestionStore from '../stores/questionStore.ts'

function FirstScreen() {
	const start = useQuestionStore((state) => state.goToNextQuestion)
	const inputTimeLimitId = useId()
	return (
		<div>
			{/*<div>*/}
			{/*	<label htmlFor={inputTimeLimitId}>*/}
			{/*		Ограничение по премени (0 - без ограничения)*/}
			{/*	</label>{' '}*/}
			{/*	<br />*/}
			{/*	<input type="number" id={inputTimeLimitId} value={0} />*/}
			{/*</div>*/}
			<div>
				<button type="button" onClick={start}>
					Начать
				</button>
			</div>
		</div>
	)
}

export default FirstScreen

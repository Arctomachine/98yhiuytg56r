import useQuestionStore from '../stores/questionStore.ts'

function LastScreen() {
	const resetProgress = useQuestionStore((state) => state.resetProgress)
	return (
		<div>
			<div>Тест пройден</div>
			<div>
				Здесь можно будет показать результат и прочую доступную после завершения
				информацию
			</div>
			<button type="button" onClick={resetProgress}>
				Вернуться на первый экран
			</button>
		</div>
	)
}

export default LastScreen

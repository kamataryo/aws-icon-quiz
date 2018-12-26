import Head from 'next/head'
import Quiz from '../lib/quiz'
import Score from '../lib/score'
import aws from '../static/aws.json'

const nextIndex = arr => Math.floor(Math.random() * arr.length)
const multiPick = (arr, num) => {
  const result = []
  const options = [...arr]
  while (result.length < num) {
    const index = nextIndex(options)
    result.push(options[index])
    options.splice(index, 1)
  }
  return result
}

const getNextState = summary => ({
  __items: multiPick(aws, 5),
  __correct: nextIndex(
    Array(5)
      .fill(0)
      .map((_, i) => i)
  ),
  ...summary
})

export default class Main extends React.PureComponent {
  /**
   * constructor
   * @param  {object} props React props.
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = getNextState()
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { __items, __correct } = this.state
    const score = { ...this.state }
    delete score.__items
    delete score.__correct

    return (
      <div>
        <Head>
          <title>{'Cloud Mania'}</title>
        </Head>
        <h1>{'Cloud Mania'}</h1>
        <Quiz
          vendor={'aws'}
          items={__items}
          correct={__correct}
          next={(correct, genre) => {
            const current = this.state[genre] || { correct: 0, total: 0 }
            this.setState(
              getNextState({
                [genre]: {
                  correct: correct ? current.correct + 1 : current.correct,
                  total: current.total + 1
                }
              })
            )
          }}
        />
        <Score score={score} />
      </div>
    )
  }
}

import React from 'react'
import PropTypes from 'prop-types'

export class Quiz extends React.Component {
  state = { answer: -1 }
  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    const { answer } = this.state
    const { items, rest, vendor, correct } = this.props
    const imagePath = `/static/${vendor}/${items[correct]}`

    return (
      <div>
        <img src={imagePath} alt="" />
        {items.map((filename, index) => {
          const [genre, ...names] = filename.split('_')
          const label = names.join(' ').replace('.svg', '')
          return (
            <p key={filename}>
              <button
                onClick={() => {
                  this.setState({
                    answer: index,
                    timer: setTimeout(
                      () =>
                        this.setState(() => {
                          this.setState({ answer: -1 })
                          this.props.next(index === correct, genre)
                        }),
                      2000
                    )
                  })
                }}
                disabled={answer !== -1}
              >
                {label}
              </button>
              {answer !== -1 && correct === index && <span>{'correct!'}</span>}
              {answer !== -1 && correct !== index && (
                <span>{'incorrect!'}</span>
              )}
            </p>
          )
        })}
      </div>
    )
  }
}

Quiz.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  next: PropTypes.func.isRequired,
  vendor: PropTypes.oneOf(['aws', 'azure', 'gcp']).isRequired,
  correct: PropTypes.number.isRequired
}

export default Quiz

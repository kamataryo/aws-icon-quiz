import React from 'react'
import PropTypes from 'prop-types'

export const Score = props => {
  const { score } = props
  return (
    <section>
      {Object.keys(score).map(genre => {
        const { correct, total } = score[genre]
        return (
          <dl key={genre}>
            <dt>{genre}</dt>
            <dd>
              {correct +
                '/' +
                total +
                ` (${Math.floor((10000 * correct) / total) / 100}%)`}
            </dd>
          </dl>
        )
      })}
    </section>
  )
}

Score.propTypes = {
  score: PropTypes.objectOf(
    PropTypes.shape({
      correct: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired
    })
  ).isRequired
}

export default Score

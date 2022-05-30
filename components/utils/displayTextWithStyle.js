import getKeywords from '../mock/Keywords'
import React from 'react'
const displayWithStyle = (text) => {
  const keywords = getKeywords()
  //  Find if the text match's with any of the keywords
  const resError = keywords.errorKeywords.find((keywork) => keywork === text)
  const resSuccess = keywords.successKeywords.find(
    (keywork) => keywork === text
  )
  const resWarning = keywords.warningKeywords.find(
    (keywork) => keywork === text
  )

  //  If match res is something else undefined && case undefined return default text
  if (resError !== undefined) return <a className='errorBalloon'>{text} </a>
  if (resSuccess !== undefined) {
    return <a className='successBalloon'>{text} </a>
  }
  if (resWarning !== undefined) {
    return <a className='warningBalloon'>{text} </a>
  }
  return text
}

export default displayWithStyle

import * as React from "react"

interface TextProps {
  text: string
}
const Text = (props: TextProps) => {
  const { text } = props

  return <p className="mgtb5 pdlr10">{text}</p>
}

export default Text

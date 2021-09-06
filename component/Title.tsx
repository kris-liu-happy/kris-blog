import * as React from "react"
// import styles from "./index.module.scss"

interface TitleProps {
  title: string
}
const Title = (props: TitleProps) => {
  const { title } = props

  return <h3 className="mgtb20">{title}</h3>
}

export default Title

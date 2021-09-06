import * as React from "react"
import Code from "./Code"

interface TextProps {
  title?: string
  problems: any[]
  answers: any[]
}
const Answer = (props: TextProps) => {
  const { title, problems, answers } = props

  return (
    <div>
      {title ? <h3 className="mgtb20">{title}</h3> : null}
      {problems.map((item: any, index: number) => {
        return (
          <div className="mgtb20" key={item.id}>
            <h4 className="mgtb5">
              {item.id}. {item.text}
            </h4>
            {answers[index] &&
              answers[index].map((list: any, num: number) => {
                return (
                  <p key={item.id + num} className="mgtb5 pdlr10">
                    {list && list.code && (
                      <Code lang="javascript">{list.text}</Code>
                    )}
                    {list && list.type === "text" && list.text}
                  </p>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

export default Answer

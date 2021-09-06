import * as React from "react"
import { useState, useEffect } from "react"

interface TextProps {
  title?: string
  texts: any[]
}
const Texts = (props: TextProps) => {
  const { title, texts } = props

  return (
    <div>
      {title ? <h3 className="mgtb20">{title}</h3> : null}
      {texts.map((item: any) => {
        return (
          <p className="mgtb5 pdlr10" key={item.id}>
            {item.id}. {item.text}
          </p>
        )
      })}
    </div>
  )
}

export default Texts

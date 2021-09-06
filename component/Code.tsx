import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface CodeProps {
  lang: string
  children: React.ReactNode
}

const Code = (props: CodeProps) => {
  const { lang, children } = props
  return (
    <SyntaxHighlighter
      customStyle={{ width: "100%", margin: "0 auto" }}
      language={lang}
      style={dark}
    >
      {children}
    </SyntaxHighlighter>
  )
}

export default Code

import * as React from "react"
import Image from "next/image"

interface TextProps {
  img: any[]
  title?: string
  render?(): void
}
const ImageK6 = (props: TextProps) => {
  const { img, title, render } = props
  return (
    <div>
      {title ? <h3 className="mgtb20">{title}</h3> : null}
      {render && render()}
      {img.map((item: any, index: number) => {
        return <Image key={index} src={item} alt="kris" />
      })}
    </div>
  )
}

export default ImageK6

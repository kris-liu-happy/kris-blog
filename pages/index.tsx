import Head from "next/head"
import Link from "next/link"
import styles from "../styles/index.module.scss"

interface childDirectory {
  title?: string
  url?: string
}

interface DirectoryProps {
  title: string
  url: string
  children?: childDirectory[]
}

const krisDirectory: DirectoryProps[] = [
  {
    title: "Hook",
    url: "/hook",
    children: [
      {
        title: "useState",
        url: "/hook/useState",
      },
      {
        title: "useEffect",
        url: "/hook/useEffect",
      },
      {
        title: "useCallback",
        url: "/hook/useCallback",
      },
    ],
  },
]

const DirectoryChild = (props: any) => {
  const { childs } = props
  return (
    <>
      {childs.map((item: any) => {
        return (
          <h4 key={item.title}>
            <Link href={item.url}>{item.title}</Link>
          </h4>
        )
      })}
    </>
  )
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>kris blog</title>
        <meta name="description" content="react, web, javascript, typescript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2 className={styles.krisIndexTitle}>
          {process.env.NEXT_PUBLIC_TITLE}
        </h2>
        <ul>
          {krisDirectory.map((item: DirectoryProps) => {
            return (
              <div className={styles.homePage} key={item.title}>
                {item.children ? (
                  <li className={styles.homePage_title_li}>
                    <h3>{item.title}</h3>
                    <DirectoryChild childs={item.children} />
                  </li>
                ) : (
                  <li>
                    <p>
                      <Link href={item.url}>{item.title}</Link>
                    </p>
                  </li>
                )}
              </div>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

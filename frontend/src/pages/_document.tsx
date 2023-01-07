import { Html, Head, Main, NextScript } from 'next/document'

//essa pagina so renderiza uma unica vez , na hora do carregamento

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

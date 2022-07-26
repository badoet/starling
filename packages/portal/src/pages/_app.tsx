import { AppProps } from 'next/app'

import '~/src/styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element | null => {
  return <Component {...pageProps} />
}

export default MyApp

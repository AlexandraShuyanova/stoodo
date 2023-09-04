import '../styles/global.scss'
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppProps } from 'next/app'
import {Provider} from 'react-redux'
import {wrapper} from '../store/store'

import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

export default function MyApp({ Component, ...rest }: AppProps) {

    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}



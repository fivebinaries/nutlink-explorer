import { createGlobalStyle } from 'styled-components';

const globalStyles = createGlobalStyle`
    #__next {
        /* display: flex;
        flex-direction: column;
        overflow-y: hidden; */
        height: 100%;
    }

    input, textarea {
        outline: none;
    }

    body, html {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        /* font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; */
        height: 100%;
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }

    * {
        margin: 0;
        padding: 0;
        outline: none;
    }

    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }
`;

export default globalStyles;

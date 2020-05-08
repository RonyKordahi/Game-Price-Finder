
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *,
    *:before,
    *:after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        font-family: 'Varela Round', sans-serif;
    }

    html, body {
        max-width: 100vw;
    }


    /* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
        font-family: 'Varela Round', sans-serif;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }

    ol, ul, li {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    body {
        line-height: 1.25;
        background: #212324;
        color: #BFBFBF;
        font-family: 'Varela Round', sans-serif;
    }

    .last {
        border-bottom: red solid 2px;
    }

    .full-price {
        text-decoration: line-through;
    }

    .bold {
        font-weight: bold;
    }

    .on-sale {
        color: limegreen;
    }

    a {
        text-decoration: none;
        color: #BFBFBF;
    }

    .hover {
        padding: 3px 5px;
        border: 1px solid #BFBFBF;
        transition: background-color 500ms, color 500ms;
        cursor: pointer;
    
        &:hover {
            background-color: #BFBFBF;
            color: #212324;
            border: 1px solid #212324;
        }
    }

    button {
        font-family: 'Varela Round', sans-serif;
    }
`;
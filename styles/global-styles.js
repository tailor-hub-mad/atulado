import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/* RESET BEGIN */
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
    list-style: none;
    padding: 0;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
button,
input,
optgroup,
select,
textarea {

  margin: 0;
}
button,
input {
  overflow: visible;
  padding: 0;
}
button,
select {
  text-transform: none;
}
button {
  &::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
}
a,
button {
    cursor: pointer;
    background: transparent;
    border: 0 none;
    outline: none;
}
h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
    margin: 0;
}
/* RESET END */

html {
  font-size:16px
}
html * {
  font-family: 'Poppins-Regular';
  color:black;
}

body{
  background-color: ${({ background }) => background || "white"};
}


@media only screen and (min-width: 769px) {
  
}

@media screen and (-webkit-min-device-pixel-ratio:2), screen and (min-resolution:2dppx) {
  body {
   -moz-osx-font-smoothing:grayscale;
   -webkit-font-smoothing:antialiased;
  }
  
 }

 @media only screen and (min-width: 1441px) {
  .page-container {
    max-width: 1440px;
    margin: 0 auto;
  }
}
`;

/* Responsive Visibility */

export default GlobalStyles;

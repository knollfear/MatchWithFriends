import { css } from "lit";
import {buttonBackground, buttonText} from "../settings";

export const button = css`
button{
        background-color: ${buttonBackground};
        padding: 25px;
        border: 3px solid #5c3977;
        margin: 8px;
        border-radius: 10px;
        font-size: 1.5em;
        color:${buttonText};
      }
`

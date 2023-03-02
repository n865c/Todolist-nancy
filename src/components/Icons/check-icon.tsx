import SvgIcon from '@mui/material/SvgIcon';
import {ReactComponent as CheckIconSvg} from "../../images/icon-check.svg"
export const CheckIcon=()=>{
return <SvgIcon sx={{
    borderRadius:'90px',
    mx:1,
    background:
    'linear-gardient(hsl(192100%,67%),hsl(280,87%,65%))',
    '& path':{
        transform:'translate(7px, 10px)',
    },
}}
component={CheckIconSvg} 
inheritViewBox/>
}
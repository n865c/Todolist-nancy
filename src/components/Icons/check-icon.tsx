import SvgIcon from '@mui/material/SvgIcon';
import {ReactComponent as CheckIconSvg} from "../../images/icon-check.svg"
import Checkbox from '@mui/material/Checkbox';
export const CheckIcon=()=>{
return <SvgIcon sx={{
    mx:1,
    borderRadius:'90',
    backgroundColor:
    'linear-gardient(hsl(192, 100%,67%),hsl(280,87%,65%))',
    '& path':{
        transform:'translate(7px, 10px)',
    },
}}
component={CheckIconSvg} 
inheritViewBox/>
}
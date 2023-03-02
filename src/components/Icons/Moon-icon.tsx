import SvgIcon from '@mui/material/SvgIcon';
import {ReactComponent as MoonIconSvg} from '../../images/icon-moon.svg'
export const MoonIcon=()=>{
return <SvgIcon sx={{height:'30px'}}component={MoonIconSvg} inheritViewBox/>
}
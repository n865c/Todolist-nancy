import SvgIcon from '@mui/material/SvgIcon';
import {ReactComponent as CrossIconSvg} from '../../images/icon-cross.svg'
export const CrossIcon=()=>{
return <SvgIcon sx={{height:'30px'}}component={CrossIconSvg} inheritViewBox/>
}
import { Checkbox,Card } from '@mui/material';
import React, { FC ,ReactNode} from 'react'
type Props={
    children:ReactNode;
}
export const TodoCard:FC<Props> = ({children, ...props}) => {
  return (
   <Card
   {...props}
            sx={[
                { mt: 2 },
                (theme) => ({
                    backgroundColor:
                        theme.palette.mode === 'dark'
                            ? 'primary.main'
                            : 'background.paper',
                }),
            ]}
        >{children}
        </Card>
    );
};

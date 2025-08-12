import { ReactElement, ReactHTMLElement } from "react";

interface InputTypeAttributes {
    [key: string]: any;
    label: string;
    labels?: string;
    req?: boolean;
    value?: string;

    helperText: string;

    error?: boolean;

    isSelect?: boolean;
    defaultValue?: any;
    option?: any[] | undefined;
    isdate?: boolean;
    inputProps?: any;
    innerRef?: any;
    mask?: any;
    ref?: any;
    maskChar?: any;
  }  
  
interface InputTypeEvents {
    onChange?: React.EventHandler<any>
 } 

export type InputType = InputTypeAttributes & InputTypeEvents;


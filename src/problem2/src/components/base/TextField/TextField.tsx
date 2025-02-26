import classNames from 'classnames'
import s from './TextField.module.scss'
import React from 'react';
interface Props {
    id?: string;
    className?: string;
    placeholder?: string;
    label?: string;
    append?: React.ReactElement;
    readonly?: boolean;
    defaultValue?: string
    onChange?: (value: string) => void;
    onInput?: (value: string) => void;
    [key: string]: unknown;
}
export default function TextField({
    id = `input-${Math.random()}`,
    className,
    placeholder,
    label,
    append,
    defaultValue,
    readonly = false,
    onChange,
    onInput,
    ...inputProps
}: Props) {

    return (
        <fieldset className={classNames(s.container, className)}>
            <legend><label htmlFor={id}>{label}</label></legend>
            <input
                {...inputProps}
                id={id}
                className={classNames(s.control)}
                value={defaultValue}
                placeholder={placeholder}
                readOnly={readonly}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => onInput?.(e.target.value)}
            />
            <div className={s.append}>
                {append}
            </div>
        </fieldset>
    )
}
import classNames from 'classnames'
import s from './CurrencyInput.module.scss'
import TextField from '../base/TextField/TextField';
import SelectCurrency from '../SelectCurrency/SelectCurrency';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { extractToken } from '@/utils';

// interface ValueType {
//     unit: string;
//     amount: number;
// }

type ValueType = string;

interface Props {
    id?: string;
    className?: string;
    placeholder?: string;
    label?: string;
    defaultValue?: ValueType;
    inputReadonly?: boolean;
    onChange?: (value: ValueType) => void;
    onInput?: (value: ValueType) => void;
}
export default function CurrencyInput({
    className,
    placeholder,
    label,
    defaultValue,
    onChange,
    inputReadonly = false,
    onInput,
}: Props) {
    const tokens = useSelector((state: RootState) => state.token.items);
    const [value, setValue] = useState<ValueType>(defaultValue || "");
    const tokenInfo = useMemo(() => {
        return extractToken(value);
    }, [value]);

    useEffect(() => {
        setValue(defaultValue || "");
    }, [defaultValue])

    const doSetValue = useCallback((newValue: ValueType, cb?: (v: ValueType) => void) =>{
        setValue(newValue);
        cb?.(newValue);
    }, [setValue])

    return (
        <TextField
            type="number"
            className={classNames(s.container, className)}
            label={label}
            placeholder={placeholder}
            defaultValue={String(tokenInfo.amount)}
            onChange={value => doSetValue(`${value} ${tokenInfo.currency}`, onChange)}
            onInput={value => doSetValue(`${value} ${tokenInfo.currency}`, onInput)}
            readonly={inputReadonly}
            append={<SelectCurrency
                className={s.select}
                defaultValue={tokenInfo.currency}
                items={tokens}
                onChange={(value: string) => doSetValue(`${tokenInfo.amount} ${value}`, onChange)}
            />}
        />
    )
}
import classNames from 'classnames'
import s from './SelectCurrency.module.scss'
import { Dropdown, Token } from '../base';
import type { IToken } from '@/@types/token';
import { useCallback, useMemo, useRef, useState } from 'react';
import { DropdownHandle } from '../base/Dropdown/Dropdown';

interface Props {
    className?: string;
    items: IToken[];
    defaultValue?: string;
    onChange?: (value: string) => void;
}
export default function  SelectCurrency({
    className,
    items,
    defaultValue,
    onChange,
}: Props) {
    const [value, setValue] = useState(defaultValue || '');
    const selected = useMemo(() => {
        return items.find(item => item.currency == value);
    }, [items, value])
    const ctx = useRef<DropdownHandle>(null);

    const onItemClick = useCallback((value: string) => {
        if (!ctx.current) {
            return;
        }
        ctx.current.onItemClick(() => {
            setValue(value);
            onChange?.(value);
        })
    }, [ctx, onChange, setValue])

    return (
        <Dropdown
            ref={ctx}
            className={classNames(className, s.container)}
            classDropdown={s.dropdown}
            classController={s.controller}
            controller={selected ? (
                <div className={classNames(s.item)}>
                    <Token name={selected.currency} width={16} height={16} />
                    <span>{selected.currency}</span>
                </div>
            ) : (
                <span>---</span>
            )}
        >
            {
                items.map(item => (
                    <div className={classNames(s.item)} key={item.currency} onClick={onItemClick.bind(null, item.currency)}>
                        <Token name={item.currency} width={16} height={16} />
                        <span>{item.currency}</span>
                        
                    </div>
                ))
            }
        </Dropdown>
    )
}
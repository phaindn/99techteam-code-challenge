import classNames from 'classnames';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styles from './Dropdown.module.scss';
import { DropdownProps } from './Dropdown.type';
import useClickOutside from '@/hooks/useClickOutside';

export type DropdownHandle = {
    onItemClick: (callback: () => void) => void,
}

const Dropdown: React.ForwardRefRenderFunction<DropdownHandle, DropdownProps> = (props: DropdownProps, ref) => {
    const {
        className,
        classController,
        classDropdown,
        controller,
        children,
        attributes,
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        onItemClick: (callback) => {
            setIsOpen(false);
            callback?.();
        },
    }));

    const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

    return (
        <div ref={dropdownRef} className={classNames(styles.wrapper, className)} {...attributes}>
            <div className={classNames(styles.controller, classController)} onClick={() => setIsOpen(!isOpen)}>
                {controller}
                <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.64356 4.23254C2.86494 3.95582 3.26874 3.91095 3.54547 4.13233L7.4224 7.23388L11.2993 4.13233C11.5761 3.91095 11.9799 3.95582 12.2012 4.23254C12.4226 4.50927 12.3777 4.91307 12.101 5.13445L7.82324 8.55667C7.58889 8.74415 7.2559 8.74415 7.02155 8.55667L2.74377 5.13445C2.46705 4.91307 2.42218 4.50927 2.64356 4.23254Z" fill="#A2A8B4" />
                </svg>
            </div>

            {
                isOpen && (
                    <div className={classNames(styles.dropdown, classDropdown)}>
                        {children}
                    </div>
                )
            }
        </div>
    );
};

export default forwardRef(Dropdown);

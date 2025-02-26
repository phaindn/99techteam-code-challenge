import { useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(
    callback: () => void
): React.RefObject<T> {
    // create a ref for the element
    const ref = useRef<T>(null);

    // add event listeners to detect outside clicks
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        // clean up the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback]);

    return ref;
}

export default useClickOutside;

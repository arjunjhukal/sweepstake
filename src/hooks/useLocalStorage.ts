import React from 'react'

export default function useLocalStorage<ValueType>(key: string, defaultValue: ValueType) {
    const [value, setValue] = React.useState(() => {
        const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
        return storedValue === null ? defaultValue : JSON.parse(storedValue);
    });

    React.useEffect(() => {

        const listener = (e: StorageEvent) => {
            if (typeof window !== 'undefined' && e.storageArea === localStorage && e.key === key) {
                setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue)
            }
        }

        window.addEventListener('storage', listener);

        return () => {
            window.addEventListener('storage', listener);
        }

    }, [key, defaultValue])


    const StoreValueInLocalStorage = (newValue: ValueType) => {
        setValue((currentValue: any) => {
            const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;
            if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(result));
            return result;
        })
    }

    return [value, StoreValueInLocalStorage]
}

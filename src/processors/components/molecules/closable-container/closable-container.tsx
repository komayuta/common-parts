import * as React from "react";
import {ReactNode, useCallback, useContext, useState} from "react";

const ClosableContainerContext = React.createContext<{open: boolean; toggle: () => void}>({
    open: false,
    toggle: () => undefined,
});

export function useClosableContainer() {
    return useContext(ClosableContainerContext);
}

interface ClosableContainerProps {
    initialOpened?: boolean;
    children: ReactNode;
}

export const ClosableContainer: React.FC<ClosableContainerProps> = ({initialOpened, children}) => {
    const [open, setOpen] = useState(!!initialOpened);
    const toggle = useCallback(() => {
        setOpen((x) => !x);
    }, []);

    return (
        <ClosableContainerContext.Provider value={{open, toggle}}>
            {children}
        </ClosableContainerContext.Provider>
    );
};

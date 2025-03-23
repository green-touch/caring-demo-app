import { useState } from "react";

export const useMockError = () => {
    const [isError, setIsError] = useState(false);
    const [countError, setCountError] = useState(0);

    const handleMockError = () => {
        if (countError === 0) {
            setIsError(true);
            setCountError(prev => prev + 1);
            return true;
        }
        return false
    }

    return { isError, handleMockError }
}
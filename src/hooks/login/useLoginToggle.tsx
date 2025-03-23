import { useState } from "react";

export const useLoginToggle = () => {
    const [로그인유지, set로그인유지] = useState(false);

    const handleLoginToggle = () => {
        set로그인유지(!로그인유지);
    }

    return { 로그인유지, handleLoginToggle }
}
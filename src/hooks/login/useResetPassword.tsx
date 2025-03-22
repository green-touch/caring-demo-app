import { useState, useCallback, useMemo } from 'react';
import useLoginNavigation from '@_hooks/login/useLoginNavigation';

const validRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;

export function useResetPassword() {

    const { navigation, mode } = useLoginNavigation();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);

    const handlePassword = useCallback((v: string) => {
        setPassword(v);
    }, []);

    const handleConfirm = useCallback((v: string) => {
        setConfirm(v);
    }, []);

    const clearPassword = useCallback(() => {
        setPassword('');
    }, []);

    const clearConfirm = useCallback(() => {
        setConfirm('');
    }, []);

    const togglePasswordView = useCallback(() => {
        setShowPw((prev) => !prev);
    }, []);

    const toggleConfirmView = useCallback(() => {
        setShowConfirmPw((prev) => !prev);
    }, []);

    const passwordError = useMemo(() => {
        if (!password) return '';
        if (password.length < 8) return '8자리 이상 입력해야 합니다.';
        if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) return '영문과 숫자를 모두 포함해야 합니다.';
        if (!validRegex.test(password)) return '특수문자는 사용할 수 없습니다.';
        return '';
    }, [password]);

    const confirmError = useMemo(() => {
        if (!confirm) return '';
        if (confirm !== password) return '새 비밀번호와 일치하지 않습니다.';
        return '';
    }, [confirm, password]);

    const isDisabled = useMemo(() => {
        if (!password || !confirm) return true;
        if (passwordError || confirmError) return true;
        return false;
    }, [password, confirm, passwordError, confirmError]);

    const handleSubmit = useCallback(() => {
        if (isDisabled) return;
        navigation.navigate('HelpResult', { mode });
    }, [isDisabled]);

    return {
        password,
        confirm,
        passwordError,
        confirmError,
        showPw,
        showConfirmPw,
        handlePassword,
        handleConfirm,
        clearPassword,
        clearConfirm,
        togglePasswordView,
        toggleConfirmView,
        isDisabled,
        handleSubmit,
    };
}
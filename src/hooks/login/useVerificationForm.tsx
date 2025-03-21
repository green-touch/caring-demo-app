import { useEffect, useState, useCallback } from 'react';

/** 통신사 정보 구조 */
export interface TelecomItem {
    title: string;
    hasDropdown: boolean;
    dropDownTitle?: string[];
}

/** 성별 */
export type Gender = '남자' | '여자';

/** 휴대폰 번호 유효성 체크 & 포맷팅 */
function formatPhoneNumberAndValidate(rawValue: string): {
    formatted: string;
    isError: boolean;
    errorMessage: string;
} {
    // 숫자만 추출
    const digits = rawValue.replace(/\D/g, '');

    // 11자리 초과면 잘라서 무시
    if (digits.length > 11) {
        // 자르는 대신, 초과분을 무시하려면
        const truncated = digits.slice(0, 11);
        return formatPhoneNumberAndValidate(truncated);
    }

    // 포맷팅
    let formatted = digits;
    if (digits.length > 3) {
        formatted = digits.slice(0, 3) + '-' + digits.slice(3);
    }
    if (digits.length > 7) {
        formatted =
            digits.slice(0, 3) +
            '-' +
            digits.slice(3, 7) +
            '-' +
            digits.slice(7);
    }

    // 에러 체크
    let isError = false;
    let errorMessage = '';
    // 길이 3 이상일 때 010인지 체크
    if (digits.length >= 3 && digits.slice(0, 3) !== '010') {
        isError = true;
        errorMessage = '올바른 전화번호 형식을 입력해주세요.';
    }
    // 길이가 11자 정확히 되지 않으면 에러
    if (digits.length > 0 && digits.length < 11) {
        isError = true;
        errorMessage = '올바른 전화번호 형식을 입력해주세요.';
    }

    return { formatted, isError, errorMessage };
}

interface UseVerificationFormParams {
    /** 가능한 성별 목록 */
    genders: Gender[];
    /** 가능한 통신사 목록 */
    telecoms: TelecomItem[];
    /** 인증번호 정답 (실제로는 서버에서 받겠지만 예시상 하드코딩) */
    correctCode?: string;
}

/** 타이머 초기값(3분 = 180초) */
const INITIAL_COUNT = 180;

export function useVerificationForm({
    genders,
    telecoms,
    correctCode = '123456',
}: UseVerificationFormParams) {
    const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
    const [selectedTelecom, setSelectedTelecom] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedAlteTelecom, setSelectedAlteTelecom] = useState<string | null>(null);

    const [phoneNumber, setPhoneNumber] = useState(''); // 화면에 표시될 포맷팅된 번호
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const [verificationCode, setVerificationCode] = useState('');
    const [verificationCodeError, setVerificationCodeError] = useState('');

    const [isCodeSent, setIsCodeSent] = useState(false);
    const [timer, setTimer] = useState(INITIAL_COUNT);
    const [isTimeExpired, setIsTimeExpired] = useState(false);

    const handleGenderSelect = useCallback((gender: Gender) => {
        setSelectedGender(gender);
    }, []);

    const handleTelecomSelect = useCallback((item: TelecomItem) => {
        if (item.title === '알뜰폰') {
            if (!selectedTelecom?.startsWith('알뜰폰')) {
                setSelectedTelecom('알뜰폰');
            }
            setSelectedAlteTelecom(null);
            setShowDropdown(selectedTelecom?.startsWith('알뜰폰') ? !showDropdown : true);
        } else {
            setSelectedTelecom(item.title);
            setSelectedAlteTelecom(null);
            setShowDropdown(false);
        }
    }, [selectedTelecom, showDropdown]);

    const handleDropdownSelect = useCallback((tel: string) => {
        setSelectedTelecom(`알뜰폰(${tel})`);
        setSelectedAlteTelecom(tel);
        setShowDropdown(false);
    }, []);

    const handlePhoneNumberChange = useCallback((value: string) => {
        const { formatted, isError, errorMessage } = formatPhoneNumberAndValidate(value);
        setPhoneNumber(formatted);
        setPhoneNumberError(isError ? errorMessage : '');
    }, []);

    const handleVerificationCodeChange = useCallback((value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 6);
        setVerificationCode(digits);
        setVerificationCodeError('');
    }, []);

    const handleSendCode = useCallback(() => {
        if (!selectedGender || !selectedTelecom || !phoneNumber || phoneNumberError) {
            setVerificationCodeError('');
            return;
        }

        setIsCodeSent(true);
        setVerificationCode('');
        setVerificationCodeError('');
        setTimer(INITIAL_COUNT);
        setIsTimeExpired(false);
    }, [selectedGender, selectedTelecom, phoneNumber, phoneNumberError]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (isCodeSent && !isTimeExpired) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval!);
                        setIsTimeExpired(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isCodeSent, isTimeExpired]);

    const handleSubmit = useCallback(() => {

        if (isTimeExpired) {
            setVerificationCodeError('인증번호의 유효시간이 만료되었습니다. 인증번호를 다시 받아주세요.');
            return;
        }

        if (!selectedGender || !selectedTelecom || !phoneNumber || !verificationCode) {
            return;
        }

        if (phoneNumberError) {
            return;
        }

        if (verificationCode !== correctCode) {
            setVerificationCodeError('인증번호가 일치하지 않습니다. 다시 확인해주세요.');
            return;
        }

        console.log('제출 완료', {
            gender: selectedGender,
            telecom: selectedTelecom,
            phoneNumber,
            verificationCode,
        });
    }, [
        isTimeExpired,
        selectedGender,
        selectedTelecom,
        phoneNumber,
        verificationCode,
        phoneNumberError,
        correctCode,
    ]);

    const isFormValid = !!(
        selectedGender &&
        selectedTelecom &&
        phoneNumber &&
        verificationCode.length === 6 &&
        !phoneNumberError &&
        !isTimeExpired
    );

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return {
        genders,
        telecoms,
        selectedGender,
        selectedTelecom,
        showDropdown,
        selectedAlteTelecom,
        phoneNumber,
        phoneNumberError,
        verificationCode,
        verificationCodeError,
        isCodeSent,
        isTimeExpired,
        isFormValid,

        handleGenderSelect,
        handleTelecomSelect,
        handleDropdownSelect,
        handlePhoneNumberChange,
        handleVerificationCodeChange,
        handleSendCode,
        handleSubmit,

        timeString,
    };
}
import React, { createContext, useContext, useState, useEffect } from 'react';

interface TimerContextType {
    estimatedTime: number;
    currentTime: number;
    isRunning: boolean;
    status: 'not_started' | 'running' | 'paused' | 'completed';
    setEstimatedTime: (time: number) => void;
    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
    setStatus: (status: 'not_started' | 'running' | 'paused' | 'completed') => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
    const [estimatedTime, setEstimatedTime] = useState(120); // 2 minutos padrão
    const [currentTime, setCurrentTime] = useState(estimatedTime * 60); // em segundos
    const [isRunning, setIsRunning] = useState(false);
    const [status, setStatus] = useState<'not_started' | 'running' | 'paused' | 'completed'>('not_started');

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning && currentTime > 0) {
            interval = setInterval(() => {
                setCurrentTime((prevTime) => {
                    if (prevTime <= 1) {
                        setIsRunning(false);
                        setStatus('completed');
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning, currentTime]);

    const startTimer = () => {
        setIsRunning(true);
        setStatus('running');
    };

    const pauseTimer = () => {
        setIsRunning(false);
        setStatus('paused');
    };

    const resetTimer = () => {
        setCurrentTime(estimatedTime * 60);
        setIsRunning(false);
        setStatus('not_started');
    };

    const handleSetEstimatedTime = (time: number) => {
        setEstimatedTime(time);
        setCurrentTime(time * 60);
    };

    const value = {
        estimatedTime,
        currentTime,
        isRunning,
        status,
        setEstimatedTime: handleSetEstimatedTime,
        startTimer,
        pauseTimer,
        resetTimer,
        setStatus,
    };

    return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
}

export function useTimer() {
    const context = useContext(TimerContext);
    if (context === undefined) {
        throw new Error('useTimer must be used within a TimerProvider');
    }
    return context;
} 
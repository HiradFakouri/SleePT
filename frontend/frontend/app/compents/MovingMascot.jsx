'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function MovingMascot({
    disappearDelay = 1000,
    imageSize = 100,
}) {
    const [visibleMascot, setVisibleMascot] = useState('dead');
    const timeoutRef = useRef(null);

    const baseSize = imageSize;
    const happySize = Math.round(imageSize * 1.1);
    const containerSize = visibleMascot === 'happy' ? happySize : baseSize;

    useEffect(() => {
        const onKeyDown = (e) => {
            clearTimeout(timeoutRef.current);
            if (e.key === 'Enter') {
                setVisibleMascot('happy');
                timeoutRef.current = setTimeout(() => setVisibleMascot('dead'), 3000);
            } else {
                setVisibleMascot('sleepy');
            }
        };

        const onKeyUp = (e) => {
            if (e.key !== 'Enter') {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => setVisibleMascot('dead'), disappearDelay);
            }
        };

        const onMouseDown = (e) => {
            if (e.button === 0) {
                clearTimeout(timeoutRef.current);
                setVisibleMascot('happy');
                timeoutRef.current = setTimeout(() => setVisibleMascot('dead'), 3000);
            } else {
                clearTimeout(timeoutRef.current);
                setVisibleMascot('sleepy');
            }
        };

        const onMouseUp = (e) => {
            if (e.button !== 0) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => setVisibleMascot('dead'), disappearDelay);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            clearTimeout(timeoutRef.current);
        };
    }, [disappearDelay]);

    return (
        <div
            className="fixed top-4 right-4 z-50 pointer-events-none"
            style={{
                width: containerSize,
                height: containerSize,
                overflow: 'visible',
                position: 'fixed',
            }}
        >

            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                    src="/DeadTartan.svg"
                    alt="DeadTartan"
                    width={baseSize}
                    height={baseSize}
                    className="absolute transition-opacity duration-300"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: visibleMascot === 'dead' ? 1 : 0,
                    }}
                />
                <Image
                    src="/SleepyTartan.svg"
                    alt="SleepyTartan"
                    width={baseSize}
                    height={baseSize}
                    className="absolute transition-opacity duration-300"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: visibleMascot === 'sleepy' ? 1 : 0,
                    }}
                />
                <Image
                    src="/HappyTartan.svg"
                    alt="HappyTartan"
                    width={happySize}
                    height={happySize}
                    className="absolute transition-opacity duration-300"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: visibleMascot === 'happy' ? 1 : 0,
                    }}
                />
            </div>
        </div>
    );
}
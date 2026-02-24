import { useState, useEffect } from 'react';

// Utility to generate strings dynamically for Tailwind styling
const d = String.fromCharCode(45);
const c = (str) => str.split('_').join(d);

const GREEN = '#00FF41';
const GRAY = '#cccccc';

export const MuseumWaitScreen = () => {
    const [arrowCount, setArrowCount] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setArrowCount(prev => (prev >= 3 ? 1 : prev + 1));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const arrows = '<'.repeat(arrowCount);

    const bgGradient = 'repeating' + d + 'linear' + d + 'gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.25) 3px, rgba(0,0,0,0.25) 4px)';
    const scanlineGradient = 'repeating' + d + 'linear' + d + 'gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)';

    return (
        <div
            className={c("fixed inset_0 flex flex_col items_center justify_center font_retro tracking_widest")}
            style={{
                backgroundColor: '#0d0d0d',
                backgroundImage: bgGradient,
            }}
        >
            {/* Scanline overlay */}
            <div
                className={c("absolute inset_0 pointer_events_none")}
                style={{
                    backgroundImage: scanlineGradient,
                }}
            />

            {/* Main content */}
            <div className={c("relative z_10 w_full max_w_lg px_8 flex flex_col")}>
                {/* Title block */}
                <div className={c("mb_6")}>
                    <h1
                        className={c("text_4xl md:text_5xl leading_snug")}
                        style={{ color: GREEN }}
                    >
                        Set up{' '}
                        <span
                            style={{
                                color: GREEN,
                                display: 'inline' + d + 'block',
                                minWidth: '3ch',
                                transition: 'none',
                            }}
                        >
                            {arrows}
                        </span>
                    </h1>

                    <h2
                        className={c("text_5xl md:text_6xl mt_6 pl_16")}
                        style={{ color: GREEN, letterSpacing: '0.25em' }}
                    >
                        WAIT...
                    </h2>

                    {/* Divider slashes */}
                    <p
                        className={c("mt_2 pl_16 text_sm md:text_base opacity_80")}
                        style={{ color: GREEN, letterSpacing: '0.1em' }}
                    >
                        ////////////////////////
                    </p>
                </div>

                {/* Spacer */}
                <div className={c("mt_24 mb_4")} />

                {/* Suggested Actions */}
                <div
                    className={c("text_sm md:text_base space_y_3 font_mono")}
                    style={{ color: GRAY }}
                >
                    <p className={c("opacity_90")}>&gt; Suggested Actions</p>
                    <p className={c("pl_8 opacity_80")}>[1] Walk to the other side.</p>
                    <p className={c("pl_8 opacity_80")}>[2] Program the Bot computer.</p>
                    <p className={c("pl_8 opacity_80")}>[3] Press the big red button.</p>
                </div>
            </div>
        </div>
    );
};
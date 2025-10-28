import { useState } from "react";
import Image from "next/image";

const BlindDropdown = ({ setInput, sendMessage }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (text) => {
        if (setInput) {
            setInput(text);
        }
        setIsOpen(false);
        if (sendMessage) {
            setTimeout(() => {
                sendMessage(text);
            }, 2500);
        }
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
                onClick={handleToggle}
                style={{
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'default',
                    pointerEvents: 'none',
                }}
            >
                <Image
                    src="/Pulldown.svg"
                    alt="Toggle Dropdown"
                    width={60}
                    height={100}
                    onClick={handleToggle}
                    style={{
                        cursor: 'pointer',
                        pointerEvents: 'auto',
                        transition: 'transform 0.3s ease',
                        transform: 'translate(45vw, -7px)',
                    }}
                />
            </button>

            {isOpen && (
                <>
                    <div
                        style={{
                            position: 'fixed',
                            top: '33.33%',
                            left: 0,
                            width: '100%',
                            height: '66.67%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 998,
                        }}
                    ></div>

                    <div
                        onClick={handleToggle}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 999,
                        }}
                    ></div>
                </>
            )}

            {isOpen && (
                <div
                    id="toggle-menu-content"
                    role="menu"
                    style={{
                        position: 'fixed',
                        zIndex: 9999,
                        backgroundColor: '#996b63',
                        padding: '10px',
                        minWidth: '50%',
                        minHeight: '33.33%',
                        left: '50%',
                        transform: 'translate(-50%, 0)',
                        top: '0px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                        }}
                    >
                        <div
                            className="h-32 bg-[#CAA286] border border-gray-400 rounded-lg p-4 transform transition-transform duration-300 ease-in-out hover:scale-103"
                            style={{ width: 'calc(20vw - 10px)', height: '30vh', cursor: 'pointer' }}
                            onClick={() => handleItemClick('Generate an excuse so I dont have to do something')}
                        >
                            <h1 className="text-center font-bold text-black">Excuse Generator</h1>
                            <br />
                            <br />
                            <p className="text-center text-black">sleePT will generate excuses <br /> so you can avoid doing things that you are meant to be doing</p>
                        </div>

                        <div
                            className="h-32 bg-[#CAA286] border border-gray-400 rounded-lg p-4 transform transition-transform duration-300 ease-in-out hover:scale-103"
                            style={{ width: 'calc(20vw - 10px)', height: '30vh', cursor: 'pointer' }}
                            onClick={() => handleItemClick('Give me some procrastination tips')}
                        >
                            <h1 className="text-center font-bold text-black">Procrastination Tips</h1>
                            <br />
                            <br />
                            <p className="text-center text-black">sleePT will give you the best tips <br /> to pass your time in the least productive way</p>
                        </div>

                        <div
                            className="h-32 bg-[#CAA286] border border-gray-400 rounded-lg p-4 transform transition-transform duration-300 ease-in-out hover:scale-103"
                            style={{ width: 'calc(20vw - 10px)', height: '30vh', cursor: 'pointer' }}
                            onClick={() => handleItemClick('Give me a Vibe check')}
                        >
                            <h1 className="text-center font-bold text-black">Vibe Check</h1>
                            <br />
                            <br />
                            <p className="text-center text-black">Vibe Check will show you how to pass your time <br /> with maximum chill and minimum effort</p>
                        </div>

                        <div
                            className="h-32 bg-[#CAA286] border border-gray-400 rounded-lg p-4 transform transition-transform duration-300 ease-in-out hover:scale-103"
                            style={{ width: 'calc(20vw - 10px)', height: '30vh', cursor: 'pointer' }}
                            onClick={() => handleItemClick('What is my daily anti-goal?')}
                        >
                            <h1 className="text-center font-bold text-black">Daily Anti-Goal</h1>
                            <br />
                            <br />
                            <p className="text-center text-black">Daily Anti-Goal will show you how <br /> to lower the bar and still trip over it</p>
                        </div>

                        <div
                            className="h-32 bg-[#CAA286] border border-gray-400 rounded-lg p-4 transform transition-transform duration-300 ease-in-out hover:scale-103"
                            style={{ width: 'calc(20vw - 20px)', height: '30vh', cursor: 'pointer' }}
                            onClick={() => handleItemClick('I\'m crashing out')}
                        >
                            <h1 className="text-center font-bold text-black">Crashout</h1>
                            <br />
                            <br />
                            <p className="text-center text-black">sleePT will help you find the best ways <br /> for you to take a nap and avoid all responsibilities</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export { BlindDropdown };
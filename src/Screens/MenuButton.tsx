import React, { useState, useRef } from 'react';

interface MyButtonProps {
    onClick: () => void;
    text: string;
}

const MyButton: React.FC<MyButtonProps> = ({ onClick, text }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [menuOptions, setMenuOptions] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        setIsMenuOpen(!isMenuOpen);
        if (onClick) onClick();
    };

    const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && searchTerm.trim() !== '') {
            setMenuOptions((prevOptions) => [...prevOptions, searchTerm.trim()]);
            setSearchTerm('');
            inputRef.current?.focus();
        }
    };

    const filteredOptions = [...menuOptions, ...searchTerm.split(' ')].filter(
        (item) =>
            item.trim().toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
    return (
        <div className="relative inline-block">
            <button
                className="border border-gray-500 px-4 py-2"
                onClick={handleButtonClick}
            >
                {text}
            </button>
            {isMenuOpen && (
                <div className="menu absolute bg-white border border-gray-500 mt-2 p-4">
                    <input
                        type="text"
                        placeholder="Type to add an option..."
                        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleInputKeyPress}
                        ref={inputRef}
                    />
                    <ul>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((item, index) => (
                                <li key={index} className="mb-2">
                                    {item}
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-600">No items match.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MyButton;

import React, { useState } from 'react';

const Clock: React.FC = () => {
    const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

    setInterval(() => {
        setTime(new Date().toLocaleTimeString());
    }, 1000);

    return (
        <div>
            현재 시간: {time}
        </div>
    );
};

export default Clock;
import React, { FC, useState } from "react";
import { FiCheck } from "react-icons/fi";

type TsideFormProps = {
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideForm: FC<TsideFormProps> = ({ setIsFormOpen }) => {
    const [inputText, setInputText] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };
    const handleOnBlur = () => {
        setIsFormOpen(false);
    };
    
    return (
        <div>
            <input
                autoFocus
                type="text"
                placeholder="새로운 게시판 등록하기"
                value={inputText}
                onChange={handleChange}
                onBlur={handleOnBlur}
            />
            <FiCheck />
        </div>
    );
};

export default SideForm;

import React, { FC, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { sideForm, input, icon } from "./SideForm.css";

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
        <div className={sideForm}>
            <input
                className={input}
                autoFocus
                type="text"
                placeholder="새로운 게시판 등록하기"
                value={inputText}
                onChange={handleChange}
                onBlur={handleOnBlur}
            />
            <FiCheck className={icon}/>
        </div>
    );
};

export default SideForm;

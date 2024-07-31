import { useEffect, useState } from "react";
import { fetchCategory } from "../api/category.api";
import { Category } from "../models/category.model";
import { useLocation } from "react-router-dom";

export const useCategory = () => {
    const [category, setCategory] = useState<Category[]>([]);
    const location = useLocation();

    const setActive = () => {
        const params = new URLSearchParams(location.search);
        if (params.get("category_id")) {
            setCategory((prev) => {
                return prev.map((item) => {
                    return {
                        ...item,
                        isActive: item.id === Number(params.get("category_id")),
                    };
                });
            });
        } else {
            setCategory((prev) => {
                return prev.map((item) => {
                    return {
                        ...item,
                        isActive: false,
                    };
                });
            });
        }
    };

    useEffect(() => {
        fetchCategory().then((category) => {
            if (!category) return;
            const categoryWithAll = [
                {
                    id: null,
                    name: "전체",
                },
                ...category,
            ];
            setCategory(categoryWithAll);
        });
    }, []);

    useEffect(() => {
        setActive();
    }, [location.search]);

    return { category };
};

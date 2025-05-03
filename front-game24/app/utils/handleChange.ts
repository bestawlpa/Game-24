import type  { ChangeEvent } from "react";
import type { User } from "~/interfaces/user.interface";

export const handleChange = ( e: ChangeEvent<HTMLInputElement>, formData: User,setFormData: React.Dispatch<React.SetStateAction<User>>) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};
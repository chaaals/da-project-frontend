import { useNavigate } from 'react-router-dom';

export function useCustomNavigate() {
    const navigate = useNavigate();
    const goto = (path) => navigate(path) 
    
    return { goto }
}
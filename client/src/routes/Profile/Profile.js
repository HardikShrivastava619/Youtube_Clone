import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const profilejs = ()=>{
try {
    const navigate = useNavigate()


    const loginData = useSelector(s=>s.loginData)

    return {navigate , loginData}
    
} catch (error) {
    console.log(error);
    
}

}
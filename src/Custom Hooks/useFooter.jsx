import {useLocation} from 'react-router-dom'


export const useFooter = () => {
   const location = useLocation();

   console.log(location)
   return location.pathname !== '/dashboard';
}
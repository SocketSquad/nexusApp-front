import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
import { toggleRTL, toggleTheme, toggleAnimation } from './store/themeConfigSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App({ children }: PropsWithChildren) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
    }, [dispatch, themeConfig.theme, themeConfig.rtlClass, themeConfig.animation]);

    return (
        <div
            className={`${themeConfig.rtlClass} main-section antialiased relative font-nunito text-sm font-normal`}
        >
             <ToastContainer />
            {children}
        </div>
    );
}

export default App;

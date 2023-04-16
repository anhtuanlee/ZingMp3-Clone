import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Mv() {
    const navigate = useNavigate();

    useEffect(() => {
        swal({
            title: 'Thông Báo !!!',
            text: 'Chức năng đang phát triển...',
            icon: 'warning',
            buttons: 'Oki ^^!',
        });
        navigate('..');
    }, [navigate]);
    return <></>;
}

export default Mv;

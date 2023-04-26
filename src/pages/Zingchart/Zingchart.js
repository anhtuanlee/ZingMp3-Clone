import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Zingchart() {
    const navigate = useNavigate();

    useEffect(() => {
        swal({
            title: 'Thông Báo !!!',
            text: 'Chức năng đang phát triển...',
            icon: 'warning',
            buttons: 'Oki ^^!',
        });
    }, []);
    return <></>;
}

export default Zingchart;

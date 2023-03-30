import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { combinedStatusSelector } from '../../redux/selector';

function Mv() {
    const navigate = useNavigate();

    useEffect(() => {
        swal({
            title: 'Thông Báo !!!',
            text: 'Chức năng đang phát triển',
            icon: 'warning',
            buttons: 'Oki ^^!',
        });
        navigate('..');
    }, []);
    return <></>;
}

export default Mv;

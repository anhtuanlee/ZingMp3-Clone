import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Category() {
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
    return <h3> </h3>;
}

export default Category;

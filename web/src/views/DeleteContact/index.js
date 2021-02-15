import api from '../../services/api';
import { config } from '../../utils/auth';

const DeleteContact = async (props) => {
    api.delete(`/${props.match.params.id}`, config);

    return window.location.href = '/';
}

export default DeleteContact;

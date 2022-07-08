import { toast } from "react-toastify";

const notify = (type: 'success' | 'error', msg: string) => {
    toast(msg, {
        theme: 'colored',
        type
    });
}

export default notify;
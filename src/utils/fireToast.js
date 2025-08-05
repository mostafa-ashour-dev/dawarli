import Swal from "sweetalert2";

export default function fireToast({icon, title }) {
        Swal.fire({
            toast: true,
            position: "bottom-end",
            title: title,
            icon: icon.toLowerCase(),
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        })
}
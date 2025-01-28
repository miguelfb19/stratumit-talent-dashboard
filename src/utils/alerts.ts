import Swal from "sweetalert2";

type SweetAlertIcon = "success" | "error" | "warning" | "info" | "question";
type SweetAlertPosition = 'top'| 'top-start'| 'top-end'| 'center'| 'center-start'| 'center-end'| 'bottom'| 'bottom-start'| 'bottom-end';

export const submitAlert = (
  message: string,
  icon: SweetAlertIcon,
  position: SweetAlertPosition = 'top-end',
  timer = 3,
  width:string = "32em",
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: position,
    width: width,
    showConfirmButton: false,
    showCloseButton: true,
    timer: timer * 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: icon,
    title: message,
  });
};

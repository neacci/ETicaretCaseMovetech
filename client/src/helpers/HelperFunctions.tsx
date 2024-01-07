import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

interface IIntervalProps {
    seconds: number,
    rejectOnTimeEnd?: boolean,
    onTimeEndMessage?: string
}


export const confirm = (msg: string, onConfirm?: Function, onReject?: Function, intervalProps?: IIntervalProps, confirmLabel?: string, rejectLabel?: string) => {
    let interval: any;
    confirmAlert({
        title: 'Devam Etmek Ýçin Onaylayýn',
        message: msg,
        onClickOutside: () => {
            onReject && onReject();
        },
        onKeypressEscape: () => {
            onReject && onReject();
        },
        closeOnClickOutside: false,
        buttons: [
            {
                label: confirmLabel == undefined ? 'Evet' : confirmLabel,
                onClick: () => {
                    clearInterval(interval);
                    onConfirm && onConfirm();
                }
            },
            {
                label: rejectLabel == undefined ? 'Hayýr' : rejectLabel,
                onClick: () => {
                    clearInterval(interval);
                    onReject && onReject();
                }
            }
        ]
    })
    if (intervalProps != undefined) {
        let seconds = intervalProps.seconds;
        interval = setInterval(() => {
            if (intervalProps.rejectOnTimeEnd) {
                var elem = document.getElementsByClassName('react-confirm-alert-button-group')[0].children[1];
                if (elem != undefined) {
                    elem.innerHTML = rejectLabel == undefined ? 'Hayýr' : rejectLabel + " " + seconds;
                }
            } else {
                var elem = document.getElementsByClassName('react-confirm-alert-button-group')[0].children[0];
                if (elem != undefined) {
                    elem.innerHTML = confirmLabel == undefined ? 'Evet' : confirmLabel + " " + seconds;
                }
            }

            if (seconds == 0) {
                toast(intervalProps.onTimeEndMessage, {
                    type: 'warning',
                    theme: 'dark',
                    position: 'top-center',
                    autoClose: 2000
                });
                clearInterval(interval);
                setTimeout(() => {
                    if (intervalProps.rejectOnTimeEnd) {
                        onReject && onReject();
                    } else {
                        onConfirm && onConfirm();
                    }
                }, 500)
            }
            seconds -= 1;
        }, 1000)
    }


    return { result: true };
}
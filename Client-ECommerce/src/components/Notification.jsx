import { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './notification.css'
import { setNotify, resetNotify } from '../redux/notifyRedux';

const Notification = ({ title = "", message = "", type = "info", duration = 10000 }) => {
  const { notifies, notifyStatus, notifyDuration } = useSelector((state) => state.notify);
  const toastRef = useRef();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!notifies.length || !notifyStatus) {
      if (toastRef.current) {
        toastRef.current.innerHTML = '';
      }
    }
  }, [notifies, notifyStatus]);

  useEffect(()=> {
    // Toast function
    function toast(message, type, title, duration) {
      const main = toastRef.current;
      if (main) {
        const toast = document.createElement("div");

        // Auto remove toast
        const autoRemoveId = window.setTimeout(function () {
          main.removeChild(toast);
        }, duration + 1000);

        // Remove toast when clicked
        toast.onclick = function (e) {
          if (e.target.closest(".toast__close")) {
            const newNotifies = notifies.filter(({notifyMess}) => notifyMess !== message);
            if (newNotifies.length) {
              dispatch(setNotify({notifies: newNotifies}));
            } else {
              dispatch(setNotify({notifies: [], status: false}));
            }
            main.removeChild(toast);
            window.clearTimeout(autoRemoveId);
          }
        };

        const icons = {
          success: "fas fa-check-circle",
          info: "fas fa-info-circle",
          warning: "fas fa-exclamation-circle",
          error: "fas fa-exclamation-circle",
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .5s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
        main.appendChild(toast);
        return;
      }
    }

    if (title !=='' && message !== '') toast(message, type, title, duration);

    if (notifies.length && notifyStatus) {
      if (toastRef.current) toastRef.current.innerHTML = '';
      notifies.forEach(({notifyMess, notifyType, notifyTitle}) => {
        toast(notifyMess, notifyType, notifyTitle, notifyDuration);
      })
    }
  }, [duration, message, title, type, notifies, notifyStatus, notifyDuration, dispatch])

  useEffect(() => {
    // This return function is called when the component unmounts
    return () => {
      dispatch(resetNotify());
    };
  }, [dispatch]);

  return (
      <div className="toast-container" ref={toastRef}></div>
  );
};

export default Notification;

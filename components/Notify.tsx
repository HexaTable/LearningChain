import { notification } from "antd";

export function NotifyInfo(message: string, description: string) {
  notification.info({
    message: message,
    description: description,
    duration: 5,
  });
}

export function NotifySuccess(message: string, description: string, time = 5 ) {
  notification.success({
    message: message,
    description: description,
    duration: time,
  });
}

export function NotifyError(message: string, description: string, time = 5) {
  notification.error({
    message: message,
    description: description,
    duration: time,
  });
}

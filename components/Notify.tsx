import { notification } from "antd";

export function NotifyInfo(message: string, description: string) {
  notification.info({
    message: message,
    description: description,
    duration: 5,
  });
}

export function NotifySucess(message: string, description: string) {
  notification.success({
    message: message,
    description: description,
    duration: 5,
  });
}

export function NotifyError(message: string, description: string) {
  notification.error({
    message: message,
    description: description,
    duration: 5,
  });
}

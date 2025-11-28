export interface ResultMessage {
    STATUS: STATUS_RESULT;
    TITLE: string;
    SUB_TITLE: string;
}

type STATUS_RESULT = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'

import { toast } from 'react-toastify';
import { store } from '../store';

class WebSocketService {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectTimeout = 1000; // Start with 1 second
  }

  connect() {
    const { user } = store.getState().auth;
    if (!user) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/api/ws?token=${user.token}`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.reconnectTimeout = 1000;
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.attemptReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);
        this.connect();
        this.reconnectAttempts++;
        this.reconnectTimeout *= 2; // Exponential backoff
      }, this.reconnectTimeout);
    }
  }

  handleMessage(data) {
    switch (data.type) {
      case 'EXAM_GRADED':
        toast.info(`Your exam "${data.examTitle}" has been graded!`, {
          onClick: () => window.location.href = `/exam/${data.examId}/results`,
        });
        break;

      case 'NEW_SUBMISSION':
        toast.info(`New submission received for "${data.examTitle}"`, {
          onClick: () => window.location.href = `/exam/${data.examId}/results`,
        });
        break;

      case 'EXAM_STARTING':
        toast.info(`Exam "${data.examTitle}" is starting in 5 minutes!`, {
          onClick: () => window.location.href = `/exam/${data.examId}/take`,
        });
        break;

      case 'EXAM_ENDING':
        toast.warning(`Exam "${data.examTitle}" is ending in 5 minutes!`);
        break;

      case 'EXAM_AUTO_SUBMITTED':
        toast.success(`Your exam "${data.examTitle}" has been automatically submitted.`, {
          onClick: () => window.location.href = `/exam/${data.examId}/results`,
        });
        break;

      default:
        console.warn('Unknown message type:', data.type);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }
}

export const websocket = new WebSocketService(); 
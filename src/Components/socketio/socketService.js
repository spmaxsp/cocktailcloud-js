import { io } from 'socket.io-client';

class SocketService {
    socket;

    connect(ip, port) {
        console.log('Connecting to socket server');
            if (this.socket) {
            this.socket.disconnect();
        }

        this.socket = io(`http://${ip}:${port}`);

        this.socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });

        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    sendMessage(event, data) {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }

    onMessage(event, callback) {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    offMessage(event, callback) {
        if (this.socket) {
            this.socket.off(event, callback);
        }
    }
}

export default new SocketService();
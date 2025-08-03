import { Client, IMessage, StompSubscription } from '@stomp/stompjs';

export class WebSocketClient {

    private stompClient: Client | null = null
    private subscription: StompSubscription | null = null
    public onMessage: ((msg: any) => void)

    constructor(private topic: string, private url: string, public onMessageFunc: ((msg: any) => void), private token: string) {

        this.onMessage = onMessageFunc

        this.stompClient = new Client({

            webSocketFactory: () => new WebSocket(this.url + `?token=${token}`),
            reconnectDelay: 5000,
            debug: (str) => console.log(topic, str),

        });

        this.stompClient.onConnect = () => {

            console.log('Connected to STOMP for topic:', this.topic);
            this.subscribe(this.topic);

        }


        this.stompClient.onStompError = (frame) => {

            console.error('STOMP error:', frame.headers, frame.body);

        };

        this.stompClient.activate();

    }

    private subscribe(topic: string,) {

        if (!this.stompClient) return

        this.subscription = this.stompClient.subscribe(topic, (message: IMessage) => {

            console.log(`Message received on ${topic}:`, message.body);
            this.onMessage?.(JSON.parse(message.body))

        })

    }

    public send(destination: string, body: any) {

        if (!this.stompClient) return

        if (this.stompClient.connected) {

            this.stompClient.publish({

                destination,
                body: JSON.stringify(body)

            })

        } else {

            console.warn('STOMP not connected');

        }

    }

    public disconnect() {

        if (!this.stompClient) return

        this.subscription?.unsubscribe();
        this.stompClient.deactivate();

    }

}
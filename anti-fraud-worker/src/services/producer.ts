import { Partitioners } from "kafkajs"
import { randomUUID } from "crypto"
import kafka from "../config/kafka"
import { ETypeEventTransaction, IPayloadTransactionStatus } from "../types";


export default class Producer {
    private producer;

    constructor() {
        this.producer = kafka.producer({
            createPartitioner: Partitioners.LegacyPartitioner
        })
    }

    async setup() {
        await this.producer.connect()
    }

    async call(data: IPayloadTransactionStatus, topic:ETypeEventTransaction) {   
       await this.producer.send({
            topic: topic,
            messages: [{ key: randomUUID(), value: JSON.stringify(data)}],
        })
    }
}
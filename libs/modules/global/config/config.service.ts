import { Injectable } from "@nestjs/common";
import { KafkaConfig } from "kafkajs";
import { ConfigService } from "@nestjs/config";
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { IConfigService } from "./config.adapter";
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from "../../database/snake-naming.startegy";
import {
    clientId,
    kafkaTopic,
    broker,
    connectionTimeout,
    authenticationTimeout,
    reauthenticationThreshold,
} from '../../../../kafka.config.json';


@Injectable()
export class ConfigurationService extends ConfigService implements IConfigService {

    constructor() {
        super();
        dotenv.config({
            path: `.env`,
        });


        for (const envName of Object.keys(process.env)) {
            process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
        }
    }
    getNodeEnv(): string {
        return this.get('NODE_ENV') || 'local';
    }

    get(key: string): string {
        return process.env[key];
    }


    getConfigDb(): PostgresConnectionOptions {
        return {
            name: 'statistics',
            type: 'postgres',
            url: this.get('DB_URL'),
            entities: ['dist/**/*.entity.js'],
            migrationsTableName: 'migrations',
            migrations: ['dist/migrations/*.js'],
            cli: {
                migrationsDir: 'src/migrations',
            },
            synchronize: false,
            logging: ['error'], //['query', 'error'],
            namingStrategy: new SnakeNamingStrategy(),
            useUTC: true,
        };
    }
    getKafkaConfig(topicName: string): KafkaConfig {
        return [{
            clientId: topicName,
            brokers: [this.get(`${topicName.toUpperCase()}_KAFKA_BROKER`)],
            sasl: {
                mechanism: 'plain',
                username: this.get(`${topicName.toUpperCase()}_KAFKA_USERNAME`),
                password: this.get(`${topicName.toUpperCase()}_KAFKA_PASSWORD`)
            },
            connectionTimeout: connectionTimeout,
            authenticationTimeout: authenticationTimeout,
            reauthenticationThreshold: reauthenticationThreshold

        } as KafkaConfig
        ].filter(conf => conf.clientId === topicName)[0]
    }

}

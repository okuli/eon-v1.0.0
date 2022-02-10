import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppConfig {

    config: any = null;
    env: any = null;
    jitsiConfig: any = null;

    constructor(private http: HttpClient) {

    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getJitsiConfig() {
        return this.jitsiConfig;
    }

    /**
     * Use to get the data found in the first file (env file)
     */
    public getEnv(key: any) {
        return this.env[key];
    }

    public async load() {

        await new Promise((resolve, reject) => {
            this.http.get("./conf/config-v-terminal/jitsi.params.json").subscribe((jitsiResponse: any) => {
                this.jitsiConfig = jitsiResponse;
                resolve(true);
            }, (err) => {
                let getJitsiConfigFromAssets = this.http.get('./assets/jitsi.params.json');

                getJitsiConfigFromAssets.subscribe((response: any) => {
                    this.jitsiConfig = response;
                    resolve(true);
                })
            })
        })

        return await new Promise((resolve, reject) => {
            this.http.get("./assets/env.json").subscribe((envResponse: any) => {
                this.env = envResponse;
                let request: any = null;
                let getConfigFormAssets: any = null;

                switch (envResponse.env) {
                    case 'production': {
                        request = this.http.get('./conf/config-v-terminal/config.' + envResponse.env + '.json');
                    } break;

                    case 'development': {
                        request = this.http.get('./conf/config-v-terminal/config.' + envResponse.env + '.json');
                    } break;

                    case 'default': {
                        console.error('Environment file is not set or invalid');
                        resolve(true);
                    } break;
                }

                request.subscribe((res: any) => {
                    this.config = res;
                    resolve(true);
                }, (err: any) => {
                    getConfigFormAssets = this.http.get('./assets/config.' + envResponse.env + '.json');

                    getConfigFormAssets.subscribe((response: any) => {
                        this.config = response;
                        resolve(true);
                    })
                })

            });

        });
    }
}

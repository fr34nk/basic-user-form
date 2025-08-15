import { where } from 'firebase/firestore';
import config from '../config/firebase.config'

export class FirebaseHttpService {
    private _apiKey:string = '';
    private _appId: string = '';

    private _bearer: string = '';
    private _refresh: string = '';
    private _idToken: string = '';
    private _localId: any;
    private _projectId: string;

    constructor () {
        this._apiKey = config.apiKey as string;
        this._appId = config.appId as string;
        this._projectId = config.projectId as string;
    }

    async getBearer () {
        const project_id='test-2e6a3';
        return fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this._apiKey}`, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    private parseCollectionResult (obj: { [key:string]: any }) {
        const keys = [Object.keys(obj)];
        return Object.keys(obj).map((key) => {
            return obj[key];
        })
    }


    async request (_url: string, 
        config: { 
            method: 'GET'|'POST'|'UPDATE'|'DELETE'|'PATCH', 
            headers?: { [key:string]: string },
            params?: { [key:string]: string }
            body?: { [key:string]: any }, 
    }, options?: { shouldLogRequest: boolean }) {
        try {
            // TODO: interpolate params
            const url = _url;
            console.log('url');
            console.log(url);

            let reqConfig = {
                method: config.method || 'GET',
                headers: config.headers || {
                    "Content-Type": "application/json"
                },
            } as any;
            if (config.body) {
                reqConfig.body = JSON.stringify(config.body);
            }

            const request = new Request(url, {
                method: reqConfig.method,
                headers: reqConfig.headers,
                body: reqConfig.body
            });

            const response = await fetch(request);

            if (options?.shouldLogRequest) {
                console.debug(request)
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.json()
        } catch (error) {
            console.error("Error signing in anonymously:", error);
        }
    }

    async getAnonymousToken() {
        const authConfig = await this.request(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this._apiKey}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: {
                returnSecureToken: true
            }
        })

        this._idToken = authConfig.idToken;
        this._refresh = authConfig.refreshToken;
        this._localId =  authConfig.localId;
    }

    async getCollection (collection: string) {
        return this.request(
            // `https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/${collection}`,
            `https://${this._projectId}.firebaseio.com/${collection}.json?auth=${this._apiKey}`,
            {
                method: 'GET',
                headers: { 
                    "Content-Type": "application/json",
                    // "Authorization": `BEARER ${this._idToken}`
                }
            }
        )
    }

    async getCollectionParsed (collection: string) {
        try {
            const userList = await firebaseHttpTransport.getCollection(collection);
            const parsedResult = firebaseHttpTransport.parseCollectionResult(userList);
            return parsedResult;
        } catch (e) {
            throw e;
        }
    }

    createWhereFromParameters (params: { [key:string]: string }) {
        //@ts-ignore
        const where = Object.keys(params).reduce((acc, key) => {
            let value = params[key];
            if (typeof value == 'string') {
                value = `"${value}"`
            } 
            acc+=`orderBy="${key}"&equalTo=${value}&`
            return acc;
        }, '').replace(/&$/, '')
        return where;
    }

    async findInCollectionBy (collection: string, by: { [key:string]: any }, options?: { shouldLogRequest: boolean }) {
        const whereClause = this.createWhereFromParameters(by);
        return this.request(
            `https://${this._projectId}.firebaseio.com/${collection}.json?auth=${this._apiKey}&${whereClause}`,
            {
                method: 'GET',
                headers: { 
                    "Content-Type": "application/json",
            }
        }, options)

    }

    async createCollection (collection: string) {
        return this.request(
            `https://${this._projectId}.firebaseio.com/${collection}.json?auth=${this._apiKey}`,
            {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                },
                body: {} as { [key:string]: any}
            }
        )
    }

    async addToCollection (collection: string, obj: { [key:string]: any }) {
        return this.request(
            `https://${this._projectId}.firebaseio.com/${collection}.json?auth=${this._apiKey}`,
            {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                },
            body: obj
            }
        )
    }

    async updateDocument (collection: string, obj: { [key:string]: any }, whereParams: { [key:string]: any }) {
        const response = await this.findInCollectionBy(collection, whereParams);
        let results = [] as any[];
        return Promise.all(
            Object.keys(response).map(async (key:string) => {
                const result  = await this.request(
                    `https://${this._projectId}.firebaseio.com/${collection}/${key}.json?auth=${this._apiKey}`,
                    {
                        method: 'PATCH',
                        headers: { 
                            "Content-Type": "application/json",
                    },
                    body: obj
                })
                return result;
            })
        )
    }

    async deleteDocument (collection: string) {
        return this.request(
            `https://${this._projectId}.firebaseio.com/${collection}.json?auth=${this._apiKey}`,
            {
                method: 'DELETE',
                headers: { 
                    "Content-Type": "application/json",
                }
        })
    }



}

export function getFirebaseTransport () {
    const transport  = new FirebaseHttpService() 
    return transport;
}

export const firebaseHttpTransport = getFirebaseTransport() 
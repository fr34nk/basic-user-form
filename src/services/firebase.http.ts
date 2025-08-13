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
        this._apiKey = config.apiKey;
        this._appId = config.appId;
        this._projectId = config.projectId;
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

    async request (_url: string, 
        config: { 
            method: 'GET'|'POST'|'UPDATE'|'DELETE', 
            headers?: { [key:string]: string },
            params?: { [key:string]: string }
            body?: { [key:string]: any }, 
    }) {
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
        })
    }

    async postCollection (collection: string, body: { [key:string]: any }) {
        return this.request(
            // `https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/${collection}`,
            `https://${this._projectId}.firebaseio.com/${collection}.json?auth=${this._apiKey}`,
            {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    // "Authorization": `BEARER ${this._idToken}`
                },
                body: body
            })
    }
}

export function getFirebaseTransport () {
    const transport  = new FirebaseHttpService() 
    return transport;
}

export const firebaseHttpTransport = getFirebaseTransport() 
import {BaseService} from '@/shared/services/base-service.js';

export class UserService extends BaseService {
    constructor() {
        super('users');
    }

    async getUserById(userId) {
        try {
            const response = await this.http.get(`${this.resourcePath()}/${userId}`);
            return response.data;
        } catch (error) {
            throw this._enhanceError(error);
        }
    }
}
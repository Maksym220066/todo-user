export default class Users {
    static async getAllUsers() {
        try {
            const data = await fetch('https://jsonplaceholder.typicode.com/users');
            return data.json();
        } catch (err) {
            throw new Error(err);
        }

    }
}
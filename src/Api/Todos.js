export default class Todos {
    static async getAllTodos() {
        try {
            const data = await fetch('https://jsonplaceholder.typicode.com/todos');
            return data.json();
        } catch (err) {
            throw new Error(err);
        }
    }

    static async setTodo(data) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify({
                    ...data
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const {ok} = response;
            const responseData = await response.json();
            return {data: responseData, error: !ok};
        } catch (err) {
            throw new Error(err);
        }
    }
}
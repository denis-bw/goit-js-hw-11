import axios from 'axios';

export default class APIservice {

    constructor () {
        this.inputQuery = '';
        this.page = 1;
    }

    async fetchCards() {
        try {
            this.incremenPage()
            const searchParams = new URLSearchParams({
                "key": "34967967-988d5eee0052f5ca84597e552",
                'q': this.inputQuery,
                'image_type': 'photo',
                'orientation': 'horizontal',
                'safesearch': true,
                'per_page': 40,
                'page': this.page,

            })
            const url = `https://pixabay.com/api/?${searchParams}`;

            return await axios.get(url).then(data => {
                return data;
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    get query() {
        return this.inputQuery;
    }

    set query(newQuery) {
        this.inputQuery = newQuery;
    }

    incremenPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}
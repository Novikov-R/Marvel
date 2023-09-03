class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=f45bde3600f1606e51f04ea7d06cb076'

     getResource = async (url) => {
         let res = await fetch(url);

         if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
         }

         return await res.json();
     }

     getAllCharacters = () => {
         return this.getResource(`${this._apiBase}characters?limit=9&offset=410&${this._apiKey}`);
     }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
    }
}

export default  MarvelService;
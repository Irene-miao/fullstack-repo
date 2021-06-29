
import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const backend = {
    

     getAll: () => {
        return axios.get(baseUrl)
    },

    
     create: (newObject) => {
        return axios.post(baseUrl, newObject)
    },
    
    
    remove: (id) => {
    return axios.delete(`${baseUrl}/${id}`)
    },
};



export default backend;

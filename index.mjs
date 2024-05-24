import axios from 'axios';

export const handler = async (event) => {
    console.log('Event:', event);
    try {
        const characterName = event.queryStringParameters.name;
        const response = await axios.get(`https://api.disneyapi.dev/character?name=${characterName}`);
        
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    }
};

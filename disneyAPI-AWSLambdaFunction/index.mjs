import axios from 'axios';

export const handler = async (event) => {
  const characterName = event.queryStringParameters.name;
  const response = await axios.get(`https://api.disneyapi.dev/character?name=${characterName}`);
  const character = response.data.data[0];
  return {
    statusCode: 200,
    body: JSON.stringify(character),
  };
};

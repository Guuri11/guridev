// // List of commands that require API calls
import { getProjects } from '../api';
import { getQuote } from '../api';
import { getReadme } from '../api';
import { getWeather } from '../api';

export const projects = async (args: string[]): Promise<string> => {
  const projects = await getProjects();

  return projects
    .map(
      (repo) =>
        `<a class="text-light-blue dark:text-dark-blue underline" style="color: #67AFC0!important" href="${
          repo.html_url
        }" target="_blank">${repo.name}</a> ${
          repo.description !== null ? '- ' + repo.description : ''
        }<br/>`,
    )
    .join('\n');
};

export const quote = async (args: string[]): Promise<string> => {
  const data = await getQuote();
  return data.quote;
};

export const readme = async (args: string[]): Promise<string> => {
  const readme = await getReadme();
  return `Opening GitHub README...\n
  ${readme}`;
};

export const weather = async (args: string[]): Promise<string> => {
  const city = args.join('+');
  if (!city) {
    return 'Usage: weather [city]. Example: weather casablanca';
  }
  const weather = await getWeather(city);
  return weather;
};

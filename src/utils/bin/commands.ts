// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';

// Help
export const help = async (args: string[]): Promise<string> => {
  var c = '';
  Object.keys(config.commands).sort().forEach(command => {
    c += `<span style="color: ${config.colors.dark.blue}">${command}</span> --- ${config.commands[command]}\n`;
  })
  return `Welcome! Here are all the available commands:
\n${c}
<span style="color: ${config.colors.dark.blue}">[tab]</span>: trigger completion.
<span style="color: ${config.colors.dark.blue}">[ctrl+l]</span>/clear: clear terminal.\n
Type <span style="color: ${config.colors.dark.blue}">'sumfetch'</span> to display summary.
`;
};

// Redirection
export const repo = async (args: string[]): Promise<string> => {
  window.open(`${config.repo}`);
  return 'Opening Github repository...';
};

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi 👋, I'm ${config.name}
Welcome to my website!
More about me:

🔭 I'm currently working on <a href="${config.current_job_web}" style="color: ${config.colors.dark.blue} !important" target="_blank">${config.current_job}</a>

💪 Some people said that I wouldn't get anything, so I proved them wrong.

👯 I’m looking to collaborate on designers || others developers

💯 My goal is be the best developer I can be.

💬 Ask me about Java, Python, Typescript, Clean Code, Architecture...

📫 How to reach me sergio.gurillo11@gmail.com

⚡ Fun fact I play basketball since I was 8yo 🏀

🤖 I also like to build stuff for Arduino!

'sumfetch' - short summary.
'resume' - my latest resume.
'readme' - my github readme.`;
};

export const resume = async (args: string[]): Promise<string> => {
  window.open(`${config.resume_url}`);
  return 'Opening resume...';
};

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);

  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);

  return 'Opening linkedin...';
};

// Search
export const google = async (args: string[]): Promise<string> => {
  window.open(`https://google.com/search?q=${args.join(' ')}`);
  return `Searching google for ${args.join(' ')}...`;
};

export const bing = async (args: string[]): Promise<string> => {
  window.open(`https://bing.com/search?q=${args.join(' ')}`);
  return `Wow, really? You are using bing for ${args.join(' ')}?`;
};

export const reddit = async (args: string[]): Promise<string> => {
  window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  return `Searching reddit for ${args.join(' ')}...`;
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

export const ls = async (args: string[]): Promise<string> => {
  return `a
bunch
of
fake
directories`;
};

export const cd = async (args: string[]): Promise<string> => {
  return `unfortunately, i cannot afford more directories.`;
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // ...I'm sorry
  return `Permission denied: with little power comes... no responsibility? `;
};

// Banner
export const banner = (args?: string[]): string => {
  return `
             ________________________________________________
            /                                                \
           |    _________________________________________     |
           |   |                                         |    |
           |   | visitor:$ echo "Hello World!"           |    |
           |   |                                         |    |
           |   |                                         |    |
           |   |                                         |    |
           |   |                                         |    |
           |   |                                         |    |
           |   |                                         |    |
           |   |                                         |    |
           |   |_________________________________________|    |
           |                                                  |
            \_________________________________________________/
                   \___________________________________/
                ___________________________________________
             _-'    .-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.  --- '-_
          _-'.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.--.  .-.-.'-_
       _-'.-.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-'__'. .-.-.-.'-_
    _-'.-.-.-.-. .-----.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-----. .-.-.-.-.'-_
 _-'.-.-.-.-.-. .---.-. .-------------------------. .-.---. .---.-.-.-.'-_
:-------------------------------------------------------------------------:
'---._.-------------------------------------------------------------._.---'
                              - Sergio Gurillo -
Software Engineer

Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
Type 'repo' or click <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.repo}" target="_blank">here</a></u> for the Github repository.
`;
};

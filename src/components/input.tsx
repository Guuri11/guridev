import React, { useState } from 'react';
import { commandExists } from '../utils/commandExists';
import { shell } from '../utils/shell';
import { handleTabCompletion, showSuggestions } from '../utils/tabCompletion';
import { Ps1 } from './Ps1';
import config from '../../config.json';

export const Input = ({
  inputRef,
  containerRef,
  command,
  history,
  lastCommandIndex,
  setCommand,
  setHistory,
  setLastCommandIndex,
  clearHistory,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionBoxDistance, setSuggestionBoxDistance] = useState(0);

  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const commands: [string] = history
      .map(({ command }) => command)
      .filter((command: string) => command);

    if (event.key === 'c' && event.ctrlKey) {
      event.preventDefault();
      setCommand('');
      setHistory('');
      setLastCommandIndex(0);
    }

    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      clearHistory();
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      handleTabCompletion(command, setCommand);
    }

    if (event.key === 'Enter' || event.code === '13') {
      event.preventDefault();
      setLastCommandIndex(0);
      await shell(command, setHistory, clearHistory, setCommand);
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!commands.length) {
        return;
      }
      const index: number = lastCommandIndex + 1;
      if (index <= commands.length) {
        setLastCommandIndex(index);
        setCommand(commands[commands.length - index]);
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!commands.length) {
        return;
      }
      const index: number = lastCommandIndex - 1;
      if (index > 0) {
        setLastCommandIndex(index);
        setCommand(commands[commands.length - index]);
      } else {
        setLastCommandIndex(0);
        setCommand('');
      }
    }
  };

  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(value);
    setSuggestions(showSuggestions(value));
    if (value.length < 22) {
      setSuggestionBoxDistance(value.length * 11);
    }
  };

  return (
    <div className="flex flex-row space-x-2">
      <label htmlFor="prompt" className="flex-shrink">
        <Ps1 />
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id="prompt"
          type="text"
          className={`bg-light-background dark:bg-dark-background focus:outline-none flex-grow ${
            commandExists(command) || command === ''
              ? 'text-dark-green'
              : 'text-dark-red'
          }`}
          value={command}
          onChange={onChange}
          autoFocus
          onKeyDown={onSubmit}
          autoComplete="off"
          spellCheck="false"
        />
        {suggestions.length > 0 && (
          <div
            style={{ left: suggestionBoxDistance }}
            className={`absolute rounded bg-[${config.colors.dark.foreground}] text-[#282a36] p-2`}
          >
            {suggestions.map((suggestion, idx) => {
              return <p key={idx}>{suggestion}</p>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;

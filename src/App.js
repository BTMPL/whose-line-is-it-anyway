import "./styles.css";
import React from "react";

import data from "!!raw-loader!./chat.txt";

const log = data
  .split("\n")
  .map((line) => {
    return [...line.matchAll(/\[(.*)\] \[(.*)\] (.*)/g)];
  })
  .map((data) => {
    return {
      time: data[0][1],
      user: data[0][2],
      message: data[0][3],
    };
  });

export default function App() {
  const getRandomMessage = () => {
    return log[Math.floor(Math.random() * log.length)];
  };

  const [message, setMessage] = React.useState(() => {
    return getRandomMessage();
  });
  return (
    <div className="container text-white text-center mx-auto">
      <img
        className="mx-auto"
        src="https://media.wtol.com/assets/WTOL/images/418c0a0b-d3b5-4b4d-b108-3f7208d49718/418c0a0b-d3b5-4b4d-b108-3f7208d49718_1140x641.png"
      />
      <WhoseLineIsItAnyway
        key={message.time}
        line={message.message}
        user={message.user}
        onNewMessage={() => {
          setMessage(() => getRandomMessage());
        }}
      />
    </div>
  );
}

const WhoseLineIsItAnyway = ({ line, user, onNewMessage }) => {
  const [guess, setGuess] = React.useState("");
  const [guessed, setGuessed] = React.useState(false);
  return (
    <form
      className="p-4 flex flex-col gap-2 "
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <blockquote className="bg-gray-100 p-4 rounded text-black">
        "{line}"
      </blockquote>
      <div className="text-white">
        Your guess:{" "}
        <input
          readOnly={guessed}
          className="bg-white border border-gray-400 p-2 text-black"
          type="text"
          value={guess}
          placeholder="Said by ...."
          onChange={(e) => setGuess(e.currentTarget.value)}
        />
      </div>
      {guessed && (
        <div>
          It was <strong>{user}</strong> - you're{" "}
          {guess.toLowerCase() === user.toLowerCase() ? (
            <strong>RIGHT!</strong>
          ) : (
            <strong>WRONG!</strong>
          )}
        </div>
      )}
      <div>
        <button
          type="submit"
          className="border rounded px-4 py-2 cursor-pointer hover:bg-blue-500 disabled:bg-gray-200 mx-1 bg-blue-300 text-black"
          disabled={guess.length === 0 || guessed}
          onClick={() => {
            setGuessed(true);
          }}
        >
          Guess
        </button>
        <button
          className="border rounded px-4 py-2 cursor-pointer hover:bg-blue-500 disabled:bg-gray-200 mx-1 bg-blue-300 text-black"
          onClick={() => onNewMessage()}
        >
          Next!
        </button>
      </div>
    </form>
  );
};

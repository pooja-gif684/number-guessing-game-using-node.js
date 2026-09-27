const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const rl = readline.createInterface({ input: stdin, output: stdout });
const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

async function play() {
	console.log('Guess the number between 1 and 100.');

	while (true) {
		const answer = await rl.question('Your guess: ');
		const guess = Number(answer);

		if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
			console.log('Please enter a whole number between 1 and 100.');
			continue;
		}

		attempts += 1;

		if (guess === secretNumber) {
			console.log(`Correct! You guessed the number in ${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}.`);
			break;
		}

		console.log(guess > secretNumber ? 'Too high!' : 'Too low!');
	}

	rl.close();
}

play().catch((error) => {
	console.error(error);
	rl.close();
	process.exitCode = 1;
});

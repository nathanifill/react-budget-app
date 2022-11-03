## Project Title

This app is named "6 Jars Budgeting App".

## Project Description

This is a [React.js](https://reactjs.org/) project bootstrapped with [`create-react-app`](https://github.com/facebook/create-react-app).

It runs in Local Storage so there's no back end for this at the moment. If there's demand for that, that's something that I could implement in the future.

Some features I'd like to implement in the future include a dark mode toggle and an option to edit expenses - either amounts or jars.

## How to install and run the project

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Once the app is up and running, you need to click on the "Add Income" button to enter an income. It's expected that this is your monthly net (after-tax) income but there's no reason that it has to be.

The app will then divide this income across the 6 budgets or "jars" and show you how much money you have to spend in each category. If you edit your income later, the budgets will recalculate.

You can add expenses for different categories by providing a description of the expense and an amount.

The app will show your progress based on what you enter and how far through the month we are. For example, if you've spent more than half of your money for a jar and you're not even half way through the month, the progress bar will show up as yellow. Otherwise, if your spending is in check, it'll show up in blue. If you overspend the budget, it will show up in red and the card will turn red.

The Total card will show you your total spending and budget and will also change colour depending on how much you've spent and how far through the month we are.

There's also a "Reset App" button so that you can remove all of the data from the app.

## Learn More

To learn more about React.js or the 6 Jars Money Management Method, take a look at the following resources:

- [React.js Documentation](https://reactjs.org/) - learn about React.js features and API.
- [6 Jars Cheatsheet](http://6jars.com) - a short cheat sheet about the 6 Jars money management method.
- [6 Jars Money Management System](https://www.harveker.com/blog/6-step-money-managing-system/) - a blog post and infographic explaining the method from its creator, T. Harv Eker.

## Credits

Credits go to [Kyle from Web Dev Simplified](https://github.com/WebDevSimplified) who inspired me to do this after I watched his [Budget App Tutorial](https://youtu.be/yz8x71BiGXg). This app is _very_ similar (and looks almost identical since I wanted to try out using Bootstrap for once) but there's some additional features and changes in my version:

- You can now enter your income
- There's flexbox wrapping
- It's responsive on mobiles
- The budgets are fixed
- There's no Uncategorised budget
- There's a Reset button

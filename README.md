![Electrocore image](https://github.com/raverside/electrocore/blob/master/public/electrocore_promo.jpg?raw=true)

## About
Electrocore is an idle web game (meaning you [don't have to actively play it](https://www.youtube.com/watch?v=tFZmf4yvJ8M) in order to progress).

The goal of the game is to illuminate the city by unlocking the Nodes and upgrading them.

In order to unlock and upgrade the Nodes you'll have to earn some currency which you can do by running said Nodes manually (clicking a button) or automatically (you can unlock automode for each Node but it'll cost you).

If you close the game and come back some time later you'll see how much currency you made while you were gone (if you had some autorunning Nodes that is).

Only tested on 4k resolution, I'll make the layout responsive when I have some spare time.

I spent 6 days total working on this entirely on my own. 


## Tech stack
[Koa2](https://koajs.com/)

I used Koa once or twice before and I couldn't make up my mind whether I like it better than Express so I decided to give it another go and I still have mixed feelings about it. 
Overall I'd say that Koa is more enjoyable to work with and I intend to keep using it.


[React](https://reactjs.org/)

This is the first time I used React to build something from scratch. I can't say I liked it as much as I expected I would but perhaps I just need to let it grow on me.
I'm sure I misused/misunderstood some things. I might refactor this later when I get a bit more comfortable in React environment. For now it's spaghetti.


[Mongoose](https://mongoosejs.com/)

Most of my database experience lies in MySQL and I wanted to diversify that. I had previous experience with mongo but I wanted to build a deeper understanding of how it works, plus using noSQL db in this case makes perfect sense.


#### Tech summary

Overall this stack is somewhat new to me but I think I did a decent job with it considering the amount of work and the timeframe. I like how the backend turned out and I like the way the frontend looks (but not written).


## Set it up

1. Clone the repository
2. Create an .env file (use .env.template for reference)
3. `$ npm install`
4. `$ npm start`
5. Open a separate terminal
6. `$ npm run server`


## Trade-offs 

* Originally I planned to use [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development) approach but after building a roadmap I decided against it as I would've never made it on time (and I really wanted to make it on time).
* Delayed Node execution is implemented using timeouts which is a somewhat primitive solution. An alternative would be to build queues for cron job execution - that would be more stable but would also increase the load. In my opinion timeout solution is good enough here as losing 1 execution gains ONLY if the server goes down isn't that big of a deal.


## What would I do next? (not in this particular order)

* Implement more nodes (see the image at the top of the repo - that's the goal)
* Add Tests and improve error checking/reporting
* Implement marketplace
* Some unique features that would fit the game well (need some time to think about it)
* Add Repository level for database interactions on the backend (at this point it just [doesn't make sense](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) but in future it'll be necessary)


# Contact me

If you have any questions or want to leave some feedback you can always catch me here: r4verside@gmail.com

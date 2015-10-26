# My Online Portfolio

Welcome to my [online portfolio](http://www.randseay.com/)! My name is Rand, and I am a husband, father, designer, and developer. I [write about](http://www.randseay.com/articles/) design &amp; development, design cool things, hack on code, and [tweet about](https://twitter.com/randseay) my experiences.

I co-founded [Skosh Interactive](http://skosh.io), but you can also find me working as a front-end developer for the [North Dakota University System](http://cts.ndus.edu/). I built and actively maintain the front-end framework [Fuselage](http://fuselage.skosh.io).

## Setup

Make sure jekyll, npm, and bundler are installed. If they aren't installed, go out and get them.

```sh
$ which jekyll
# /path/to/jekyll

$ which npm
# /path/to/npm

$ which bundler
```

Clone the repository.
```sh
$ git clone https://github.com/randseay/randseay.github.io.git
```

Install npm dependencies.
```sh
$ npm install
```

Install Bower packages.
```sh
$ bower install
```

Install gems via Bundler.
```sh
$ bundle install
```

Build the project and serve it with Grunt.
```sh
$ grunt serve
```

The project will be served at `127.0.0.1:4000`.

## Configured Grunt Tasks

Serve the project locally at `127.0.0.1:4000`. This is the default task.
```sh
$ grunt
# or
$ grunt serve
```

Build the project.
```sh
$ grunt build
```

Prep the project for deployment. i.e. Build `jsx`, styles, and jekyll site.
```sh
$ grunt prep-deploy
```
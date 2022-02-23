# Le Poste

A simple interface to send emails.

![code coverage](https://img.shields.io/codecov/c/github/gbili/le-poste.svg)
![version](https://img.shields.io/npm/v/le-poste.svg)
![downloads](https://img.shields.io/npm/dm/le-poste.svg)
![license](https://img.shields.io/npm/l/le-poste.svg)

## Installation

To install this npm package do

```sh
npm i le-poste
```

## Usage

This package is interesting if you are using a dependency injector like `di-why`, combined with `dotenv` to just plug the env variables and play. So this will describe usage along with these two packages.

Go to your usual `loaders` directory `index.ts` and import `mailInjectionDict`

```js
// your-project/src/loaders/index.ts
import DiContainer from 'di-why';
// import any other dict elements ...
// and
import { mailInjectionDict } from 'le-poste';

const injectionDict = {
  // somePackageLoadDict,
  // etc.,
  // finally inject all le-poste's loaders into the main loadDict
  ...mailInjectionDict,
};

const di = new DiContainer({ logger, load: injectionDict });
export default di;
```

Now you can go anywhere in your code and import the index file above:

```ts
import di from `./loaders`;
try {
  await di.loadAll();
  const mailSend = di.get('mailSend');
  await mailSend({ subject: "le poste is open", text: "Tu reçois my message" });
} catch (e) {
  console.log('Some error occurred', e);
}
```

Lots of magic happening here, thanks to `di-why` and the `mailInjectionDict` we imported. That's why you need not pass `user`, `password`, `port` and `transporter` stuff in order to send a message.

A question emerges, how do we pass the connection data to `mailSend` ? We don't do it directly. Read on.

## Passing connection info

In order to configure mailSend, we need to be using dotenv, or add some properties to `process.env`. They are the following:

```env
MAIL_SMTP_HOST=mail.yourmailprovider.com
MAIL_SMTP_PORT=465
MAIL_FROM_NAME="Jean Jacques"
MAIL_USER=jj@cousteau.com
MAIL_ADMIN_TO_COMMA_LIST="Notify Me Aswell" <admin@cousteau.com>
MAIL_TO_COMMA_LIST="Le phare" <le@phare.com>
MAIL_PASSWORD='s0meR4nd0mCh4r5'
```

## Todo

You may have noticed there is an `MAIL_ADMIN_TO_COMMA_LIST` variable. Currently it is mandatory but not used, which is of course very odd. We need to either remove it completely, or make it optional.
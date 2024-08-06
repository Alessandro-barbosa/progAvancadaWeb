import express, {Request, Response}from 'express';

function soma(x : number, y : number) : number {
    return x + y;    
}

const app = express();

app.get('/', function (req : Request, res : Response) {
  res.send('Hello World tome a soma' + soma(50, 20))
});

app.listen(3000)
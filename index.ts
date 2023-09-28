import Koa from "koa";
import Router, {RouterContext} from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import passport from 'koa-passport';

import cors from "@koa/cors";

import serve from 'koa-static-folder';

import {router as users} from "./routes/users";
import {router as books} from "./routes/books";
import {router as comments} from "./routes/comments";

const app: Koa= new Koa();
app.use(cors());

app.use(serve('/docs'));
app.use(logger());
app.use(json());
app.use(passport.initialize());

app.use(users.routes());
app.use(books.routes());
app.use(comments.routes());

app.use(async (ctx: RouterContext, next: any) => {
  try {
    await next();
    console.log(ctx.status)
    if(ctx.status === 404){
      ctx.body = {err: "Resource not found"};
    }
  } catch(err: any) {
    ctx.body = {err: err};
  }
  
});


app.listen(10888);

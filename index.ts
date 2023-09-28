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


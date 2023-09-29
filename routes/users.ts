import Router, { RouterContext } from "koa-router";
import { User } from "../models/user";

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const router = new Router({ prefix: "/api/v1/users" });

// Get all users
const getAllUsers = async (ctx: RouterContext) => {
  ctx.body = users;
};

// Add a new user
const addUser = async (ctx: RouterContext) => {
  const userData: User = ctx.request.body;

  try {
    const newUser: User = {
      id: users.length + 1,
      ...userData,
    };
    users.push(newUser);
    ctx.status = 201;
    ctx.body = newUser;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Failed to add user" };
  }
};

// Update user info
const updateUser = async (ctx: RouterContext) => {
  const id: number = +ctx.params.id;
  const userData: User = ctx.request.body;

  try {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      users[userIndex] = { id, ...userData };
      ctx.body = users[userIndex];
    } else {
      ctx.status = 404;
      ctx.body = { error: "User not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Failed to update user" };
  }
};

// Delete a user
const deleteUser = async (ctx: RouterContext) => {
  const id: number = +ctx.params.id;

  try {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      const deletedUser = users.splice(userIndex, 1)[0];
      ctx.body = deletedUser;
    } else {
      ctx.status = 404;
      ctx.body = { error: "User not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Failed to delete user" };
  }
};

router.get("/", getAllUsers);
router.post("/", addUser);
router.put("/:id([0-9]{1,})", updateUser);
router.delete("/:id([0-9]{1,})", deleteUser);

export { router };
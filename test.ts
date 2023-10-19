import test from "ava";
import { SLACK_API_BASE_URL } from "./consts.js";

// dummy tests

test("foo", (t) => {
  t.pass();
});

test("bar", async (t) => {
  const bar = Promise.resolve("bar");
  t.is(await bar, "bar");
});

// tests for slack-to-ticket event emochij

// tests for slack-to-ticket action create ticket

// tests for slack-to-ticket mockdata event emochij

// tests for slack-to-ticket mockdata action create ticket
